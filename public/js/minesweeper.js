$(document).ready(function(){

	//function will return a bomb some of the time, and sometimes not
	function randBomb(){ 
		if (Math.random() > 0.3) { return false; }
		else { return true; }
	}

	//will create an nxn array
	function randBoard(size){
		var array = [];
		for (var i = 0; i < size; i++) {
			var row = []
			for (var k = 0; k < size; k++) {
				row.push(new cell());
			}
			array.push(row);
		}
		return placeNumbers(array);
	}

	function placeNumbers(grid) {
		var limit = grid.length;
		for (var i=0; i < grid.length; i++) {
			for (var j=0; j < grid[i].length; j++) {
				//i,j
				var count = 0
				for (var x = Math.max(i-1,0); x <= Math.min(i+1, limit-1); x++) {
					for (var y = Math.max(j-1,0); y <= Math.min(j+1, limit-1); y++) {
						if (grid[x][y].bomb) { count++; }
					}
				}
				grid[i][j].number = count;
			}
		}
		return grid
	}


	function grabSize(){
		return $("#size").val();
	}


	function displayBoard() {
		size = this.size;
		var $board = $(".board");
		$board.html(""); //clear the board

		for (var i = 0; i < size; i++) {
			$row = $('<div class="row"></div>');
			for ( var j = 0; j < size; j++) {
				if(this.board[i][j].clicked) {
					$row.append('<div class="cell clicked" row="'+i+'" col="'+j+'"></div>');
				} else {
					$row.append('<div class="cell" row="'+i+'" col="'+j+'"></div>'); 			
				}
			}
;			$board.append($row);
		}
	}

	function cell() {
		this.bomb = randBomb();
		this.clicked = false;
	}

	function game(size) {
		this.over = false;
		this.size = size;
		this.board = randBoard(size);
		this.click = click;
		this.printBoard = printBoard;
		this.displayBoard = displayBoard;
	}

	function click(x,y){
		var cell = this.board[x][y];
		cell.clicked = true;
		if (cell.bomb) {
			console.log("BOOM!");
			this.over = true;
			return "B";
		}else{
			return cell.number;
		}
	}

	function printBoard(){
		for(var i = 0; i < this.size; i++){
			var row = [];
			for(var j = 0; j < this.size; j++) {
				if (this.board[i][j].bomb) {
					row.push("B");
				}
				else {
					row.push("X");
				}
			}
			console.log(row);
		}
	}


	$("#play").on("submit", function(e){
		e.preventDefault();
		var size = grabSize();
		newGame = new game(size);
		newGame.displayBoard();
	});

	$(".board").on("click", ".cell", function(){
		var row = $(this).attr("row");
		var col = $(this).attr("col");
		console.log($(this));
		$(this).css('background-color', '#555');
		var val = newGame.click(row, col);
		$(this).html(val);
		if (val === "B") {
			$(".board").off();
		}
	});
	});

