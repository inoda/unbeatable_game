function Board() {
  this.layout = ['-', '-', '-', 
                '-', '-', '-', 
                '-', '-', '-'];
}

Board.prototype.isFull = function() {
  return this.layout.indexOf('-') === -1;
}

Board.prototype.hasThreeInARow = function() {
  if (this.checkColumns() || this.checkRows() || this.checkDiagonals()) {
    return true;
  }
  return false;
}

Board.prototype.checkColumns = function() {
  var colOne = [this.layout[0], this.layout[3], this.layout[6]];
  var colTwo = [this.layout[1], this.layout[4], this.layout[7]];
  var colThree = [this.layout[2], this.layout[5], this.layout[8]];

  if ( this.threeInARow(colOne) || this.threeInARow(colTwo) || this.threeInARow(colThree) ) {
    return true;
  }
  return false;
}

Board.prototype.checkRows = function() {
  var rows = this.getRows();

  if ( this.threeInARow(rows[0]) || this.threeInARow(rows[1]) || this.threeInARow(rows[2]) ) {
    return true;
  }
  return false;
}

Board.prototype.checkDiagonals = function() {
  var diagOne = [this.layout[0], this.layout[4], this.layout[8]];
  var diagTwo = [this.layout[2], this.layout[4], this.layout[6]];

  if ( this.threeInARow(diagOne) || this.threeInARow(diagTwo) ) {
    return true;
  }
  return false;  
}

Board.prototype.threeInARow = function(set) {
  var unique_values = $.unique(set);
  return unique_values.length === 1 && unique_values != '-';
}

Board.prototype.getRows = function() {
  var rowOne = this.layout.slice(0, 3);
  var rowTwo = this.layout.slice(3, 6);
  var rowThree = this.layout.slice(6, 9);

  return [rowOne, rowTwo, rowThree];
}