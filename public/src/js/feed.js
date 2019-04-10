window.onload = () => {
  event.preventDefault();
  const database = firebase.database();
  const feedDatabase = database.ref('feed');
  const postsContainer = $('#posts-container')[0];
  const user = firebase.auth().currentUser;
  let name, email, photoURL, uid;

  firebase.auth().onAuthStateChanged(function (user) {
    firebase.auth
    if (user) {
      name = user.displayName;
      email = user.email;
      photoURl = user.photoURL;
      uid = user.uid;
      showAllPosts(uid);
    } else {
    }
  });

  const filter = $('#filter-posts');
  filter.change(function () {
    let filterChoice = filter.val();
    $('#posts-container').empty();

    if (filterChoice === 'all') {
      showAllPosts(uid);
    }
    showPostsFiltered(filterChoice, uid)
  });

  function showAllPosts(uid) {
    database.ref('feed/posts').once('value').then(snapshot => {
      snapshot.forEach(value => {
        const childkey = value.key;
        const childData = value.val();
        const firebasePostType = childData.postType;

        if (childData.uid === uid) {
          const firebaseDate = childData.date;
          const firebaseLocalName = childData.localName;
          const firebaseLocalAdress = childData.localAdress;
          const firebaseLocalHourFrom = childData.localHourFrom;
          const firebaseLocalHourTo = childData.localHourTo;
          const firebaseLocalPrice = childData.localPrice;
          const firebaseText = childData.text;
          const firebaseLikes = childData.likes;
          const firebaseName = childData.name;
          const firebaseEmail = childData.email;
          const firbaseCountStars = childData.stars;
          postTemplate(firebaseDate, firebaseLocalName, firebaseLocalAdress, firebaseLocalHourFrom, firebaseLocalHourTo, firebaseLocalPrice, firebaseText, firebaseLikes, childkey, firebaseName, firebaseEmail, firebasePostType, firbaseCountStars, firebasePostType);
        }
      })
    })
  }

  function showPostsFiltered(type, uid) {
    database.ref('feed/posts').once('value').then(snapshot => {
      snapshot.forEach(value => {
        const childkey = value.key;
        const childData = value.val();
        const firebasePostType = childData.postType;

        if (firebasePostType === type && childData.uid === uid) {
          const firebaseDate = childData.date;
          const firebaseLocalName = childData.localName;
          const firebaseLocalAdress = childData.localAdress;
          const firebaseLocalHourFrom = childData.localHourFrom;
          const firebaseLocalHourTo = childData.localHourTo;
          const firebaseLocalPrice = childData.localPrice;
          const firebaseText = childData.text;
          const firebaseLikes = childData.likes;
          const firebaseName = childData.name;
          const firebaseEmail = childData.email;
          const firbaseCountStars = childData.stars;

          postTemplate(firebaseDate, firebaseLocalName, firebaseLocalAdress, firebaseLocalHourFrom, firebaseLocalHourTo, firebaseLocalPrice, firebaseText, firebaseLikes, childkey, firebaseName, firebaseEmail, firebasePostType, firebasePostType, firbaseCountStars);
        }
      })
    })
  }

  function getDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const time = Date().split(' ')[4];

    const postDate = `${day}/${month}/${year} - ${time}`
    return postDate;
  };

  const postTemplate = function (date, local, address, hourFrom, hourTo, price, textPost, likes, key, userName, userEmail, typeChoose, stars) {

    const name = document.createElement('p');
    name.setAttribute('class', 'user-name');
    name.innerHTML = `${userName} - ${userEmail}`;

    const header = document.createElement('span');
    header.setAttribute('class', 'date-time');
    header.innerText = date;

    const localInfo = document.createElement('p');
    localInfo.setAttribute('id', 'local-info');
    localInfo.setAttribute('class', 'local-info');
    localInfo.setAttribute('info-data-id', key);
    localInfo.innerHTML = `<i class="fas fa-map-marker-alt"></i><span class="bold-text">${local}</span> - ${address}`;

    const operatingHours = document.createElement('p');
    operatingHours.setAttribute('id', 'local-operating');
    operatingHours.setAttribute('class', 'local-info');
    operatingHours.setAttribute('hour-data-id', key);
    operatingHours.innerHTML = `<i class="fas fa-history"></i>Horário de funcionamento: ${hourFrom}h às ${hourTo}h`;

    const localPrice = document.createElement('p');
    localPrice.setAttribute('id', 'local-price');
    localPrice.setAttribute('class', 'local-info');
    localPrice.setAttribute('price-data-id', key);
    localPrice.innerHTML = `<i class="fas fa-hand-holding-usd"></i>${price},00`

    const countStars = document.createElement('div');
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

    const text = document.createElement('p');
    text.setAttribute('class', 'text-post');
    text.setAttribute('id', 'comment-post');
    text.setAttribute('text-data-id', key);
    text.innerHTML = textPost;

    const editPost = document.createElement('button');
    editPost.setAttribute('class', 'post-btn');
    editPost.setAttribute('id', 'edit-btn');
    editPost.setAttribute('class', 'far fa-edit btn btn-default navbar-btn');
    editPost.setAttribute('edit-data-id', key);
    editPost.setAttribute('data-target', '#newModal');
    editPost.setAttribute('data-toggle', 'modal');
    editPost.innerText = '';

    const deletePost = document.createElement('button');
    deletePost.setAttribute('class', 'post-btn');
    deletePost.setAttribute('id', 'delete-btn');
    deletePost.setAttribute('data-id', key);
    deletePost.setAttribute('class', 'far fa-trash-alt btn btn-default navbar-btn');
    deletePost.innerText = '';

    const likeBtn = document.createElement('button');
    likeBtn.setAttribute('id', 'like-btn');
    likeBtn.setAttribute('like-data-id', key);
    likeBtn.setAttribute('class', 'far fa-thumbs-up btn btn-default navbar-btn');
    likeBtn.innerText = '';

    const counter = document.createElement('span');
    counter.setAttribute('id', 'show-likes');
    counter.setAttribute('class', 'show-likes');
    counter.setAttribute('counter-data-id', key);
    counter.innerHTML = likes + ' curtidas';

    const showSelected = document.createElement('p');
    showSelected.setAttribute('selected-data-id', key);
    showSelected.setAttribute('id', 'show-selected');
    showSelected.innerHTML = `${typeChoose}`;

    const card = document.createElement('div');
    card.setAttribute('class', 'post-card');
    card.setAttribute('id', 'post-card-key');
    card.setAttribute('data-idcard', key);

    const headerLine = document.createElement('hr');
    const footerLine = document.createElement('hr');

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

    postsContainer.insertBefore(card, postsContainer.childNodes[0]);
  }

  $('#local-name').keyup(function desablePost() {
    if ($('#local-name').val().length > 0) {
      $('#post-btn').prop("disabled", false);
    } else {
      $('#post-btn').prop("disabled", true)
    }
  });

  $('#post-btn').click(function publishPost() {
    const inputLocalName = $('#local-name').val();
    const inputLocalAdress = $('#adress').val();
    const inputLocalHourFrom = $('#hour-from').val();
    const inputLocalHourTo = $('#hour-to').val();
    const inputLocalPrice = $('#average-price').val();
    const inputText = $('#comment-text').val();
    const typeSelected = $('#select-post-type').val();
    const likeInit = 0;
    const divStars = $('input[name="fb"]:checked').val();

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

  $(document).on('click', '#delete-btn', function () {
    const confirmDelete = confirm('Tem certeza que quer excluir?');
    if (confirmDelete) {
      const cardKey = $(this).attr('data-id');
      feedDatabase.child('/posts/' + cardKey).remove().then(() => {
        $(this).parent('.post-card').remove();
      });
    }
  })

  $(document).on('click', '#like-btn', function () {
    const likeId = $(this).attr('like-data-id');
    let countLikes = parseInt($(`span[counter-data-id="${likeId}"`).text());
    countLikes++;
    feedDatabase.child('posts/' + likeId + '/likes').set(countLikes).then(() => {
      $(`span[counter-data-id='${likeId}'`).text(`${countLikes} curtidas`);
    })
  });

  $('#new-local-name').keyup(function () {
    if ($('#new-local-name').val().length > 0) {
      $('#new-post-btn').prop("disabled", false);
    } else {
      $('#new-post-btn').prop("disabled", true);
    }
  });

  $(document).on('click', '#edit-btn', function () {
    const editKey = $(this).attr('edit-data-id');

    const oldLocalinfo = $(`p[info-data-id=${editKey}]`).text();
    const oldOperating = $(`p[hour-data-id=${editKey}]`).text();
    const oldAveragePrice = $(`p[price-data-id=${editKey}]`).text();
    const oldText = $(`p[text-data-id=${editKey}]`).text();

    $('#new-local-name').val(oldLocalinfo);
    $('#new-hour-from').val(oldOperating);
    $('#new-price').val(oldAveragePrice);
    $('#new-comment-text').val(oldText);

    $('#new-post-btn').click(function () {
      const newName = $('#new-local-name').val();
      const newAdress = $('#new-adress').val();
      const newHourFrom = $('#new-hour-from').val();
      const newHourTo = $('#new-hour-to').val()
      const newPrice = $('#new-price').val();
      const newText = $('#new-comment-text').val();
      const newType = $('#select-new-post-type').val();
      const newStar = $('input[class="star-edit"]:checked').val();

      feedDatabase.child('/posts/' + editKey).update({
        localName: newName,
        localAdress: newAdress,
        localHourFrom: newHourFrom,
        localHourTo: newHourTo,
        localPrice: newPrice,
        text: `${newText}<span class='edited'>(editado)</span>`,
        likes: parseInt($(`span[counter-data-id="${editKey}"`).text()),
        postType: newType,
        stars: newStar,
      }).then(() => {
        $('#posts-container').empty();
        showAllPosts(uid);
      })
    })
  });
};