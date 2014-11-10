function Game() {
  this.board = new Board();
  this.boardView = new BoardView(this.board);
  this.minimaxScoresAndMoves = {};
  this.minimaxMaxDepth = 3;
}

Game.prototype.display = function() {
  this.boardView.render();
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
  if (this.board.layout[index] === '-' && this.isPlayersTurn()) {
    this.board.layout[index] = 'X';
  }
}

Game.prototype.markComputerMove = function(index) {
  if (this.board.layout[index] === '-' && !this.isPlayersTurn()) {
    this.board.layout[index] = 'O';
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
    return evaluateBoard(board.layout);
  }

  // Clones the passed in board and board layout so that the original board isn't changed
  boardClone = new Board();
  boardClone.layout = board.layout.slice(0);

  possibleMoves = boardClone.openSquareIndices();

  bestScore = (player === 'O') ? -1000 : 1000;

  // Tries each possible move and returns a score for making that move
  for (i = 0; i < possibleMoves.length; i++) {
    move = possibleMoves[i];
    boardClone.layout[move] = player;

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

    // Reverses possible move
    boardClone.layout[move] = '-';
  };    

  return bestScore;
}



// Gives a score to the current state of the board
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

// Gives each line a score from the AI's perspective (more points for lines that are
// better for O)
function evaluateLine(board, index1, index2, index3) {
  // If the line is empty or the line looks like XXO or OOX, score = 0
  // If the line has 1 O and nothing else, score = 1
  // If the line has 1 X and nothing else, score = -1
  // If the line looks like OXO, score = 1
  // If the line looks like XOX, score = -1
  // If the line has 2 O's and nothing else, score = 10
  // If the line has 2 X's and nothing else, score = -10
  // If the line has 3 O's (AI wins), score = 100
  // If the line has 3 X's (player wins), score = -100

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
