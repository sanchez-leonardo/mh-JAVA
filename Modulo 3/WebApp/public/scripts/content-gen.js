//Script de funciones de generación de DOM

// Render de tabla
// Función para creación de los elementos de cada partido
function dateMatch(match, parent) {
  let liEl = document.createElement('li');
  liEl.setAttribute('class', 'date-match');
  liEl.setAttribute('data-match-id', match.match_id);

  let teamP = document.createElement('p');
  let matchName = match.team_1 + ' vs. ' + match.team_2;
  teamP.innerHTML = matchName;

  let timeP = document.createElement('p');
  timeP.innerText = match.time;

  let stadiumP = document.createElement('p');
  stadiumP.innerText = match.stadium_name;

  let mesButton = document.createElement('a');
  mesButton.setAttribute('href', '#tab-messages');
  mesButton.setAttribute('class', 'message-link');
  mesButton.setAttribute('onclick', 'messageLinkAction()');
  mesButton.setAttribute('aria-label', 'Link to ' + matchName + 'messages');

  let locButton = document.createElement('a');
  locButton.setAttribute('href', '#tab-maps');
  locButton.setAttribute('class', 'map-link');
  locButton.setAttribute('onclick', 'setMapLocation()');
  locButton.setAttribute('aria-label', 'Link to ' + matchName + 'map');

  let contents = [teamP, timeP, stadiumP, mesButton, locButton];

  liEl.append(...contents);
  parent.appendChild(liEl);
}

//Función para creacion de cada día de juegos
function dayMatches(dates, parent) {
  let daysUl = document.createElement('ul');

  let dayLi = document.createElement('li');
  dayLi.setAttribute('class', 'season-date');
  dayLi.setAttribute('data-date-day', dates.date);
  dayLi.innerText = dates.date;

  daysUl.appendChild(dayLi);

  dates.matches.forEach(match => dateMatch(match, daysUl));
  parent.appendChild(daysUl);
}

// Función para creación de cada mes de la temporada
function seasonMonths(month, parent) {
  let monthM = document.createElement('ul');
  monthM.setAttribute('class', 'season-month');
  monthM.setAttribute('data-doc-id', month.id);

  let title = document.createElement('h3');
  title.innerText = month.data().month;

  let titleLi = document.createElement('li');
  titleLi.appendChild(title);

  let day = document.createElement('li');
  month.data().dates.forEach(date => dayMatches(date, day));

  let contents = [titleLi, day];

  monthM.append(...contents);
  parent.appendChild(monthM);
}

//Render de select
function stadiumSelector(stadium) {
  let selectMenu = document.getElementById('stadium-select');
  let option = document.createElement('option');

  option.setAttribute('value', stadium.embed_url);
  option.innerText = stadium.stadium_name;

  selectMenu.appendChild(option);
}

//Si hay partidos en el dia, los coloca en el panel principal
//Acepta un parámetro (una fecha), que si es pasado, lo usa como
//día y busca los partidos correspondientes, para debugging/ciencia
function currentMatch() {
  let today = new Date().toLocaleDateString('en-EN', {
    month: 'numeric',
    day: 'numeric'
  });

  let announcement = document.getElementById('current-match');

  let seasonDates = Array.from(document.querySelectorAll('.season-date'));

  let matchDay = seasonDates.filter(match => match.dataset.dateDay == today)[0];

  if (matchDay) {
    announcement.innerHTML = '';

    let ul = document.createElement('ul');

    let todaysMatches = [
      matchDay.nextElementSibling,
      matchDay.nextElementSibling.nextElementSibling
    ];

    todaysMatches.forEach(match => (ul.innerHTML += match.outerHTML));

    announcement.appendChild(ul);
  } else {
    announcement.innerHTML = `<p><strong>There are no matches today!!</strong></p>
    <p>
      Check the <strong>Fixture</strong> section for information on this
      season's matches or the <strong>Maps</strong> section for
      information on the stadiums
    </p>`;
  }
}

//Trigger para mostrar los partidos del día
//document.getElementById('match-info').onload = currentMatch();

//Setea el título del chat acorde al partido elegido
function chatTitle(title) {
  let chatTitle = document.getElementById('match-title');
  chatTitle.innerText = '';
  chatTitle.innerText = title;
}

//Render mensajes
const messFeed = document.getElementById('messages-feed');

function renderMessage(data) {
  let post = document.createElement('div');
  post.setAttribute('data-post-id', data.postId);
  post.setAttribute('class', 'post-container');

  let person = document.createElement('p');
  person.setAttribute('class', 'post-person');
  person.innerHTML = `<span>${data.user}</span> @ <span>${data.time}</span> said:`;

  let postTitle = document.createElement('h4');
  postTitle.setAttribute('class', 'post-title');
  postTitle.innerText = data.title;

  let postBody = document.createElement('p');
  postBody.setAttribute('class', 'post-body');
  postBody.innerText = data.body;

  let content = [person, postTitle, postBody];
  post.append(...content);

  messFeed.appendChild(post);
}
