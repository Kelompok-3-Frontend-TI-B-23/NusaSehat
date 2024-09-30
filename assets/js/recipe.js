$(document).ready(function() {
    // Membuat data recipe dummy
    const recipes = [
        { id: 1, title: "Recipe 1", duration: "1 hour", difficulty: "Medium", img: "../assets/images/recipes/lupakyu2.png", description: "This is a delicious recipe description for Recipe 1." },
        { id: 2, title: "Recipe 2", duration: "30 minutes", difficulty: "Easy", img: "../assets/images/recipes/bakso.jpg", description: "This is a delicious recipe description for Recipe 2." },
        { id: 3, title: "Recipe 3", duration: "2 hours", difficulty: "Hard", img: "../assets/images/recipes/lupakyu2.png", description: "This is a delicious recipe description for Recipe 3." },
        { id: 4, title: "Recipe 4", duration: "45 minutes", difficulty: "Medium", img: "../assets/images/recipes/lupakyu2.png", description: "This is a delicious recipe description for Recipe 4." },
        { id: 5, title: "Recipe 5", duration: "1 hour 15 minutes", difficulty: "Hard", img: "../assets/images/recipes/jengkol.jpg", description: "This is a delicious recipe description for Recipe 5." },
        { id: 6, title: "Recipe 6", duration: "25 minutes", difficulty: "Easy", img: "../assets/images/recipes/bakso.jpg", description: "This is a delicious recipe description for Recipe 6." },
        { id: 7, title: "Recipe 7", duration: "3 hours", difficulty: "Very Hard", img: "../assets/images/recipes/jengkol.jpg", description: "This is a delicious recipe description for Recipe 7." },
        { id: 8, title: "Recipe 8", duration: "40 minutes", difficulty: "Medium", img: "../assets/images/recipes/lupakyu.png", description: "This is a delicious recipe description for Recipe 8." },
        { id: 9, title: "Recipe 9", duration: "50 minutes", difficulty: "Medium", img: "../assets/images/recipes/jengkol.jpg", description: "This is a delicious recipe description for Recipe 9." },
        { id: 10, title: "Recipe 10", duration: "1 hour 30 minutes", difficulty: "Hard", img: "../assets/images/recipes/bakso.jpg", description: "This is a delicious recipe description for Recipe 10." },
        { id: 11, title: "Recipe 11", duration: "20 minutes", difficulty: "Easy", img: "../assets/images/recipes/jengkol.jpg", description: "This is a delicious recipe description for Recipe 11." }
    ];

    const recipeContainer = $('#recipeContainer');

    recipes.forEach(recipe => {
        // Membuat recipe card baru untuk setiap data recipe dummy
        const recipeCard = `
            <div class="recipe-card" data-id="${recipe.id}">
                <div class="image-wrapper">
                    <img src="${recipe.img}" alt="Recipe Image" />
                    <button class="favorite-btn"><i class="fa fa-heart"></i></button>
                </div>
                <div class="recipe-info">
                    <div class="details">
                        <span><i class="fa fa-clock-o"></i>${recipe.duration}</span>
                        <span><i class="fa fa-tasks"></i>${recipe.difficulty}</span>
                    </div>
                    <h3>${recipe.title}</h3>
                </div>
            </div>
        `;
        recipeContainer.append(recipeCard);
    });

    // Event listener untuk mengarahkan ke halaman detail resep
    $('.recipe-card').on('click', function() {
        const recipeId = $(this).data('id');
        window.location.href = `recipe-detail.html?id=${recipeId}`;
    });

    // Event listener untuk favorite button
    $('.favorite-btn').on('click', function(event) {
        event.stopPropagation(); // Mencegah event bubbling
        $(this).toggleClass('favorited');
    });

    // Cek jika berada di halaman detail
    if (window.location.pathname.includes('recipe-detail.html')) {
        // Ambil parameter ID dari URL
        const urlParams = new URLSearchParams(window.location.search);
        const recipeId = parseInt(urlParams.get('id'), 10); // Ambil ID sebagai integer

        // Cari resep yang sesuai berdasarkan ID
        const recipe = recipes.find(r => r.id === recipeId);

        if (recipe) {
            $('#recipe-title').text(recipe.title);
            $('#recipe-image').attr('src', recipe.img);
            $('#recipe-duration').text(`Duration: ${recipe.duration}`);
            $('#recipe-difficulty').text(`Difficulty: ${recipe.difficulty}`);
            $('#recipe-description').text(recipe.description);
        } else {
            $('#recipe-title').text('Recipe not found');
            $('#recipe-duration').hide();
            $('#recipe-difficulty').hide();
            $('#recipe-description').text('No details available for this recipe.');
        }
    }
});
