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
    // On page load, check for any expanded accordion item and mark it as active
    $('#dc-sidebar-accordion .accordion-collapse.show').each(function () {
        const $currentItem = $(this).closest('.accordion-item');
        $currentItem.addClass('active');
        $currentItem.prev('.accordion-item').addClass('before-active');
    });

    // Listen for the show event
    $('#dc-sidebar-accordion').on('show.bs.collapse', function (e) {
        const $accordion = $(this);
        const $currentItem = $(e.target).closest('.accordion-item');

        // Remove .active and .before-active classes from all accordion-items
        $accordion.find('.accordion-item').removeClass('active before-active');

        // Add .active to the currently opened accordion-item
        $currentItem.addClass('active');

        // Add .before-active to the previous accordion-item
        $currentItem.prev('.accordion-item').addClass('before-active');
    });

    // Listen for the hide event
    $('#dc-sidebar-accordion').on('hide.bs.collapse', function (e) {
        // Remove .active and .before-active classes from the closing accordion-item
        const $currentItem = $(e.target).closest('.accordion-item');
        $currentItem.prev('.accordion-item').removeClass('before-active');
        $currentItem.removeClass('active');
    });

    $('.dcm-table').each(function () {
        const $table = $(this); // Scope to the current table
        const $theadCheck = $table.find('thead .dcmt-check');
        const $rowChecks = $table.find('tbody .dcmt-check');

        // Function to update thead checkbox state
        function updateTheadCheckState() {
            const totalRows = $rowChecks.length;
            const checkedRows = $rowChecks.filter(':checked').length;

            // Remove all existing classes
            $theadCheck.removeClass('all-checked partial-checked no-checked');

            if (checkedRows === totalRows) {
                $theadCheck.addClass('all-checked').prop('checked', true);
            } else if (checkedRows === 0) {
                $theadCheck.addClass('no-checked').prop('checked', false);
            } else {
                $theadCheck.addClass('partial-checked').prop('checked', false);
            }
        }

        // Event listener for thead checkbox
        $theadCheck.on('change', function () {
            const isChecked = $(this).is(':checked');
            $rowChecks.prop('checked', isChecked);
            updateTheadCheckState();
        });

        // Event listener for tbody checkboxes
        $rowChecks.on('change', function () {
            updateTheadCheckState();
        });

        // Initialize the state on page load
        updateTheadCheckState();
    });

    $('.dcm-filter-btns').each(function () {
        const $btns = $(this);
        const $btn = $btns.find('.dcm-filter-btn'); // Correctly select the buttons inside the container
        $btn.on('click', function () {
            $btn.removeClass('active'); // Remove the active class from all buttons
            $(this).addClass('active'); // Add the active class to the clicked button

            const filterValue = $(this).data('target'); // Get the filter target value
            const $targetTable = $btns.closest('.dashboard-card').find('.dcm-table'); // Find the target table

            if(filterValue === 'all') {
                $targetTable.find('tbody tr').show(); // Show all rows if the filter value is 'all'
                return;
            }
            // Hide all rows initially
            $targetTable.find('tbody tr').hide();

            // Show rows that match the filter value
            $targetTable.find('tbody tr').filter(function () {
                return $(this).data('filter') === filterValue; // Check if the row's data-filter matches the target
            }).show();
        });
    });
    $('.details-slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.details-slider-nav',
        prevArrow: `<span class="slick-arrow slick-next"><svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_4_16170)">
<path d="M25 43.748C22.5377 43.748 20.0995 43.2631 17.8247 42.3208C15.5498 41.3785 13.4828 39.9974 11.7417 38.2563C10.0007 36.5152 8.61953 34.4482 7.67726 32.1734C6.73498 29.8985 6.25 27.4603 6.25 24.998C6.25 22.5358 6.73498 20.0976 7.67726 17.8227C8.61953 15.5479 10.0007 13.4809 11.7417 11.7398C13.4828 9.9987 15.5498 8.61758 17.8247 7.67531C20.0995 6.73303 22.5377 6.24805 25 6.24805C29.9728 6.24805 34.7419 8.22349 38.2583 11.7398C41.7746 15.2561 43.75 20.0252 43.75 24.998C43.75 29.9709 41.7746 34.74 38.2583 38.2563C34.7419 41.7726 29.9728 43.748 25 43.748Z" fill="white" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M33.3438 24.998L25.0104 33.3314" stroke="#101044" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M33.3438 24.998H16.6771" stroke="#101044" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M25.0104 16.6484L33.3438 24.9818" stroke="#101044" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_4_16170">
<rect width="50" height="50" fill="white" transform="matrix(-1 0 0 1 50 -0.00195312)"/>
</clipPath>
</defs>
</svg></span>
`,
        nextArrow: `<span class="slick-arrow slick-prev"><svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_4_16176)">
<path d="M25 43.748C27.4623 43.748 29.9005 43.2631 32.1753 42.3208C34.4502 41.3785 36.5172 39.9974 38.2583 38.2563C39.9993 36.5152 41.3805 34.4482 42.3227 32.1734C43.265 29.8985 43.75 27.4603 43.75 24.998C43.75 22.5358 43.265 20.0976 42.3227 17.8227C41.3805 15.5479 39.9993 13.4809 38.2583 11.7398C36.5172 9.9987 34.4502 8.61758 32.1753 7.67531C29.9005 6.73303 27.4623 6.24805 25 6.24805C20.0272 6.24805 15.2581 8.22349 11.7417 11.7398C8.22544 15.2561 6.25 20.0252 6.25 24.998C6.25 29.9709 8.22544 34.74 11.7417 38.2563C15.2581 41.7726 20.0272 43.748 25 43.748Z" fill="white" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.6562 24.998L24.9896 33.3314" stroke="#101044" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.6562 24.998H33.3229" stroke="#101044" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M24.9896 16.6484L16.6562 24.9818" stroke="#101044" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_4_16176">
<rect width="50" height="50" fill="white" transform="translate(0 -0.00195312)"/>
</clipPath>
</defs>
</svg></span>
`
    });

    $('.details-slider-nav').slick({
        slidesToScroll: 1,
        asNavFor: '.details-slider-for',
        dots: false,
        arrows: false,
        centerMode: false,
        focusOnSelect: true,
        variableWidth: true
    });
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
$(document).ready(function () {
    // Disable the default hover behavior
    $('[data-bs-toggle="tooltip"]').tooltip({ trigger: 'manual' });

    // Show tooltip on click
    $(document).on('click', '[data-bs-toggle="tooltip"]', function () {
        // Hide any other visible tooltips
        $('[data-bs-toggle="tooltip"]').tooltip('hide');
        // Show the clicked tooltip
        $(this).tooltip('show');
    });

    // Optionally hide tooltip when clicking outside
    $(document).on('click', function (e) {
        if (!$(e.target).closest('[data-bs-toggle="tooltip"]').length) {
            $('[data-bs-toggle="tooltip"]').tooltip('hide');
        }
    });
});
