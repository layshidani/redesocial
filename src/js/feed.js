window.onload = () => {
  event.preventDefault();
  const database = firebase.database();
  // const USER_ID = window.location.search.match(/\?id=(.*)/)[1];
  // console.log('USER_ID: ', USER_ID);
  const feedDatabase = database.ref('feed');
  const postsContainer = $('#posts-container')[0];

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
      let firebaseLikes = childData.curtidas;
      postTemplate(firebaseDate, firebaseLocalName, firebaseLocalAdress, firebaseLocalHourFrom, firebaseLocalHourTo, firebaseLocalPrice, firebaseText, firebaseLikes, childkey);
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
  const postTemplate = function (date, local, address, hourFrom, hourTo, price, textPost, likes, key) {
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
    likeBtn.setAttribute('like-data-id', key);
    likeBtn.setAttribute('class', 'far fa-thumbs-up btn btn-default navbar-btn');
    likeBtn.innerText = '';

    // contador de curtidas
    let counter = document.createElement('span');
    counter.setAttribute('id', 'show-likes');
    counter.setAttribute('class', 'show-likes');
    counter.setAttribute('counter-data-id', key);
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

    var kk = document.getElementById('post-card-key');
    var jj = kk.getAttribute('data-idcard');
    // console.log(jj);
  }

  // publicar post
  $('#post-btn').click(function publishPost() {
    var inputLocalName = $('#local-name').val();
    var inputLocalAdress = $('#adress').val();
    var inputLocalHourFrom = $('#hour-from').val();
    var inputLocalHourTo = $('#hour-to').val();
    var inputLocalPrice = $('#average-price').val();
    var inputText = $('#comment-text').val();
    var likeInit = 0;

    const newPost = {
      date: getDate(),
      localName: inputLocalName,
      localAdress: inputLocalAdress,
      localHourFrom: inputLocalHourFrom,
      localHourTo: inputLocalHourTo,
      localPrice: inputLocalPrice,
      text: inputText,
      likes: likeInit
    }

    feedDatabase.child('/posts').push(newPost).then((snapshot) => postTemplate(getDate(), inputLocalName, inputLocalAdress, inputLocalHourFrom, inputLocalHourTo, inputLocalPrice, inputText, likeInit, snapshot.key));
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
  $(document).on('click', '#like-btn', function() {
    let likeId = this.getAttribute('like-data-id');
    let countLikes = parseInt($(`span[counter-data-id="${likeId}"`).text());
    countLikes = countLikes + 1;

    feedDatabase.child('posts/' + likeId + '/curtidas').set(countLikes).then(() => {
      $(`span[counter-data-id='${likeId}'`).text(`${countLikes} curtidas`);
    });
  });

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

    $('#new-post-btn').click(function () {
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
        curtidas: parseInt($(`span[counter-data-id="${editKey}"`).text()), 
      }).then(() => {
        location.reload();
      })
    })
  });
};
