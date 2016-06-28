"user strict";
const MAX = 3;
var won = false, spotsLeft = 9;
/*Storage of array*/
var instance = 0;
var f = new Array();
var boxcontainer, i, j;
var boxes = document.getElementsByClassName("box");
boxcontainer = document.getElementById("container-tic-tac-toe");
var submit = document.getElementById('submit-btn');
var radiooptions = document.getElementsByName('player-start-options');
var human, computer, game;


/*Main class which dictates what the player can do*/
class Player{
	// var name ="";
	constructor(name){
		this._name = name;
	}

	get name() {
		return this._name;
	}

	set name(name){
		this._name = name;
	}

	get toString(){
		return `Hello ${this._name}`;
	}
}


/*Computer special type of player*/
class Computer extends Player{
	constructor(){
		super("Computer");
	}

	makeMove(){
		if(!won && spotsLeft >0){
		let moveX = Math.floor((Math.random() * MAX));
		let moveY = Math.floor((Math.random() * MAX));
		console.log("Move X = "+moveX + "Move y = " + moveY);
		while((Game.checkIfSpotTaken(moveX+1,moveY+1))){
			moveX = Math.floor((Math.random() * MAX));
			moveY = Math.floor((Math.random() * MAX));
		}

		f[moveX][moveY] = 'o';
		spotsLeft--;
		let c = boxes[(moveX*3)+moveY].childNodes;
		console.log("Size "+c.length + c[0] );
			// c[0].innerHTML = 'x';
		c[1].innerHTML = 'o';
		boxes[(moveX*3)+moveY].className  += " green-box";
		Game.checkIfWon("Computer");
		// if(move <= 3){
		// 	return "less than/equal to 3";
		// }else{
		// 	return "bigger than 3";
		// }
	}else{
		console.log("Someone won");
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
			console.log("too big of a x or y");
			return false;
		}
		if((f[x-1][y-1] !== 'x') && (f[x-1][y-1] !== 'o')){
			f[x-1][y-1] = shape;
			spotsLeft--;
			// div.style.backgroundColor = 'green';
			let c = div.childNodes;
			console.log("Size "+c.length + c[0] );
			// c[0].innerHTML = 'x';
			c[1].innerHTML = 'x';
			// c[2].innerHTML = 'x';
			div.className  += " blue-box";
			return true;
		}else{
			return false;
		}	
	}
}


/*Main class with game options*/
class Game{

	constructor(iMax, jMax){
		this.createArray(iMax , jMax)
	}

	static printBoard(){
		let str = "";
		console.log("---Board---");
		for (let i = 0; i < MAX; i++) {
 		for (let j=0; j < MAX; j++) {
  			str+= f[i][j];
 			}
 			console.log(str);
 			console.log("");
 			str="";
		}
	}

	createArray(iMax, jMax){
	let str = "";

	for (let i = 0; i < iMax; i++) {
 		f[i]=new Array();
 		for (let j=0; j < jMax; j++) {
  			f[i][j]=0;
  			str+= "*";
 			}
 			console.log(str);
 			console.log("");
 			str="";
		}
	console.log("Created array");
	}


	static getInstance(){
		if(!instance){
			instance = this.createInstance();
		}else{
			console.log("already created an object");
		}
	}


	static createInstance(){
		return new Game(3,3);
	}


	static checkIfWon(nameOfWinner){
		//traverse all the array
		let i = 0, j = 0;
		for(; i < 3; i++){
			if(((f[i][0] === 'x') && (f[i][1] ==='x') && (f[i][2] =='x'))
				||((f[i][0] === 'o') && (f[i][1] ==='o') && (f[i][2] =='o'))){
				won = true;
			}
			// for(; j < 3; j++){
			else if(((f[0][i] === 'x') && (f[1][i] ==='x') && (f[2][i] =='x'))
				||((f[0][i] === 'o') && (f[1][i] ==='o') && (f[2][i] =='o'))){
					won = true;
			}
			// }
		}//check horizontal

		 if(((f[0][0] === 'x') && (f[1][1] ==='x') && (f[2][2] =='x'))
				||((f[0][0] === 'o') && (f[1][1] ==='o') && (f[2][2] =='o'))){
					won = true;
		}else if(((f[2][0] === 'x') && (f[1][1] ==='x') && (f[0][2] =='x'))
				||((f[2][0] === 'o') && (f[1][1] ==='o') && (f[0][2] =='o'))){
					won = true;
		}else if(spotsLeft == 0 && !won){
			alert("Its a tie.");
		}

		if(won){
			console.log(" won");
			alert(nameOfWinner + " is the winner.");
			boxcontainer.removeEventListener("click", clickEvents, false);
		}
	}

	static checkIfSpotTaken(x, y){
		return (f[x-1][y-1] != 0);
	}

}

/*Functions to apply clicking*/
boxcontainer.addEventListener("click", clickEvents, false);

function clickEvents(e){
	var clicked = e.target;
	let x, y;
	for(i = 0, j = 0; i < boxes.length; i++){
		// tabcontents[i].classList.remove('active');
		// tablinks[i].classList.remove('active');
		if(clicked === boxes[i]) {
			console.log("clicked box " + i, (i <= 2)? 1: ((i <= 5)? 2: 3 ), (i%3)+1);
			x = (i <= 2)? 1: ((i <= 5)? 2: 3 );
			y = (i%3)+1;


			console.log("is spot taken? " + (Game.checkIfSpotTaken(x,y)));
			// if(!Game.checkIfSpotTaken(x,y)){
			if(human.makeMove(x, y, 'x', boxes[i])){
					Game.checkIfWon("Jose");
					computer.makeMove();
					Game.printBoard();
			}else{
				console.log("spot taken");
			}
			
			//fix this	
		}
	}


	// clicked.classList.add('active');
	// tabcontents[j].classList.add('active');

}

//function for selection 
submit.addEventListener("click", radioButtons, false);

function radioButtons(e){
for (let i = 0, length = radiooptions.length; i < length; i++) {
	    if (radiooptions[i].checked) {
        // do whatever you want with the checked radio
        // alert(radiooptions[i].value);
        startGame(radiooptions[i].value);
        // only one radio can be logically checked, don't check the rest
        break;
    }
}
}


function startGame(whoStarts){
	//initialize players
	human = new Human("Jose");
	computer = new Computer();
	game = Game.getInstance();

	switch(whoStarts){
		case "player":
			console.log("picked player");
		break;	
		case "computer":
			computer.makeMove();
			console.log("picked computer");
		break;
		case "random":
			console.log("picked random");
		break;
		default:
			break;
	}
	let form = document.getElementById("pick-form");
	boxcontainer.style.display = "block";
	form.style.display = "none";
}

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