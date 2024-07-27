import React, {useState} from 'react';
import './App.css';
import axios from 'axios'
import ChessboardComponent from './components/chessboardComponent';
import EvalComponent from './components/evalComponent';

function App() {
  const [game, setGame] = useState(null)
  const [moveMade, setMoveMade] = useState(false);

  const queryForFen = async (fen, setOpeningName) => {
    try {
      var gameState = await axios.get(`http://localhost:4000/openings?fen=${fen}&moves=12`)
      console.log("Game State: " + JSON.stringify(gameState))
      if (gameState.data.opening){
        const openingName = gameState.data.opening.name
        setOpeningName(openingName)
      }
      setGame(gameState)
      setMoveMade(true)
      console.log("Opening is " + JSON.stringify(game.data.moves))
    } catch (error) {
      console.log("Error from the frontend: " + error)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chess Game</h1>
        <div className="container">
          <ChessboardComponent queryForFen={queryForFen}/>
          <EvalComponent moves={game ? game.data.moves : []} moveMade={moveMade} /></div>
      </header>
    </div>
  );
}

export default App;
