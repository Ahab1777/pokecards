import { use, useEffect, useState } from "react"
import CardZone from "./CardZone";
import Scoreboard from "./Scoreboard";

interface Pokemon {
    name: string,
    id: number,
    art: string,
    isSelected: boolean,
}

export default function Board() {
    const [score, setScore] = useState<number>(0);
    const [record, setRecord] = useState<number>(0);
    const [gameStatus, setGameStatus] = useState< 'lose' | 'win' | 'ongoing'>('ongoing'); 
    const [pokeList, setPokemonList] = useState< Pokemon[] | null >(null);


    //Capitalize first letter of pokemon's name
    function capitalizeFirstLetter(string) {
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
            setPokemonList(filteredList);
        };
        fetchPokemon();
    }, [])

    function updateScore() {
        if (gameStatus !== 'ongoing') {
            return
        }
        let currentScore: number = 0;
        pokeList?.forEach(pokemon => {//Check number of selected pokemons so far
            if (pokemon.isSelected) {
                currentScore++
            }
        })
        setScore(currentScore);
        if (currentScore > record) {//check if this is a new record
            setRecord(currentScore)
        }
    }



    return (
        <>
            <Scoreboard
            score={score}
            record={record}
            ></Scoreboard>
            <CardZone></CardZone>
        </>
    )
}