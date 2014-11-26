function Game() {
  this.board = new Board();
  this.minimaxScoresAndMoves = {};
  this.minimaxMaxDepth = 6;

  this.player = new Player('X');
  this.ai = new Player('O');
  this.player.opponent = this.ai;
  this.ai.opponent = this.player;
}

Game.prototype.chooseBestMove = function() {
  var score, bestScore, bestMove, possibleMoves, possibleMove, thisScore, thisMove, i;

  possibleMoves = this.board.openSquareIndices();

  // Populates this.minimaxScoresAndMoves by calling minimax on 
  // each possible next move
  for (i = 0; i < possibleMoves.length; i++) {
    possibleMove = possibleMoves[i];

    this.board.markIndexWithCharacter(possibleMove, this.ai.character);
    score = this.minimax(this.minimaxMaxDepth, this.player, this.board);
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
    this.board.markIndexWithCharacter(index, this.player.character);
  }
}

Game.prototype.markComputerMove = function(index) {
  if (this.board.squareIsEmpty(index) && !this.isPlayersTurn()) {
    this.board.markIndexWithCharacter(index, this.ai.character);
  }
}

Game.prototype.isPlayersTurn = function() {
  // X goes first, so if the number of X's equals the number of O's, it's X's turn
  return this.board.numberOfXs() === this.board.numberOfOs();
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

Game.prototype.minimax = function(depth, player, board) {
  var boardClone, possibleMoves, scores, bestScore, currentScore, move, i;

  if (board.isFull() || board.hasThreeInARow() || depth === 0) { 
    return this.evaluateAndScoreBoard(board, depth);
  }

  boardClone = board.cloneSelf();
  possibleMoves = boardClone.openSquareIndices();
  bestScore = (player.character === this.ai.character) ? -1000 : 1000;

  for (i = 0; i < possibleMoves.length; i++) {
    move = possibleMoves[i];
    boardClone.markIndexWithCharacter(move, player.character);

    currentScore = this.minimax(depth - 1, player.opponent, boardClone);
    scores = [bestScore, currentScore].sort();
    bestScore = player.character === this.ai.character ? scores[1] : scores[0];

    boardClone.undoMove(move);
  };    

  return bestScore;
}

Game.prototype.evaluateAndScoreBoard = function(board, depth) {
  if (board.threeInARowCharacter() == this.player.character) {
    return -100 * depth;
  } else if (board.threeInARowCharacter() == this.ai.character) {
    return 100 * depth;
  } else {
    return 0;
  }
}