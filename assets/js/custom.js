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
            if($input.attr('type') === 'password') {
                $input.attr('type', 'text');
                $icon.addClass('shown');
            }else {
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
    });

});

function switchTab(tabId) {
    // Use Bootstrap's tab method to show the specified tab
    var tab = new bootstrap.Tab(document.getElementById(tabId+'-tab'));
    tab.show(); // This will activate the tab
}

function openModal(modalId) {
    // Use Bootstrap's tab method to show the specified tab
    var modal = new bootstrap.Modal(document.getElementById(modalId));
    modal.show(); // This will activate the tab
}