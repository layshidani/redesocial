let facebookBtn = document.querySelector('#facebook-btn');

// facebook authentication 
facebookBtn.addEventListener('click', function () {
  // Providers
  var provider = new firebase.auth.FacebookAuthProvider();
  signIn(provider);
});

function signIn(provider) {
  firebase.auth()
      .signInWithPopup(provider)
      .then(function (result) {
          console.log(result);
          var token = result.credential.accessToken;
          displayName.innerText = 'Bem vindo, ' + result.user.displayName;
      }).catch(function (error) {
          console.log(error);
          alert('Falha na autenticação');
      });
}

