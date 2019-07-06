$(document).ready(() => {
  $('#jump-btn').click(() => {
    window.location.href = 'feed.html';
  });

  $('#next-btn').click(() => {
    window.location.href = 'feed.html';
  });

  $('#icon-home').click(() => {
    window.location.href = 'feed.html';
  });

  $('#icon-cashback').click(() => {
    window.location.href = 'cashback.html';
  });

  $('#icon-search').click(() => {
    window.location.href = 'search.html';
  });

  $('#icon-friends').click(() => {
    window.location.href = 'friends.html';
  });

  $('#exampleModal').on('show.bs.modal', () => {
    let modal = $(this);
    modal.find('.modal-title').text('Avaliação');
  });
});
