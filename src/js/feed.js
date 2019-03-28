$('.dropdown-toggle').dropdown();

$(document).ready(function () {

  $('#logout-btn').click(function () {

    firebase
      .auth()
      .signOut()
      .then(function (result) {
        console.log(result);
        window.location.href = "index.html";
      })
  })
});
