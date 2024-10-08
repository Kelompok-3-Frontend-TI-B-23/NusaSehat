const foodData = [
  {
    title: "Rendang",
    img: "assets/images/rendang.jpg", 
    desc: "Rendang is a slow-cooked dry curry from Indonesia, rich in flavor and made from beef.",
    nutrition: {
      calories: "500 G",
      fat: "40 G",
      saturatedFat: "20 G",
      protein: "25 G",
      cholesterol: "90 MG",
      sodium: "900 MG",
      warnings: [
        "Tinggi lemak jenuh",
        "Tinggi kolesterol",
        "Minyak berlebihan",
        "Tinggi natrium"
      ],
    }
  },
  {
    title: "Sate Ayam",
    img: "assets/images/sate.jpg", 
    desc: "Sate Ayam is grilled chicken skewers served with peanut sauce, a popular street food in Indonesia.",
    nutrition: {
      calories: "300 G",
      fat: "15 G",
      saturatedFat: "5 G",
      protein: "30 G",
      cholesterol: "80 MG",
      sodium: "600 MG",
      warnings: [
      "TINGGI PROTEIN",
      "MENGANDUNG KACANG",
      "RENDAH KARBOHIDRAT",
      "MENGANDUNG LEMAK JENUH"
    ],
  }
},
];

const popup = document.getElementById('popup');
const popupImage = document.getElementById('popup-image');
const popupTitle = document.getElementById('popup-title');
const popupDesc = document.getElementById('popup-description');
const popupClose = document.getElementById('popup-close');

function createFoodCard(food) {
  const container = document.querySelector('.infoContainer');

  const card = document.createElement('div');
  card.classList.add('info-card');

  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add('image-wrapper');
  const image = document.createElement('img');
  image.src = food.img;
  image.alt = food.title;
  imageWrapper.appendChild(image);
  card.appendChild(imageWrapper);

  const infoDiv = document.createElement('div');
  infoDiv.classList.add('info-info');
  const title = document.createElement('h3');
  title.textContent = food.title;
  infoDiv.appendChild(title);
  card.appendChild(infoDiv);

  card.addEventListener('click', () => {
    popupImage.src = food.img;
    popupTitle.textContent = food.title;
    
    let nutritionFactsHTML = `
      <h2>*per porsi 100 Gram</h2>
      <div class="fact"><span>KALORI</span><span>${food.nutrition.calories}</span></div>
      <div class="fact"><span>LEMAK</span><span>${food.nutrition.fat}</span></div>
      <div class="fact"><span>LEMAK JENUH</span><span>${food.nutrition.saturatedFat}</span></div>
      <div class="fact"><span>PROTEIN</span><span>${food.nutrition.protein}</span></div>
      <div class="fact"><span>KOLESTROL</span><span>${food.nutrition.cholesterol}</span></div>
      <div class="fact"><span>NATRIUM</span><span>${food.nutrition.sodium}</span></div>
    `;

    if (food.nutrition.warnings) {
      nutritionFactsHTML += food.nutrition.warnings.map(warning => `
        <div class="warning-box">${warning}</div>
      `).join('');
    }
  
    popupDesc.innerHTML = nutritionFactsHTML;
    popup.style.display = 'flex';
});

  container.appendChild(card);
}

popupClose.addEventListener('click', () => {
  popup.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === popup) {
    popup.style.display = 'none';
  }
});

foodData.forEach(food => createFoodCard(food));
