$(document).ready(function() {
    const infos = [
        { title: "Rendang", img: "../assets/images/rendang.jpg", desc: "Rendang is a slow-cooked dry curry from Indonesia, rich in flavor and made from beef." },
        { title: "Sate Ayam", img: "../assets/images/sate.jpg", desc: "Sate Ayam is grilled chicken skewers served with peanut sauce, a popular street food in Indonesia." },
        { title: "Nasi Goreng", img: "../assets/images/nasgor.jpg", desc: "Nasi Goreng is Indonesian-style fried rice, commonly served with a fried egg on top." },
        { title: "Batagor", img: "../assets/images/bataghor.jpg", desc: "Batagor is a fried fish dumpling served with peanut sauce, originating from West Java, Indonesia." },
        { title: "Ayam Geprek", img: "../assets/images/geprek.png", desc: "Ayam Geprek is a smashed fried chicken, served with spicy sambal, originating from Yogyakarta." }
    ];

    const infoContainer = $('.infoContainer');

    infos.forEach(info => {
        const infoCard = `
            <div class="info-card" data-title="${info.title}" data-img="${info.img}" data-desc="${info.desc}">
                <div class="image-wrapper">
                    <img src="${info.img}" alt="Info Image" />
                </div>
                <div class="info-info">
                    <h3>${info.title}</h3>
                </div>
            </div>
        `;
        infoContainer.append(infoCard);
    });

    // Search feature
    $('#search-button').on('click', function() {
        const searchValue = $('#search-input').val().toLowerCase();
        $('.info-card').each(function() {
            const title = $(this).data('title').toLowerCase();
            if (title.includes(searchValue)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    $('#search-input').on('keypress', function(event) {
        if (event.which === 13) { // Enter key
            $('#search-button').click();
        }
    });

    // Popup feature
    const popup = $('<div id="popup"><div id="popup-content"><span id="popup-close">&times;</span><img id="popup-img" /><h3 id="popup-title"></h3><p id="popup-desc"></p></div></div>');
    $('body').append(popup);

    $('.info-card').on('click', function() {
        const imgSrc = $(this).data('img');
        const title = $(this).data('title');
        const desc = $(this).data('desc');

        $('#popup-img').attr('src', imgSrc);
        $('#popup-title').text(title);
        $('#popup-desc').text(desc);

        $('#popup').fadeIn();
    });

    $('#popup-close').on('click', function() {
        $('#popup').fadeOut();
    });

    $('#popup').on('click', function(e) {
        if (e.target === this) {
            $('#popup').fadeOut();
        }
    });
});
