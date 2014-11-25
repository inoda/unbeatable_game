$(document).ready(function() {
  var $gameDiv = $('div[data-game]');

  // If $gameDiv is not undefined, we're on the game page
  if ($gameDiv != undefined) {
    game = new Game();
    GameController = new GameController(game);
    GameController.startGame();
    
    // Hides 'You go first.' after the player makes their first move
    $gameDiv.click(function() {
      $('.directions').css('visibility', 'hidden');
    });    
  }
});