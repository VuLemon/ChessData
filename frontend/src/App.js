import React from 'react';
import './App.css';
import axios from 'axios'
import ChessboardComponent from './components/chessboardComponent';

function App() {

  var gameState = null

  const queryForFen = async (fen, setOpeningName) => {
    try {
      gameState = await axios.get(`http://localhost:4000/openings?fen=${fen}&moves=12`)
      console.log("Opening data in App: " + JSON.stringify(gameState.data))
      const openingName = gameState.data.opening.name
      setOpeningName(openingName)
    } catch (error) {
      console.log("Error from the frontend: " + error)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chess Game</h1>
        <ChessboardComponent queryForFen={queryForFen}/>
      </header>
    </div>
  );
}

export default App;
