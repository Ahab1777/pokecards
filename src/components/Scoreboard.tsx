

type ScoreboardProps = {
    score: number;
    record: number;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({ score, record }) => {
    
    return (
        <div className="scoreboard">
            <h2 className="score">Score: 
                <span className="score-span">
                    {score}
                </span>
            </h2>
            <h2 className="record">Record: 
                <span className="record-span">
                    {record}
                </span>
            </h2>
        </div>
    );
};