const logoutBtn = document.querySelector('#logout-btn');
const displayName = document.querySelector('#display-name');


// log out
logoutBtn.addEventListener('click', function() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      displayName.innerText = 'logout realizado'
      window.location.href = "index.html";
    })
})