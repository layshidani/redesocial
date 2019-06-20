$(document).ready(() => {
  $('#btn-create-user').click(() => {
    event.preventDefault();
    const email = $('#input-email').val();
    const password = $('#input-password').val();
    const userName = $('#input-name').val();

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: userName,
          photoURL: '',
        })
        .then(() => window.location.href = 'categories_create_user.html');
      })
      .catch(error => $('#error-msg').text(error.message));
  });

  $('#btnLogin').click(() => {
    event.preventDefault();
    const email = $('#input-email').val();
    const password = $('#input-password').val();
    
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => window.location.href = 'feed.html')
      .catch(error => $('#error-msg').text(error.message));
  });

  $('#facebook-btn').click(() => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => window.location.href = 'feed.html')
      .catch(error => $('#error-msg').text(error.message));
    
  });

  $('#google-btn').click(() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => window.location.href = 'feed.html')
      .catch(error => $('#error-msg').text(error.message));
  });

  $('#logout-btn').click(() => {
    firebase
      .auth()
      .signOut()
      .then(() => window.location.href = 'index.html');
  });
});
