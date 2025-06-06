

type ScoreboardProps = {
    score: number;
    record: number;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({ score, record }) => {
    
    return (
        <div className="scoreboard">
            <h2 className="score">Score: {score}</h2>
            <h2 className="record">Record: {record}</h2>
        </div>
    );
};