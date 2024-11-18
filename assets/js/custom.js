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

    $('.fpf-show-icon').each(function () {
        const $icon = $(this);
        const $input = $(this).closest('.fpf-inp-cont').find('.fpf-inp');
        const $input_cont = $(this).closest('.fpf-inp-cont');
        $icon.on('click', function () {
            if ($input.attr('type') === 'password') {
                $input.attr('type', 'text');
                $icon.addClass('shown');
            } else {
                $input.attr('type', 'password');
                $icon.removeClass('shown');
            }
        });
    });
    // // Select 2 elements
    // $('.sfb-select').each(function () {
    //     $(this).select2({
    //         minimumResultsForSearch: Infinity, // Hides the search box
    //         dropdownCssClass: "select2-container--sfb" // Adds custom class to dropdown
    //     });
    // });

});

$(document).ready(function () {
    // Function to add a class to the active tab's parent .nav-item
    function updateActiveSignupTab() {
        // Remove the custom class from all nav-items
        $('.sfs-nav .nav-item').removeClass('active-tab');

        // Find the active tab
        const activeTab = $('.sfs-nav .nav-link.active');

        if (activeTab.length) {
            // Add the class to the parent .nav-item of the active tab
            activeTab.closest('.nav-item').addClass('active-tab');
        }
    }

    // Call the function on page load
    updateActiveSignupTab();

    // Call the function on tab change
    $('.sfs-nav .nav-link').on('shown.bs.tab', function () {
        updateActiveSignupTab();
    });

    if ($('.ts-slider-cont').length > 0) {
        $('.ts-slider-cont').slick({
            centerMode: true,
            centerPadding: '400px', /* Adjust this to control how much of the side items are visible */
            slidesToShow: 1,
            focusOnSelect: true,
            autoplay: true, // Autoplay enabled
            autoplaySpeed: 2000, // Autoplay speed in milliseconds
            prevArrow: `<button type="button" class="slick-arrows slick-prev">
    <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="0.5" width="47" height="47" rx="23.5" stroke="#101044"/>
<path d="M32.5 23H20.33L25.92 17.41L24.5 16L16.5 24L24.5 32L25.91 30.59L20.33 25H32.5V23Z" fill="#101044"/>
</svg>

    </button>`,
            nextArrow: `<button type="button" class="slick-arrows slick-next">
    <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="0.5" width="47" height="47" rx="23.5" stroke="#101044"/>
<path d="M24.5 16L23.09 17.41L28.67 23H16.5V25H28.67L23.09 30.59L24.5 32L32.5 24L24.5 16Z" fill="#101044"/>
</svg>

    </button>`,
    appendArrows: '.ts-slider-arrows',
            dots: false, // Hide navigation dots
            draggable: true, // Enable dragging
            infinite: true, // Infinite looping
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: '200px',
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                        centerMode: false,
                        centerPadding: '0px',
                    }
                }
            ]
        });
    }

    AOS.init();
});

function switchTab(tabId) {
    // Use Bootstrap's tab method to show the specified tab
    var tab = new bootstrap.Tab(document.getElementById(tabId + '-tab'));
    tab.show(); // This will activate the tab
}

function openModal(modalId) {
    // Use Bootstrap's tab method to show the specified tab
    var modal = new bootstrap.Modal(document.getElementById(modalId));
    modal.show(); // This will activate the tab
}