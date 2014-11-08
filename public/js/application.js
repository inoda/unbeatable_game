$(document).ready(function() {
  var $game = $('div[data-game]');

  if ($game != undefined) {
    toggleShowOnHover();
    bindClickToChooseSquare();
    var game = new Game();
    game.start();
  }
});

function toggleShowOnHover() {
  $('body').on('mouseover', '.show-on-hover', function() {
    $(this).children().removeClass('hidden');
  });

  $('body').on('mouseout', '.show-on-hover', function() {
    $(this).children().addClass('hidden');
  });
}

function bindClickToChooseSquare() {
  $('body').on('click', '.show-on-hover', function() {
    $(this).removeClass('show-on-hover');
  });
}
