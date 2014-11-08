describe("Board", function() {
  describe("initialization", function() {
    board = new Board();

    it("begins with a blank board layout", function() {
      expect(board.layout).toEqual(['-', '-', '-', 
                                    '-', '-', '-', 
                                    '-', '-', '-'])
    });
  });

  describe("#isFull", function() {
    it("returns false if any spots on board are unfilled", function() {
      board.layout = ['-', 'O', 'X', 
                      'X', 'O', 'X', 
                      'X', 'O', 'X'];      
      expect(board.isFull()).toEqual(false);
    });

    it("returns true if all spots on board are filled", function() {
      board.layout = ['X', 'O', 'X', 
                      'X', 'O', 'X', 
                      'X', 'O', 'X'];
      expect(board.isFull()).toEqual(true);
    });    
  });

  describe("#setOfThreeHasThreeInARow", function() {
    it("returns true if an array has all of the same element that are not '-'", function() {
      expect(board.setOfThreeHasThreeInARow(['X', 'X', 'X'])).toEqual(true);
    });

    it("returns false if an array has all '-'", function() {
      expect(board.setOfThreeHasThreeInARow(['-', '-', '-'])).toEqual(false);
    });    

    it("returns false if an array has different elements", function() {
      expect(board.setOfThreeHasThreeInARow(['X', 'O', 'O'])).toEqual(false);
      expect(board.setOfThreeHasThreeInARow(['X', '-', 'O'])).toEqual(false);
      expect(board.setOfThreeHasThreeInARow(['X', '-', '-'])).toEqual(false);
    });       
  });

  describe("#hasThreeInARow", function() {
    it("returns false if the board is empty", function() {
      board.layout = ['-', '-', '-', 
                      '-', '-', '-', 
                      '-', '-', '-'];      
      expect(board.hasThreeInARow()).toEqual(false);
    });
      
    it("returns false if there are no 3 X's or 3 O's in a row", function() {
      board.layout = ['X', 'O', 'O', 
                      'O', 'X', 'X', 
                      'X', 'X', 'O']; 
      expect(board.hasThreeInARow()).toEqual(false);
    });

    it("returns true if there are 3 O's in one row", function() {
      board.layout = ['O', 'O', 'O', 
                      'X', 'X', 'O', 
                      'X', 'O', 'X'];      
      expect(board.hasThreeInARow()).toEqual(true);
    });  

    it("returns true if there are 3 X's in one column", function() {
      board.layout = ['O', 'X', 'X', 
                      'X', 'X', 'O', 
                      'O', 'X', 'O'];
      expect(board.hasThreeInARow()).toEqual(true);
    });

    it("returns true if there are 3 X's in one diagonal", function() {
      board.layout = ['X', 'O', 'X', 
                      'O', 'X', 'O', 
                      'X', 'X', 'O'];      
      expect(board.hasThreeInARow()).toEqual(true);
    });        
  });  

  describe("#threeInARowCharacter", function() { 
    it("returns the character that makes up the row of 3", function() {
      board.layout = ['X', 'O', 'O', 
                      'O', 'X', 'O', 
                      'X', 'O', 'X'];  
      expect(board.threeInARowCharacter()).toEqual('X');                         
    });
  });
});