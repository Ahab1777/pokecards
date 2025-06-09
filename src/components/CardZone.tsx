import type { Pokemon } from "./Board"
import { Card } from "./Card"
import { useState, useEffect } from "react"

type CardZoneProps = {
    updateScore: (currentPokemonList: Pokemon[]) => void
    setGameStatus: (status: 'ongoing' | 'win' | 'lose') => void
    pokeList: Pokemon[]
    setPokeList: React.Dispatch<React.SetStateAction<Pokemon[]>>
    gameStatus: 'ongoing' | 'win' | 'lose'
}

export const CardZone: React.FC<CardZoneProps> = ({updateScore, gameStatus, setGameStatus, pokeList}) => {
    const [cards, setCards] = useState<Pokemon[]>([]);

    useEffect(() => {
        setCards([...pokeList]);
    }, [pokeList])

    useEffect(() => {
        //Verify wincon - check if all pokemon have been selected
        if (cards && cards.length > 0) {
            const allSelected = cards.every(pokemon => pokemon.isSelected);
            if (allSelected) {
                setGameStatus('win');
            }
        }
    }, [cards, setGameStatus])

    function shuffle(array: Pokemon[]) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }


    //Handle card click
    const handleClick = (pokemon: Pokemon) => {
        //check if already selected
        if (pokemon.isSelected) {
            setGameStatus('lose')//End game
            return
        }
        //toggle selected
        const updatedPokemon = { ...pokemon, isSelected: true };
        const updatedCards = cards.map(card => 
            card.id === pokemon.id ? updatedPokemon : card
        );
        setCards(shuffle(updatedCards));

        //Update score
        updateScore(cards);

    };


    return (
        <div className="card-zone">
            {cards.map(pokemon => (
                <Card
                key={pokemon.id}
                pokemon={pokemon}
                onClick={handleClick}
                gameStatus={gameStatus}
                ></Card>
            ))}
        </div>
    )
}