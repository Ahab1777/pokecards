import type { Pokemon } from "./Board"
import { Card } from "./Card"
import { useState, useEffect } from "react"

type CardZoneProps = {
    updateScore: () => void
    setGameStatus: (status: 'ongoing' | 'win' | 'lose') => void
    pokeList: Pokemon[]
    setPokeList: React.Dispatch<React.SetStateAction<Pokemon[]>>
    checkWinCon: () => void
    gameStatus: 'ongoing' | 'win' | 'lose'
}

export const CardZone: React.FC<CardZoneProps> = ({updateScore, gameStatus, setGameStatus, pokeList, setPokeList, checkWinCon}) => {
    const [cards, setCards] = useState<Pokemon[]>([]);

    // Shuffle only when pokeList changes
    useEffect(() => {
        if (pokeList.length > 0) {
            const shuffled = [...pokeList];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            setCards(shuffled);
        }
    }, [pokeList]);    

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
        setCards(updatedCards);
        setPokeList(prevPokeList => 
            prevPokeList.map(poke => 
                poke.id === pokemon.id ? updatedPokemon : poke
            )
        );
        //Update score
        updateScore();
        //Check wincon
        checkWinCon();


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