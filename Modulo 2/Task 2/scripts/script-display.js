//Función de generación de filas
const tableBody = document.querySelector('tbody');

function addMember(info) {

  let memberRow = document.createElement('tr');

  let memberData = [`<a href="${info.url}">${info.first_name} ${info.middle_name || ''} ${info.last_name}</a>`, info.party, info.state, info.seniority + ' years', info.votes_with_party_pct + ' %'];

  memberData.forEach((cell,i) => {
    let td = document.createElement('td');
    td.innerHTML = cell;
    if(i == 2){
      td.classList.add('stateCell')
    }
    memberRow.appendChild(td);
    memberRow.classList.add(info.party.toLowerCase(), info.state.toLowerCase());
  })

  tableBody.appendChild(memberRow);

};

//Carga de datos en tabla
data.results[0].members.forEach(addMember);

//Party checkboxes
var checkboxes = [];

let trDem = Array.from(document.querySelectorAll('tr.d'));
let trRep = Array.from(document.querySelectorAll('tr.r'));
let trInd = Array.from(document.querySelectorAll('tr.i'));

function filter(evt) {
  //Array de resultados
  if (evt.target.checked && !checkboxes.includes(evt.target.value)) {
    checkboxes.push(evt.target.value)
  } else {
    checkboxes.splice(checkboxes.indexOf(evt.target.value), 1);
  }
  //Display Toggler
  trDem.forEach(e => e.classList.toggle('d-none', !checkboxes.includes('d')));
  trRep.forEach(e => e.classList.toggle('d-none', !checkboxes.includes('r')));
  trInd.forEach(e => e.classList.toggle('d-none', !checkboxes.includes('i')));
  //Caso de array vacío
  if (checkboxes.length == 0) {
    (trDem.concat(trRep).concat(trInd)).forEach(e => e.classList.remove('d-none'));
  }

};
//Onchange Event para checkboxes
Array.from(document.querySelectorAll('input.party')).forEach(check => check.onchange = filter);

//Generador de elementos de state selection
const selectMenu = document.querySelector('select.stateSelector');

const rows = Array.from(document.querySelectorAll('tbody tr'));

var stateCells = Array.from(document.querySelectorAll('td.stateCell'));

var stateList = Array.from(new Set(stateCells.map(mem => mem.innerHTML))).sort();

//creacion de elementos de menu de seleccion
stateList.forEach(opt => {
  let option = document.createElement('option');
  option.innerHTML = opt;
  option.setAttribute('value', opt.toLowerCase());
  selectMenu.appendChild(option)
});

//Filtro por estado **altera todo en la segunda seleccion e ignora checkboxes**
function filterBySelect(sel) {
  let filteredArr = rows.filter(e => !e.classList.contains(sel.target.value));
  filteredArr.forEach(e => e.classList.toggle('d-none'));
};


//OnChange event para el state dropwdown
selectMenu.onchange = filterBySelect;
