$(document).ready(function () {

  $('#btn-create-user').click(function () {
    event.preventDefault();
    let email = $('#input-email').val();
    let password = $('#input-password').val();

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (users) {
        window.location.href = "categories_create_user.html";
      })
      .catch(function (error) {
        alert('Falha na autenticação');
      });
  });

  $('#btnLogin').click(function () {
    event.preventDefault();
    let email = $('#input-email').val();
    let password = $('#input-password').val();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function (users) {
        window.location.href = "feed.html";
      })
      .catch(function (error) {
        alert('Falha no Login');
      });
  });

  $('#facebook-btn').click(function () {
    let provider = new firebase.auth.FacebookAuthProvider();
    // signIn(provider);
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        let token = result.credential.accessToken;
        let user = result.user;
        let name = result.user.displayName;
        window.location.href = "feed.html";
      }).catch(function (error) {
        alert('Falha na autenticação');
      });
  });

  $('#google-btn').click(function () {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        console.log(result);
        let token = result.credential.accessToken;
        let user = result.user;
        let name = result.user.displayName;
        window.location.href = "feed.html";
      }).catch(function (error) {
        alert('Falha na autenticação');
      });
  });

  var user = firebase.auth().currentUser;

  $('#logout-btn').click(function () {
    firebase
      .auth()
      .signOut()
      .then(function (result) {
        window.location.href = "index.html";
      });
  });

});


