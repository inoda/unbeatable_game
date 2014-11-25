function GameController(game) {
  this.game = game;
  this.boardView = new BoardView(game.board);
}

// Displays the game and binds jQuery event listeners
GameController.prototype.startGame = function() {
  this.boardView.render();
  bindUserEventsToGameController();
};

// Marks the player's move and marks the AI's move. If the game has ended at 
// any point between those two events, the game gets closed 
GameController.prototype.run = function($square) {
  var index = indexOfClickedSquare($square);
  this.game.markPlayerMove(index);

  if (this.game.isFinished()) {
    this.closeGameAndReportResults();
    return;
  }

  this.game.chooseBestMove();
  this.boardView.render();

  if (this.game.isFinished()) {
    this.closeGameAndReportResults();
    return;
  }
};

// Unbinds events and sends an AJAX request to the server reporting who won
GameController.prototype.closeGameAndReportResults = function() {
  unbindUserEventsFromGameController()
  this.reportGameResults();
  return;
}

// Sends 'X' if X won, 'O' if O won, and 'draw' if there was a tie (AJAX)
GameController.prototype.reportGameResults = function() {
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
  $('body').on('click', '.square', function() {
    $(this).removeClass('show-on-hover');
    GameController.run($(this));
  });
}

function bindUserEventsToGameController() {
  toggleShowOnHover()
  clickToSelectSquare();
}

function unbindUserEventsFromGameController() {
  $('body').unbind('click');
  $('body').unbind('mouseover');
  $('body').unbind('mouseout');
}