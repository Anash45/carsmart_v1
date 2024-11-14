$(document).ready(function () {
    // Initialize all elements with class 'sfb-range'
    $('.sfb-range').each(function () {
        const $slider = $(this);

        // Get custom class from data attribute
        const sliderClass = $slider.data('slider-class');

        // Add class to the slider
        if (sliderClass) {
            $slider.addClass(sliderClass);
        }

        // Initialize rangeslider
        $slider.rangeslider({
            polyfill: false,
            onInit: function () {
                updateSliderBackground($slider);
            },
            onSlide: function (position, value) {
                updateSliderBackground($slider);
            }
        });
    });

    // Function to update background color fill up to the handle
    function updateSliderBackground($slider) {
        const value = ($slider.val() - $slider.attr('min')) / ($slider.attr('max') - $slider.attr('min')) * 100;
        $slider.css('--value', value + '%');
    }

    // // Select 2 elements
    // $('.sfb-select').each(function () {
    //     $(this).select2({
    //         minimumResultsForSearch: Infinity, // Hides the search box
    //         dropdownCssClass: "select2-container--sfb" // Adds custom class to dropdown
    //     });
    // });
});