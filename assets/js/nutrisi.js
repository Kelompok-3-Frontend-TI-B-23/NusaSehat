$(document).ready(function() {
    const infos = [
        { title: "Rendang", img: "../assets/images/rendang.jpg" },
        { title: "Sate Ayam", img: "../assets/images/sate.jpg" },
        { title: "Nasi Goreng", img: "../assets/images/nasgor.jpg" },
        { title: "Batagor", img: "../assets/images/bataghor.jpg" },
        { title: "Ayam Geprek", img: "../assets/images/geprek.png" }
    ];

    const infoContainer = $('.infoContainer');

    infos.forEach(info => {
        const infoCard = `
            <div class="info-card">
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
});
