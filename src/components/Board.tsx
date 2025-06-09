import { useEffect, useState } from "react"
import { CardZone } from "./CardZone";
import { Scoreboard } from "./Scoreboard";


export interface Pokemon {
    name: string,
    id: number,
    art: string,
    isSelected: boolean,
}

export default function Board() {
    const [score, setScore] = useState<number>(0);
    const [record, setRecord] = useState<number>(0);
    const [gameStatus, setGameStatus] = useState< 'lose' | 'win' | 'ongoing'>('ongoing'); 
    const [pokeList, setPokeList] = useState< Pokemon[]>([]);
    const [resetCount, setResetCount] = useState<number>(0)


    //Capitalize first letter of pokemon's name
    function capitalizeFirstLetter(string: string): string {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    

    // Call Api and feed array
    useEffect(() => {
        //Randomly fetch 12 of the original 151 pokemon
        const fetchPokemon = async () => {
            const randomNumbers = new Set();
            while (randomNumbers.size < 12) {
                const randomNumber = Math.floor(Math.random() * 151) + 1;
                randomNumbers.add(randomNumber);
            }
            const promises = Array.from(randomNumbers).map(num => 
                fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
                    .then(response => response.json())
            );
            const pokemonData = await Promise.all(promises);
            //Once pokeAPI responds, remove unnecessary properties and add isSelected
            const filteredList = pokemonData.map(pokemon => (
                {
                    name: capitalizeFirstLetter(pokemon.name),
                    id: pokemon.id,
                    art: pokemon.sprites.other["official-artwork"].front_default,
                    isSelected: false,
                })
            );
            setPokeList(filteredList);
        };
        fetchPokemon();
    }, [resetCount])

    function updateScore(currentList: Pokemon[]) {
        if (gameStatus !== 'ongoing') {
            return
        }
        let currentScore: number = 1;
        currentList.forEach(pokemon => {//Check number of selected pokemons so far
            if (pokemon.isSelected) {
                currentScore++
            }
        })
        setScore(currentScore);
        if (currentScore > record) {//check if this is a new record
            setRecord(currentScore)
        }
    }

    function restart() {
        setScore(0);
        setGameStatus('ongoing');
        setResetCount(count => count + 1)
    }


    return (
        <div className="board">
            <h1 className='title'>Memory Card Game</h1>
            {gameStatus === 'ongoing' ? (
                <Scoreboard
                score={score}
                record={record}
                ></Scoreboard>
            ) : (
                <div className="end-game">
                    <h2>You {gameStatus}!</h2>
                    <button
                    onClick={restart}
                    >Restart</button>
                </div>
            )}
            {pokeList && pokeList.length > 0 
            ? (
                <CardZone
                updateScore={updateScore}
                setGameStatus={setGameStatus}
                pokeList={pokeList}
                setPokeList={setPokeList}
                gameStatus={gameStatus}
                ></CardZone>)
            : (<p>No list generated</p>)
            }
        </div>
    )
}