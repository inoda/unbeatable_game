function Game() {
  this.board = new Board();
  this.boardView = new BoardView(this.board);
}

Game.prototype.start = function() {
  this.boardView.render();
}