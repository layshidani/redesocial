window.onload = () => {
// Get a reference to the database service
const database = firebase.database();

$(document).ready(function () {
  // Email na base de dados
  $('#btn-create-user').click(function (event) {
    event.preventDefault();

    const email = $('#input-email').val();

    database.ref('email').push({
      email: email,
    })

  })
  // Mensagens na base de dados
  $('#post-btn').click(function (event) {
    event.preventDefault();

    let newPost = $('#comment-text').val();

    database.ref('posts').push({
      text: newPost,
    })

    if (newPost !== '') {
      $('#posts').append(`<li class='post-card'>${newPost} ${hourPost}</li>`);
      $('#comment-text').val('');
      $(this).dialog('close');
    } else {
      alert('O campo de texto não pode estar vazio :/');
    }
  });

});

// const timePost = (x) => {
//   let date = new Date();
//   let hour = date.getHours();
//   let min = date.getMinutes();
//   let hourPost = hour + ":" + min;
//   return hourPost;
// };

// console.log(timePost)

function e() {
  let date = new Date();
  let hour = date.getHours();
  let min = date.getMinutes();
  let hourPost = hour + ":" + min;
  return hourPost;
}
const hourPost = e();
console.log(e())




// $('#post-btn').click(function () {
//   let textInput = $('#comment-text').val();
//   console.log('click');

//   if (textInput !== '') {
//     $('#posts').append(`<li class='post-card'>${textInput}</li>`);
//     $('#comment-text').val('');
//     $(this).dialog('close');
//   } else {
//     alert('O campo de texto não pode estar vazio :/');
//   }
// });
