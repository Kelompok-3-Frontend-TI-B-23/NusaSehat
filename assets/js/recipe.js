$(document).ready(function() {
    const recipeContainer = $('#recipeContainer');
    const recommendedContainer = $('#recommendedRecipes');
    const loadMoreBtn = $('.load-more');
    let displayedRecipes = 0; // Jumlah resep yang ditampilkan
    const recipesPerPage = 6; // Menampilkan 6 resep per halaman untuk default pagiantion

    // Fungsi untuk memunculkan elemen ketika berada di viewport
    function revealOnScroll() {
        const elements = document.querySelectorAll('.hidden');
        elements.forEach((element) => {
            const rect = element.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                element.classList.add('show');
                element.classList.remove('hidden');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Panggil saat halaman pertama kali dimuat

    // Fetch data dari file JSON
    $.getJSON('../assets/data/recipes.json', function(recipes) {
        // Acak resep sebelum ditampilkan
        const shuffledRecipes = shuffleArray([...recipes]); // Untuk mengshuffle array untuk rekomendasi resep di recipe detail
        
        // Display 6 resep default pertama
        displayRecipes(shuffledRecipes, true);

        // Event listener untuk tombol "Lebih Banyak"
        loadMoreBtn.on('click', function() {
            displayRecipes(shuffledRecipes, false);
        });

        // Event listener funtuk search bar
        $('#search').on('input', function() {
            const value = $(this).val().toLowerCase();
            const filteredRecipes = shuffledRecipes.filter(recipe => 
                recipe.title.toLowerCase().includes(value)
            );
            displayedRecipes = 0;
            displayRecipes(filteredRecipes, true);
        
            // Ilangin btn "Lebih Banyak" jika query dari search aktif
            if (filteredRecipes.length <= recipesPerPage || value) {
                loadMoreBtn.hide();
            } else {
                loadMoreBtn.show();
            }
        });
        

        // Event listener untuk routing ke halaman recipe detail
        recipeContainer.on('click', '.recipe-card', function() {
            const recipeId = $(this).data('id');
            window.location.href = `recipe-detail.html?id=${recipeId}`;
        });

        // Event listener untuk routing ke halaman recipe detail pada rekomendasi
        recommendedContainer.on('click', '.recipe-card', function() {
            const recipeId = $(this).data('id');
            window.location.href = `recipe-detail.html?id=${recipeId}`;
        });

        // Untuk membuat favorite button berubah warna apabila di klik
        recipeContainer.on('click', '.favorite-btn', function(event) {
            event.stopPropagation(); // Prevent event bubbling
            $(this).toggleClass('favorited');
        });

        // Untuk membuat favorite button berubah warna di rekomendasi resep
        recommendedContainer.on('click', '.favorite-btn', function(event) {
            event.stopPropagation(); // Mencegah ke halaamn recipe detail apabla tombol favorite diklik
            $(this).toggleClass('favorited');
        });

        // Check apakah lagi di recipe detail?
        if (window.location.pathname.includes('recipe-detail.html')) {
            const urlParams = new URLSearchParams(window.location.search);
            const recipeId = parseInt(urlParams.get('id'), 10);
            const recipe = shuffledRecipes.find(r => r.id === recipeId);

            // Kalau resepny ada, tampilkan
            if (recipe) {
                $('.recipe-detail-title').text(recipe.title);
                $('.recipe-image').attr('src', recipe.img);
                $('#recipe-duration').html(`<i class="fa fa-clock-o"></i> ${recipe.duration} menit`);
                $('#recipe-difficulty').html(`<i class="fa fa-tasks"></i> ${recipe.difficulty}`);
                $('#recipe-calories').html(`<i class="fa fa-fire"></i> ${recipe.nutrition.calories} kcal`);
                $('#recipe-serving').html(`<i class="fa fa-user"></i> ${recipe.serving} orang`);

                $('#recipe-description').text(recipe.description);

                // Menampilkan bahan bahan
                recipe.ingredients.forEach(ingredient => {
                    $('#recipe-ingredients').append(`<li>${ingredient}</li>`);
                });

                // Menampilkan steps
                recipe.steps.forEach(step => {
                    $('#recipe-steps').append(`<li>${step}</li>`);
                });

                // Menampilkan info nutrisi
                if (recipe.nutrition) {
                    $('#calories').text(`${recipe.nutrition.calories} kcal`);
                    $('#carbs').text(`${recipe.nutrition.carbs} g`);
                    $('#protein').text(`${recipe.nutrition.protein} g`);
                    $('#fat').text(`${recipe.nutrition.fat} g`);
                } else {
                    $('#nutrition-table').hide(); // Kalo g ada info nutrisi
                }

                // Tampilkan rekomendasi resep lainnya
                displayRecommendedRecipes(shuffledRecipes, recipeId);
            } else {
                $('#recipe-title').text('Recipe not found');
                $('#recipe-description').text('No details available for this recipe.');
                $('#recipe-duration, #recipe-difficulty, #recipe-ingredients, #recipe-steps, #recipe-nutrition').hide();
            }
        }

        // Event listener untuk filter durasi masak
        $('#duration-filter').on('change', function() {
            filterRecipes();
        });

        // Event listener untuk tingkat kesulitan
        $('#difficulty-filter').on('change', function() {
            filterRecipes();
        });

        // Event listener untuk kalori
        $('#calories-filter').on('change', function() {
            filterRecipes();
        });

        // Fungsi filter
        function filterRecipes() {
            const searchValue = $('#search').val().toLowerCase();
            const durationFilter = $('#duration-filter').val();
            const difficultyFilter = $('#difficulty-filter').val();
            const caloriesFilter = $('#calories-filter').val();
        
            let filteredRecipes = shuffledRecipes.filter(recipe => {
                const matchesSearch = recipe.title.toLowerCase().includes(searchValue);
                const matchesDuration = matchDuration(recipe.duration, durationFilter);
                const matchesDifficulty = !difficultyFilter || recipe.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
                const matchesCalories = matchCalories(recipe.nutrition.calories, caloriesFilter);
        
                return matchesSearch && matchesDuration && matchesDifficulty && matchesCalories;
            });
        
            displayedRecipes = 0;
            displayRecipes(filteredRecipes, true);
        
            // Ilangin "Lebih Banyak" btn kalo search/filter lagi aktif
            if (filteredRecipes.length <= recipesPerPage || searchValue || durationFilter || difficultyFilter || caloriesFilter) {
                loadMoreBtn.hide();
            } else {
                loadMoreBtn.show();
            }
        }
        

        // Fungsi filter durasi masak
        function matchDuration(duration, filter) {
            switch (filter) {
                case 'singkat':
                    return duration <= 30;
                case 'sedang':
                    return duration > 30 && duration <= 60;
                case 'lama':
                    return duration > 60;
                default:
                    return true;
            }
        }

        // Fungsi filter kalori
        function matchCalories(calories, filter) {
            switch (filter) {
                case 'rendah':
                    return calories <= 300;
                case 'sedang':
                    return calories > 300 && calories <= 600;
                case 'tinggi':
                    return calories > 600;
                default:
                    return true;
            }
        }

        // Fungsi mendisplay recipe dengan pagination
        function displayRecipes(recipes, reset = false) {
            if (reset) {
                // Kosongkan kontainer jika reset
                recipeContainer.empty();
                displayedRecipes = 0;
            }

            // Jika tidak ada resep yang sesuai
            if (recipes.length === 0) {
                 // Menampilkan pesan jika resep tidak ada
                $('.no-recipe').show().find('p').text('Maaf, Resep Belum Ada');
                return;
            } else {
                // Menyembunyikan pesan jika ada resep
                $('.no-recipe').hide(); 
            }

            const nextRecipes = recipes.slice(displayedRecipes, displayedRecipes + recipesPerPage);
            $.each(nextRecipes, function(index, recipe) {
                const recipeCard = `
                    <div class="recipe-card hidden" data-id="${recipe.id}">
                        <div class="image-wrapper">
                            <img src="${recipe.img}" alt="Recipe Image" />
                            <button class="favorite-btn"><i class="fa fa-heart"></i></button>
                        </div>
                        <div class="recipe-info">
                            <div class="details">
                                <button><i class="fa fa-clock-o"></i>${recipe.duration} menit</button>
                                <button><i class="fa fa-tasks"></i>${recipe.difficulty}</button>
                                <button><i class="fa fa-fire"></i>${recipe.calories} kcal</button>
                            </div>
                            <h3>${recipe.title}</h3>
                        </div>
                    </div>
                `;
                recipeContainer.append(recipeCard);
            });

            displayedRecipes += nextRecipes.length;

            // Sembunyikan tombol "Lebih Banyak" jika semua resep telah ditampilkan
            if (displayedRecipes >= recipes.length) {
                loadMoreBtn.hide();
            } else {
                loadMoreBtn.show();
            }

            // Panggil fungsi revealOnScroll untuk menampilkan elemen yang baru ditambahkan
            revealOnScroll();
        }

        // Fungsi untuk menampilkan rekomendasi resep
        function displayRecommendedRecipes(recipes, currentRecipeId) {
            recommendedContainer.empty(); 
            // Filter agar tidak menampilkan resep yang sedang dilihat
            const recommendations = recipes.filter(recipe => recipe.id !== currentRecipeId);

             // Untuk ambil 3 resep secara acak
            const selectedRecommendations = shuffleArray(recommendations).slice(0, 3);
            $.each(selectedRecommendations, function(index, recipe) {
                const recipeCard = `
                    <div class="recipe-card hidden" data-id="${recipe.id}">
                        <div class="image-wrapper">
                            <img src="${recipe.img}" alt="Recipe Image" />
                            <button class="favorite-btn"><i class="fa fa-heart"></i></button>
                        </div>
                        <div class="recipe-info">
                            <div class="details">
                                <button><i class="fa fa-clock-o"></i>${recipe.duration} menit</button>
                                <button><i class="fa fa-tasks"></i>${recipe.difficulty}</button>
                                <button><i class="fa fa-fire"></i>${recipe.calories} kcal</button>
                            </div>
                            <h3>${recipe.title}</h3>
                        </div>
                    </div>
                `;
                recommendedContainer.append(recipeCard);
            });

            // Panggil fungsi revealOnScroll untuk menampilkan elemen yang baru ditambahkan
            revealOnScroll();
        }

        // Fungsi untuk mengacak urutan array
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
    });

});
