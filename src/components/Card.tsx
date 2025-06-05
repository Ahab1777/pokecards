import type { Pokemon } from "./Board";

type CardProps = {
    pokemon: Pokemon
}

export const Card: React.FC<CardProps> = ({pokemon}) => {

    return (
        <div className="card"> 
            <img src={pokemon.art} alt={pokemon.name} className="pokemon-img" />
            <h3 className="pokemon-name">
            {pokemon.name}
            </h3>
        </div>
    )
}