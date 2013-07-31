//Game

function MinesweeperGame(size){
	this.node = $('<div>').addClass('minesweeper-game');
	this.node.data('minesweeper_game', this);
	this.node.text('new minesweeper game '+this.size);
	this.board = new MinesweeperGame.Board(size);
}

//Game Functions

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
    if (this.over) {this.node.append('<h2>GAME OVER!</h2>')}
	return this;
}

MinesweeperGame.prototype.revealCell = function(x,y){
    if (this.over) {
    } else {
        var cell = this.board.rows[x][y];
        cell.reveal();
        if (cell.bomb) { this.over = true; }
        this.render();
    }
	return this;
};

MinesweeperGame.prototype.flag = function(x,y){
    var cell = this.board.rows[x][y];
    cell.placeFlag();
    this.render();
}

//Board

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

//Cell

MinesweeperGame.Cell = function(board, x, y) {
	this.board = board;
	this.x = x;
	this.y = y;
    this.bomb = MinesweeperGame.randBomb();
};

//Cell Functions

MinesweeperGame.Cell.prototype.nabors = function(){
    if (this._nabors) {
    } else { 
        var count = 0;
        this.returnNabors().forEach(function(cell){
            if (cell.bomb) {count++;}
        });
        this._nabors = count; 
	}
    return this._nabors;
};

MinesweeperGame.Cell.prototype.findNabors = function(){
    var x = this.x;
    var y = this.y;
    var board = this.board;
    var size = this.board.size;
    var count = 0;
    var i, j;

    for (i = Math.max(x-1, 0); i <= Math.min(x+1, size-1); i++){
        for (j = Math.max(y-1, 0); j <= Math.min(y+1, size-1); j++){
            if (board.rows[i][j].bomb) { count++; }
        }
    }

    return count;
}

MinesweeperGame.Cell.prototype.returnNabors = function(){
    var x = this.x;
    var y = this.y;
    var board = this.board;
    var size = this.board.size;
    var count = 0;
    var nabors = [];
    var i, j;

    for (i = Math.max(x-1, 0); i <= Math.min(x+1, size-1); i++){
        for (j = Math.max(y-1, 0); j <= Math.min(y+1, size-1); j++){
            if (i !== x || j !== y) { nabors.push(board.rows[i][j]); }
        }
    }
    return nabors;
}

MinesweeperGame.Cell.prototype.value = function(){
    if (this.revealed){
        if (this.bomb) {
            return "B";
        } else {
            return this.nabors();
        }

    } else {
        if (this.flag){
            return "F";
        } else {
            return "";
        }
    }
};


MinesweeperGame.Cell.prototype.reveal = function(){
	if (this.revealed){
        return this;
    } else {
        this.revealed = true;
        if (this.nabors() === 0){
            this.returnNabors().forEach(function(cell){
                cell.reveal();
            });
        }
	   return this;
    }
};

MinesweeperGame.Cell.prototype.placeFlag = function(){
    this.flag = !this.flag;
    return this;
}

//Helper Functions

MinesweeperGame.randBomb = function(){
    // return true;
    return Math.random() < 0.3;
}

//Player Actions

$(document).on('submit', '.new-minesweeper-game', function(event) {
	event.preventDefault();
	var size = $(this).find('input[name=size]').val();
	var game = new MinesweeperGame(size);
	game.render();
	$('.minesweeper-games').append(game.node);
});

$(document).on('click', '.minesweeper-game .cell', function(event) {
    event.preventDefault();
    console.log(event);
	var game = $(this).closest('.minesweeper-game').data('minesweeper_game');
	var x = $(this).data('x');
	var y = $(this).data('y');
	game.revealCell(x,y);
});


$(document).on('contextmenu', '.minesweeper-game .cell', function(event){
    event.preventDefault();
    var game = $(this).closest('.minesweeper-game').data('minesweeper_game');
    var x = $(this).data('x');
    var y = $(this).data('y');
    game.flag(x,y);
});


