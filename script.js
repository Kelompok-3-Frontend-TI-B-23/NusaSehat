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

// fungsi supaya slider button (tanda slide di bawah) keupdate sesuai posisi slidernya
$(document).ready(function() {
    const $slides = $('.slider img');
    const $navDots = $('.slider-nav a');
    $('.slider').on('scroll', function() {

        const scrollPosition = $(this).scrollLeft();

        let currentIndex = Math.round(scrollPosition / $slides.width());
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


