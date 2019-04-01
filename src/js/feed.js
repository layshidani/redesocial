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

  const postTemplate = function(date, textPost) {
    // cabeçaho do post
    let name = document.createElement('p');
    name.setAttribute('class', 'user-name');
    name.innerText = '@user';

    let header = document.createElement('span');
    header.setAttribute('class', 'date-time');
    header.innerText = date;
    
    // mensagem
    let text = document.createElement('h3');
    text.setAttribute('class', 'text-post');
    text.innerText = textPost;
    
    // editar postagem
    let editPost = document.createElement('button');
    editPost.setAttribute('class', 'edit-btn');
    editPost.innerText = 'editar';
    
    // excluir postagem
    let deletePost = document.createElement('button');
    deletePost.setAttribute('class', 'delete-btn');
    deletePost.innerText = 'excluir';

    // botão curtir
    let likeBtn = document.createElement('button');
    likeBtn.setAttribute('id', 'like-btn');
    likeBtn.innerText = 'curtir';

    // contador de curtidas
    let counter = document.createElement('span');
    counter.setAttribute('id', 'showLikes');
    counter.innerHTML = 0 + ' curtidas';

    // card de postagem
    let card = document.createElement('div');
    card.setAttribute('class', 'post-card');
    
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
      curtidas: likes,
    }

    postsRef.child('/posts').push(newPost).then(() => postTemplate(getDate(), getText()));

    // clearText();
  });

  /************************
  * funções em construção:
  *************************/

  // function clearText() {
  //   $('#comment-text').val('');
  // }

  $('#like-btn').click(function likePost(id) {
    console.log('like');
    
    let countLikes = +likes.innerText;
    countLikes = countLikes + 1;
    

    postsRef.child(id + '/curtidas').set(countLikes).then(counter.innerText = countLikes);
  })


  
};

