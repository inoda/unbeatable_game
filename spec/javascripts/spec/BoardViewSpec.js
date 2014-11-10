describe("BoardView", function() {
  var boardView = new BoardView(new Board());

  describe("#renderSquare", function() {
    it("returns HTML for a square with .show-on-hover and a .hidden char when there's nothing in it", function() {
      var emptySquareHTML = '<span class="square show-on-hover"><span class="char hidden">X</span></span>';
      expect(boardView.renderSquare('-')).toEqual(emptySquareHTML);
    });

    it("returns HTML for a square without .show-on-hover or .hidden and a class x if there's an X in it", function() {
      var xSquareHTML = '<span class="square"><span class="char x">X</span></span>';
      expect(boardView.renderSquare('X')).toEqual(xSquareHTML);
    });    

    it("returns HTML for a square without .show-on-hover or .hidden and a class o if there's an O in it", function() {
      var oSquareHTML = '<span class="square"><span class="char o">O</span></span>';
      expect(boardView.renderSquare('O')).toEqual(oSquareHTML);
    });     
  });
});