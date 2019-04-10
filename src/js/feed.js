window.onload = () => {
  event.preventDefault();
  const database = firebase.database();
  const feedDatabase = database.ref('feed');
  const postsContainer = $('#posts-container')[0];
  const users = database.ref('users');

  let name, email, photoUrl, uid, emailVerified;
  firebase.auth().onAuthStateChanged(function (user) {
    firebase.auth
    if (user) {
      // user signed in
      name = user.displayName;
      console.log('name: ', name);
      email = user.email;
      console.log('email: ', email);
      photoUrl = user.photoURL;
      console.log('photoUrl: ', photoUrl);
      emailVerified = user.emailVerified;
      console.log('emailVerified: ', emailVerified);
      uid = user.uid;
      // padrão mostra todos posts
      console.log('uid: ', uid);
      showAllPosts(uid);
    } else {
      // No user is signed in.
    }
  });

  let filter = $('#filter-posts');
  filter.change(function () {
    let filterChoice = filter.val();
    console.log('filterChoice: ', filterChoice);
    $('#posts-container').empty();

    if (filterChoice === 'all') {
      showAllPosts(uid);
    }
    showPostsFiltered(filterChoice, uid)
  })

  function showAllPosts(uid) {
    database.ref('feed/posts').once('value').then(snapshot => {
      snapshot.forEach(value => {
        let childkey = value.key;
        let childData = value.val();
        let firebasePostType = childData.postType;

        if (childData.uid === uid) {
          let firebaseDate = childData.date;
          let firebaseLocalName = childData.localName;
          let firebaseLocalAdress = childData.localAdress;
          let firebaseLocalHourFrom = childData.localHourFrom;
          let firebaseLocalHourTo = childData.localHourTo;
          let firebaseLocalPrice = childData.localPrice;
          let firebaseText = childData.text;
          let firebaseLikes = childData.likes;
          let firebaseName = childData.name;
          let firebaseEmail = childData.email;
          let firbaseCountStars = childData.stars;
          // 
          postTemplate(firebaseDate, firebaseLocalName, firebaseLocalAdress, firebaseLocalHourFrom, firebaseLocalHourTo, firebaseLocalPrice, firebaseText, firebaseLikes, childkey, firebaseName, firebaseEmail, firebasePostType, firbaseCountStars, firebasePostType);
        }
      })
    })
  }

  function showPostsFiltered(type, uid) {
    database.ref('feed/posts').once('value').then(snapshot => {
      snapshot.forEach(value => {
        let childkey = value.key;
        let childData = value.val();
        let firebasePostType = childData.postType;

        if (firebasePostType === type && childData.uid === uid) {
          let firebaseDate = childData.date;
          let firebaseLocalName = childData.localName;
          let firebaseLocalAdress = childData.localAdress;
          let firebaseLocalHourFrom = childData.localHourFrom;
          let firebaseLocalHourTo = childData.localHourTo;
          let firebaseLocalPrice = childData.localPrice;
          let firebaseText = childData.text;
          let firebaseLikes = childData.likes;
          let firebaseName = childData.name;
          let firebaseEmail = childData.email;
          let firbaseCountStars = childData.stars;
          // 
          postTemplate(firebaseDate, firebaseLocalName, firebaseLocalAdress, firebaseLocalHourFrom, firebaseLocalHourTo, firebaseLocalPrice, firebaseText, firebaseLikes, childkey, firebaseName, firebaseEmail, firebasePostType, firebasePostType, firbaseCountStars);
        }
      })
    })
  }

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
  const postTemplate = function (date, local, address, hourFrom, hourTo, price, textPost, likes, key, userName, userEmail, typeChoose, stars) {
    // cabeçaho do post
    let name = document.createElement('p');
    name.setAttribute('class', 'user-name');
    name.innerHTML = `${userName} - ${userEmail}`;

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

    // estrelas
    let countStars = document.createElement('div');
    countStars.setAttribute('class', 'stars');
    if (stars === '1') {
      countStars.innerHTML = `<label for="star-1"><i class="fa"></i></label>`
    } else if (stars === '2') {
      countStars.innerHTML = `<label for="star-2"><i class="fa"></i></label><label for="star-1"><i class="fa"></i></label>`
    } else if (stars === '3') {
      countStars.innerHTML = `<label for="star-3"><i class="fa"></i></label><label for="star-1"><i class="fa"></i></label><label for="star-1"><i class="fa"></i></label>`
    } else if (stars === '4') {
      countStars.innerHTML = `<label for="star-4"><i class="fa"></i></label><label for="star-1"><i class="fa"></i></label><label for="star-1"><i class="fa"></i></label><label for="star-1"><i class="fa"></i></label>`
    } else if (stars === '5') {
      countStars.innerHTML = `<label for="star-5"><i class="fa"></i></label><label for="star-1"><i class="fa"></i></label><label for="star-1"><i class="fa"></i></label><label for="star-1"><i class="fa"></i></label><label for="star-1"><i class="fa"></i></label>`
    }

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

    // público ou privado
    let showSelected = document.createElement('p');
    showSelected.setAttribute('selected-data-id', key);
    showSelected.setAttribute('id', 'show-selected');
    showSelected.innerHTML = `${typeChoose}`;

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
    card.appendChild(countStars);
    card.appendChild(headerLine);
    card.appendChild(text);
    card.appendChild(footerLine);
    card.appendChild(editPost);
    card.appendChild(deletePost);
    card.appendChild(likeBtn);
    card.appendChild(counter);
    card.appendChild(showSelected);

    // adiciona card no container de posts
    postsContainer.insertBefore(card, postsContainer.childNodes[0]);
  }

  // desabilita postagem caso campo vazio
  $('#comment-text').keyup(function desablePost() {
    if ($('#comment-text').val().length > 0) {
      $('#post-btn').prop("disabled", false);
    } else {
      $('#post-btn').prop("disabled", true)
    }
  });

  // publicar post
  $('#post-btn').click(function publishPost() {
    let inputLocalName = $('#local-name').val();
    let inputLocalAdress = $('#adress').val();
    let inputLocalHourFrom = $('#hour-from').val();
    let inputLocalHourTo = $('#hour-to').val();
    let inputLocalPrice = $('#average-price').val();
    let inputText = $('#comment-text').val();
    let typeSelected = $('#select-post-type').val();
    let likeInit = 0;
    const divStars = $('input[name="fb"]:checked').val();
    // console.log(divStars)

    const newPost = {
      name: name,
      uid: uid,
      email: email,
      date: getDate(),
      localName: inputLocalName,
      localAdress: inputLocalAdress,
      localHourFrom: inputLocalHourFrom,
      localHourTo: inputLocalHourTo,
      localPrice: inputLocalPrice,
      text: inputText,
      likes: likeInit,
      stars: divStars,
      postType: typeSelected,
    }

    $('#filter-posts').val('all');
    feedDatabase.child('/posts/').push(newPost).then((snapshot) => postTemplate(getDate(), inputLocalName, inputLocalAdress, inputLocalHourFrom, inputLocalHourTo, inputLocalPrice, inputText, likeInit, snapshot.key, name, email, typeSelected, divStars));

  });

  // deletar post
  $(document).on('click', '#delete-btn', function () {
    let confirmDelete = confirm('Tem certeza que quer excluir?');
    if (confirmDelete) {
      let cardKey = $(this).attr('data-id');
      feedDatabase.child('/posts/' + cardKey).remove().then(() => {
        $(this).parent('.post-card').remove();
      });
    }
  })

  // curtidas
  $(document).on('click', '#like-btn', function () {
    let likeId = $(this).attr('like-data-id');
    console.log(likeId)
    let countLikes = parseInt($(`span[counter-data-id="${likeId}"`).text());
    console.log(countLikes)
    countLikes++;
    feedDatabase.child('posts/' + likeId + '/likes').set(countLikes).then(() => {
      $(`span[counter-data-id='${likeId}'`).text(`${countLikes} curtidas`);
    })
  });

  $('#new-comment-text').keyup(function () {
    if ($('#new-comment-text').val().length > 0) {
      console.log($('#new-comment-text').val().length);
      $('#new-post-btn').prop("disabled", false);
    } else {
      $('#new-post-btn').prop("disabled", true);
    }
  });

  // editar post
  $(document).on('click', '#edit-btn', function () {
    let editKey = $(this).attr('edit-data-id');

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
      let newType = $('#select-new-post-type').val();
      let newStar = $('input[class="star-edit"]:checked').val();

      feedDatabase.child('/posts/' + editKey).update({
        localName: newName,
        localAdress: newAdress,
        localHourFrom: newOperating,
        // localHourTo: newHourTo,
        localPrice: newPrice,
        text: `${newText}<span class='edited'>(editado)</span>`,
        likes: parseInt($(`span[counter-data-id="${editKey}"`).text()),
        postType: newType,
        stars: newStar,
      }).then(() => {
        location.reload();
      })
    })
  });
};