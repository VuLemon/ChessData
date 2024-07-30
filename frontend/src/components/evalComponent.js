import React from 'react';

const evalComponent = ({ moves, moveMade }) => {

    if (!moveMade) {
        return (
          <div className="eval-container">
            <p>Evaluations will be displayed here</p>
            <p>Don't be shy. Make a move!</p>
          </div>
        );
      }
    
      if (!moves || moves.length === 0) {
        return (
          <div className="eval-container">
            <p>No move found in database</p>
            <p>This could be a new line you found out</p>
            <p>Use what you know and win!</p>
          </div>
        );
      }
    // Calculate total games for each move to find the percentages
    const calculatePercentages = (move) => {
        const totalGames = move.white + move.black + move.draws;
        const whitePercentage = (move.white / totalGames) * 100;
        const drawPercentage = (move.draws / totalGames) * 100;
        const blackPercentage = (move.black / totalGames) * 100;
        return {whitePercentage, drawPercentage, blackPercentage};
    };



    return (
        <div className="eval-container">
        <table className="table table-dark table-bordered table-striped table-hover">
            <thead>
            <tr>
                <th>Move</th>
                <th>Eval</th>
            </tr>
            </thead>
            <tbody>
            {moves.map((move, index) => {
                const {whitePercentage, drawPercentage, blackPercentage} = calculatePercentages(move);
                const roundedWhitePercentage = Math.ceil(whitePercentage);
                const roundedDrawPercentage = Math.ceil(drawPercentage);
                const roundedBlackPercentage = Math.ceil(blackPercentage);
                return (
                <tr key={index}>
                    <td>{move.san}</td>
                    <td>
                    <div>
                        <div
                            className="eval-bar"
                            style={{ width: `${whitePercentage}%` }}
                            
                        >
                            <span style={{ color: 'black' }}>{roundedWhitePercentage}%</span>
                        </div>
                        <div
                            className="eval-bar"
                            style={{ width: `${drawPercentage}%`, backgroundColor: 'gray' }}
                            
                        >
                            {roundedDrawPercentage}%
                        </div>
                        <div
                            className="eval-bar"
                            style={{ width: `${blackPercentage}%`, backgroundColor: 'black' }}
                        >
                            {roundedBlackPercentage}%
                        </div>

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
