"use strict";
//Constants example
const PI = 3.1415;

console.log(PI);

//local let variables and block scope
for(let i = 0; i < 10; i++){
	console.log(i + " Addition " + (i+PI));
}

{
	let i = 0;
	console.log("Printing out i "+i);
}
let i;
if(i == null ){
	console.log("Printing out i "+i);
}
else{
	console.log("undefined");
}

i = .1;
let j = .2;

if((i+j)=== .3){
	console.log("true");
}else{
	console.log("false");
}


//example block 
function foo(){return 1;}

console.log("Foo = 1? "+ (foo()===1));

{//scope
	function foo(){return 2}
	console.log("Foo = 2? "+ (foo()===2));
}

console.log("Foo = 1? "+ (foo()===1));

//assert example
var x = 6;
eval("x+x")
var x = 17;
var evalX = eval("'use strict'; var x = 42; x");
console.assert(x === 17);
console.assert(evalX === 42);


if (true){
  function f() { } // !!! syntax error
  f();
}