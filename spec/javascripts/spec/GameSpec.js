describe("Game", function() {
  var game = new Game();

  describe("#initialization", function() {
    it("creates a Board and BoardView object", function() {
      expect(game.board instanceof Board).toEqual(true);
      expect(game.boardView instanceof BoardView).toEqual(true);
    });
  });

  describe("#markPlayerMove", function() {
    it("marks an X on the board at a particular index", function() {
      game.markPlayerMove(3);
      expect(game.board.layout).toEqual(['-', '-', '-', 
                                          'X', '-', '-', 
                                          '-', '-', '-']);   
    });

    it("will not mark an X on the board if it is already taken", function() {
      game.board.layout = ['-', '-', '-', 
                          'O', '-', '-', 
                          '-', '-', '-'];
      game.markPlayerMove(3);
      expect(game.board.layout).toEqual(['-', '-', '-', 
                                        'O', '-', '-', 
                                        '-', '-', '-']);
    });   

    it("will not mark an X on the board if it is not X's turn", function() {
      game.board.layout = ['-', '-', '-', 
                          'X', '-', '-', 
                          '-', '-', '-'];      
      game.markPlayerMove(5);
      expect(game.board.layout).toEqual(['-', '-', '-', 
                                          'X', '-', '-', 
                                          '-', '-', '-']); 
    });   
  }); 

  describe("#markComputerMove", function() {
    it("marks an O on the board at a particular index", function() {
      game.board.layout = ['X', '-', '-', 
                          '-', '-', '-', 
                          '-', '-', '-'];      
      game.markComputerMove(3);
      expect(game.board.layout).toEqual(['X', '-', '-', 
                                        'O', '-', '-', 
                                        '-', '-', '-']);
    });

    it("will not mark an O on the board if it is already taken", function() {
      game.board.layout = ['-', '-', '-', 
                          'X', '-', '-', 
                          '-', '-', '-'];      
      game.markComputerMove(3);
      expect(game.board.layout).toEqual(['-', '-', '-', 
                                          'X', '-', '-', 
                                          '-', '-', '-']);      
    });

    it("will not mark an O on the board if it is not O's turn", function() {
      game.board.layout = ['-', '-', '-', 
                          '-', '-', '-', 
                          '-', '-', '-'];      
      game.markComputerMove(3);
      expect(game.board.layout).toEqual(['-', '-', '-', 
                                          '-', '-', '-', 
                                          '-', '-', '-']); 
    });
  });

  describe("#isPlayersTurn", function() {
    it("returns true if it's X's turn", function() {
      game.board.layout = ['-', '-', '-', 
                          '-', '-', '-', 
                          '-', 'X', 'O'];
      expect(game.isPlayersTurn()).toEqual(true);
    });

    it("returns false if it's O's turn", function() {
      game.board.layout = ['-', '-', '-', 
                          '-', '-', '-', 
                          'X', 'X', 'O'];
      expect(game.isPlayersTurn()).toEqual(false);      
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

  describe("#chooseBestMove", function() {
    it("chooses a winning move for the computer when available", function() {
      game.board.layout = ['-', '-', '-', 
                          '-', 'O', 'X', 
                          'X', 'O', 'X'];
      game.chooseBestMove();
      expect(game.results()).toEqual('O');
    });

    it("blocks the player from winning if necessary", function() {
      game.board.layout = ['-', '-', '-', 
                          '-', '-', 'X', 
                          'X', 'O', 'X']; 
      game.chooseBestMove();
      expect(game.board.layout).toEqual(['-', '-', 'O', 
                                        '-', '-', 'X', 
                                        'X', 'O', 'X']);    
    });

    it("takes the center if it's not taken", function() {
      game.board.layout = ['-', '-', '-', 
                          '-', '-', '-', 
                          '-', '-', 'X']; 
      game.chooseBestMove();
      expect(game.board.layout).toEqual(['-', '-', '-', 
                                        '-', 'O', '-', 
                                        '-', '-', 'X']);        
    });

    it("makes the best move when player picks opposite corners", function() {
      game.board.layout = ['X', '-', '-', 
                          '-', 'O', '-', 
                          '-', '-', 'X']; 
      game.chooseBestMove();
      expect(game.board.layout).toEqual(['X', 'O', '-', 
                                        '-', 'O', '-', 
                                        '-', '-', 'X']);       
    });
  });
});

