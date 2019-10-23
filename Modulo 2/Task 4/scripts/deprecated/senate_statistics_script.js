//variable con todos los datos externos
const members = data.results[0].members;

//variable con todos los elementos para uso en funciones
var allMembers = Array.from(members.map(e => e));

//funcion para toma de miembros segun party
function getMembers(party) {
  return Array.from(allMembers.filter(member => member.party.toLowerCase() == party))
}

//Array de cada partido y actualizacion del valor en JSON
var democrats = getMembers('d');
senStatistics.number_of_democrats = democrats.length;

var republicans = getMembers('r');
senStatistics.number_of_republicans = republicans.length;

var independents = getMembers('i');
senStatistics.number_of_independents = independents.length;

senStatistics.number_of_senators = allMembers.length;


//Función de promedio de porcentajes
function pctVotesWithParty(party) {
  return (party.reduce((acc, member) => acc + member.votes_with_party_pct, 0)) / party.length || 0;
}

//Toma de promedios y actualizacion de valores en JSON
senStatistics.democrat_vote_pct = pctVotesWithParty(democrats);

senStatistics.republican_vote_pct = pctVotesWithParty(republicans);

senStatistics.independent_vote_pct = pctVotesWithParty(independents);


//MasterFunction recibe por parámetro si se quiere los menores, mayores, lealtad o prescencia y el array que debe comparar y hace el calculo requerido
function getThe(operator, comparator, targetArr) {
  //creacion de array auxiliar para carga de datos, variable de porcentajes
  let auxArr = [];
  let arrPercentages;
  //segun comparator pasado por parametro (como string), modifica el array de porcentajes
  if (comparator == 'loyal') {
    arrPercentages = Array.from(new Set(allMembers.map(e => e.votes_with_party_pct))).sort((a, b) => a - b);
  } else if (comparator == 'absent') {
    arrPercentages = Array.from(new Set(allMembers.map(e => e.missed_votes_pct))).sort((a, b) => a - b);
  }
  // segun el operator pasado por parametro(como string), ejecuta la funcion adecuada
  switch (operator) {
    case 'least':
    arrPercentages.forEach(pct => {
      targetArr.forEach(member => {
        if ((auxArr.length <= (allMembers.length * 0.1)) && (!auxArr.includes(member)) && ((comparator == 'loyal' ? member.votes_with_party_pct : member.missed_votes_pct) <= pct)) {
          auxArr.push(member)
        }
      })
    });
    break;

    case 'most':
    arrPercentages.reverse().forEach(pct => {
      targetArr.forEach(member => {
        if ((auxArr.length <= (allMembers.length * 0.1)) && (!auxArr.includes(member)) && ((comparator == 'loyal' ? member.votes_with_party_pct : member.missed_votes_pct) >= pct)) {
          auxArr.push(member)
        }
      })
    });
    break;

    default: console.log(comparator + ' or ' + operator + ' are not valid parameters');
  };

  return auxArr;
};

//carga de los menos y los más leales al JSON
senStatistics.least_loyal = getThe('least', 'loyal', allMembers);
senStatistics.most_loyal = getThe('most', 'loyal', allMembers);
senStatistics.least_engaged = getThe('most', 'absent', allMembers);
senStatistics.most_engaged = getThe('least', 'absent', allMembers);

//Funcion de carga de datos en tablas
function createRows(id, info) {

  let tableBody = document.querySelector(id+' tbody');
  let memberRow = document.createElement('tr');
  let memberData;

  if (id == '#leastLoyal' || id == '#mostLoyal') {
    memberData = [`<a href="${info.url}">${info.first_name} ${info.middle_name || ''} ${info.last_name}</a>`, parseInt((info.votes_with_party_pct * info.total_votes)/100), info.votes_with_party_pct + '&#37;']
  } else if (id == '#leastEngaged' || id == '#mostEngaged') {
    memberData = [`<a href="${info.url}">${info.first_name} ${info.middle_name || ''} ${info.last_name}</a>`, info.missed_votes, info.missed_votes_pct + '&#37;']
  } else if (id == '#firstGlance'){
    memberData = [info.party, info.reps, parseInt(info.votes_pct)+ '&#37;'];
  }

  memberData.forEach((cell) => {
    let td = document.createElement('td');
    td.innerHTML = cell;
    memberRow.appendChild(td);
  })

  tableBody.appendChild(memberRow);

};

//Array de informacion para firstGlance

var firstGlanceInfo = [{"party" : "Democrats", "reps" : senStatistics.number_of_democrats, "votes_pct" : senStatistics.democrat_vote_pct},
{"party" : "Republicans", "reps" : senStatistics.number_of_republicans, "votes_pct" : senStatistics.republican_vote_pct},
{"party" : "Independent", "reps" : senStatistics.number_of_independents, "votes_pct" : senStatistics.independent_vote_pct},
{"party" : "Total", "reps" : senStatistics.number_of_senators, "votes_pct" : ((senStatistics.democrat_vote_pct+senStatistics.republican_vote_pct+senStatistics.independent_vote_pct)/3)}];

firstGlanceInfo.forEach(e => createRows('#firstGlance', e));


//Creación de tablas least/most loyal/absent según el HTML
if (document.title.includes('Loyalty')) {

  senStatistics.least_loyal.forEach(e => createRows('#leastLoyal', e));
  senStatistics.most_loyal.forEach(e => createRows('#mostLoyal', e));

} else if (document.title.includes('Attendance')){

  senStatistics.least_engaged.forEach(e => createRows('#leastEngaged', e));
  senStatistics.most_engaged.forEach(e => createRows('#mostEngaged', e));

};
