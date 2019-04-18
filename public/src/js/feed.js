const database = firebase.database();
const feedDatabase = database.ref('feed');

const user = firebase.auth().currentUser;

$(document).ready(function () {
  let name, email, photoURL, uid;
  
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      name = user.displayName;
      email = user.email;
      photoURl = user.photoURL;
      uid = user.uid;
      showAllPosts(uid);
    }
  });
    
  $('#filter-posts').change(() => {
    const filterChoice = $(this).val();
    $('#posts-container').empty();

    if (filterChoice === 'all') {
      showAllPosts(uid);
    } else {
      showPostsFiltered(filterChoice, uid)
    }
  });
  
  $('#local-name').keyup(() => {
    if ($('#local-name').val().length > 0) {
      $('#post-btn').prop("disabled", false);
    } else {
      $('#post-btn').prop("disabled", true)
    }
  });
  
  $('#post-btn').click(function publishPost() {
    console.log("email", email)
    const newPost = {
      name: name,
      uid: uid,
      email: email,
      date: getDate(),
      localName: $('#local-name').val(),
      address: $('#adress').val(),
      hourFrom: $('#hour-from').val(),
      hourTo: $('#hour-to').val(),
      price: $('#average-price').val(),
      text: $('#comment-text').val(),
      likes: 0,
      stars: $('input[name="fb"]:checked').val(),
      postType: $('#select-post-type').val(),
    }

    $('#filter-posts').val('all');
    
    feedDatabase.child('/posts/')
      .push(newPost)
      .then((snapshot) => postTemplate(Object.assign({}, {key: snapshot.key}, {...newPost})));
  });
  
  $(document).on('click', '#delete-btn', function () {
    const confirmDelete = confirm('Tem certeza que quer excluir?');
    if (confirmDelete) {
      const cardKey = $(this).attr('data-id');
      console.log('cardKey: ', cardKey);

      feedDatabase.child('/posts/' + cardKey).remove().then(() => {
        $(this).parent('.post-card').remove();
      });
    }
  })
                 
  /************
  Parte não refatorada
  **/

  $(document).on('click', '#like-btn', function () {
    const likeId = $(this).attr('like-data-id');console.log("likeId", likeId)

    let countLikes = parseInt($(`span[counter-data-id="${likeId}"]`).text());
    countLikes++;
    feedDatabase.child('posts/' + likeId + '/likes').set(countLikes).then(() => {
      $(`span[counter-data-id='${likeId}'`).text(`${countLikes} curtidas`);
    })
  });
  
  $(document).on('click', '#edit-btn', function () {
    $('#new-local-name').keyup(function () {
      if ($('#new-local-name').val().length > 0) {
        $('#new-post-btn').prop("disabled", false);
      } else {
        $('#new-post-btn').prop("disabled", true);
      }
    });
    
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
      let newType = $('#select-new-post-type').val();
      const newStar = $('input[class="star-edit"]:checked').val();

      feedDatabase.child('/posts/' + editKey).update({
        localName: newName,
        address: newAdress,
        hourFrom: newHourFrom,
        hourTo: newHourTo,
        price: newPrice,
        text: `${newText}<span class='edited'>(editado)</span>`,
        likes: parseInt($(`span[counter-data-id="${editKey}"`).text()),
        postType: newType,
        stars: newStar,
      }).then(() => {
        location.reload();
      })
    })
  });
  
  /************
  Fim da parte não refatorada
  **/
});

function showAllPosts(uid) {
  database.ref('feed/posts').once('value').then(snapshot => {
    snapshot.forEach(value => {
      const postData = value.val();
      if (postData.uid === uid) {
        postTemplate(Object.assign({}, {key: value.key}, {...postData}));
      }
    });
  });
}

function showPostsFiltered(type, uid) {
  database.ref('feed/posts').once('value').then(snapshot => {
    snapshot.forEach(value => {
      const postData = value.val();
      if (postData.postType === type && postData.uid === uid) {
        postTemplate(postData);
      }
    });
  });
}

function getDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const time = Date().split(' ')[4];
  
  return `${day}/${month}/${year} - ${time}`;
}

function postTemplate(data) {
  console.log('data: ', data);
  const template = `
    <div id="post-card-key" class="post-card" data-idcard=${data.key}>
      <p class="user-name">${data.name} - ${data.email}</p>
      <span class="data-time">${data.date}</span>
      <p id="local-info" class="local-info" info-data-id="${data.key}">
        <i class="fas fa-map-marker-alt"></i>
        <span class="bold-text">${data.localName}</span> - ${data.address}
      </p>
      <p id="local-operating" class="local-info" hour-data-id="${data.key}">
        <i class="fas fa-history"></i>
        Horário de funcionamento: ${data.hourFrom}h às ${data.hourTo}h
      </p>
      <p id="local-price" class="local-info" price-data-id="${data.key}">
        <i class="fas fa-hand-holding-usd"></i>${data.price},00
      </p>
      ${renderStars(data.stars)}
      <hr />
      <p id="comment-post" class="text-post" text-data-id="${data.key}">${data.text}</p>
      <hr />
      <button id="edit-btn" class="post-btn far fa-edit btn btn-default navbar-btn" 
        edit-data-id=${data.key} 
        data-target="#newModal" 
        data-toggle="modal">
      </button>
      <button id="delete-btn" class="post-btn far fa-trash-alt btn btn-default navbar-btn" 
        data-id=${data.key}>
      </button>
      <button id="like-btn" class="post-btn far fa-thumbs-up btn btn-default navbar-btn" 
        like-data-id=${data.key}>
      </button>
      <span id="show-likes" class="show-likes" 
        counter-data-id=${data.key}>
        ${data.likes} 
      </span>
      curtidas
      <p id="show-selected" selected-data-id="${data.key}">
        ${data.postType}
      </p>
    </div>
  `;
  
  const postsContainer = $('#posts-container')[0];
  let postsDiv = document.createElement("div");
  postsDiv.innerHTML = template
  postsContainer.insertBefore(postsDiv, postsContainer.childNodes[0]);
}
  
function renderStars(stars) {
  let starsIcon;
  
  if (stars === '1') {
    starsIcon = `<label for="star-1"><i class="fa"></i></label>`
  } else if (stars === '2') {
    starsIcon = `<label for="star-2"><i class="fa"></i></label><label for="star-1"><i class="fa"></i></label>`
  } else if (stars === '3') {
    starsIcon = `<label for="star-3"><i class="fa"></i></label><label for="star-1"><i class="fa"></i></label><label for="star-1"><i class="fa"></i></label>`
  } else if (stars === '4') {
    starsIcon = `<label for="star-4"><i class="fa"></i></label><label for="star-1"><i class="fa"></i></label><label for="star-1"><i class="fa"></i></label><label for="star-1"><i class="fa"></i></label>`
  } else if (stars === '5') {
    starsIcon = `<label for="star-5"><i class="fa"></i></label><label for="star-1"><i class="fa"></i></label><label for="star-1"><i class="fa"></i></label><label for="star-1"><i class="fa"></i></label><label for="star-1"><i class="fa"></i></label>`
  }
  
  return `<div class="stars">${starsIcon}</div>`;
}
