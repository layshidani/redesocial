window.onload = () => {
  // Get a reference to the database service
  const database = firebase.database();
  const posts = firebase.database().ref('posts');

  (function () {
    posts.once('value').then(snapshot => {
      console.log(snapshot.val());
    });


  })();

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

  let likes = 0;

  const postTemplate = function() {
    // cabeçaho do post
    let name = document.createElement('h1');
    name.innerText = '@user';

    let header = document.createElement('h2');
    header.innerText = getDate();
    header.classList.add('post-title');

    // mensagem
    let text = document.createElement('p');
    text.innerText = newPost;
    
    // editar postagem
    let editPost = document.createElement('a');
    editPost.innerText = editar;

    // excluir postagem
    let deletePost = document.createElement('a');
    deletePost.innerText = excluir;

    // botão curtir
    let likeBtn = document.createElement('p');
    likeBtn.textContent = `<a>curtir</a>`

    // contador de curtidas
    let counter = document.createElement('span');
    counter.innerHTML = likes;

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
  }

  // Mensagens na base de dados
  $('#post-btn').click(function (event) {
    event.preventDefault();
    let newPost = $('#comment-text').val();

    if (newPost !== '') {
      database.ref('posts').push({
        text: newPost,
        date: getDate(),
      })
      $('#posts').append(`<li class='post-card'>${getDate()} <br> >>> ${newPost}</li>`);
      $('#comment-text').val('');
    } else {
      alert('O campo de texto não pode estar vazio :/');
    }
  });
  
};

