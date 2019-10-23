//Menu principal

let menuBtn = document.getElementById('menuBtn');

let menu = document.getElementById('menu');

//Transformación según estado de checkbox
menuBtn.addEventListener('change', menuToggle);

function menuToggle() {
  if (menuBtn.checked == true) {
    menu.style.transform = 'none';
  } else {
    menu.style.transform = 'translate(-100%, 0)';
  }

  menuBtn.parentElement.classList.toggle('movedBtn');
}

//Cerrado por click fuera del menu
menu.addEventListener('click', () => {
  menuBtn.checked = false;
  menuToggle();
});

//Mostrar modal
function showModal(id) {
  let modal = document.getElementById(id + '-modal');
  modal.classList.add('active');

  if (menuBtn.checked) {
    menuBtn.checked = false;
    menuBtn.parentElement.classList.remove('movedBtn');
    menuToggle();
  }
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

//Cerrar app
document
  .getElementById('exit')
  .addEventListener('click', () => this.window.close());
