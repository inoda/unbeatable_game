describe("BoardView", function() {
  var boardView = new BoardView(new Board());

  describe("#renderSquare", function() {
    it("returns HTML for a square with .show-on-hover and a .hidden char", function() {
      var emptySquareHTML = '<span class="square show-on-hover"><span class="char hidden">X</span></span>';
      expect(boardView.renderSquare('-')).toEqual(emptySquareHTML);
    });

    it("returns HTML for a square without .show-on-hover or .hidden", function() {
      var xSquareHTML = '<span class="square"><span class="char">X</span></span>';
      expect(boardView.renderSquare('X')).toEqual(xSquareHTML);
    });    
  });
});