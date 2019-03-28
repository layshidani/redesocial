$(document).ready(function () {
    // Butões html categorias
    $('#jump-btn').click(function () {
        window.location.href = "feed.html"
    })
    $('#next-btn').click(function () {
        window.location.href = "feed.html"
    })

    // Ícone nav-bar menu fixo
    $('#icon-home').click(function () {
        window.location.href = "home.html"
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


    // Modal
    $('#exampleModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget)
        var recipient = button.data('whatever')
        var modal = $(this)
        modal.find('.modal-title').text('Avaliação')
    })

});