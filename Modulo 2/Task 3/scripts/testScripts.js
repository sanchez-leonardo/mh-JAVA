/*
//Datos en tabla 1.0
var tableBody = document.querySelector('tbody');

for (var i = 0; i < data.results[0].members.length; i++) {

  var member = data.results[0].members[i];

  var tr = document.createElement('tr');
  var nameTd = document.createElement('td');
  var partyTd = document.createElement('td');
  var stateTd = document.createElement('td');
  var seniorityTd = document.createElement('td');
  var votesTd = document.createElement('td');

  nameTd.appendChild(document.createTextNode(member.first_name+
                    ((member.middle_name == null) ? ' ' : ' ' + member.middle_name + ' ') +
                     member.last_name));
  partyTd.appendChild(document.createTextNode(member.party));
  stateTd.appendChild(document.createTextNode(member.state));
  seniorityTd.appendChild(document.createTextNode(member.seniority+' years'));
  votesTd.appendChild(document.createTextNode(member.votes_with_party_pct+' %'));

[nameTd, partyTd, stateTd, seniorityTd, votesTd].forEach(function(cell){
  tr.appendChild(cell)
});

  tableBody.appendChild(tr);

}

//Datos en tabla 1.5
var tableBody = document.querySelector('tbody');
data.results[0].members.forEach(function(member){

  var tr = document.createElement('tr');

  var nameTd = document.createElement('td');
  var partyTd = document.createElement('td');
  var stateTd = document.createElement('td');
  var seniorityTd = document.createElement('td');
  var votesTd = document.createElement('td');

  nameTd.appendChild(document.createTextNode(member.first_name+
                    ((member.middle_name == null) ? ' ' : ' ' + member.middle_name + ' ') +
                     member.last_name));
  partyTd.appendChild(document.createTextNode(member.party));
  stateTd.appendChild(document.createTextNode(member.state));
  seniorityTd.appendChild(document.createTextNode(member.seniority+' years'));
  votesTd.appendChild(document.createTextNode(member.votes_with_party_pct+' %'));

[nameTd, partyTd, stateTd, seniorityTd, votesTd].forEach(function(cell){
  tr.appendChild(cell)
});

  tableBody.appendChild(tr);

})

//Datos en tabla 2.0
var tableBody = document.querySelector('tbody');

data.results[0].members.forEach(function(member){

  var tr = document.createElement('tr');

  var memberData = [member.first_name + ((member.middle_name == null) ? ' ' : ' ' + member.middle_name + ' ') + member.last_name,
                    member.party, member.state, member.seniority+' years', member.votes_with_party_pct+' %'];

  memberData.forEach(function(cell){
    var td = document.createElement('td');
    td.appendChild(document.createTextNode(cell));
    tr.appendChild(td);
  })

  tableBody.appendChild(tr);

})

//llenado de arrays *proto*
// for (var i = 0; i < arrPercentages.length; i++) {
//   for (var j = 0; j < allMembers.length; j++) {
//     if ((leastLoyal.length <= (allMembers.length * 0.1)) && (!leastLoyal.includes(member)) && (member.votes_with_party_pct <= pct))) {
//       leastLoyal.push(allMembers[j]);
//     }
//   }
// }
//
// for (var i = arrPercentages.length-1; i > 0; i--) {
//   for (var j = 0; j < allMembers.length; j++) {
//     if ((allMembers[j].votes_with_party_pct >= arrPercentages[i]) && (!mostLoyal.includes(allMembers[j])) && (mostLoyal.length <= (allMembers.length * 0.1))) {
//       mostLoyal.push(allMembers[j]);
//     }
//   }
// }


//Versiones con arrow functions v1
//var leastLoyal = [];
//var mostLoyal = [];
//var arrPercentages = Array.from(new Set(allMembers.map(e => e.votes_with_party_pct))).sort();
//
// arrPercentages.forEach(pct => {
//   allMembers.forEach(member => {
//     if((leastLoyal.length <= (allMembers.length * 0.1)) && (!leastLoyal.includes(member)) && (member.votes_with_party_pct <= pct)){
//       leastLoyal.push(member)
//     }
//   })
// });
//
// arrPercentages.reverse().forEach(pct => {
//   allMembers.forEach(member => {
//     if((mostLoyal.length <= (allMembers.length * 0.1)) && (!mostLoyal.includes(member)) && (member.votes_with_party_pct >= pct)){
//       mostLoyal.push(member)
//     }
//   })
// });
//
//
// //comprobación
// console.log('**************************Least Loyal***********************');
// leastLoyal.forEach(e =>  console.log(e.last_name + " " + e.first_name + " " + e.votes_with_party_pct));
//
// console.log('*********************Most Loyal****************************');
// mostLoyal.forEach(e =>  console.log(e.last_name + " " + e.first_name + " " + e.votes_with_party_pct));

//MasterFunction recibe por parámetro si se quiere los menores, mayores, lealtad o prescencia y el array que debe comparar y hace el calculo requerido
function getThe(operator, comparator, targetArr){
  //creacion de array auxiliar para carga de datos, variable de porcentajes y una condicion de comparacion
  let auxArr = [];
  let arrPercentages;
  //let condition;
  //segun la condicion requerida, modifica el array de porcentajes y la condicion para realizar el calculo adecuado
  if(comparator == 'loyalty'){
    arrPercentages = Array.from(new Set(allMembers.map(e => e.votes_with_party_pct))).sort((a, b) => a - b);
  } else if (comparator == 'absent') {
    arrPercentages = Array.from(new Set(allMembers.map(e => e.missed_votes_pct))).sort((a, b) => a - b);
  }
  // segun el operador pasado por parametro(como string), ejecuta la funcion adecuada
  switch (operator) {
    case 'least':
    arrPercentages.forEach(pct => {
      targetArr.forEach(member => {
        if((auxArr.length <= (allMembers.length * 0.1)) && (!auxArr.includes(member)) && ((comparator == 'loyalty' ? member.votes_with_party_pct : member.missed_votes_pct) <= pct)){
          auxArr.push(member)
        }
      })
    });
    break;

    case 'most':
    arrPercentages.reverse().forEach(pct => {
      targetArr.forEach(member => {
        if((auxArr.length <= (allMembers.length * 0.1)) && (!auxArr.includes(member)) && ((comparator == 'loyalty' ? member.votes_with_party_pct : member.missed_votes_pct) >= pct)){
          auxArr.push(member)
        }
      })
    });
    break;

    default: console.log(comparator +' or ' + operator + ' are not valid requirements');
  };

  return auxArr;
};
*/
