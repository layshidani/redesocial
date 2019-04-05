window.onload = () => {

  event.preventDefault();
  // Get a reference to the database service
  const database = firebase.database();
  const feedDatabase = database.ref('feed');
  const postsContainer = $('#posts-container')[0];
  let likes = 0;

  database.ref('feed/posts').once('value').then(snapshot => {
    snapshot.forEach(value => {
      let childkey = value.key;
      let childData = value.val();
      let firebaseDate = childData.date;
      let firebaseText = childData.text;
      postTemplate(firebaseDate, firebaseText, childkey);
    })
  });

  // data e hora do post
  function getDate() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let time = Date().split(' ')[4];

    let postDate = `${day}/${month}/${year} - ${time}`
    return postDate;
  };

  function getText() {
    return $('#comment-text').val();
  }

  const postTemplate = function (date, textPost, key) {
    // cabeçaho do post
    let name = document.createElement('p');
    name.setAttribute('class', 'user-name');
    name.innerText = '@user';

    let header = document.createElement('span');
    header.setAttribute('class', 'date-time');
    header.innerText = date;

    // mensagem
    let text = document.createElement('p');
    text.setAttribute('class', 'text-post');
    text.setAttribute('id', 'comment-post');
    text.setAttribute('text-data-id', key);
    text.innerText = textPost;

    // editar postagem
    let editPost = document.createElement('button');
    editPost.setAttribute('class', 'post-btn');
    editPost.setAttribute('id', 'edit-btn');
    editPost.setAttribute('class', 'far fa-edit btn btn-default navbar-btn');
    editPost.setAttribute('edit-data-id', key);
    editPost.setAttribute('data-target', '#newModal');
    editPost.setAttribute('data-toggle', 'modal');
    editPost.innerText = '';

    // excluir postagem
    let deletePost = document.createElement('button');
    deletePost.setAttribute('class', 'post-btn');
    deletePost.setAttribute('id', 'delete-btn');
    deletePost.setAttribute('data-id', key);
    deletePost.setAttribute('class', 'far fa-trash-alt btn btn-default navbar-btn');
    deletePost.innerText = '';

    // botão curtir
    let likeBtn = document.createElement('button');
    likeBtn.setAttribute('id', 'like-btn');
    likeBtn.setAttribute('class', 'far fa-thumbs-up btn btn-default navbar-btn');
    likeBtn.innerText = '';

    // contador de curtidas
    let counter = document.createElement('span');
    counter.setAttribute('id', 'show-likes');
    counter.setAttribute('class', 'show-likes');
    counter.innerHTML = 0 + ' curtidas';

    // card de postagem
    let card = document.createElement('div');
    card.setAttribute('class', 'post-card');
    card.setAttribute('id', 'post-card-key');
    card.setAttribute('data-idcard', key);

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
    const newPost = {
      text: getText(),
      date: getDate(),
      curtidas: likes,
    }
    
    feedDatabase.child('/posts').push(newPost).then((snapshot) => postTemplate(getDate(), getText(), snapshot.key));
  });


  $(document).on('click', '#delete-btn', function() {
    let confirmDelete = confirm('Tem certeza que quer excluir?');
    if (confirmDelete) {
      let cardKey = this.getAttribute('data-id');
      feedDatabase.child('/posts/' + cardKey).remove().then(() => {
        $(this).parent('.post-card').remove();
      });
    }
  });
  
  /************************
  * funções em construção:
  *************************/


  $(document).on('click', '#edit-btn', function() { 
    let editKey = this.getAttribute('edit-data-id');
    
    let oldText = $(`p[text-data-id=${editKey}]`).text();

    $('#new-comment-text').val(oldText);

    $('#new-post-btn').click(function() {
      let newText = $('#new-comment-text').val();
      console.log('newText: ', newText);
      
      feedDatabase.child('/posts/' + editKey).update({
        text: `${newText} (editado)`,
      }).then(() => {
        location.reload();
      })
    })
  });
};