import React from 'react';

const evalComponent = ({ moves, moveMade }) => {

    if (!moveMade) {
        return (
          <div className="eval-container">
            <p>Make a move to see the evaluation</p>
          </div>
        );
      }
    
      if (!moves || moves.length === 0) {
        return (
          <div className="eval-container">
            <p>No move found</p>
          </div>
        );
      }
    // Calculate total games for each move to find the percentages
    const calculatePercentages = (move) => {
        const totalGames = move.white + move.draws + move.black;
        const whitePercentage = (move.white / totalGames) * 100;
        const blackPercentage = (move.black / totalGames) * 100;
        return { whitePercentage, blackPercentage };
    };

    return (
        <div className="eval-container">
        <table>
            <thead>
            <tr>
                <th>Move</th>
                <th>Eval</th>
            </tr>
            </thead>
            <tbody>
            {moves.map((move, index) => {
                const { whitePercentage, blackPercentage } = calculatePercentages(move);
                return (
                <tr key={index}>
                    <td>{move.san}</td>
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
