window.onload = () => {
// Get a reference to the database service
  const database = firebase.database();
  const postsCollection = database.ref('posts');
  let textInput = $('#comment-text').val();

  $('#post-btn').click(function (textInput) {
    console.log('click');

    if (textInput !== '') {
    database.ref(`posts/newPost`).set({
      textInput,
    })    
    .then(() => console.log(textInput))
      
      $('#comment-text').val('');
    } else {
      alert('O campo de texto não pode estar vazio :/');
    }
  });
}
