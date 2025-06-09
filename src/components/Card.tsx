import type { Pokemon } from "./Board";

type CardProps = {
    pokemon: Pokemon;
    onClick?: (pokemon: Pokemon) => void;
    gameStatus?: 'ongoing' | 'win' | 'lose';
};

export const Card: React.FC<CardProps> = ({ pokemon, onClick, gameStatus }) => {
    const cardClass = `card ${gameStatus === 'win' ? 'card-win' : ''} ${gameStatus === 'lose' ? 'card-lose' : ''}`

    function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        e.preventDefault();
        if (gameStatus !== 'ongoing') {
            return;
        }
        onClick?.(pokemon);
    }

    return (
        <div 
            className={cardClass}
            onClick={handleClick}
        >
            <img src={pokemon.art} alt={pokemon.name} className="pokemon-img" />
            <h3 className="pokemon-name">
                {pokemon.name}
            </h3>
        </div>
    );
}