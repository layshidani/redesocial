window.onload = () => {

  event.preventDefault();
  // Get a reference to the database service
  const database = firebase.database();
  const feedDatabase = database.ref('feed');
  const postsContainer = $('#posts-container')[0];
  let likes = 0;

  database.ref('feed/posts').once('value').then(snapshot => {
    console.log(snapshot.val());
    snapshot.forEach(value => {
      let childkey = value.key;
      console.log('childkey: ', childkey);
      let childData = value.val();
      console.log('childData: ', childData);
      let firebaseDate = value.val().date;
      let firebaseText = value.val().text;
      postTemplate(firebaseDate, firebaseText, childkey);
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
    text.innerText = textPost;

    // editar postagem
    let editPost = document.createElement('button');
    editPost.setAttribute('class', 'post-btn');
    editPost.setAttribute('id', 'edit-btn');
    editPost.setAttribute('class', 'far fa-edit btn btn-default navbar-btn');
    editPost.setAttribute('data-id', key);
    editPost.setAttribute('data-target', '#newModal');
    editPost.setAttribute('data-toggle', 'modal');
    editPost.innerText = '';

    // excluir postagem
    let deletePost = document.createElement('button');
    deletePost.setAttribute('class', 'post-btn');
    deletePost.setAttribute('id', 'delete-btn');
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

    // clearText();

  });

  /************************
  * funções em construção:
  *************************/

  // function clearText() {
  //   $('#comment-text').val('');
  // }


  $(document).on('click', '#delete-btn', function () {
    event.preventDefault();
    let confirmDelete = confirm('Tem certeza que quer excluir?');
    if (confirmDelete === true) {
      let postKeycard = document.getElementById('post-card-key');
      let cardPost = postKeycard.getAttribute('data-idcard');
      feedDatabase.child('/posts/' + cardPost).remove().then(() => {
        $(this).parent('.post-card').remove();
      });
    } else {
    }
  })


  $(document).on('click', '#like-btn', function (postDate) {
    // event.preventDefault();
    likes++;
    let postKeycard = document.getElementById('post-card-key');
    let cardPost = postKeycard.getAttribute('data-idcard');
    // lk precisa ser com o ID correspondente do card
    let lk = document.getElementById("show-likes");
    lk.innerHTML = likes + ' curtidas';
    feedDatabase.child('/posts/' + cardPost).update({
      curtidas: likes,
    })
    console.log(cardPost);
    // return likes;
  })

  // let countLikes = 0;
  // $(document).on('click', '#like-btn', getLikes(countLikes, postKeycard));
  // function getLikes(countLikes, postKeycard) {
  //   // pegar card
  //   console.log(postKeycard);
  //   // cada card tem um contador de likes
  //   countLikes++;
  //   document.getElementById("show-likes").innerHTML = countLikes + ' curtidas';

  //   // return likes;
  //   feedDatabase.child(id + '/curtidas').set(countLikes).then(counter.innerText = countLikes);
  // }
  $(document).on('click', '#edit-btn', function () {
    event.preventDefault();
    console.log('Sim')
    let postKeycard = document.getElementById('post-card-key');
    let cardPost = postKeycard.getAttribute('data-idcard');

    let newText = $('#new-comment-text').val();
    console.log('newText: ', newText);

    feedDatabase.child('/posts/' + cardPost).update({
      text: newText,

    }).then(() => {
      jQuery('#comment-post').html(newText);
    })
  });


  // $(document).on('click', '#new-post-btn', function editPost() {
  //   console.log('Confirme edit clicado');

  //   let edit = document.getElementById('edit-btn');
  //   let editId = edit.dataset.id;
  //   let teste = firebase.database().ref('feed/posts/' + editId).once('value');
  //   console.log('teste: ', teste);
  //   let newText = $('#new-comment-text').val();
  //   newText = teste;
  //   console.log('newText: ', newText);
  $(document).on('click', '#like-btn', function () {
    likes++;
    document.getElementById("show-likes").innerHTML = likes + ' curtidas';
  })

  //   firebase.database().ref('feed/posts/' + editId).update({
  //     text: newText,
  //   }).then(() => {
  //     jQuery("#comment-post").html(newText);
  //   })
  // });


  /*****************************************
   * a funḉão abaixo não está dando 
   * console.log 
   * 
   * ************************************ */
  // $('#like-btn').click(function likePost(event) {
  //   event.preventDefault();
  //   console.log('foi');

  //   let countLikes = counter++;
  //   // for (let like in likes) {
  //   //   countLikes = like++;
  //   // }

  //    feedDatabase.child(id + '/curtidas').set(countLikes).then(counter.innerText = countLikes);
  // })

};


