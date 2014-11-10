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

  describe("evaluateLine", function() {
    var possibleLineOutcomes1 = new Game();
    // This is an impossible outcome, but represents many possible line combos and is used for the sake of keeping the test less cluttered.
    possibleLineOutcomes1.board.layout = ['X', 'O', 'O', 
                                        'X', 'O', 'O', 
                                        'X', 'O', 'X'];     

    it("returns 100 when the computer (O) has 3 in a row", function() {
      expect(evaluateLine(possibleLineOutcomes1.board.layout, 1, 4, 7)).toEqual(100);
    });

    it("returns -100 when the player (X) has 3 in a row", function() {
      expect(evaluateLine(possibleLineOutcomes1.board.layout, 0, 3, 6)).toEqual(-100);
    });

    it("returns 0 when a set of three has 2 O's and 1 X", function() {
      expect(evaluateLine(possibleLineOutcomes1.board.layout, 2, 5, 8)).toEqual(0);
    });    

    it("returns 0 when a set of three has 2 X's and 1 O", function() {
      expect(evaluateLine(possibleLineOutcomes1.board.layout, 0, 4, 8)).toEqual(0);
    });  


    var possibleLineOutcomes2 = new Game();
    possibleLineOutcomes2.board.layout = ['X', 'X', 'O', 
                                          '-', '-', 'O', 
                                          'O', '-', 'X'];   

    it("returns 0 when there's 1 X, 1 O, and 1 empty space", function() {
      expect(evaluateLine(possibleLineOutcomes2.board.layout, 0, 3, 6)).toEqual(0);
    });

    it("returns -10 when there's 2 X's and 1 empty space", function() {
      expect(evaluateLine(possibleLineOutcomes2.board.layout, 0, 4, 8)).toEqual(-10);
    });     

    it("returns 10 when there's 2 O's and 1 empty space", function() {
      expect(evaluateLine(possibleLineOutcomes2.board.layout, 2, 4, 6)).toEqual(10);
    });

    it("returns 0 when there's all empty spaces", function() {
      expect(evaluateLine(['-', '-', '-'], 0, 1, 2)).toEqual(0);
    });                               
  });
});

