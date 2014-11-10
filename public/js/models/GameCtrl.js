function GameCtrl(game) {
  this.game = game;
}

GameCtrl.prototype.startGame = function() {
  this.game.display();
  bindUserEventsToGameCtrl();
};

GameCtrl.prototype.run = function($square) {
  var index = indexOfClickedSquare($square);
  this.game.markPlayerMove(index);

  if (this.game.isFinished()) {
    this.closeGameAndReportResults();
    return;
  }

  this.game.chooseBestMove();
  this.game.display();

  if (this.game.isFinished()) {
    this.closeGameAndReportResults();
    return;
  }
};

GameCtrl.prototype.closeGameAndReportResults = function() {
  unbindUserEventsFromGameCtrl()
  this.reportGameResults();
  return;
}

GameCtrl.prototype.reportGameResults = function() {
  var results = this.game.results();
  var ajax = $.ajax({
    url: '/game',
    method: 'POST',
    data: { 'results': results }
  });
  ajax.success(function() {
    return;
  });
  ajax.fail(function() {
    console.warn("There was an issue saving your game results.");
  });
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

function clickToSelectSquare() {
  $('body').on('click', '.show-on-hover', function() {
    $(this).removeClass('show-on-hover');
    gameCtrl.run($(this));
  });
}

function bindUserEventsToGameCtrl() {
  toggleShowOnHover()
  clickToSelectSquare();
}

function unbindUserEventsFromGameCtrl() {
  $('body').unbind('click');
  $('body').unbind('mouseover');
  $('body').unbind('mouseout');
}