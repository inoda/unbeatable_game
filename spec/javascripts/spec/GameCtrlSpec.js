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
});