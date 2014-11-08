function GameCtrl(game) {
  this.game = game;
}

GameCtrl.prototype.startGame = function() {
  this.game.display();
  toggleShowOnHover();
  bindUserClickToGameCtrl();
};

GameCtrl.prototype.run = function($square) {
  var index = indexOfClickedSquare($square);
  this.game.markPlayerMove(index);
  this.game.chooseBestOption();
  this.game.boardView.render();

  if (this.game.isFinished()) {
    this.reportGameResults();
  }
};

GameCtrl.prototype.reportGameResults = function() {
  var results = this.game.results();
  alert(results);
}



function indexOfClickedSquare($square) {
  return $('.square').index($square);
}

function toggleShowOnHover() {
  $('body').on('mouseover', '.show-on-hover', function() {
    $(this).children().removeClass('hidden');
  });

  $('body').on('mouseout', '.show-on-hover', function() {
    $(this).children().addClass('hidden');
  });
}

function bindUserClickToGameCtrl() {
  $('body').on('click', '.show-on-hover', function() {
    $(this).removeClass('show-on-hover');
    gameCtrl.run($(this));
  });
}