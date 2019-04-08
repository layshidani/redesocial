$(document).ready(function () {

  $('#btn-create-user').click(function () {
    event.preventDefault();
    let email = $('#input-email').val();
    console.log(email);
    let password = $('#input-password').val();
    let userName = $('#input-name').val();
    console.log(userName);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (users) {
        let user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: userName,
          photoURL: '',
        })
        .then(() => {
          window.location.href = "categories_create_user.html";
        });
        
        
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // alert(errorMessage);
        $('#error-msg').text(errorMessage);
        console.log('errorMessage: ', errorMessage);
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
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        $('#error-msg').text(errorMessage);
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


