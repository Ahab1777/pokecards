import type { Pokemon } from "./Board"
import { Card } from "./Card"

type CardZoneProps = {
    updateScore: () => void
    setGameStatus: (status: 'ongoing' | 'win' | 'lose') => void
    pokeList: Pokemon[]
}

export const CardZone: React.FC<CardZoneProps> = ({updateScore, setGameStatus, pokeList}) => {

    return (
        <>
            {pokeList.map(pokemon => (
                <Card
                pokemon={pokemon}
                ></Card>
            ))}
        </>
    )
}