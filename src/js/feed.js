window.onload = () => {
  // Get a reference to the database service
  const database = firebase.database();
  const postsRef = firebase.database().ref('feed');
  const postsContainer = $('#posts-container')[0];
  let likes = 0;

  firebase.database().ref('feed/posts').once('value').then(snapshot => {
    console.log(snapshot.val());
    snapshot.forEach(value => {
      let firebaseDate = value.val().date;
      let firebaseText = value.val().text;
      postTemplate(firebaseDate, firebaseText);

    })
  })


  // data e hora do post
  function getDate() {
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    let postDate = `${day}/${month}/${year} - ${hour}:${min}`
    return postDate;
  };



  function getText() {
    return $('#comment-text').val();
  }

  const postTemplate = function (date, textPost) {
    // cabeçaho do post
    let name = document.createElement('h2');
    name.innerText = '@user';

    let header = document.createElement('h5');
    header.innerText = date;
    header.classList.add('post-title');

    // mensagem
    let text = document.createElement('p');
    text.innerText = textPost;

    // editar postagem
    let editPost = document.createElement('button');
    editPost.innerText = 'editar';

    // excluir postagem
    let deletePost = document.createElement('button');
    deletePost.innerText = 'excluir';

    // botão curtir
    let likeBtn = document.createElement('button');
    likeBtn.innerText = 'curtir';

    // contador de curtidas
    let counter = document.createElement('span');
    counter.innerHTML = likes + ' curtidas';

    // card de postagem
    let card = document.createElement('div');

    // inserir informações no card
    card.appendChild(name);
    card.appendChild(header);
    card.appendChild(text);
    card.appendChild(editPost);
    card.appendChild(deletePost);
    card.appendChild(likeBtn);
    card.appendChild(counter);

    // adiciona nos posts
    postsContainer.insertBefore(card, postsContainer.childNodes[0]);
  }

  $('#post-btn').click(function publishPost() {
    let newPost = {
      text: getText(),
      date: getDate(),
    }

    postsRef.child('/posts').push(newPost).then(() => postTemplate(getDate(), getText()));

    // clearText();
  });

  // function clearText() {
  //   $('#comment-text').val('');
  // }


};

