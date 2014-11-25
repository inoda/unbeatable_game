function Game() {
  this.board = new Board();
  this.minimaxScoresAndMoves = {};
  this.minimaxMaxDepth = 7;
}

Game.prototype.chooseBestMove = function() {
  var bestScore, bestMove, possibleMoves, possibleMove, thisScore, thisMove, i;

  possibleMoves = this.board.openSquareIndices();

  // Populates this.minimaxScoresAndMoves by calling minimax on 
  // each possible next move
  for (i = 0; i < possibleMoves.length; i++) {
    possibleMove = possibleMoves[i];

    this.board.markIndexWithCharacter(possibleMove, "O");
    score = this.minimax(this.minimaxMaxDepth, 'X', this.board);
    this.minimaxScoresAndMoves[possibleMove] = score;

    this.board.undoMove(possibleMove);
  };


  bestScore = -1000;
  bestMove = -1;
  
  for (thisMove in this.minimaxScoresAndMoves) {
    thisScore = this.minimaxScoresAndMoves[thisMove]
    if (thisScore > bestScore) {
      bestScore = thisScore;
      bestMove = thisMove;
    }
  }

  this.markComputerMove(bestMove);
  this.resetMinimaxScores();
  return;
}

Game.prototype.resetMinimaxScores = function() {
  this.minimaxScoresAndMoves = {};
} 

Game.prototype.markPlayerMove = function(index) {
  if (this.board.squareIsEmpty(index) && this.isPlayersTurn()) {
    this.board.markIndexWithCharacter(index, 'X')
  }
}

Game.prototype.markComputerMove = function(index) {
  if (this.board.squareIsEmpty(index) && !this.isPlayersTurn()) {
    this.board.markIndexWithCharacter(index, 'O')
  }
}

Game.prototype.isPlayersTurn = function() {
  // X goes first, so if the number of X's equals the number of O's, it's X's turn
  return this.board.numberOfXs() === this.board.numberOfOs();
}

Game.prototype.isFinished = function() {
  return (this.board.isFull() || this.board.hasThreeInARow());
}

// Returns 'X', 'O', or 'draw' - returning 'X' means that X won
Game.prototype.results = function() {
  if (!this.board.hasThreeInARow()) {
    return 'draw';
  } else {
    return this.board.threeInARowCharacter();
  }
}

Game.prototype.minimax = function(depth, player, board) {
  var boardClone, possibleMoves, bestScore, currentScore, move, i;

  if (board.isFull() || board.hasThreeInARow() || depth === 0) { 
    return evaluateAndScoreBoard(board, depth);
  }

  boardClone = board.cloneSelf();
  possibleMoves = boardClone.openSquareIndices();
  bestScore = (player === 'O') ? -1000 : 1000;

  for (i = 0; i < possibleMoves.length; i++) {
    move = possibleMoves[i];
    boardClone.markIndexWithCharacter(move, player);

    if (player === 'O') {
      currentScore = this.minimax(depth - 1, 'X', boardClone);

      // If it's the AI's turn, the best score is the highest score (best for the AI)
      if (currentScore > bestScore) {
        bestScore = currentScore;
      }
    } else {
      currentScore = this.minimax(depth - 1, 'O', boardClone);

      // If it's the player's turn, the best score is the lowest score (worst for the AI)
      if (currentScore < bestScore) {
        bestScore = currentScore;
      }
    }

    boardClone.undoMove(move);
  };    

  return bestScore;
}


function evaluateAndScoreBoard(board, depth) {
  if (board.threeInARowCharacter() == 'X') {
    return -100 * depth
  } else if (board.threeInARowCharacter() == 'O') {
    return 100 * depth
  } else {
    return 0
  }
}