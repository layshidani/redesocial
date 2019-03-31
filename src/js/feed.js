window.onload = () => {
  // Get a reference to the database service
  const database = firebase.database();

  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;
  
  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;
  }

  $(document).ready(function () {
    // Email na base de dados
    $('#btn-create-user').click(function (event) {
      event.preventDefault();
      const email = $('#input-email').val();
      database.ref('email').push({
        email: email,
      })

    })


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
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
    
      let hourPost = `${day}/${month}/${year} - ${hour}:${min}`
      return hourPost;
    }
    const hourPost = e();

    // Mensagens na base de dados
    $('#post-btn').click(function (event) {
      event.preventDefault();
      let newPost = $('#comment-text').val();

      if (newPost !== '') {
        database.ref('posts').push({
          text: newPost,
          hour: hourPost,
        })
        $('#posts').append(`<li class='post-card'>${hourPost} <br> >>> ${newPost}</li>`);
        $('#comment-text').val('');
      } else {
        alert('O campo de texto não pode estar vazio :/');
      }
    });
  });
};