$(document).ready(function () {

  $('#btn-create-user').click(function () {
    event.preventDefault();
    let email = $('#input-email').val();
    let password = $('#input-password').val();

    console.log('cliquei')
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function () {
        window.location.href = "categories_create_user.html";
      })
      .catch(function (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
      });
  });

  $('#btnLogin').click(function () {
    event.preventDefault();
    let email = $('#input-email').val();
    let password = $('#input-password').val();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function () {
        window.location.href = "feed.html";
      })
      .catch(function (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
      });
  });

  $('#facebook-btn').click(function () {
    let provider = new firebase.auth.FacebookAuthProvider();
    // signIn(provider);
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
        console.error(error);
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
        console.error(error);
        alert('Falha na autenticação');
      });
  });

  $('#logout-btn').click(function () {

    firebase
      .auth()
      .signOut()
      .then(function (result) {
        console.log(result);
        window.location.href = "index.html";
      });
  });

});


