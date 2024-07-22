import React, { useRef, useEffect } from 'react';
import $ from 'jquery';

const ChessboardComponent = () => {
    const gameRef = useRef(null);
    const boardRef = useRef(null);

  useEffect(() => {
    // Ensure Chessboard and Chess are loaded globally
    const initializeGame = () => {
        gameRef.current = new window.Chess();
        console.log("game created:", gameRef.current);
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
      console.log("board created:", boardRef.current);
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
  });

  const highlightedWhite = '#a9a9a9';
  const highlightedBlack = '#696969';

  const highlighted = (square) => {
    const $square = $(`#myBoard .square-${square}`);
    console.log(`#myBoard .square-${square}`);
    let background = highlightedWhite;
    if ($square.hasClass('black-3c85d')) {
      background = highlightedBlack;
    }
    $square.css('background', background);
  };

  const revertHighlighted = () => {
    $('#myBoard .square-55d63').css('background', '');
    console.log('revertHighlighted fired');
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
  };

  const onSnapEnd = () => {
    const game = gameRef.current
    const board = boardRef.current
    board.position(game.fen())
  };

  return (
    <div>
      <div id="myBoard" style={{ width: '400px' }}></div>
    </div>
  );
};

export default ChessboardComponent;
