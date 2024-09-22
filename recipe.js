$(document).ready(function() {
    //  Membuat data recipe dummy
    const recipes = [
        { title: "Recipe 1", duration: "1 hour", difficulty: "Medium", img: "images/lupakyu2.png" },
        { title: "Recipe 2", duration: "30 minutes", difficulty: "Easy", img: "images/bakso.jpg" },
        { title: "Recipe 3", duration: "2 hours", difficulty: "Hard", img: "images/lupakyu2.png" },
        { title: "Recipe 4", duration: "45 minutes", difficulty: "Medium", img: "images/lupakyu2.png" },
        { title: "Recipe 5", duration: "1 hour 15 minutes", difficulty: "Hard", img: "images/jengkol.jpg" },
        { title: "Recipe 6", duration: "25 minutes", difficulty: "Easy", img: "images/bakso.jpg" },
        { title: "Recipe 7", duration: "3 hours", difficulty: "Very Hard", img: "images/jengkol.jpg" },
        { title: "Recipe 8", duration: "40 minutes", difficulty: "Medium", img: "images/lupakyu.png" },
        { title: "Recipe 9", duration: "50 minutes", difficulty: "Medium", img: "images/jengkol.jpg" },
        { title: "Recipe 10", duration: "1 hour 30 minutes", difficulty: "Hard", img: "images/bakso.jpg" },
        { title: "Recipe 11", duration: "20 minutes", difficulty: "Easy", img: "images/jengkol.jpg" }
    ];

    const recipeContainer = $('#recipeContainer');

    recipes.forEach(recipe => {
        // Membuat recipe card baru untuk setiap data recipe dummy
        const recipeCard = `
            <div class="recipe-card">
                <div class="image-wrapper">
                <img src="${recipe.img}" alt="Recipe Image" />
                <button class="favorite-btn"><i class="fa fa-heart"></i></button>
                </div>
                <div class="recipe-info">
                <div class="details">
                    <span><i class="fa fa-heart"></i>${recipe.duration}</span>
                    <span><i class="fa fa-tasks"></i>${recipe.difficulty}</span>
                </div>
                <h3>
                    ${recipe.title}
                </h3>
                </div>
            </div>
        `;
        recipeContainer.append(recipeCard);
    });
});


$(document).ready(function() {
    $('.favorite-btn').on('click', function(event) {
        // Mencegah event bubbling ke elemen induk seperti .recipe-card
        event.stopPropagation();
        $(this).toggleClass('favorited');
    });

    // Saat salah satu recipe card di klik, maka akana ke direct ke halaman recipe tersebut
    $('.recipe-card').on('click', function(){
        window.location.href='recipe-detail.html'
    })
});
