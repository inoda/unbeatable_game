describe("Game", function() {
  var game = new Game();

  describe("#initialization", function() {
    it("creates a Board and BoardView object", function() {
      expect(game.board instanceof Board).toEqual(true);
      expect(game.boardView instanceof BoardView).toEqual(true);
    });
  });

  describe("#display", function() {
    it("renders the game view", function() {
      spyOn(game.boardView, 'render');
      game.display();
      expect(game.boardView.render).toHaveBeenCalled();
    });
  });

  describe("#markPlayerMove", function() {
    it("marks an X on the board at a particular index", function() {
      game.markPlayerMove(3);
      expect(game.board.layout).toEqual(['-', '-', '-', 
                                          'X', '-', '-', 
                                          '-', '-', '-']);
    });
  }); 

  describe("#isFinished", function() {
    it("returns true if there is a winner or the board is full", function() {
      game.board.layout = ['', '-', 'O', 
                          'X', 'X', 'X', 
                          '-', '-', 'O']
      expect(game.isFinished()).toEqual(true);

      game.board.layout = ['O', 'X', 'O', 
                          'X', 'O', 'X', 
                          'X', 'X', 'O'];
      expect(game.isFinished()).toEqual(true);
    });

    it("returns false if there is no winner and the board is not full", function() {
      game.board.layout = ['-', '-', 'X', 
                          'X', '-', '-', 
                          '-', '-', 'O'];
      expect(game.isFinished()).toEqual(false);
    });    
  });    

  describe("#results", function() {
    it("returns 'draw' if board is full but nobody won", function() {
      game.board.layout = ['X', 'O', 'X', 
                          'X', 'X', 'O', 
                          'O', 'X', 'O'];
      expect(game.results()).toEqual('draw');
    });

    it("returns 'X' if X won", function() {
      game.board.layout = ['X', 'X', 'X', 
                          'X', 'O', 'O', 
                          'O', 'O', 'X'];
      expect(game.results()).toEqual('X');
    });

    it("returns 'O' if O won", function() {
      game.board.layout = ['X', 'O', 'X', 
                          'X', 'O', 'O', 
                          'O', 'O', 'X'];
      expect(game.results()).toEqual('O');
    });       
  });
});