//Task 1 JS Array Functions

//Excercise 1

var comision = ["David", "Matias", "Miguel", "Catalina", "Fabiana", "Branco", "Leonardo"];

function printOrden(){
  comision.sort();
  return "El array ordenado: "+comision;
}

function printEnds(){
  return "El primer elemento del array es: "+comision[0]+" .El último elemento del array es: "+comision[6];
}

function printAll(x){
  console.log("El array esta compuesto por: ");
  comision.forEach(function (x){
    console.log(x);
  })
}//o simplemente escribir console.log(array)

//Excercise 2

var edades = [23, 24, 30, 35, 29, 40];
var i = 0;

function printEdad(){
  while (i < edades.length){
    if (edades[i]%2 == 0){
      console.log("Hay una persona de "+edades[i]+" años");
    }
    i++;
  }
}

function printEdad2(){
  for (var i = 0; i < edades.length; i++){
    if (edades[i]%2 == 0){
      console.log("Lo mismo pero con bucle for "+edades[i]);
    }
  }
}

//Excercise 3

var numeros = [3,6,67,6,23,11,100,8,93,0,17,24,7,1,33,45,28,33,23,12,99,100];

function smallest(x){
  var min = x[0];
  for (var i = 0; i < x.length; i++){
    if (x[i] < min) {
      min = x[i];
    }
  }
  return min;
}

function mathMin(x){
  return Math.min(...x);
}

//Excercise 4

function biggest(x){
  var max = x[0];
  for (var i = 0; i < x.length; i++){
    if (x[i] > max) {
      max = x[i];
    }
  }
  return max;
}

function mathMax(x){
  return(Math.max(...x));
}

//Excercise 5

function printValue(array, index){
  console.log("El numero seleccionado es: "+array[index]);
}

//Excercise 6

function dupes(x){
  var dupArr = []
  for (var i = 0; i < x.length; i++){
    for (var j = i+1; j < x.length; j++){
      if (x[i] == x[j] && !dupArr.includes(x[i])){
        dupArr.push(x[i]);
      }
    }
  }
  return dupArr;
}

// Excercise 7

var myColor = ["Red", "Green", "White", "Black"];

function joinString(x){
  return myColor.join(", ")
}
