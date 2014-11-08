$(document).ready(function() {
  var $game = $('div[data-game]');

  if ($game != undefined) {
    toggleShowOnHover()
    var game = new Game();
    game.start();
  }
});

function toggleShowOnHover() {
  $('body').on('mouseover', '.show-on-hover', function() {
    $(this).children().css('visibility', 'visible');
  });

  $('body').on('mouseout', '.show-on-hover', function() {
    $(this).children().css('visibility', 'hidden');
  });
}
