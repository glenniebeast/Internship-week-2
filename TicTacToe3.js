var player1Name="", player2Name="", turn="";
var grid=[[0,0,0],[0,0,0],[0,0,0]];
var hasWinner=0,moveCount=0;

function boardMsg(x) {
	return $("#board").text(x);
}

function startTurn() {
	var tr=Math.floor((Math.random()* 2)+ 1);
	hasWinner=0;
	if(tr==1){
		turn=player1Name;
		boardMsg(player1Name+" starts the game!!");
	}
	else{
		turn=player2Name;
		boardMsg(player2Name+" starts the game!!");
	}
}
function setGame() {
	turn="";
	grid=[0,0,0],[0,0,0],[0,0,0];
	boardMsg=("");
	$(".sqr").map(function() {
		$(this).text("");
	}).get();
	hasWinner=0;
	moveCount=0;
}

$("#play").click(function() {

	if(hasWinner==1){
		setGame();
	}
	player1Name=$("#playerId1").val();
	player2Name=$("#playerId2").val();

	
	if(player1Name==""){ 
        player1Name=("Player 1 ");
        
    } 
    if(player2Name=="") {
    	player2Name=("Player 2 ");
    	
    } 
    
	startTurn();
});

$(".sqr").click(function() {
	if(player1Name=="" || player2Name==""){ 
		alert("Press the 'Play' button");
		return;
	}
	var row=$(this).parent().index();
	var sqr=$(this).index();

	if(grid[row][sqr]!==0) {
		alert("Find another square");
	}
	if(hasWinner==1) {
		alert("click on play to start a new game!")
		return;
	}
	if(turn==player1Name) {
		moveCount++;
		$(this).addClass("cross");
		grid[row][sqr]=1;
		var ifWon=winnerCheck(1,player1Name);
		if(!ifWon){
			if(moveCount>=9){
				boardMsg("Cats Eyes!!")
				moveCount=0;
				
				$("#play").text("playagain");
				hasWinner=1;
				return;
			}else{
				turn=player2Name;
				boardMsg(player2Name+"'s turn now!");
			}return;
		}else{
			return;
		}
	}else if(turn==player2Name) {
		moveCount++;
		$(this).addClass("circle");
		grid[row][sqr]=2;
		var ifWon=winnerCheck(2,player2Name);
		if(!ifWon){
			if(moveCount>=9){
				boardMsg("Cats Eyes!!")
				moveCount=0;
				
				$("#play").text("playagain");
				hasWinner=1;
				return;
			}else{
				turn=player1Name;
				boardMsg(player1Name+"'s turn now!");
			}return;
		}else{
			return;
		}
	}
});

function winnerCheck(n,playerName) {
	if(
		(grid[0][0]==n && grid[0][1]==n && grid[0][2]==n) ||
        (grid[1][0]==n && grid[1][1]==n && grid[1][2]==n) ||
        (grid[2][0]==n && grid[2][1]==n && grid[2][2]==n) ||

        (grid[0][0]==n && grid[1][0]==n && grid[2][0]==n) ||
        (grid[0][1]==n && grid[1][1]==n && grid[2][1]==n) ||
        (grid[0][2]==n && grid[1][2]==n && grid[2][2]==n) ||

        (grid[0][0]==n && grid[1][1]==n && grid[2][2]==n)||
        (grid[0][2]==n && grid[1][1]==n && grid[2][0]==n)

		){
		boardMsg(playerName+"has won the game!!");
		alert(playerName+"has won the game!!");
		hasWinner=1;
		moveCount=0;
		$("#play").text("play again");
		return true;
	}
	return false;
}

