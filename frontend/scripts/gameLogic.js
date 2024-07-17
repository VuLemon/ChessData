var board = null
var game = new Chess()

var highlightedWhite = '#a9a9a9'
var highlightedBlack = '#696969'

function highlighted(square) {
  var $square = $("#myBoard .square-" + square)
  console.log("#myBoard .square-" + square)
  var background = highlightedWhite
  if ($square.hasClass('black-3c85d')) {
    background = highlightedBlack
  }
  $square.css("background", background)
}

function revertHighlighted() {
  $('#myBoard .square-55d63').css('background', '')
  console.log("revertHighlighted fired")
}

function onDragStart(source, piece) {
    if (game.game_over()) return false
    if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
    (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false}
    revertHighlighted()
    var moves = game.moves({
      square: source,
      verbose: true
    })
    for (var i = 0; i < moves.length; i++) {
      highlighted(moves[i].to)
    }


    
}

function onDrop (source, target) {
    // see if the move is legal
    var move = game.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    })
    
    // illegal move
    if (move === null) return 'snapback'
    revertHighlighted()

  
  }
function onSnapEnd () {
    board.position(game.fen())
  }

var config = {
    draggable: true,
    dropOffBoard: 'snapback',
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
}

board = Chessboard('myBoard', config)
