import type { Pokemon } from "./Board"
import { Card } from "./Card"
import { useState, useEffect } from "react"

type CardZoneProps = {
    updateScore: () => void
    setGameStatus: (status: 'ongoing' | 'win' | 'lose') => void
    pokeList: Pokemon[]
    setPokeList: (prevPokeList: Pokemon[]) => void
}

export const CardZone: React.FC<CardZoneProps> = ({updateScore, setGameStatus, pokeList, setPokeList}) => {
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
    const handleClick: () => void = () => {
        //check if already selected
            //Endgame if already selected
            //Call finishing function
            //return
        //toggle selected
        //Update score
        
    };


    return (
        <div className="card-zone">
            {cards.map(pokemon => (
                <Card
                key={pokemon.id}
                pokemon={pokemon}
                ></Card>
            ))}
        </div>
    )
}