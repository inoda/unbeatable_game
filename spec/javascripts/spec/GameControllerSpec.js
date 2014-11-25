describe("GameController", function() {
  var gameController = new GameController(new Game());

  describe("#startGame", function() {
    it("tells the game to render the view, and binds jQuery event listeners", function() {
      spyOn(gameController.boardView, 'render');
      spyOn(window, 'toggleShowOnHover');
      spyOn(window, 'clickToSelectSquare');
      
      gameController.startGame();
      expect(gameController.boardView.render).toHaveBeenCalled();
      expect(toggleShowOnHover).toHaveBeenCalled();
      expect(clickToSelectSquare).toHaveBeenCalled();
    });
  });

  describe("#run", function() {
    it("marks the player's move, makes a move, checks if the game is finished, and re-renders the view", function() {
      spyOn(gameController.game, 'isFinished');
      spyOn(gameController.game, 'markPlayerMove');
      spyOn(gameController.game, 'chooseBestMove');
      spyOn(gameController.boardView, 'render');
    
      gameController.run();
      expect(gameController.game.isFinished).toHaveBeenCalled();
      expect(gameController.game.markPlayerMove).toHaveBeenCalled();
      expect(gameController.game.chooseBestMove).toHaveBeenCalled();
      expect(gameController.boardView.render).toHaveBeenCalled();
    });

    it("closes the game if the game is finished", function() {
      gameController.game.board.layout = ['X', 'O', 'X', 
                                    'X', 'O', 'X', 
                                    'X', 'O', 'X'];

      spyOn(gameController, 'closeGameAndReportResults');                                   

      gameController.run();
      expect(gameController.closeGameAndReportResults).toHaveBeenCalled();
    });
  });

  describe("#closeGameAndReportResults", function() {
    it("unbinds jQuery event listeners", function() {
      spyOn(window, 'unbindUserEventsFromGameController'); 

      gameController.closeGameAndReportResults();
      expect(unbindUserEventsFromGameController).toHaveBeenCalled();
    });

    it("reports game results", function() {
      spyOn(gameController, 'reportGameResults');

      gameController.closeGameAndReportResults();
      expect(gameController.reportGameResults).toHaveBeenCalled();
    });
  });
});