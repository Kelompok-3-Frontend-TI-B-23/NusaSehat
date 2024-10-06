$(document).ready(function() {
    const recipeContainer = $('#recipeContainer');

    // Fetch data dari file JSON
    $.getJSON('../assets/data/recipes.json', function(recipes) {
        // Display semua recipe
        displayRecipes(recipes);

        // Event listener funtuk search bar
        $('#search').on('input', function() {
            const value = $(this).val().toLowerCase();
            const filteredRecipes = recipes.filter(recipe => 
                recipe.title.toLowerCase().includes(value)
            );
            displayRecipes(filteredRecipes);
        });

        // Event listener untuk routing ke halaman recipe detail
        recipeContainer.on('click', '.recipe-card', function() {
            const recipeId = $(this).data('id');
            window.location.href = `recipe-detail.html?id=${recipeId}`;
        });

        // Untuk membuat favorite button berubah warna apabila di klik
        recipeContainer.on('click', '.favorite-btn', function(event) {
            event.stopPropagation(); // Prevent event bubbling
            $(this).toggleClass('favorited');
        });

        // Check apakah lagi di recipe detail?
        if (window.location.pathname.includes('recipe-detail.html')) {
            const urlParams = new URLSearchParams(window.location.search);
            const recipeId = parseInt(urlParams.get('id'), 10);
            const recipe = recipes.find(r => r.id === recipeId);

            // Kalau resepny ada, tampilkan
            if (recipe) {
                $('#recipe-title').text(recipe.title);
                $('#recipe-image').attr('src', recipe.img);
                $('#recipe-duration').html(`<i class="fa fa-clock-o"></i> ${recipe.duration} minutes`);
                $('#recipe-difficulty').html(`<i class="fa fa-tasks"></i> ${recipe.difficulty}`);
                $('#recipe-calories').html(`<i class="fa fa-fire"></i> ${recipe.nutrition.calories} kcal`);


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

            let filteredRecipes = recipes.filter(recipe => {
                const matchesSearch = recipe.title.toLowerCase().includes(searchValue);
                const matchesDuration = matchDuration(recipe.duration, durationFilter);
                const matchesDifficulty = !difficultyFilter || recipe.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
                const matchesCalories = matchCalories(recipe.calories, caloriesFilter);

                return matchesSearch && matchesDuration && matchesDifficulty && matchesCalories;
            });

            displayRecipes(filteredRecipes);
        }

        // Fungsi filter durasi masak
        function matchDuration(duration, filter) {
            switch (filter) {
                case 'short':
                    return duration <= 30;
                case 'medium':
                    return duration > 30 && duration <= 60;
                case 'long':
                    return duration > 60;
                default:
                    return true;
            }
        }

        // Fungsi filter kalori
        function matchCalories(calories, filter) {
            switch (filter) {
                case 'low':
                    return calories <= 300;
                case 'medium':
                    return calories > 300 && calories <= 600;
                case 'high':
                    return calories > 600;
                default:
                    return true;
            }
        }

        // Fungsi mendisplay recipe
        function displayRecipes(recipes) {
            recipeContainer.empty(); // Mengosognkan kontainer
            if (recipes.length === 0) {
                $('.no-recipe').show().find('p').text('Resep Tidak Ditemukan'); // Show kalo resep ga ada
                return;
            } else {
                $('.no-recipe').hide(); // Kalo resep ada di hide
            }
            
            $.each(recipes, function(index, recipe) {
                const recipeCard = `
                <div class="recipe-card" data-id="${recipe.id}">
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
        }
    });

    // // Sort by durasi masak
    // $('#sort-duration').on('click', function() {
    //     const sortedRecipes = [...recipes].sort((a, b) => a.duration - b.duration);
    //     displayRecipes(sortedRecipes);
    // });

    // // Sort by kalori
    // $('#sort-calories').on('click', function() {
    //     const sortedRecipes = [...recipes].sort((a, b) => a.calories - b.calories);
    //     displayRecipes(sortedRecipes);
    // });
});
