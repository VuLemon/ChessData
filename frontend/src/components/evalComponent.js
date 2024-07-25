import React from 'react';

const evalComponent = ({ moves }) => {
    // Calculate total games for each move to find the percentages
    const calculatePercentages = (move) => {
        const totalGames = move.white + move.draws + move.black;
        const whitePercentage = (move.white / totalGames) * 100;
        const blackPercentage = (move.black / totalGames) * 100;
        return { whitePercentage, blackPercentage };
    };

    return (
        <div className="moves-table">
        <table>
            <thead>
            <tr>
                <th>Move</th>
                <th>White Wins</th>
                <th>Draws</th>
                <th>Black Wins</th>
                <th>Visualization</th>
            </tr>
            </thead>
            <tbody>
            {moves.map((move, index) => {
                const { whitePercentage, blackPercentage } = calculatePercentages(move);
                return (
                <tr key={index}>
                    <td>{move.san}</td>
                    <td>{move.white}</td>
                    <td>{move.draws}</td>
                    <td>{move.black}</td>
                    <td>
                    <div className="bar-container">
                        <div className="bar white" style={{ width: `${whitePercentage}%` }}></div>
                        <div className="bar black" style={{ width: `${blackPercentage}%` }}></div>
                    </div>
                    </td>
                </tr>
                );
            })}
            </tbody>
        </table>
        </div>
    );
    };

export default evalComponent;
