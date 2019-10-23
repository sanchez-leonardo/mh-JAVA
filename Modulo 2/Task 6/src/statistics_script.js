export { getMembers, pctVotesWithParty, getThe };

//Función para total de cada party
function getMembers(party, target) {
  return Array.from(
    target.filter(member => member.party.toLowerCase() == party)
  );
}

//Función de promedio de porcentajes, recibe un Array
function pctVotesWithParty(partyArr) {
  return (
    partyArr.reduce((acc, member) => acc + member.votes_with_party_pct, 0) /
      partyArr.length || 0
  );
}

//MasterFunction recibe por parámetro si se quiere los menores, mayores, lealtad o prescencia y el array que debe comparar y hace el calculo requerido
function getThe(operator, comparator, targetArr) {
  //creacion de array auxiliar para carga de datos, variable de porcentajes
  let auxArr = [];
  let arrPercentages;
  //segun comparator pasado por parametro (como string), modifica el array de porcentajes patron
  if (comparator == 'loyal') {
    arrPercentages = Array.from(
      new Set(targetArr.map(e => e.votes_with_party_pct))
    ).sort((a, b) => a - b);
  } else if (comparator == 'absent') {
    arrPercentages = Array.from(
      new Set(targetArr.map(e => e.missed_votes_pct))
    ).sort((a, b) => a - b);
  }
  // segun el operator pasado por parametro(como string), ejecuta la funcion adecuada
  switch (operator) {
    case 'least':
      arrPercentages.forEach(pct => {
        targetArr.forEach(member => {
          if (
            auxArr.length <= targetArr.length * 0.1 &&
            !auxArr.includes(member) &&
            (comparator == 'loyal'
              ? member.votes_with_party_pct
              : member.missed_votes_pct) <= pct
          ) {
            auxArr.push(member);
          }
        });
      });
      break;

    case 'most':
      arrPercentages.reverse().forEach(pct => {
        targetArr.forEach(member => {
          if (
            auxArr.length <= targetArr.length * 0.1 &&
            !auxArr.includes(member) &&
            (comparator == 'loyal'
              ? member.votes_with_party_pct
              : member.missed_votes_pct) >= pct
          ) {
            auxArr.push(member);
          }
        });
      });
      break;

    default:
      console.log(comparator + ' or ' + operator + ' are not valid parameters');
  }

  return auxArr;
}
