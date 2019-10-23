//Script de funciones de funcionamiento general

// Funciones para selección de mapa
// Para Lista fixture
function setMapLocation() {
  let url = stadium_adresses.filter(
    e =>
      e.stadium_name ==
      event.target.previousElementSibling.previousElementSibling.innerText
  )[0].embed_url;
  document.getElementById('selected-map').setAttribute('src', url);

  momToggle('maps');
}

// Para select de Tab Maps
function selectedMapLocation() {
  document
    .getElementById('selected-map')
    .setAttribute('src', event.target.value);
}

//Mostrar modal
function showModal(id) {
  let modal = document.getElementById(id + '-modal');
  modal.classList.add('active');
}

// Boton Cerrar modal
function closeModal() {
  let modal = document.querySelector('.active');
  modal.classList.remove('active');
}

//Cerrar cliqueando fuera del modal
window.onclick = function() {
  let modal = document.querySelector('.active');

  if (event.target == modal) {
    modal.classList.remove('active');
    modal.firstElementChild.lastElementChild.reset();
  }
};

// Message/Map Toggle con width > 768
//Alterna esas secciones si se cliquean los botones en el fixture
function momToggle(target) {
  let maps = document.getElementById('tab-maps');
  let messages = document.getElementById('tab-messages');

  if (screen.width > 768) {
    switch (target) {
      case 'maps':
        maps.style.display = 'contents';
        messages.style.display = 'none';
        break;

      case 'messages':
        maps.style.display = 'none';
        messages.style.display = 'contents';

      default:
        break;
    }
  }
}

//Show/Hide on auth
function userMenu(user) {
  let loggedOut = document.querySelectorAll('.logged-out');
  let loggedIn = document.querySelectorAll('.logged-in');

  if (user) {
    loggedIn.forEach(li => (li.style.display = 'block'));
    loggedOut.forEach(li => (li.style.display = 'none'));
    document.getElementById('message').disabled = false;
  } else {
    loggedIn.forEach(li => (li.style.display = 'none'));
    loggedOut.forEach(li => (li.style.display = 'block'));
    document.getElementById('message').disabled = true;
  }
}

//Message Doc Id
var messageDoc;

//Boton de mensajeria en el fixture
//Capta el ID del partido, consigue y reemplaza el titulo de chat,
//inicia el real time listening del documento adecuado y
//alterna las secciones de mapa y chat según el tamaño de pantalla
function messageLinkAction() {
  messageDoc = event.target.parentElement.getAttribute('data-match-id');

  let selectedMatchTitle =
    event.target.parentElement.firstElementChild.innerText;

  chatTitle(selectedMatchTitle);

  realTimeMessages();

  momToggle('messages');
}
