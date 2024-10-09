const popup = document.getElementById('popup');
const popupImage = document.getElementById('popup-image');
const popupTitle = document.getElementById('popup-title');
const popupDesc = document.getElementById('popup-description');
const popupClose = document.getElementById('popup-close');

const bookmarkedFoods = [];

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

  // Bookmark icon
  const bookmarkIcon = document.createElement('i');
  bookmarkIcon.classList.add('fas', 'fa-bookmark', 'bookmark-icon');
  card.appendChild(bookmarkIcon);

  // Check if already bookmarked
  if (bookmarkedFoods.includes(food)) {
    bookmarkIcon.classList.add('bookmarked');
  }

  const infoDiv = document.createElement('div');
  infoDiv.classList.add('info-info');
  const title = document.createElement('h3');
  title.textContent = food.title;
  infoDiv.appendChild(title);
  card.appendChild(infoDiv);

  // Handle food card click for popup display
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
      nutritionFactsHTML += food.nutrition.warnings.map(warning => 
        `<div class="warning-box">${warning}</div>`
      ).join('');
    }

    popupDesc.innerHTML = nutritionFactsHTML;
    popup.style.display = 'flex';
  });

  // Handle bookmark click
  bookmarkIcon.addEventListener('click', (event) => {
    event.stopPropagation();  // Prevent card click event from triggering

    if (bookmarkedFoods.includes(food)) {
      bookmarkedFoods.splice(bookmarkedFoods.indexOf(food), 1);  // Remove from bookmark
      bookmarkIcon.classList.remove('bookmarked');
    } else {
      bookmarkedFoods.push(food);  // Add to bookmark
      bookmarkIcon.classList.add('bookmarked');
    }
  });

  container.appendChild(card);
}

// Handle popup close
popupClose.addEventListener('click', () => {
  popup.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === popup) {
    popup.style.display = 'none';
  }
});

// Handle search
const searchInput = document.getElementById('search-input');

function displayAllFoodCards(foodData) {
  const container = document.querySelector('.infoContainer');
  container.innerHTML = '';
  foodData.forEach(food => createFoodCard(food));
}

function filterFoodCards(foodData, searchTerm) {
  const container = document.querySelector('.infoContainer');
  container.innerHTML = '';

  const filteredFood = foodData.filter(food => 
    food.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredFood.length > 0) {
    filteredFood.forEach(food => createFoodCard(food));
  } else {
    container.innerHTML = '<p>Yah! Makanan yang kamu cari belum ada nih!</p>';
  }
}

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      filterFoodCards(foodData, searchTerm);
    } else {
      displayAllFoodCards(foodData);
    }
  }
});

fetch('../assets/data/nutrisi.json')
  .then(response => response.json())
  .then(data => {
    window.foodData = data;
    displayAllFoodCards(foodData);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

// Handle bookmarked food popup
const bookmarkPopup = document.getElementById('bookmark-popup');
const bookmarkList = document.getElementById('bookmark-list');
const bookmarkPopupClose = document.getElementById('bookmark-close');

document.getElementById('show-bookmarks').addEventListener('click', () => {
  bookmarkList.innerHTML = '';  // Hapus list sebelumnya

  if (bookmarkedFoods.length > 0) {
    bookmarkedFoods.forEach(food => {
      const listItem = document.createElement('div');
      listItem.classList.add('bookmark-item');

      // Buat elemen gambar
      const foodImage = document.createElement('img');
      foodImage.src = food.img;
      foodImage.alt = food.title;
      foodImage.classList.add('bookmark-image');

      // Buat elemen nama
      const foodTitle = document.createElement('p');
      foodTitle.textContent = food.title;
      foodTitle.classList.add('bookmark-title');

      // Tambahkan gambar dan nama ke dalam listItem
      listItem.appendChild(foodImage);
      listItem.appendChild(foodTitle);

      // Tambahkan listItem ke dalam bookmarkList
      bookmarkList.appendChild(listItem);
    });
  } else {
    bookmarkList.innerHTML = '<p>Tidak ada makanan yang di-bookmark!</p>';
  }

  bookmarkPopup.style.display = 'flex';
});

bookmarkPopupClose.addEventListener('click', () => {
  bookmarkPopup.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === bookmarkPopup) {
    bookmarkPopup.style.display = 'none';
  }
});
