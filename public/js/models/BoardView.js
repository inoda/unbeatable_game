function BoardView(board) {
  this.board = board;
}

BoardView.prototype.render = function() {
  var rows = this.board.getRows();
  var self = this;
  
  $('div[data-game]').empty();

  $.each(rows, function(index, row) {
    $('div[data-game]').append(self.renderRow(row));
  });
}

BoardView.prototype.renderRow = function(row) {
  return '<div>' + this.renderSquare(row[0]) + this.renderSquare(row[1]) + this.renderSquare(row[2]) + '</div>';
}

BoardView.prototype.renderSquare = function(square) {
  if (square === '-') {
    return '<span class="square show-on-hover"><span class="char hidden">X</span></span>'; 
  } else {
    return '<span class="square"><span class="char">' + square + '</span></span>'; 
  }
}