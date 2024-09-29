// ini supaya navbar tidak perlu dicopy copy
const nav = document.querySelector('#nav-bar')
fetch('/navbar.html')
.then(res=>res.text())
.then(data=> {
    nav.innerHTML=data
})

// ini supaya slider nya ngeslide
$(document).ready(function() {
    const $slider = $('.slider');
    const $slides = $slider.find('img');
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
$(document).ready(function () {
    const currentLocation = window.location.pathname; // Get current URL path
    
    // Loop through each link and check if href matches the current URL
    $('.nav-links li a').each(function () {
      if ($(this).attr('href') === currentLocation) {
        $(this).addClass('active'); // Add the 'active' class to the matched link
      }
    });
  });
  
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

