$(document).ready(function () {
    $('#jump-btn').click(function () {
        window.location.href = "feed.html"
    })
    $('#next-btn').click(function () {
        window.location.href = "feed.html"
    })

    $('#icon-home').click(function () {
        window.location.href = "feed.html"
    })
    $('#icon-cashback').click(function () {
        window.location.href = "cashback.html"
    })
    $('#icon-search').click(function () {
        window.location.href = "search.html"
    })
    $('#icon-friends').click(function () {
        window.location.href = "friends.html"
    })

    $('#exampleModal').on('show.bs.modal', function (event) {
        let modal = $(this)
        modal.find('.modal-title').text('Avaliação')
    })
});