describe("BoardView", function() {
  var boardView = new BoardView(new Board());

  describe("#renderSquare", function() {
    it("returns HTML for a square with .show-on-hover", function() {
      var emptySquareHTML = '<span class="square show-on-hover"><span class="char">X</span></span>';
      expect(boardView.renderSquare('-')).toEqual(emptySquareHTML);
    });

    it("returns HTML for a square without .show-on-hover", function() {
      var xSquareHTML = '<span class="square"><span class="char">X</span></span>';
      expect(boardView.renderSquare('X')).toEqual(xSquareHTML);
    });    
  });
});