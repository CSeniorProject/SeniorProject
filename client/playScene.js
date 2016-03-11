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

Game.labels = {
	gameOver : "Game Over!s",
    congrats : "Congrats!",

};


Game.isDebug = true;
Game.writeLog = function(message) { 
	if(Game.isDebug)
		console.log(message);
}

Game.create2DArray = function Create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}

Game.images = [];
//0 : bos
//1: block
//2: diamond
Game.gameMatrix = [];
Game.reset = function() {	
	Game.gameMatrix = Game.create2DArray(10);
	for(var i=0; i<Game.XMAX/Game.UNIT; i++) {
		for(var y=0; y<Game.YMAX/Game.UNIT; y++) {
			Game.gameMatrix[i][y] = 0;
		}
	} 
	
	
	// todo  eklediğin elementleri sil 
	// for(var i=; i<document.getElementById("playScene") {}
	// blocklar yeniden ekle ..
	
	
	 
	Game.addBlockContainer(1,5);
	Game.addBlockContainer(4,1);
	
	Game.addDiamondContainer(4,2);
	
}


// i , max = 10,i =  x/Game.UNIT
// k , max = 10,k =  y/Game.UNIT
Game.addBlock = function(i,k) { 
	Game.gameMatrix[i][k] = 1;
}

// i , max = 10,i =  x/Game.UNIT
// k , max = 10,k =  y/Game.UNIT
Game.addDiamond = function(i,k) { 
	Game.gameMatrix[i][k] = 2;
}

// i , max = 10,i =  x/Game.UNIT
// k , max = 10,k =  y/Game.UNIT
Game.addBlockContainer = function(i,k) {
	// todo: block resmini ekle ... 
	
	var top = k * Game.UNIT ;
	var left = i * Game.UNIT ;
	var img = Game.createImage("img/block.png", "block", "Duvar"); 
	
	img.style = "position:absolute; top:"+top+"px; left:"+left+"px; width:"+Game.UNIT+"px; height:"+Game.UNIT+"px;";	
	img.className  = "block-temp-images";
	
	Game.images.push(img); 
	Game.addBlock(i,k);
}

// i , max = 10,i =  x/Game.UNIT
// k , max = 10,k =  y/Game.UNIT
Game.addDiamondContainer = function(i,k) {
	// todo: block resmini ekle ... 
	
	var top = k * Game.UNIT ;
	var left = i * Game.UNIT ;
	var img = Game.createImage("img/diamond.png", "block", "Duvar"); 
	
	img.style = "position:absolute; top:"+top+"px; left:"+left+"px; width:"+Game.UNIT+"px; height:"+Game.UNIT+"px;";	
	img.className  = "block-temp-images";
	
	Game.images.push(img); 
	Game.addDiamond(i,k);
}




Game.createImage = function(src, alt, title) { 
    var img = document.createElement('img');
    img.src= src;
    if (alt!=null) img.alt= alt;
    if (title!=null) img.title= title;
    return img;
}

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
  Game.reset();
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

  Game.writeLog("x:y => " +x + ":" + y);
  if(Game.gameMatrix[x/Game.UNIT][y/Game.UNIT] ==  1) {
	  Game.writeLog("yetkisiz yer"); 
		Game.writeLog("Blok Pozisyonu => x:y => " +x/Game.UNIT + ":" + y/Game.UNIT);
	  Game.playState.set('finished');
	  
  Game.state.x = x;
  Game.state.y = y;
    Game.dep.changed();
	  alert(Game.labels.gameOver);
	  Game.resetState();
	  return;
  }else if(Game.gameMatrix[x/Game.UNIT][y/Game.UNIT] ==  2) {
	  Game.writeLog("yetkisiz yer"); 
	  Game.writeLog("Blok Pozisyonu => x:y => " +x/Game.UNIT + ":" + y/Game.UNIT);
	  Game.playState.set('finished');
	  
	  Game.state.x = x;
	  Game.state.y = y;
    Game.dep.changed();
	  alert(Game.labels.congrats);

	  Game.resetState();
	  return;
  }   else {
	 Game.writeLog("oyun devam ediyor");
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
  ].join  (' ');
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
