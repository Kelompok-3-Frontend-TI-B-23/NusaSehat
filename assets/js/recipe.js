$(document).ready(function() {
    // Dummy data
    const recipes = [
        { id: 1, title: "Ayam Goreng", duration: 60, difficulty: "Medium", img: "../assets/images/recipes/lupakyu2.png", description: "This is a delicious recipe description for Recipe 1.", calories: 350 },
        { id: 2, title: "Pisang Goreng", duration: 30, difficulty: "Easy", img: "../assets/images/recipes/bakso.jpg", description: "This is a delicious recipe description for Recipe 2.", calories: 200 },
        { id: 3, title: "Recipe 3", duration: 120, difficulty: "Hard", img: "../assets/images/recipes/lupakyu2.png", description: "This is a delicious recipe description for Recipe 3.", calories: 450 },
        { id: 4, title: "Recipe 4", duration: 45, difficulty: "Medium", img: "../assets/images/recipes/lupakyu2.png", description: "This is a delicious recipe description for Recipe 4.", calories: 300 },
        { id: 5, title: "Recipe 5", duration: 75, difficulty: "Hard", img: "../assets/images/recipes/jengkol.jpg", description: "This is a delicious recipe description for Recipe 5.", calories: 600 },
        { id: 6, title: "Recipe 6", duration: 25, difficulty: "Easy", img: "../assets/images/recipes/bakso.jpg", description: "This is a delicious recipe description for Recipe 6.", calories: 250 },
        { id: 7, title: "Recipe 7", duration: 80, difficulty: "Very Hard", img: "../assets/images/recipes/jengkol.jpg", description: "This is a delicious recipe description for Recipe 7.", calories: 700 },
        { id: 8, title: "Recipe 8", duration: 40, difficulty: "Medium", img: "../assets/images/recipes/lupakyu.png", description: "This is a delicious recipe description for Recipe 8.", calories: 300 },
        { id: 9, title: "Recipe 9", duration: 50, difficulty: "Medium", img: "../assets/images/recipes/jengkol.jpg", description: "This is a delicious recipe description for Recipe 9.", calories: 350 },
        { id: 10, title: "Recipe 10", duration: 90, difficulty: "Hard", img: "../assets/images/recipes/bakso.jpg", description: "This is a delicious recipe description for Recipe 10.", calories: 550 },
        { id: 11, title: "Recipe 11", duration: 20, difficulty: "Easy", img: "../assets/images/recipes/jengkol.jpg", description: "This is a delicious recipe description for Recipe 11.", calories: 150 },
        { id: 12, title: "Soto Ayam", duration: 60, difficulty: "Medium", img: "../assets/images/recipes/jengkol.jpg", description: "This is a delicious recipe description for Recipe 12.", calories: 400 },
        { id: 13, title: "Mie Goreng", duration: 30, difficulty: "Easy", img: "../assets/images/recipes/jengkol.jpg", description: "This is a delicious recipe description for Recipe 13.", calories: 350 },
        { id: 14, title: "Bakso", duration: 120, difficulty: "Medium", img: "../assets/images/recipes/jengkol.jpg", description: "This is a delicious recipe description for Recipe 14.", calories: 500 },
        { id: 15, title: "Rendang", duration: 90, difficulty: "Very Hard", img: "../assets/images/recipes/jengkol.jpg", description: "This is a delicious recipe description for Recipe 15.", calories: 800 },
        { id: 16, title: "Nasi Goreng", duration: 20, difficulty: "Easy", img: "../assets/images/recipes/jengkol.jpg", description: "This is a delicious recipe description for Recipe 16.", calories: 450 },
        { id: 17, title: "Sate Ayam", duration: 90, difficulty: "Hard", img: "../assets/images/recipes/jengkol.jpg", description: "This is a delicious recipe description for Recipe 17.", calories: 600 },
        { id: 18, title: "Tahu Goreng", duration: 15, difficulty: "Easy", img: "../assets/images/recipes/jengkol.jpg", description: "This is a delicious recipe description for Recipe 18.", calories: 200 },
        { id: 19, title: "Gudeg", duration: 90, difficulty: "Very Hard", img: "../assets/images/recipes/jengkol.jpg", description: "This is a delicious recipe description for Recipe 19.", calories: 700 },
        { id: 20, title: "Pempek", duration: 60, difficulty: "Medium", img: "../assets/images/recipes/jengkol.jpg", description: "This is a delicious recipe description for Recipe 20.", calories: 400 }
    ];

    const recipeContainer = $('#recipeContainer');

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
        
        if (recipe) {
            $('#recipe-title').text(recipe.title);
            $('#recipe-image').attr('src', recipe.img);
            $('#recipe-duration').text(`Duration: ${recipe.duration} minutes`);
            $('#recipe-difficulty').text(`Difficulty: ${recipe.difficulty}`);
            $('#recipe-description').text(recipe.description);
        } else {
            $('#recipe-title').text('Recipe not found');
            $('#recipe-duration, #recipe-difficulty').hide();
            $('#recipe-description').text('No details available for this recipe.');
        }
    }

    // Event listener untuk filter durasi masak
    $('#duration-filter').on('change', function() {
        filterRecipes();
    });
    
    // Event listener untuk tingkat kesushan
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
