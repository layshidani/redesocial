window.onload = () => {
  event.preventDefault();
  const database = firebase.database();
  // const USER_ID = window.location.search.match(/\?id=(.*)/)[1];
  // console.log('USER_ID: ', USER_ID);
  const feedDatabase = database.ref('feed');
  const postsContainer = $('#posts-container')[0];
  let likes = 0;

  database.ref('feed/posts').once('value').then(snapshot => {
    snapshot.forEach(value => {
      let childkey = value.key;
      let childData = value.val();
      let firebaseDate = childData.date;
      let firebaseLocalName = childData.localName;
      let firebaseLocalAdress = childData.localAdress;
      let firebaseLocalHourFrom = childData.localHourFrom;
      let firebaseLocalHourTo = childData.localHourTo;
      let firebaseLocalPrice = childData.localPrice;
      let firebaseText = childData.text;
      postTemplate(firebaseDate, firebaseLocalName, firebaseLocalAdress, firebaseLocalHourFrom, firebaseLocalHourTo, firebaseLocalPrice, firebaseText, childkey);
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

  // template dos posts
  const postTemplate = function (date, local, address, hourFrom, hourTo, price, textPost, key) {
    // cabeçaho do post
    let name = document.createElement('p');
    name.setAttribute('class', 'user-name');
    name.innerText = '@user';

    let header = document.createElement('span');
    header.setAttribute('class', 'date-time');
    header.innerText = date;

    // info local
    let localInfo = document.createElement('p');
    localInfo.setAttribute('id', 'local-info');
    localInfo.setAttribute('class', 'local-info');
    localInfo.setAttribute('info-data-id', key);
    localInfo.innerHTML = `<i class="fas fa-map-marker-alt"></i><span class="bold-text">${local}</span> - ${address}`;

    // info horário de funcionamento
    let operatingHours = document.createElement('p');
    operatingHours.setAttribute('id', 'local-operating');
    operatingHours.setAttribute('class', 'local-info');
    operatingHours.setAttribute('hour-data-id', key);
    operatingHours.innerHTML = `<i class="fas fa-history"></i>Horário de funcionamento: ${hourFrom}h às ${hourTo}h`;

    // info preço médio
    let localPrice = document.createElement('p');
    localPrice.setAttribute('id', 'local-price');
    localPrice.setAttribute('class', 'local-info');
    localPrice.setAttribute('price-data-id', key);
    localPrice.innerHTML = `<i class="fas fa-hand-holding-usd"></i>${price},00`


    // mensagem
    let text = document.createElement('p');
    text.setAttribute('class', 'text-post');
    text.setAttribute('id', 'comment-post');
    text.setAttribute('text-data-id', key);
    text.innerHTML = textPost;

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
    likeBtn.setAttribute('data-idlike', key);
    likeBtn.innerText = '';

    // contador de curtidas
    let counter = document.createElement('span');
    counter.setAttribute('id', 'show-likes');
    counter.setAttribute('class', 'show-likes');
    counter.innerHTML = likes + ' curtidas';

    // card de postagem
    let card = document.createElement('div');
    card.setAttribute('class', 'post-card');
    card.setAttribute('id', 'post-card-key');
    card.setAttribute('data-idcard', key);

    // linha horizontal
    let headerLine = document.createElement('hr');
    let footerLine = document.createElement('hr');

    // inserir informações no card
    card.appendChild(name);
    card.appendChild(header);
    card.appendChild(localInfo);
    card.appendChild(operatingHours);
    card.appendChild(localPrice);
    card.appendChild(headerLine);
    card.appendChild(text);
    card.appendChild(footerLine);
    card.appendChild(editPost);
    card.appendChild(deletePost);
    card.appendChild(likeBtn);
    card.appendChild(counter);

    // adiciona card no container de posts
    postsContainer.insertBefore(card, postsContainer.childNodes[0]);
    
  }

  // publicar post
  $('#post-btn').click(function publishPost() {
    var inputLocalName = $('#local-name').val();
    var inputLocalAdress = $('#adress').val();    
    var inputLocalHourFrom = $('#hour-from').val();    
    var inputLocalHourTo = $('#hour-to').val();    
    var inputLocalPrice = $('#average-price').val();    
    var inputText = $('#comment-text').val();

    const newPost = {
      date: getDate(),
      localName: inputLocalName,
      localAdress: inputLocalAdress,
      localHourFrom: inputLocalHourFrom,
      localHourTo: inputLocalHourTo,
      localPrice: inputLocalPrice,
      text: inputText,
      curtidas: likes
    }
    
    feedDatabase.child('/posts').push(newPost).then((snapshot) => postTemplate(getDate(), inputLocalName, inputLocalAdress, inputLocalHourFrom, inputLocalHourTo, inputLocalPrice, inputText, snapshot.key));
  });

  // deletar post
  $(document).on('click', '#delete-btn', function() {
    let confirmDelete = confirm('Tem certeza que quer excluir?');
    if (confirmDelete) {
      let cardKey = this.getAttribute('data-id');
      feedDatabase.child('/posts/' + cardKey).remove().then(() => {
        $(this).parent('.post-card').remove();
      });
    }
  })

  // curtidas
  // ARRUMAR A CONTAGEM DE CURTIDAS NA PÁGINA
  $(document).on('click', '#like-btn', function () {
    likes++;
    let keyCurtida = this.getAttribute('data-idlike');
    console.log(keyCurtida);
    console.log(likes);
    let lk = document.getElementById("show-likes");
    keyCurtida.innerHTML = likes + ' curtidas';
    feedDatabase.child('/posts/' + keyCurtida).update({
      curtidas: likes,
    })
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



  // $(document).on('click', '#new-post-btn', function editPost() {
  //   console.log('Confirme edit clicado');

  //   let edit = document.getElementById('edit-btn');
  //   let editId = edit.dataset.id;
  //   let teste = firebase.database().ref('feed/posts/' + editId).once('value');
  //   console.log('teste: ', teste);
  //   let newText = $('#new-comment-text').val();
  //   newText = teste;
  //   console.log('newText: ', newText);
  // $(document).on('click', '#like-btn', function () {
  //   likes++;
  //   document.getElementById("show-likes").innerHTML = likes + ' curtidas';
  // })

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

  }

  // editar post
  $(document).on('click', '#edit-btn', function() { 
    let editKey = this.getAttribute('edit-data-id');
    
    let oldLocalinfo = $(`p[info-data-id=${editKey}]`).text();
    let oldOperating = $(`p[hour-data-id=${editKey}]`).text();
    let oldAveragePrice = $(`p[price-data-id=${editKey}]`).text();
    let oldText = $(`p[text-data-id=${editKey}]`).text();

    $('#new-local-name').val(oldLocalinfo);
    // $('#new-adress').val(oldLocalinfo);
    $('#new-hour-from').val(oldOperating);
    $('#new-price').val(oldAveragePrice);
    $('#new-comment-text').val(oldText);

    $('#new-post-btn').click(function() {
      let newName = $('#new-local-name').val();
      let newAdress = $('#new-adress').val();
      let newOperating = $('#new-hour-from').val();
      let newPrice = $('#new-price').val();
      let newText = $('#new-comment-text').val();
      
      feedDatabase.child('/posts/' + editKey).update({
        localName: newName,
        localAdress: newAdress,
        localHourFrom: newOperating,
        // localHourTo: newHourTo,
        localPrice: newPrice,
        text: `${newText}<span class='edited'>(editado)</span>`,
        
      }).then(() => {
        location.reload();
      })
    })
  });
