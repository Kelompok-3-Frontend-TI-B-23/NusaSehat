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
