// Butões
let btnFacebook = document.querySelector('#btn-facebook');
let btnLogin = document.querySelector('#btn-login');
let btnCreateUser = document.querySelector('#btn-create-user');
// Inputs
let inputEmail = document.querySelector('#input-email');
let inputPassword = document.querySelector('#input-password');

function signIn(provider) {
  firebase.auth()
    .signInWithPopup(provider)
    .then(function (result) {
      console.log(result);
      var token = result.credential.accessToken;
      var user = result.user;
      var name = result.user.displayName;
      window.location.href = "feed.html";
    }).catch(function (error) {
      console.error(error);
      alert('Falha na autenticação');
    });
}

// Autenticação via facebook
btnFacebook.addEventListener('click', function () {
  var provider = new firebase.auth.FacebookAuthProvider();
  signIn(provider);
});


// Autenticação via email
btnCreateUser.addEventListener('click', function () {
  firebase
    .auth()
    .createUserWithEmailAndPassword(inputEmail.value, inputPassword.value)
    .then(function (result) {
      console.log(result);
      // var token = result.credential.accessToken;
      let user = result.user;
      let name = result.user.displayName;
      window.location.href = "feed.html";
    })
    .catch(function (error) {
      console.error(error);
      alert('Falha na autenticação');
    });
});