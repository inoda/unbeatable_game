function Game() {
  this.board = new Board();
  this.boardView = new BoardView(this.board);
  this.minimaxScoresAndMoves = {};
  this.minimaxMaxDepth = 3;
}

Game.prototype.display = function() {
  this.boardView.render();
}

Game.prototype.chooseBestMove = function() {
  this.getMinimaxScores(this.minimaxMaxDepth, "O", this.board);

  var bestScore = -1000;
  var bestMove = -1;

  for (var move in this.minimaxScoresAndMoves) {
    var score = this.minimaxScoresAndMoves[move]
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  this.markComputerMove(bestMove);
  this.minimaxScoresAndMoves = {};
  return;
}

Game.prototype.markPlayerMove = function(index) {
  this.board.layout[index] = 'X';
}

Game.prototype.markComputerMove = function(index) {
  this.board.layout[index] = 'O';
}

Game.prototype.isFinished = function() {
  return (this.board.isFull() || this.board.hasThreeInARow());
}

Game.prototype.results = function() {
  if (!this.board.hasThreeInARow()) {
    return 'draw';
  } else {
    return this.board.threeInARowCharacter();
  }
}

Game.prototype.getMinimaxScores = function(depth, player, board) {
  if (board.isFull() || board.hasThreeInARow() || depth === 0) { 
    return evaluateBoard(board.layout);
  }

  var boardClone = new Board();
  boardClone.layout = board.layout.slice(0);
  var possibleMoves = boardClone.openSquareIndices();

  var bestScore = (player === 'O') ? -1000 : 1000;
  var currentScore;

  for (var i = 0; i < possibleMoves.length; i++) {
    var move = possibleMoves[i];
    boardClone.layout[move] = player;

    if (player === 'O') {
      currentScore = this.getMinimaxScores(depth - 1, 'X', boardClone);
      if (currentScore > bestScore) {
        bestScore = currentScore;
      }

      if (this.minimaxScoresAndMoves[move.toString()] === undefined && depth === this.minimaxMaxDepth) {
        this.minimaxScoresAndMoves[move.toString()] = currentScore;
      }
    } else {
      currentScore = this.getMinimaxScores(depth - 1, 'O', boardClone);
      if (currentScore < bestScore) {
        bestScore = currentScore;
      }
    }

    boardClone.layout[move] = '-';
  };    

  return bestScore;
}




function evaluateBoard(board) {
  var score = 0;

  score += evaluateLine(board, 0, 1, 2);
  score += evaluateLine(board, 3, 4, 5);
  score += evaluateLine(board, 6, 7, 8);
  score += evaluateLine(board, 0, 3, 6);
  score += evaluateLine(board, 1, 4, 7);
  score += evaluateLine(board, 2, 5, 8);
  score += evaluateLine(board, 0, 4, 8);
  score += evaluateLine(board, 2, 4, 6);

  return score;
}


function evaluateLine(board, index1, index2, index3) {
  var score = 0;

  if (board[index1] === 'O') {
    score = 1;
  } else if (board[index1] === 'X') {
    score = -1;
  }

  if (board[index2] === 'O') {
    if (score === 1) {
      score = 10;
    } else if (score === -1) {
      return 0;
    } else {
      score = 1;
    }
  } else if (board[index2] === 'X') {
    if (score === -1) {
      score = -10;
    } else if (score === 1) {
      return 0;
    } else {
      score = -1;
    }
  }

  if (board[index3] === 'O') {
    if (score > 0) {
      score *= 10;
    } else if (score < 0) {
      return 0;
    } else {
      score = 1;
    }
  } else if (board[index3] === 'X') {
    if (score < 0) {
      score *= 10;
    } else if (score > 0) {
      return 0;
    } else {
      score = -1;
    }
  }

  return score;
}
