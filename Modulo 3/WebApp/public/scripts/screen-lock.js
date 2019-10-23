// Inicialización de service worker, permite la utilización de beforeinstalprompt,
// con la aplicacion en modo fullscreen, ayudaría al orientation lock
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    console.log('Logging service worker');
    navigator.serviceWorker
      .register('../service-worker.js')
      .then(function(reg) {
        console.log('Service worker logged succesfully ' + reg.scope);
      })
      .catch(function(err) {
        console.log('An error ocurred ', err);
      });
  });
}

//botón a2hs
const btnAdd = document.getElementById('add-to-hs');

//manejo beforeinstallprompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', function(e) {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI / notify the user they can add to home screen
  btnAdd.style.display = 'block';
});

btnAdd.addEventListener('click', function(e) {
  // hide our user interface that shows our A2HS button
  btnAdd.style.display = 'none';
  // Show the prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then(choiceResult => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
    } else {
      console.log('User dismissed the A2HS prompt');
    }
    deferredPrompt = null;
  });
});

window.addEventListener('appinstalled', function(evt) {
  console.log('A2hs installed ' + evt);
  alert('Look for the app in your device!');
  setTimeout(function() {
    window.close();
  }, 5000);
});

//Orientation Lock

//Objeto mágico de request y exit fullscreen
var fullscreen = {
  request: function() {
    if (document.documentElement.requestFullscreen) {
      document.documentElement
        .requestFullscreen()
        .catch(err => console.log(err));
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement
        .msRequestFullscreen()
        .catch(err => console.log(err));
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement
        .mozRequestFullScreen()
        .catch(err => console.log(err));
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement
        .webkitRequestFullscreen()
        .catch(err => console.log(err));
    }
  },
  exit: function() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
};

//función confirmación de lock
function lockConfirm() {
  console.log('Screen locked to ' + screen.orientation.type);
}

//función lock screen
function lockOrientation() {
  if (screen.width < 768 && screen.height < 1024) {
    screen.orientation
      .lock('portrait-primary')
      .then(function() {
        lockConfirm();
      })
      .catch(err => console.log(err));
  } else {
    screen.orientation
      .lock('landscape-primary')
      .then(function() {
        lockConfirm();
      })
      .catch(err => console.log(err));
  }
}

//condicional si se inicia desde la app instalada
if (
  window.matchMedia('(display-mode: fullscreen)').matches ||
  window.navigator.fullscreen === true
) {
  console.log('Display mode is fullscreen');
  screen.orientation.addEventListener('change', function() {
    fullscreen.request();
    lockOrientation();
  });
}
