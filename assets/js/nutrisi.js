// Buat ambil elemen-elemen DOM yang diperlukan
const popup = document.getElementById('popup');
const popupImage = document.getElementById('popup-image');
const popupTitle = document.getElementById('popup-title');
const popupDesc = document.getElementById('popup-description');
const popupClose = document.getElementById('popup-close');

const bookmarkedFoods = []; // Array buat simpen makanan yang di-bookmark
let currentPage = 1; // Simpen halaman saat ini
const itemsPerPage = 10; // Jumlah item per halaman

// Fungsi buat create food card buat setiap data makanan yang ada
function createFoodCard(food) {
  // Membuat HTML food card secara dinamis
  const container = document.querySelector('.infoContainer');
  const card = document.createElement('div'); // Bikin element card baru
  card.classList.add('info-card'); // Nambahin class buat styling

  // Buat wrapper untuk image
  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add('image-wrapper');
  
  // Elemen penyusun card
  const image = document.createElement('img');
  image.src = food.img;
  image.alt = food.title;
  imageWrapper.appendChild(image); // Masukin gambar kedalem wrapper
  card.appendChild(imageWrapper); // Masukin wrapper ke food card

  // Icon bookmark di food card
  const bookmarkIcon = document.createElement('i');
  bookmarkIcon.classList.add('fas', 'fa-bookmark', 'bookmark-icon');
  if (bookmarkedFoods.includes(food)) {
    bookmarkIcon.classList.add('bookmarked');
  }
  card.appendChild(bookmarkIcon); // Masukin bookmark ke food card

  // Div buat text nama makanan
  const infoDiv = document.createElement('div');
  infoDiv.classList.add('info-info');
  
  const title = document.createElement('h3');
  title.textContent = food.title;
  infoDiv.appendChild(title); // Masukin nama makanan kedalem div
  card.appendChild(infoDiv); // Masukin div nama makanan ke food card

  container.appendChild(card); // Masukin card ke container

  // Event listener buat nampilin popup kalo food card di click
  card.addEventListener('click', () => {
    showPopup(food);
  });

  // Event listener buat bookmarking makanan
  bookmarkIcon.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleBookmark(food, bookmarkIcon);
  });

  // Intersection observer buat animasi saat kartu muncul
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        card.classList.add('show');
        observer.unobserve(card);
      }
    });
  });
  observer.observe(card);
}

// Fungsi buat show popup detail setiap makanan
function showPopup(food) {
  popupImage.src = food.img;
  popupTitle.textContent = food.title;
  
  // Buat struktur HTML buat nutrient fact sama warning
  let nutritionFactsHTML = `
    <h2>*per porsi 100 Gram</h2>
    <div class="fact"><span class="scale-in-center">KALORI</span><span class="scale-in-center">${food.nutrition.calories}</span></div>
    <div class="fact"><span class="scale-in-center">LEMAK</span><span class="scale-in-center">${food.nutrition.fat}</span></div>
    <div class="fact"><span class="scale-in-center">LEMAK JENUH</span><span class="scale-in-center">${food.nutrition.saturatedFat}</span></div>
    <div class="fact"><span class="scale-in-center">PROTEIN</span><span class="scale-in-center">${food.nutrition.protein}</span></div>
    <div class="fact"><span class="scale-in-center">KOLESTROL</span><span class="scale-in-center">${food.nutrition.cholesterol}</span></div>
    <div class="fact"><span class="scale-in-center">NATRIUM</span><span class="scale-in-center">${food.nutrition.sodium}</span></div>
  `;

  // If condition buat mastiin data warning beneran ada
  if (food.nutrition.warnings) {
    nutritionFactsHTML += food.nutrition.warnings.map(warning => 
      `<div class="warning-box"><span class="scale-in-center">${warning}</span></div>`
    ).join('');
  }

  popupDesc.innerHTML = nutritionFactsHTML;
  popup.style.display = 'flex'; // Nampilin popup
}

// Fungsi buat bookmarking makanan (nambahin/hapus bookmark)
function toggleBookmark(food, bookmarkIcon) {
  if (bookmarkedFoods.includes(food)) {
    bookmarkedFoods.splice(bookmarkedFoods.indexOf(food), 1);
    bookmarkIcon.classList.remove('bookmarked');
  } else {
    bookmarkedFoods.push(food);
    bookmarkIcon.classList.add('bookmarked');
  }
}

// Event listener buat tutup popup kalo tombol x dipencet
popupClose.addEventListener('click', () => {
  popup.style.display = 'none';
});

// Event listener buat tutup popup kalo user klik dimana aja diluar popup
window.addEventListener('click', (event) => {
  if (event.target === popup) {
    popup.style.display = 'none';
  }
});

// Terima input search user
const searchInput = document.getElementById('search-input');

// Fungsi buat tampilin food card per halaman
function displayFoodCardsByPage(foodData) {
  const start = (currentPage - 1) * itemsPerPage; // index awal
  const end = start + itemsPerPage; // index akhir
  const slicedData = foodData.slice(start, end);

  const loadMoreButton = document.getElementById('load-more'); // button 'lebih banyak'
  if (end >= foodData.length) { // If condition buat cek apakah data makanan sudah habis
    loadMoreButton.style.display = 'none'; // Kalau true maka button akan di hide
  } else {
    loadMoreButton.style.display = 'block';
  }

  slicedData.forEach(food => createFoodCard(food)); // Buat food card buat tiap item
}

// Event listener buat button 'Lebih Banyak'
document.getElementById('load-more').addEventListener('click', () => {
  currentPage++; // Pindah ke halaman selanjutnya
  displayFoodCardsByPage(foodData); // Tampilin semua makanan yang ada di halaman berikutnya
});

// Fungsi buat seacrh berdasarkan nama makanan
function searchFoodCards(foodData, searchTerm) {
  const lowerCaseSearchTerm = searchTerm.toLowerCase(); // Ubah apapun input user jadi lowercase
  const searchedFood = foodData.filter(food => 
    food.title.toLowerCase().includes(lowerCaseSearchTerm) // Filter berdasarkan nama makanan
  );

  const container = document.querySelector('.infoContainer');
  if (searchedFood.length > 0) {
    container.innerHTML = '';
    displayAllFoodCards(searchedFood);
  } else {
    container.innerHTML = '<p>Yah! Makanan yang kamu cari belum ada nih!</p>'; // Pesan kalo gaada yang cocok
   }
}

// Event listener buat search supaya baru jalan ketika enter dipencet
searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      searchFoodCards(foodData, searchTerm);
    } else {
      displayAllFoodCards(foodData);
    }
  }
});

// Fungsi buat display semua food card dari awal
function displayAllFoodCards(foodData) {
  currentPage = 1;
  const container = document.querySelector('.infoContainer');
  container.innerHTML = '';
  displayFoodCardsByPage(foodData);
}

// Fungsi untuk fitur filter
function filterFoodCards(foodData) {
  const selectedCalories = document.getElementById('calories').value; // Ambil value kalori
  const selectedIngredient = document.getElementById('ingredient').value.toLowerCase(); // Ambil value bahan

  const filteredFood = foodData.filter(food => {
    let matchesCalories = true;
    let matchesIngredient = true;

    const foodCalories = parseInt(food.nutrition.calories.split(' ')[0], 10);
    
    // Filter berdasarkan kecocokan dengan yang dipilih user
    if (selectedCalories === 'low') {
      matchesCalories = foodCalories < 200;
    } else if (selectedCalories === 'medium') {
      matchesCalories = foodCalories >= 200 && foodCalories <= 300;
    } else if (selectedCalories === 'high') {
      matchesCalories = foodCalories > 300;
    }

    if (selectedIngredient) {
      matchesIngredient = food.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(selectedIngredient)
      );
    }

    return matchesCalories && matchesIngredient; // Return true kalo cocok
  });

  const container = document.querySelector('.infoContainer');
  if (filteredFood.length > 0) {
    container.innerHTML = '';
    displayAllFoodCards(filteredFood); // Tampilin food card yang cocok
  } else {
    container.innerHTML = '<p>Yah! Makanan yang kamu cari belum ada nih!</p>'; // Pesan kalo gaada yang sesuai
  }
}

// Event listener buat field kalori
document.getElementById('calories').addEventListener('change', () => {
  filterFoodCards(foodData); 
});

// Event listener buat field bahan
document.getElementById('ingredient').addEventListener('change', () => {
  filterFoodCards(foodData); 
});

// Buat keperluan bookmark
const bookmarkPopup = document.getElementById('bookmark-popup');
const bookmarkList = document.getElementById('bookmark-list');
const bookmarkPopupClose = document.getElementById('bookmark-close');

// Event listener buat tampiin popup bookmark ketika dipencet
document.getElementById('show-bookmarks').addEventListener('click', () => {
  bookmarkList.innerHTML = '';

  if (bookmarkedFoods.length > 0) { // Cek apakah ada food card yang di bookmark
    bookmarkedFoods.forEach(food => {
      const listItem = document.createElement('div'); // Item yang di bookmark
      listItem.classList.add('bookmark-item');

      const foodImage = document.createElement('img'); // Gambarnya
      foodImage.src = food.img;
      foodImage.alt = food.title;
      foodImage.classList.add('bookmark-image');

      const foodTitle = document.createElement('p'); // Nama makanannya
      foodTitle.textContent = food.title;
      foodTitle.classList.add('bookmark-title');

      listItem.appendChild(foodImage); // Nambahin gambar ke item
      listItem.appendChild(foodTitle); // Nambahin nama ke item
      bookmarkList.appendChild(listItem); // Tambahin item ke bookmark
    });
  } else {
    bookmarkList.innerHTML = '<p>Tidak ada makanan yang di-bookmark!</p>'; // Kalau gaada yang di bookmark
  }

  bookmarkPopup.style.display = 'flex';
});


// Event listener buat tutup popup kalo tombol x dipencet
bookmarkPopupClose.addEventListener('click', () => {
  bookmarkPopup.style.display = 'none';
});

// Event listener buat tutup popup kalo user klik dimana aja diluar popup
window.addEventListener('click', (event) => {
  if (event.target === bookmarkPopup) {
    bookmarkPopup.style.display = 'none';
  }
});

// Fetch data makanan dari file nutrisi.json
fetch('../assets/data/nutrisi.json')
  .then(response => response.json())
  .then(data => {
    window.foodData = data; // Simpen data makanan ke window
    displayAllFoodCards(foodData); // Tampilin semua foodcard
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });