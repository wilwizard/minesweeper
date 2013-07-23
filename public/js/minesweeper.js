function MinesweeperGame(size){
  this.node = $('<div>').addClass('minesweeper-game');
  this.node.data('minesweeper_game', this);
  this.node.text('new minesweeper game '+this.size);
  this.board = new MinesweeperGame.Board(size);
}

MinesweeperGame.prototype.render = function(){
  var rows = $('<div>');
  this.board.rows.forEach(function(row){
    var row_node = $('<div>').addClass('row');
    row.forEach(function(cell){
      var cell_node = $('<div>').addClass('cell');
      cell_node.text( cell.value() );
      cell_node.data('x', cell.x).data('y', cell.y);
      row_node.append(cell_node);
    });
    rows.append(row_node);
  });
  this.node.html(rows.children());
  return this;
}

MinesweeperGame.prototype.reveal = function(x,y){
  var cell = this.board.rows[x][y];
  cell.reveal();
  this.render();
  return this;
};

MinesweeperGame.Board = function(size) {
  this.size = size;
  this.cells = [];
  this.rows = [];

  var x, y, row, cell;

  for (x = 0; x < size; x++) {
    row = [];
    for (y = 0; y < size; y++) {
      cell = new MinesweeperGame.Cell(this, x, y);
      row.push(cell);
      this.cells.push(cell);
    }
    this.rows.push(row);
  }
};


MinesweeperGame.Cell = function(board, x, y) {
  this.board = board;
  this.x = x;
  this.y = y;
};

MinesweeperGame.Cell.prototype.nabors = function(){
  var nabors = [];

};

MinesweeperGame.Cell.prototype.value = function(){
  if (!this.revealed) return "";



  return "B";
};



MinesweeperGame.Cell.prototype.reveal = function(){
  this.revealed = true;
  return this;
};



$(document).on('submit', '.new-minesweeper-game', function(event) {
  event.preventDefault();
  var size = $(this).find('input[name=size]').val();
  var game = new MinesweeperGame(size);
  game.render();
  $('.minesweeper-games').append(game.node);
});

$(document).on('click', '.minesweeper-game .cell', function(event) {
  var game = $(this).closest('.minesweeper-game').data('minesweeper_game');
  var x = $(this).data('x');
  var y = $(this).data('y');
  game.reveal(x,y)
});





















// $(document).ready(function(){

// 	//function will return a bomb some of the time, and sometimes not
// 	function randBomb(){
//     return Math.random() < 0.3;
// 	}

// 	//will create an nxn array
// 	function randBoard(size){
// 		var grid = [];
// 		for (var i = 0; i < size; i++) {
// 			var row = []
// 			for (var k = 0; k < size; k++) {
// 				row.push(new cell());
// 			}
// 			grid.push(row);
// 		}
// 		return placeNumbers(grid);
// 	}

// 	function placeNumbers(grid) {
// 		var limit = grid.length;
// 		for (var i=0; i < grid.length; i++) {
// 			for (var j=0; j < grid[i].length; j++) {
// 				//i,j
// 				var count = 0
// 				for (var x = Math.max(i-1,0); x <= Math.min(i+1, limit-1); x++) {
// 					for (var y = Math.max(j-1,0); y <= Math.min(j+1, limit-1); y++) {
// 						if (grid[x][y].bomb) { count++; }
// 					}
// 				}
// 				grid[i][j].number = count;
// 			}
// 		}
// 		return grid
// 	}

// 	function cell() {
// 		this.bomb = randBomb();
// 		this.clicked = false;
// 	}

// 	function Game(size) {
//     this.node = $('<div>');
// 		this.over = false;
// 		this.size = size;
// 		this.board = randBoard(size);
// 	}

//   Game.prototype.click = function(x,y){
// 		var cell = this.board[x][y];
// 		cell.clicked = true;
// 		if (cell.bomb) {
// 			console.log("BOOM!");
// 			this.over = true;
// 			return "B";
// 		}else{
// 			return cell.number;
// 		}
// 	};

// 	Game.prototype.printBoard = function(){
// 		for(var i = 0; i < this.size; i++){
// 			var row = [];
// 			for(var j = 0; j < this.size; j++) {
// 				if (this.board[i][j].bomb) {
// 					row.push("B");
// 				}
// 				else {
// 					row.push("X");
// 				}
// 			}
// 			console.log(row);
// 		}
// 	};



//   Game.prototype.render = function() {
//     size = this.size;
//     this.node.html(""); //clear the board

//     for (var i = 0; i < size; i++) {
//       $row = $('<div class="row"></div>');
//       for ( var j = 0; j < size; j++) {
//         if(this.board[i][j].clicked) {
//           $row.append('<div class="cell clicked" row="'+i+'" col="'+j+'"></div>');
//         } else {
//           $row.append('<div class="cell" row="'+i+'" col="'+j+'"></div>');
//         }
//       }
//       this.node.append($row);
//     }
//   };

//   $(document).on('submit', '.minesweeper form', function(e){
//     e.preventDefault();
//     var form = $(this);
//     var node = form.closest('.minesweeper');
//     var size = form.find('input[name=size]').val();
//     var game = new Game(size);
//     node.data('game', game);
//     node.append(game.node);
// 		game.render();
// 	});

//   $(document).on('click', '.minesweeper .cell', function(e){
//     var cell = $(this);
//     var node = cell.closest('.minesweeper');
//     var game = node.data('game');

// 		var row = $(this).attr("row");
// 		var col = $(this).attr("col");
// 		console.log($(this));
// 		$(this).css('background-color', '#555');
// 		var val = game.click(row, col);
// 		$(this).html(val);
// 		if (val === "B") {
// 			$(".board").off();
// 		}
// 	});

// });

