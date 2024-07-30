import React, { useState, useRef, useEffect } from 'react';
import $ from 'jquery';

const ChessboardComponent = ({queryForFen}) => {
    const gameRef = useRef(null);
    const boardRef = useRef(null);
    const [opening, setOpeningName] = useState('Starting Position')
    const [currentTurn, setCurrentTurn] = useState('White');

  useEffect(() => {
    // Ensure Chessboard and Chess are loaded globally
    const initializeGame = () => {
        gameRef.current = new window.Chess();
      };

    const initializeBoard = () => {
      const config = {
        draggable: true,
        dropOffBoard: 'snapback',
        position: 'start',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd: onSnapEnd
      };
      boardRef.current = window.Chessboard('myBoard', config);
    };

    if (window.Chess && window.Chessboard) {
      initializeGame();
      initializeBoard();

    } else {
      const interval = setInterval(() => {
        if (window.Chess && window.Chessboard) {
          initializeGame();
          initializeBoard();
          clearInterval(interval);
        }
      }, 100);
    }
  }, []);

  const highlightedWhite = '#a9a9a9';
  const highlightedBlack = '#696969';

  const highlighted = (square) => {
    const $square = $(`#myBoard .square-${square}`);
    let background = highlightedWhite;
    if ($square.hasClass('black-3c85d')) {
      background = highlightedBlack;
    }
    $square.css('background', background);
  };

  const revertHighlighted = () => {
    $('#myBoard .square-55d63').css('background', '');
  };

  const onDragStart = (source, piece) => {
    const game = gameRef.current
    if (game && game.game_over()) return false;
    if (game && ((game.turn() === 'w' && piece.search(/^b/) !== -1) || (game.turn() === 'b' && piece.search(/^w/) !== -1))) {
      return false;
    }
    revertHighlighted();
    const moves = game.moves({
      square: source,
      verbose: true
    });
    for (let i = 0; i < moves.length; i++) {
      highlighted(moves[i].to);
    }
  };

  const onDrop = (source, target) => {
    const game = gameRef.current
    const move = game.move({
      from: source,
      to: target,
      promotion: 'q' // always promote to a queen for simplicity
    });

    if (move === null) return 'snapback';
    revertHighlighted();
    setCurrentTurn(game.turn() === 'w' ? 'White' : 'Black');
    queryForFen(game.fen(), setOpeningName)
  };
  const onSnapEnd = () => {
    const game = gameRef.current
    const board = boardRef.current
    board.position(game.fen())
  };

  

  return (
    <div className="chessboard-container">
      <div id="myBoard" style={{ width: '400px' }}></div>
      {opening && <div>Opening: {opening}</div>}
      <div>Current Turn: {currentTurn}</div> {/* Display current turn */}
    </div>
  );
};

export default ChessboardComponent;
