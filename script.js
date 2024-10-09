// ini supaya navbar dan footer tidak perlu dicopy copy
const nav = document.querySelector('#nav-bar');
const footer = document.querySelector('#footer');

// Load the navbar
fetch('/navbar.html')
  .then(res => res.text())
  .then(data => {
    nav.innerHTML = data;
  })
  .catch(err => console.error('Failed to load navbar:', err));

// Load the footer
fetch('/footer.html')
  .then(res => res.text())
  .then(data => {
    footer.innerHTML = data;
  })
  .catch(err => console.error('Failed to load footer:', err));


// ini supaya slider nya ngeslide
$(document).ready(function() {
    const $slider = $('.slider');
    const $slides = $slider.find('.recipes-holder');
    let currentIndex = 0;
    const slideInterval = 3000; // Time in milliseconds (3 seconds)

    function autoSlide() {
        currentIndex++;
        if (currentIndex >= $slides.length) {
            currentIndex = 0;
        }

        // Smoothly scroll to the next image based on currentIndex
        $slider.scrollLeft($slider.width() * currentIndex);
    }

    setInterval(autoSlide, slideInterval);
});

// ini supaya active active
// $(document).ready(function () {
//     const currentLocation = window.location.pathname; // Get current URL path
    
//     // Loop through each link and check if href matches the current URL
//     $('.nav-links li a').each(function () {
//       if ($(this).attr('href') === currentLocation) {
//         $(this).addClass('active'); // Add the 'active' class to the matched link
//       }
//     });
//   });
  
// ini supaya ada tanda slidernya di mana
$(document).ready(function() {
    // Get all the slides and navigation dots
    const $slides = $('.slider img');
    const $navDots = $('.slider-nav a');

    // Update the active navigation dot based on scroll position
    $('.slider').on('scroll', function() {
        // Get the current scroll position
        const scrollPosition = $(this).scrollLeft();

        // Calculate which image is currently in view
        let currentIndex = Math.round(scrollPosition / $slides.width());

        // Remove 'active' from all dots, then add it to the current one
        $navDots.removeClass('active');
        $navDots.eq(currentIndex).addClass('active');
    });

    // Click event to navigate to the selected image
    $navDots.on('click', function(e) {
        e.preventDefault();
        const index = $(this).index();

        // Scroll the slider to the selected image
        $('.slider').animate({
            scrollLeft: $slides.width() * index
        }, 300);

        // Update the active dot
        $navDots.removeClass('active');
        $(this).addClass('active');
    });
});

$.getJSON('../assets/data/recipes.json', function(recipes) {
    // Acak resep sebelum ditampilkan
    const shuffledRecipes = shuffleArray([...recipes]); // Untuk mengshuffle array untuk rekomendasi resep di recipe detail
    
    // Display 6 resep default pertama
    displayRecipes(shuffledRecipes, true);

    // Event listener untuk tombol "Lebih Banyak"
    loadMoreBtn.on('click', function() {
        displayRecipes(shuffledRecipes, false);
    });
})

// $(document).ready(function() {
//     // Get the current page path
//     var currentPage = window.location.pathname;
//     var header = document.getElementById("nav-links");
//     var btns = header.getElementsByClassName('nav-btn');

//     // Loop through each nav link and check if its href matches the current page
//     // $('.nav-links a').each(function() {
//     //   var href = $(this).attr('href');
      
//     //   // Check if the current page URL ends with the href of the link
//     //   if (currentPage.endsWith(href)) {
//     //     $(this).addClass('active');  // Add 'active' class to the matched link
//     //   }

//     for(var i = 0 ; i<btns.length ; i++){
//         btns[i].addEventListener("click", function() {
//             var current = document.getElementsByClassName("active");
//             current[0].className = current[0].className.replace(" active", "");
//             this.className += " active";
//         });    };
//   });
