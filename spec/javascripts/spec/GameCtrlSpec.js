describe("GameCtrl", function() {
  var gameCtrl = new GameCtrl(new Game());

  describe("#startGame", function() {
    it("tells the game to render the view, and binds jQuery event listeners", function() {
      spyOn(gameCtrl.boardView, 'render');
      spyOn(window, 'toggleShowOnHover');
      spyOn(window, 'clickToSelectSquare');
      
      gameCtrl.startGame();
      expect(gameCtrl.boardView.render).toHaveBeenCalled();
      expect(toggleShowOnHover).toHaveBeenCalled();
      expect(clickToSelectSquare).toHaveBeenCalled();
    });
  });

  describe("#run", function() {
    it("marks the player's move, makes a move, checks if the game is finished, and re-renders the view", function() {
      spyOn(gameCtrl.game, 'isFinished');
      spyOn(gameCtrl.game, 'markPlayerMove');
      spyOn(gameCtrl.game, 'chooseBestMove');
      spyOn(gameCtrl.boardView, 'render');
    
      gameCtrl.run();
      expect(gameCtrl.game.isFinished).toHaveBeenCalled();
      expect(gameCtrl.game.markPlayerMove).toHaveBeenCalled();
      expect(gameCtrl.game.chooseBestMove).toHaveBeenCalled();
      expect(gameCtrl.boardView.render).toHaveBeenCalled();
    });

    it("closes the game if the game is finished", function() {
      gameCtrl.game.board.layout = ['X', 'O', 'X', 
                                    'X', 'O', 'X', 
                                    'X', 'O', 'X'];

      spyOn(gameCtrl, 'closeGameAndReportResults');                                   

      gameCtrl.run();
      expect(gameCtrl.closeGameAndReportResults).toHaveBeenCalled();
    });
  });

  describe("#closeGameAndReportResults", function() {
    it("unbinds jQuery event listeners", function() {
      spyOn(window, 'unbindUserEventsFromGameCtrl'); 

      gameCtrl.closeGameAndReportResults();
      expect(unbindUserEventsFromGameCtrl).toHaveBeenCalled();
    });

    it("reports game results", function() {
      spyOn(gameCtrl, 'reportGameResults');

      gameCtrl.closeGameAndReportResults();
      expect(gameCtrl.reportGameResults).toHaveBeenCalled();
    });
  });
});