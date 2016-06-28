"user strict";
const MAX = 3;



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
		let move = Math.floor((Math.random() * maxMoves));
		console.log(move);
		if(move <= 3){
			return "less than/equal to 3";
		}else{
			return "bigger than 3";
		}
	}
}

/*Move from user*/
class Human extends Player{
	constructor(name){
		super(name);
	}

	makeMove(x,y, shape){
		if((x > MAX) || (y > MAX) || (y < 1) || (x < 1)){
			console.log("too big of a x or y");
		}
		if((f[x-1][y-1] !== 'x') && (f[x-1][y-1] !== 'o')){
			f[x-1][y-1] = shape;
		}else{
			console.log("Already taken");
		}	
	}
}


/*Storage of array*/
var instance = 0;
var f = new Array();
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


	static checkIfWon(){
		//traverse all the array
		if((f[0][0] === 'x') && (f[0][1] ==='x') && (f[0][2] =='x')){
			console.log("x won");
		}else if(){
			
		}
	}

}



var human = new Human("Jose");
var computer = new Computer();
var game = Game.getInstance();
// var game = Game.getInstance();
// var game = Game.getInstance();
// var game = Game.getInstance();


human.makeMove(1 ,1 , 'x');
human.makeMove(1 ,2 , 'x');
human.makeMove(1 ,3 , 'x');

console.log(human.toString);
console.log(computer.toString);
Game.printBoard();
Game.checkIfWon();

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