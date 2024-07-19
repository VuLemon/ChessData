import React from 'react';
import './App.css';
import ChessboardComponent from './components/chessboardComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Chess Game</h1>
        <ChessboardComponent />
      </header>
    </div>
  );
}

export default App;
