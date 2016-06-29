"user strict";
const MAX = 3;
var won = false, spotsLeft = 9, human, computer;
/*Storage of array*/
var instance = 0;
var f = new Array();
var boxes = document.getElementsByClassName("box");
var boxcontainer = document.querySelector("#container-tic-tac-toe");
var pointsDisctributionTable = document.querySelector(".points-reference");
var test = document.querySelector(".test");
var submit = document.getElementById('submit-btn');
var playAgain = document.getElementById('play-again');
var radiooptions = document.getElementsByName('player-start-options');
var form = document.getElementById("pick-form");
var table = document.getElementsByClassName("table");
var table_body = document.getElementsByClassName("table-body");
var table_head = document.getElementsByClassName("table-head");
var table_headings = ["Player", "Points", "Wins", "Ties", "Loses"];



/*Event handlers*/
boxcontainer.addEventListener("click", clickEvents, false);
submit.addEventListener("click", submitAction, false);
playAgain.addEventListener("click", clearBoard, false);
test.addEventListener("click",openStatsRef,false);

/*Main class which dictates what the player can do*/
class Player{
	constructor(name){
		this._name = name;
		this.init();
	}

	init(){
		this._points = 0;
		this._wins = 0;
		this._ties = 0;
		this._loses = 0;
	}

	get name() {
		return this._name;
	}

	set name(name){
		this._name = name;
	}

	set points(points){
		this._points = points;
	}

	get points(){
		return this._points;
	}

	set wins(wins){
		this._wins = wins;
	}
	get wins(){
		return this._wins;
	}

	set ties(ties){
		this._ties = ties;
	}

	get ties(){
		return this._ties;
	}

	set loses(loses){
		this._loses = loses;
	}

	get loses(){
		return this._loses;
	}


	get result(){
		return [this._name, this._points, this._wins, this._ties, this._loses];
	}

	get toString(){
		return `Hello ${this._name}`;
	}
}


/*Computer, special type of player*/
class Computer extends Player{

	constructor(){
		super("Computer");
	}

	makeMove(){
		if(!won && spotsLeft >0){
		let moveX = Math.floor((Math.random() * MAX));
		let moveY = Math.floor((Math.random() * MAX));
		//get an open spot in the array
		while((Game.checkIfSpotTaken(moveX+1,moveY+1))){
			moveX = Math.floor((Math.random() * MAX));
			moveY = Math.floor((Math.random() * MAX));
		}

		f[moveX][moveY] = 'o';
		spotsLeft--;
		boxes[(moveX*3)+moveY].querySelector('.symbol').innerHTML = 'o';
		boxes[(moveX*3)+moveY].classList.add("green-box");
		Game.checkIfWon("Computer");
	}
}
}

/*Move from user*/
class Human extends Player{
	constructor(name){
		super(name);
	}
	//makes a move and also checks if spot is already taken
	makeMove(x,y, shape, div){
		if((x > MAX) || (y > MAX) || (y < 1) || (x < 1)){
			return false;
		}
		if((f[x-1][y-1] !== 'x') && (f[x-1][y-1] !== 'o')){
			f[x-1][y-1] = shape;
			spotsLeft--;
			div.querySelector('.symbol').innerHTML = 'x';;
			div.classList.add("blue-box");
			return true;
		}else{
			return false;
		}	
	}
}


/*Main class with game options*/
class Game{
	/*Default Constructor*/
	constructor(iMax, jMax){
		this.createArray(iMax , jMax)
	}

	/*Create initial empty array*/
	createArray(iMax, jMax){
	for (let i = 0; i < iMax; i++) {
 		f[i]=new Array();
 		for (let j=0; j < jMax; j++) {
  			f[i][j]=0;
 			}
		}
	}

	/*Creates one instance of game*/
	static getInstance(){
		if(!instance){
			instance = this.createInstance();
		}
	}

	static createInstance(){
		return new Game(3,3);
	}


	static checkIfWon(nameOfWinner){
		//traverse all the array to check if we won 
		let i = 0, j = 0;
		for(; i < 3; i++){
			if(((f[i][0] === 'x') && (f[i][1] ==='x') && (f[i][2] =='x'))
				||((f[i][0] === 'o') && (f[i][1] ==='o') && (f[i][2] =='o'))){
				won = true;
			}//horizontal
			else if(((f[0][i] === 'x') && (f[1][i] ==='x') && (f[2][i] =='x'))
				||((f[0][i] === 'o') && (f[1][i] ==='o') && (f[2][i] =='o'))){
					won = true;
			}//vertical
		}

		 if(((f[0][0] === 'x') && (f[1][1] ==='x') && (f[2][2] =='x'))
				||((f[0][0] === 'o') && (f[1][1] ==='o') && (f[2][2] =='o'))){
					won = true;
		}else if(((f[2][0] === 'x') && (f[1][1] ==='x') && (f[0][2] =='x'))
				||((f[2][0] === 'o') && (f[1][1] ==='o') && (f[0][2] =='o'))){
					won = true;
		}else if(spotsLeft == 0 && !won){
			computer.points += 2;
			human.points +=2;
			human.ties++;
			computer.ties++;
			updateTable();
			document.getElementById("play-again").classList.remove("hide");
		}

		if(won){
			alert(nameOfWinner + " is the winner.");
			if(nameOfWinner==="Computer"){
				computer.points += 5;
				computer.wins++;
				human.loses++;
			}else{
				human.points +=5;
				computer.loses++;
				human.wins++;
			}
			document.getElementById("play-again").classList.remove("hide");
			boxcontainer.removeEventListener("click", clickEvents, false);
			updateTable();
		}
		

	}

	static checkIfSpotTaken(x, y){
		return (f[x-1][y-1] != 0);
	}

}



/*Gives functionality to the container with boxes*/
function clickEvents(e){
	var clicked = e.target;
	let x, y;
	for(let i = 0, j = 0; i < boxes.length; i++){

		if(clicked === boxes[i]) {
			//get x and y positions based on box clicked
			x = (i <= 2)? 1: ((i <= 5)? 2: 3 );
			y = (i%3)+1;

			if(human.makeMove(x, y, 'x', boxes[i])){
					Game.checkIfWon("Jose");
					computer.makeMove();
			}
		}
	}
}


/*Functionality for the submit button*/
function submitAction(e){
for (let i = 0, length = radiooptions.length; i < length; i++) {
	    if (radiooptions[i].checked) {
        startGame(radiooptions[i].value);
        updateTable();
        // only one radio can be logically checked, don't check the rest
        break;
    }
}
}

/*Starts a new game*/
function startGame(whoStarts){
	//initialize players
	human = new Human("Jose");
	computer = new Computer();
	game = Game.getInstance();

	switch(whoStarts){
		case "computer":
			computer.makeMove();
			console.log("picked computer");
		case "player":
		case "random":
		default:
			break;
	}
	//display table
	table[0].classList.remove("hide");
	boxcontainer.style.display = "block";
	form.style.display = "none";
}

/*refreshes table*/
function updateTable(){
	let arrayOfPlayers = new Array();
	//expandable
	arrayOfPlayers[0] = human.result;
	arrayOfPlayers[1] = computer.result;

	let values = new Array();

	let tr = document.createElement('tr');
	table_head[0].appendChild(tr);
	let i = 0, j = 0;
	//clear any previous elements
	table_body[0].innerHTML = "";//clear container
	table_head[0].innerHTML = "";//clear container


	for(; i < table_headings.length; i++){
		let th = document.createElement('th');
		th.appendChild(document.createTextNode(table_headings[i]));
		tr.appendChild(th);
	}
	table_head[0].appendChild(tr);

	for(i = 0; i < arrayOfPlayers.length; i++){
		let tr = document.createElement('tr');
			for(j = 0; j < arrayOfPlayers[i].length;j++){
				let td = document.createElement('td');
				td.appendChild(document.createTextNode(arrayOfPlayers[i][j]));
				tr.appendChild(td);
			}
			table_body[0].appendChild(tr);
	}

}


/*Clears board*/
function clearBoard(){

	clearArray();
	won = false;
	spotsLeft = 9;
	boxcontainer.innerHTML = "";//clear container

	for(let i = 0; i < spotsLeft; i++){
		//create the box
		let dv = document.createElement('div');
		dv.className = "box";
		//create the inner symbol stuff
		let sym = document.createElement('div');
		sym.className = "symbol";
		dv.appendChild(sym);
		boxcontainer.appendChild(dv);
		
	}
	//give container clickable capability
	boxcontainer.addEventListener("click", clickEvents, false);
}

/*empties array*/
function clearArray(){
	for (let i = 0; i < 3; i++) {
 		for (let j=0; j < 3; j++) {
  			f[i][j]=0;
 			}
	}
}


function openStatsRef(){
	console.log("clicking");
	pointsDisctributionTable.classList.add("open-points-reference");
}

var main = document.querySelector('.box-container');

      main.addEventListener('click', function() {
        pointsDisctributionTable.classList.remove('open-points-reference');
      });
// typed arrays like int float, or something
//classes
// new methods numbers, lamda type expressions 
//symbol creation , make them constants
//number formatiing 
//variable scope
//function scope
//expression bodies/statements =>
//default paramethers (x=8, y=9)
//Access the raw template string content (backslashes are not interpreted).
//string interpolation
//instead of 
//message "this " + this.name + " something."
//does "this  ${this.name}  something"