


$(document).ready(function(){

	function randBomb(){ //function will return a bomb some of the time, and sometimes not
		if (Math.random() > 0.3) { return null; }
		else { return 'B'; }
	}

	function randBoard(size){
		var array = [];
		for (var i = 0; i < size; i++) {
			var row = []
			for (var k = 0; k < size; k++) {
				row.push(randBomb());
			}
			array.push(row);
		}
		return array;
	}


	function grabSize(){
		return $("#size").val();
	}

	function board(size) {
		this.size = size;
		this.board = randBoard(size);
	}

	function displayBoard(size) {
		var $row = $(".row");
		var $cell = $(".cell");
		var $board = $(".board");

		for (var i = 0; i < size; i++) {
			console.log("!");
			$row.append('<div>cell</div>'); 
		}
		// for (var k = 0; k < size; k++) { $board.append($row); }

	}




	$("#play").on("submit", function(e){
		e.preventDefault();
		size = grabSize();
		game = new board(size);
		displayBoard(size);
	});








});