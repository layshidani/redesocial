// TESTE AUTH GOOGLE

var config = {
    apiKey: "AIzaSyB9RyK56kqSgV4Mr73m3qKmwy0PcGl2Xkk",
    authDomain: "serview-2019.firebaseapp.com",
    databaseURL: "https://serview-2019.firebaseio.com",
    projectId: "serview-2019",
    storageBucket: "serview-2019.appspot.com",
    messagingSenderId: "383862721947"
  };
firebase.initializeApp(config);

const auth = firebase.auth();

var gmail = document.getElementById("google-btn");

gmail.addEventListener('click', e => {
    var provider = new firebase.auth.GoogleAuthProvider();

    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    
    provider.setCustomParameters({
        'login_hint': 'user@example.com'
    });
    
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
    
    firebase.auth().signInWithRedirect(provider);
    
    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
    }).catch(function(error) {
    // An error happened.
    });
    
});

