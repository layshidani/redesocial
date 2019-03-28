// Get a reference to the database service
var database = firebase.database();

$('#logout-btn').click(function () {

  firebase
    .auth()
    .signOut()
    .then(function (result) {
      console.log(result);
      window.location.href = "index.html";
    })
});

$('#post-btn').click(function() {
  let textInput = $('#comment-text').val();
  console.log('click');
  
  if (textInput !== '') {
    $('#posts').append(`<li class='post-card'>${textInput}</li>`);
    $('#comment-text').val('');
    $(this).dialog('close');
  } else {
    alert('O campo de texto não pode estar vazio :/');
  }
});

