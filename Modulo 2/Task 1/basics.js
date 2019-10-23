//Task1 JS Basics
//Ejercicio 1, 2 y 3
var myName = "Leonardo Sanchez";
console.log(myName);

var myAge = 30;
console.log(myAge);

var ignasiAge = 32;

function ageDiff(myAge) {
  console.log(myAge - ignasiAge);
}

//Ejercicio 4
ageDiff(myAge);

function enterAge(myAge) {
  if (myAge < 21){
    console.log("You are too young!");
  }else{
    console.log("You Shall Pass!");
  }
}

//Ejercicio 5
enterAge();

function diffIgnasi(myAge){
  if (myAge == ignasiAge){
    console.log("Ignasi is as old as you!");
  }else{
    if (myAge < ignasiAge){
      console.log("Ignasi is older!");
    }
    else{
      console.log("Ignasi is younger!");
    }
  }
}

//Comparación con ignasi
diffIgnasi();
