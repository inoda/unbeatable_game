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

  if (this.game.isFinished()) {
    this.reportGameResults();
    return;
  }

  this.game.chooseBestMove();
  this.game.display();

  if (this.game.isFinished()) {
    this.reportGameResults();
    return;
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