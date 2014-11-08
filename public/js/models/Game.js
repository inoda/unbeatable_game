function Game() {
  this.board = new Board();
  this.boardView = new BoardView(this.board);
}

Game.prototype.display = function() {
  this.boardView.render();
}

Game.prototype.chooseBestOption = function() {
  this.board.layout[0] = "O";
}

Game.prototype.markPlayerMove = function(index) {
  this.board.layout[index] = 'X';
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