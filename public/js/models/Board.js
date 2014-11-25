function Board() {
  this.layout = ['-', '-', '-', 
                '-', '-', '-', 
                '-', '-', '-'];
}

Board.prototype.cloneSelf = function() {
  var clone = new Board();
  clone.layout = this.layout.slice(0);

  return clone;
}

Board.prototype.undoMove = function(index) {
  this.layout[index] = '-';
  return;
}

Board.prototype.markIndexWithCharacter = function(index, character) {
  this.layout[index] = character;
  return;
}

Board.prototype.squareIsEmpty = function(index) {
  return this.layout[index] === '-';
}

Board.prototype.isFull = function() {
  return this.layout.indexOf('-') === -1;
}

Board.prototype.numberOfXs = function() {
  var count = 0;
  var i; 

  for (i = 0; i < this.layout.length; i++) {
    if (this.layout[i] === 'X') {
      count += 1;
    }
  };
  return count;
}

Board.prototype.numberOfOs = function() {
  var count = 0;
  var i;

  for (i = 0; i < this.layout.length; i++) {
    if (this.layout[i] === 'O') {
      count += 1;
    }
  };
  return count;  
}

Board.prototype.openSquareIndices = function() {
  var openSquares = [];
  var i;

  for (i = 0; i < this.layout.length; i++) {
    if (this.squareIsEmpty(i)) { openSquares.push(i) }
  };

  return openSquares;
}

Board.prototype.hasThreeInARow = function() {
  if (this.checkColumns() || this.checkRows() || this.checkDiagonals()) {
    return true;
  }
  return false;
}

// Checks if one line has three in a row
Board.prototype.setOfThreeHasThreeInARow = function(setOfThree) {
  var initialChar = setOfThree[0];
  var i;

  if (initialChar === '-') return false;

  for (i = 1; i < setOfThree.length; i++) {
    if (setOfThree[i] != initialChar) {
      return false;
    }
  };

  return true;
}

// If the board has a line with three in a row anywhere, this returns which character makes up that line (X or O)
Board.prototype.threeInARowCharacter = function() {
  var cols = this.getColumns();
  var rows = this.getRows();
  var diags = this.getDiagonals();
  var possibilities = cols.concat(rows).concat(diags);
  var setOfThree;
  var i;

  for (i = 0; i < possibilities.length; i++) {
    setOfThree = possibilities[i]
    if (this.setOfThreeHasThreeInARow(setOfThree)) {
      return setOfThree[0]
    }
  };
}

// Checks columns for a line with three in a row
Board.prototype.checkColumns = function() {
  var cols = this.getColumns();

  if ( this.setOfThreeHasThreeInARow(cols[0]) || this.setOfThreeHasThreeInARow(cols[1]) || this.setOfThreeHasThreeInARow(cols[2]) ) {
    return true;
  }
  return false;
}

Board.prototype.checkRows = function() {
  var rows = this.getRows();

  if ( this.setOfThreeHasThreeInARow(rows[0]) || this.setOfThreeHasThreeInARow(rows[1]) || this.setOfThreeHasThreeInARow(rows[2]) ) {
    return true;
  }
  return false;
}

Board.prototype.checkDiagonals = function() {
  var diags = this.getDiagonals();

  if ( this.setOfThreeHasThreeInARow(diags[0]) || this.setOfThreeHasThreeInARow(diags[1]) ) {
    return true;
  }
  return false;  
}

Board.prototype.getRows = function() {
  var rowOne = this.layout.slice(0, 3);
  var rowTwo = this.layout.slice(3, 6);
  var rowThree = this.layout.slice(6, 9);

  return [rowOne, rowTwo, rowThree];
}

Board.prototype.getColumns = function() {
  var colOne = [this.layout[0], this.layout[3], this.layout[6]];
  var colTwo = [this.layout[1], this.layout[4], this.layout[7]];
  var colThree = [this.layout[2], this.layout[5], this.layout[8]];

  return [colOne, colTwo, colThree];
}

Board.prototype.getDiagonals = function() {
  var diagOne = [this.layout[0], this.layout[4], this.layout[8]];
  var diagTwo = [this.layout[2], this.layout[4], this.layout[6]];

  return [diagOne, diagTwo];
}