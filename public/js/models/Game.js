function Game() {
  this.board = new Board();
  this.minimaxScoresAndMoves = {};
  this.minimaxMaxDepth = 7;
}

// Populates this.minimaxScoresAndMoves (by calling getMinimaxScores), 
// then loops through the object and picks the move with the highest score
Game.prototype.chooseBestMove = function() {
  var bestScore, bestMove, move, score;

  this.getMinimaxScores(this.minimaxMaxDepth, "O", this.board);

  bestScore = -1000;
  bestMove = -1;

  for (move in this.minimaxScoresAndMoves) {
    score = this.minimaxScoresAndMoves[move]
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  this.markComputerMove(bestMove);

  // Empties move/score store so that it can be populated for the next move
  this.minimaxScoresAndMoves = {};
  return;
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

Game.prototype.getMinimaxScores = function(depth, player, board) {
  var boardClone, possibleMoves, bestScore, currentScore, move, i;

  // If the board is full, there's a line with three in a row (a winner), or depth is 0, we've reached the end of this 'branch'
  if (board.isFull() || board.hasThreeInARow() || depth === 0) { 
    return evaluateAndScoreBoard(board, depth);
  }

  boardClone = board.cloneSelf();
  possibleMoves = boardClone.openSquareIndices();

  bestScore = (player === 'O') ? -1000 : 1000;

  // Tries each possible move and returns a score for making that move
  for (i = 0; i < possibleMoves.length; i++) {
    move = possibleMoves[i];
    boardClone.markIndexWithCharacter(move, player);

    if (player === 'O') {
      currentScore = this.getMinimaxScores(depth - 1, 'X', boardClone);

      // If it's the AI's turn, the best score is the highest score (best for the AI)
      if (currentScore > bestScore) {
        bestScore = currentScore;
      }

      // Stores top level possible moves and associated scores for AI player
      // so that we can pick the best one after all moves have been evaluated
      if (this.minimaxScoresAndMoves[move.toString()] === undefined && depth === this.minimaxMaxDepth) {
        this.minimaxScoresAndMoves[move.toString()] = currentScore;
      }
    } else {
      currentScore = this.getMinimaxScores(depth - 1, 'O', boardClone);

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