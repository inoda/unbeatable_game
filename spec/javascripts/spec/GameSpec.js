describe("Game", function() {
  var game = new Game();

  describe("#initialization", function() {
    it("creates a Board and BoardView object", function() {
      expect(game.board instanceof Board).toEqual(true);
      expect(game.boardView instanceof BoardView).toEqual(true);
    });
  });

  describe("#start", function() {
    it("renders the game view", function() {
      spyOn(game.boardView, 'render');
      game.start();
      expect(game.boardView.render).toHaveBeenCalled();
    });
  });
});