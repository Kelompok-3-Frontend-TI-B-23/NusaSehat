$(document).ready(function() {
    const infos = [
        { title: "Rendang", img: "images/rendang.jpg" },
        { title: "Rendang", img: "images/rendang.jpg" },
        { title: "Rendang", img: "images/rendang.jpg" },
        { title: "Rendang", img: "images/rendang.jpg" },
        { title: "Rendang", img: "images/rendang.jpg" },
        { title: "Rendang", img: "images/rendang.jpg" },
        { title: "Rendang", img: "images/rendang.jpg" },
        { title: "Rendang", img: "images/rendang.jpg" },
        { title: "Rendang", img: "images/rendang.jpg" }
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
