let facebookBtn = document.querySelector('#facebook-btn');
let googleBtn = document.querySelector('#google-btn');

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
facebookBtn.addEventListener('click', function () {
  var provider = new firebase.auth.FacebookAuthProvider();
  signIn(provider);
});

// Autenticação via google
googleBtn.addEventListener('click', function() {
  var provider = new firebase.auth.GoogleAuthProvider();
  signIn(provider);
});
