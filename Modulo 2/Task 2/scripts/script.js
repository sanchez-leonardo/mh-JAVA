//datos externos
const members = data.results[0].members;
//creacion de tabla incial a partir de un array con datos externos
var fullTable = members.map(e => e);
fullTable.forEach(e => addMember(e));

//creacion inicial de menu de seleccion
var selectMenu = document.querySelector('select[name=state]');
var stateList = Array.from(new Set(fullTable.map(e => e.state))).sort();
selectorConstructor(stateList);

//creacion de array para datos filtrados
var filteredTable = [];
//variables de almacenamiento de datos
var checkboxes;
var state;

function filter() {

  //toma el valor de los checkbox
  checkboxes = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(e => e.value);
  //toma el valor de select
  state = document.querySelector('select.stateSelector').value;

  //vacia el array y borra la tabla existente
  filteredTable.length = 0;
  document.querySelector('tbody').innerHTML = '';

  //filtra según datos
  if (checkboxes.length !== 0 && state == 'false') {
    filteredTable = fullTable.filter(member => checkboxes.includes(member.party.toLowerCase()))
  } else if (checkboxes.length == 0 && state !== 'false') {
    filteredTable = fullTable.filter(member => member.state.toLowerCase() == state)
  } else if (checkboxes.length !== 0 && state !== 'false') {
    filteredTable = (fullTable.filter(member => checkboxes.includes(member.party.toLowerCase()))).filter(member => member.state.toLowerCase() == state)
  } else {
    fullTable.forEach(member => filteredTable.push(member))
  };

  //crea una nueva tabla a partir de datos en el array filtro
  filteredTable.forEach(addMember);

};

//Onchange Events
Array.from(document.querySelectorAll('input.party')).forEach(check => check.onchange = filter);
document.querySelector('select.stateSelector').onchange = filter;

//funcion creadora de tabla
function addMember(info) {

  let tableBody = document.querySelector('tbody');
  let memberRow = document.createElement('tr');
  let memberData = [`<a href="${info.url}">${info.first_name} ${info.middle_name || ''} ${info.last_name}</a>`, info.party, info.state, info.seniority + ' years', info.votes_with_party_pct + ' %'];

  memberData.forEach((cell) => {
    let td = document.createElement('td');
    td.innerHTML = cell;
    memberRow.appendChild(td);
  })

  tableBody.appendChild(memberRow);

};

//funcion creadora de menu de selección
function selectorConstructor(list) {

  list.forEach(opt => {
    let option = document.createElement('option');
    option.innerHTML = opt;
    option.setAttribute('value', opt.toLowerCase());
    selectMenu.appendChild(option)

  });
}
