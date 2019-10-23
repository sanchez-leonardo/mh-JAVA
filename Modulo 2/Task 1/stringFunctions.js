//Task1 string functions

//Excercise 1

function revNum(num){
  var rev = num.toString().split("").reverse().join("");
  return Math.sign(num)*parseInt(rev);
}

//Excercise 2

function sortLetters(string){
  var sorted = string.split("").sort().join("");
  return sorted;
}

//Excercise 3

function capitalizingRay(phrase){
  var words = phrase.toLowerCase().split(" ");
  for (var i=0; i < words.length; i++){
    words[i] = words[i][0].toUpperCase() + words[i].slice(1);
  }
  return words.join(" ");
}

//Excercise 4

function findLargest(phrase){
  var word = phrase.split(" ").reduce(function(current, next){
    if (current.length > next.length){
      return current;
    }else{
      return next;
    }
  }, "")
  return word;
}