describe("GameCtrl", function() {
  var gameCtrl = new GameCtrl(new Game());

  describe("#startGame", function() {
    it("tells the game to render the view, and binds jQuery event listeners", function() {
      spyOn(gameCtrl.game, 'display');
      spyOn(window, 'toggleShowOnHover');
      spyOn(window, 'bindUserClickToGameCtrl');
      
      gameCtrl.startGame();
      expect(gameCtrl.game.display).toHaveBeenCalled();
      expect(toggleShowOnHover).toHaveBeenCalled();
      expect(bindUserClickToGameCtrl).toHaveBeenCalled();
    });
  });

  describe("#run", function() {
    it("marks the player's move, makes a move, checks if the game is finished, and re-renders the view", function() {
      spyOn(gameCtrl.game, 'isFinished');
      spyOn(gameCtrl.game, 'markPlayerMove');
      spyOn(gameCtrl.game, 'chooseBestMove');
      spyOn(gameCtrl.game, 'display');
    
      gameCtrl.run();
      expect(gameCtrl.game.isFinished).toHaveBeenCalled();
      expect(gameCtrl.game.markPlayerMove).toHaveBeenCalled();
      expect(gameCtrl.game.chooseBestMove).toHaveBeenCalled();
      expect(gameCtrl.game.display).toHaveBeenCalled();
    });
  });  
});