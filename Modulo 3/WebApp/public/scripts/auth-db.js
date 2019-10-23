//Script de autenticación y base de datos

// Webapp's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyA6Mux2x78c7JlgLeW-c8tQ_nJQPaemLi0',
  authDomain: 'mh-nysl-webapp.firebaseapp.com',
  databaseURL: 'https://mh-nysl-webapp.firebaseio.com',
  projectId: 'mh-nysl-webapp',
  storageBucket: 'mh-nysl-webapp.appspot.com',
  messagingSenderId: '1057035938673',
  appId: '1:1057035938673:web:457121c2705b38e2'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Referencias a base de datos y auth
const db = firebase.firestore();
const auth = firebase.auth();

//Sign Up
const signUpForm = document.getElementById('sign-up-form');

signUpForm.onsubmit = form => {
  form.preventDefault();

  let email = signUpForm['sign-up-email'].value;
  let password = signUpForm['sign-up-password'].value;
  let displayName = signUpForm['sign-up-name'].value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(credential => {
      if (credential) {
        credential.user.updateProfile({ displayName: displayName });
      }
    })
    .then(() => alert('User Created!'))
    .catch(error => console.log(error));

  closeModal();

  signUpForm.reset();
};

//Log In
const logInForm = document.getElementById('log-in-form');

logInForm.onsubmit = form => {
  form.preventDefault();

  let email = logInForm['log-in-email'].value;
  let password = logInForm['log-in-password'].value;

  auth.signInWithEmailAndPassword(email, password).catch(error => alert(error));

  closeModal();

  logInForm.reset();
};

//Log Out
function confirmLogOut() {
  let check = confirm('Are you sure you want to log out?');

  if (check) {
    auth.signOut();
  }
}

// Fixture creation
const matchInfo = document.getElementById('match-info');

db.collection('season')
  .orderBy('month_id')
  .get()
  .then(snapshot =>
    snapshot.docs.forEach(month => seasonMonths(month, matchInfo))
  )
  .then(() => currentMatch());

//Stadium select
var stadium_adresses;

db.collection('stadiums')
  .get()
  .then(snapshot =>
    snapshot.docs.forEach(info => (stadium_adresses = info.data().stadium_info))
  )
  .then(function() {
    stadium_adresses.forEach(stadium => stadiumSelector(stadium));
  });

//Send Message
const messageForm = document.getElementById('message-form');

messageForm.onsubmit = form => {
  form.preventDefault();

  let title = messageForm['message-title'].value;
  let body = messageForm['message-body'].value;
  let user = auth.currentUser.displayName;
  let time = new Date().toLocaleString();
  let postId = Date.now();

  let messagesCollection = db.collection('messages');

  messagesCollection
    .where('match_id', '==', messageDoc)
    .get()
    .then(snapshot => {
      if (snapshot.docs.length == 0) {
        messagesCollection.add({
          match_id: messageDoc,
          posts: [
            {
              postId: postId,
              title: title,
              body: body,
              user: user,
              time: time
            }
          ]
        });

        closeModal();

        messageForm.reset();
      } else {
        messagesCollection.doc(snapshot.docs[0].id).update({
          posts: firebase.firestore.FieldValue.arrayUnion({
            postId: postId,
            title: title,
            body: body,
            user: user,
            time: time
          })
        });

        closeModal();

        messageForm.reset();
      }
    })
    .catch(error => alert(error));
};

//Render segun autenticación

auth.onAuthStateChanged(function(user) {
  if (user) {
    // User is logged in
    userMenu(user);
    messageDoc
      ? //If a match chat was selected before
        realTimeMessages()
      : //If the user arrived to message tab and is logged in
        (messFeed.innerHTML = `<p>Select a match from Fixture</p>`);
  } else {
    // User not logged
    userMenu();
    messFeed.innerHTML = `<p>Log In to see messages</p>`;
  }
});

//Función real time de mensajería
//Por la organización de la base de datos (colección > documento > variable array de mensajes),
//el feed se borra y regenera cuando hay cambios en el documento porque los cambios son escuchados desde la colección.
//Por esa razón no hago diferenciación entre cambios agregados, modificados o removidos
//Hay que cambiar la estructura de la base de datos (colección > mensaje x documento o con subcolecciones) para poder realizar un feed eficaz
//But it just works, cada vez q hay modificaciones actualiza el feed
function realTimeMessages() {
  db
    .collection('messages')
    .where('match_id', '==', messageDoc)
    .onSnapshot(querySnapshot => {
      if (querySnapshot.empty == true) {
        messFeed.innerHTML = `<p>There are no messages yet</p>`;
      } else {
        messFeed.innerHTML = '';
        querySnapshot.forEach(change => {
          change.data().posts.forEach(post => renderMessage(post));
        });
      }
    }),
    () => {
      console.log('No permissions to read posts');
    };
}
