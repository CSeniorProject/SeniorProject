var translate3d = function (x, y, z) {
  return 'translate3d(' + Game.state.x + 'px,' + Game.state.y + 'px, 0)';
};

var rotateZ = function (deg) {
  return 'rotateZ(' + deg + 'deg)';
};

Game = {
  RIGHT: 0,
  DOWN: 1,
  LEFT: 2,
  UP: 3,
  XMAX: 450,
  YMAX: 450,
  UNIT: 45,
};

Game.dep = new Tracker.Dependency();

Game.playState = new ReactiveVar('ready');
Game.currentMoveId = new ReactiveVar(null);

Game.initialState = {
  x: 0,
  y: 0,
  direction: 0,
  rotation: 0
};

Game.resetState = function () {
  Game.playState.set('ready');
  Game.currentMoveId.set(null);
  Game.state = _.clone(Game.initialState);
  Game.dep.changed();
};

Game.move = function () {
  var direction = Game.state.direction;
  var x = Game.state.x;
  var y = Game.state.y;
  if(direction === Game.UP) {
    y -= Game.UNIT;
  } else if(direction === Game.RIGHT) {
    x += Game.UNIT;
  } else if(direction === Game.DOWN) {
    y += Game.UNIT;
  } else if(direction === Game.LEFT) {
    x -= Game.UNIT;
  }

  if(x < 0) {
    x = 0;
  } else if(x >= Game.XMAX) {
    x = Game.XMAX - Game.UNIT;
  }

  if(y < 0) {
    y = 0;
  } else if(y >= Game.YMAX) {
    y = Game.YMAX - Game.UNIT;
  }

  Game.state.x = x;
  Game.state.y = y;
};

Game.turnLeft = function () {
  Game.state.direction -= 1;
  Game.state.rotation -= 90;
  Game.afterTurn();
};

Game.turnRight = function () {
  Game.state.direction += 1;
  Game.state.rotation += 90;
  Game.afterTurn();
};

Game.afterTurn = function () {
  if(Game.state.direction < 0) {
    Game.state.direction = 3;
  }

  if(Game.state.direction > 3) {
    Game.state.direction = 0;
  }
};

Game.getTransform = function () {
  Game.dep.depend();
  return [
    'transform:',
    translate3d(Game.state.x, Game.state.y, 0),
    rotateZ(Game.state.rotation),
    ';'
  ].join(' ');
};

Game.start = function () {
  if(Game.playState.get() === 'playing') {
    return;
  }
  Game.resetState();
  Game.playState.set('playing');
  var moves = Moves.getOrdered().fetch();
  var currentMoveIndex = 0;
  var playMove = function () {
    if(Game.playState.get() !== 'playing') {
      return;
    }
    var move = moves[currentMoveIndex];
    if(!move) {
      Game.playState.set('finished');
      return;
    }

    Game.currentMoveId.set(move._id);

    if(move.type === 'move') {
      Game.move();
    } else if(move.type === 'turn-left') {
      Game.turnLeft();
    } else if(move.type === 'turn-right') {
      Game.turnRight();
    }

    Game.dep.changed();

    currentMoveIndex++;
    Game.lastTimeout = setTimeout(playMove, 1000);
  };

  Game.lastTimeout = setTimeout(playMove, 1000);
};

Game.stop = function () {
  clearTimeout(Game.lastTimeout);
  Game.playState.set('ready');
  Game.resetState();
};

Template.PlayScene.onCreated(function () {
  Game.resetState();
});

Template.Player.helpers({
  getTransform: function () {
    return Game.getTransform();
  }
});
