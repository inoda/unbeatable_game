function GameCtrl(game) {
  this.game = game;
}

// Displays the game and binds jQuery event listeners
GameCtrl.prototype.startGame = function() {
  this.game.display();
  bindUserEventsToGameCtrl();
};

// Marks the player's move and marks the AI's move. If the game has ended at 
// any point between those two events, the game gets closed 
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

// Unbinds events and sends an AJAX request to the server reporting who won
GameCtrl.prototype.closeGameAndReportResults = function() {
  unbindUserEventsFromGameCtrl()
  this.reportGameResults();
  return;
}

// Sends 'X' if X won, 'O' if O won, and 'draw' if there was a tie (AJAX)
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

// Shows transparent X when player hovers over squares that they could move to
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