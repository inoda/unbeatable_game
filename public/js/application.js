$(document).ready(function() {
  var $gameDiv = $('div[data-game]');

  if ($gameDiv != undefined) {
    game = new Game();
    gameCtrl = new GameCtrl(game);
    gameCtrl.startGame();
    
    $gameDiv.click(function() {
      $('.directions').css('visibility', 'hidden');
    });    
  }
});