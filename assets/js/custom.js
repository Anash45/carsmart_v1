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
        // Remove existing custom classes
        $('.sfs-nav .nav-item').removeClass('active-tab sfs-done');

        // Find the active nav-link
        const activeTab = $('.sfs-nav .nav-link.active');

        if (activeTab.length) {
            // Add the class to the parent .nav-item of the active tab
            activeTab.closest('.nav-item').addClass('active-tab');

            // Add the .sfs-done class to all nav-items before and including the active one
            $('.sfs-nav .nav-item').each(function () {
                if ($(this).index() <= activeTab.closest('.nav-item').index()) {
                    $(this).addClass('sfs-done');
                }
            });
        }
    }

    function updateCSSVariables() {
        // Select the first and last child elements
        const firstChildWidth = $('.sfs-nav .nav-item:first-child').outerWidth() || 0;
        const lastChildWidth = $('.sfs-nav .nav-item:last-child').outerWidth() || 0;

        // Calculate half the widths
        const halfFirstWidth = firstChildWidth / 2;
        const halfLastWidth = lastChildWidth / 2;

        console.log(halfFirstWidth, halfLastWidth);
        // Apply the values to CSS variables
        $('.sfs-nav').css({
            '--sfs-left': `${halfFirstWidth}px`,
            '--sfs-right': `${halfLastWidth}px`
        });
    }

    // function updateBackground() {
    //     const $tabs = $('.sfs-nav .nav-item');
    //     const totalTabs = $tabs.length;
    //     const activeIndex = $('.sfs-nav .nav-link.active').parent().index() + 1; // 1-based index

    //     // $('.sfs-nav .nav-item').css({
    //     //     "width": `calc((100% / ${totalTabs}) - ((30px * (${totalTabs} - 1)) / ${totalTabs}))`
    //     // });

    //     // console.log(`calc((100%/${totalTabs}) - ((30px*${totalTabs} - 1)/${totalTabs}))`);

    //     console.log(activeIndex, totalTabs);
    //     let gradientPercentage;

    //     // Calculate the percentage based on the active tab
    //     if ((activeIndex === totalTabs) || (activeIndex === totalTabs - 1)) {
    //         gradientPercentage = 100;
    //     } else {
    //         gradientPercentage = (activeIndex / totalTabs) * 100;
    //     }

    //     // Create the linear gradient CSS
    //     const gradient = `linear-gradient(to right, #99F22B ${gradientPercentage}%, #D3D4FD ${100 - gradientPercentage}%)`;

    //     // Apply the background to the .sfs-nav::before using CSS variables
    //     $('.sfs-nav').css('--sfs-bg', gradient);
    // }

    function calculateNavWidths() {
        // Get all .nav-item elements, both with and without .sfs-done
        const $navItems = $('.sfs-nav .nav-item');

        // Iterate over all .nav-item elements
        $navItems.each(function (index) {
            // Check if the current .nav-item has the .sfs-done class
            if ($(this).hasClass('sfs-done')) {
                // If it's the last item in the list, skip it
                if (index === $navItems.length - 1) return;

                // Calculate the width of the current nav-item
                const activeNavItemWidth = $(this).outerWidth();

                // Find the next sibling nav-item and calculate its width
                const $nextNavItem = $(this).next('.nav-item');
                const nextNavItemWidth = $nextNavItem.length ? $nextNavItem.outerWidth() : 0;

                // Log the calculated widths (optional)
                console.log(`Nav Item ${index + 1} Width: ${activeNavItemWidth}px`);
                console.log(`Next Nav Item Width: ${nextNavItemWidth}px`);

                // Apply calculated widths to the respective CSS variables dynamically
                const lineIndex = index + 1; // To make it 1-based for --sfs-line-1, --sfs-line-2, etc.
                $('.sfs-nav').css(`--sfs-line-${lineIndex}`, `${(activeNavItemWidth / 2) + (nextNavItemWidth / 2) - 14}px`);
            } else {
                // If the .nav-item does not have the .sfs-done class, set the CSS variable to 0px
                const lineIndex = index + 1; // To make it 1-based for --sfs-line-1, --sfs-line-2, etc.
                $('.sfs-nav').css(`--sfs-line-${lineIndex}`, '0px');
            }
        });
    }



    if ($('.sfs-nav').length > 0) {

        // Call the function on tab change
        $('.sfs-nav .nav-link').on('shown.bs.tab', function () {
            updateActiveSignupTab();
            calculateNavWidths();
        });
        // Initial update
        updateCSSVariables();

        $(window).on('resize', function () {
            calculateNavWidths();
        })
        setTimeout(function () {
            // Call the function on page load
            updateActiveSignupTab();
            calculateNavWidths();
        }, 500)
    }

    if ($('.ts-slider-cont').length > 0) {
        $('.ts-slider-cont').slick({
            centerMode: true,
            centerPadding: '400px', /* Adjust this to control how much of the side items are visible */
            slidesToShow: 1,
            focusOnSelect: true,
            autoplay: true, // Autoplay enabled
            autoplaySpeed: 2000, // Autoplay speed in milliseconds
            prevArrow: `<button type="button" class="slick-arrows circle-arrow slick-prev">
    <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="0.5" width="47" height="47" rx="23.5" stroke="#101044"/>
<path d="M32.5 23H20.33L25.92 17.41L24.5 16L16.5 24L24.5 32L25.91 30.59L20.33 25H32.5V23Z" fill="#101044"/>
</svg>

    </button>`,
            nextArrow: `<button type="button" class="slick-arrows circle-arrow slick-next">
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
    if ($('.recently-slider').length > 0) {
        $('.recently-slider').slick({
            slidesToShow: 3,
            autoplay: true, // Autoplay enabled
            autoplaySpeed: 2000, // Autoplay speed in milliseconds
            prevArrow: `<button type="button" class="slick-arrows circle-arrow slick-prev">
    <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="0.5" width="47" height="47" rx="23.5" stroke="#101044"/>
<path d="M32.5 23H20.33L25.92 17.41L24.5 16L16.5 24L24.5 32L25.91 30.59L20.33 25H32.5V23Z" fill="#101044"/>
</svg>

    </button>`,
            nextArrow: `<button type="button" class="slick-arrows circle-arrow slick-next">
    <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="0.5" width="47" height="47" rx="23.5" stroke="#101044"/>
<path d="M24.5 16L23.09 17.41L28.67 23H16.5V25H28.67L23.09 30.59L24.5 32L32.5 24L24.5 16Z" fill="#101044"/>
</svg>

    </button>`,
            appendArrows: '.rlc-slider-arrows',
            dots: false, // Hide navigation dots
            draggable: true, // Enable dragging
            infinite: true, // Infinite looping
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        centerMode: false,
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

            if (filterValue === 'all') {
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


    var currentSlideNumber = '';


    if ($('.details-slider-for').length > 0) {
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
    }

    // Function to update current slide index
    function updateCurrentSlide(currentSlide) {
        console.log(currentSlide);
        // Assuming you have an element with the ID 'current-slide' to display the current slide number
        var totalSlides = $('.details-slider-for .slick-slide').not('.slick-cloned').length; // Total non-cloned slides
        currentSlideNumber = currentSlide; // Slick is zero-based, so add 1 to make it human-readable
        $('.ga-current').text(currentSlide + 1);
        $('.ga-total').text(" / " + totalSlides);
        console.log(currentSlideNumber);
    }

    // Add event listener for 'afterChange' event
    $('.details-slider-for,.details-slider-for-2').on('afterChange', function (event, slick, currentSlide) {
        updateCurrentSlide(currentSlide);
    });
    updateCurrentSlide(0);

    $('.details-slider-for video,.details-slider-for img').on("click", function () {
        console.log('clicked');
        openModal('gallerySliderModal');
    });

    $('.edg-main-cont, .ed-img-cont').on("click", function () {
        console.log('clicked');
        openModal('gallerySliderModal');
    });
    function initiateGallerySlider(targetTab) {
        console.log(targetTab);

        // Initialize the main slider
        const mainSlider = $(targetTab).find('.details-slider-for-2');
        const navSlider = $(targetTab).find('.details-slider-nav-2');

        if (mainSlider.length && navSlider.length) {
            // Main Slider
            mainSlider.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                fade: true,
                asNavFor: navSlider,
                prevArrow: `<span class="slick-arrow slick-next slick-next-2"><svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_893_14936)">
<path d="M25 43.75C22.5377 43.75 20.0995 43.265 17.8247 42.3227C15.5498 41.3805 13.4828 39.9993 11.7417 38.2583C10.0007 36.5172 8.61953 34.4502 7.67726 32.1753C6.73498 29.9005 6.25 27.4623 6.25 25C6.25 22.5377 6.73498 20.0995 7.67726 17.8247C8.61953 15.5498 10.0007 13.4828 11.7417 11.7417C13.4828 10.0006 15.5498 8.61953 17.8247 7.67726C20.0995 6.73498 22.5377 6.25 25 6.25C29.9728 6.25 34.7419 8.22544 38.2583 11.7417C41.7746 15.2581 43.75 20.0272 43.75 25C43.75 29.9728 41.7746 34.7419 38.2583 38.2583C34.7419 41.7746 29.9728 43.75 25 43.75Z" fill="white" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M33.3447 25L25.0114 33.3333" stroke="#101044" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M33.3447 25H16.6781" stroke="#101044" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M25.0114 16.6504L33.3447 24.9837" stroke="#101044" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_893_14936">
<rect width="50" height="50" fill="white" transform="matrix(-1 0 0 1 50 0)"/>
</clipPath>
</defs>
</svg>
</span>`,
                nextArrow: `<span class="slick-arrow slick-prev slick-prev-2"><svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_893_14942)">
<path d="M25 43.75C27.4623 43.75 29.9005 43.265 32.1753 42.3227C34.4502 41.3805 36.5172 39.9993 38.2583 38.2583C39.9993 36.5172 41.3805 34.4502 42.3227 32.1753C43.265 29.9005 43.75 27.4623 43.75 25C43.75 22.5377 43.265 20.0995 42.3227 17.8247C41.3805 15.5498 39.9993 13.4828 38.2583 11.7417C36.5172 10.0006 34.4502 8.61953 32.1753 7.67726C29.9005 6.73498 27.4623 6.25 25 6.25C20.0272 6.25 15.2581 8.22544 11.7417 11.7417C8.22544 15.2581 6.25 20.0272 6.25 25C6.25 29.9728 8.22544 34.7419 11.7417 38.2583C15.2581 41.7746 20.0272 43.75 25 43.75Z" fill="white" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.6553 25L24.9886 33.3333" stroke="#101044" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.6553 25H33.3219" stroke="#101044" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M24.9886 16.6504L16.6553 24.9837" stroke="#101044" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_893_14942">
<rect width="50" height="50" fill="white"/>
</clipPath>
</defs>
</svg>
</span>`,
            });


            // Navigation Slider
            navSlider.slick({
                slidesToScroll: 1,
                asNavFor: mainSlider,
                dots: false,
                arrows: false,
                centerMode: false,
                focusOnSelect: true,
                variableWidth: true,
            });
        }
    }

    $('#gallerySliderModal').on('shown.bs.modal', function (e) {
        initiateGallerySlider("#tab-1-pane");
    });
    // Listen for when a tab is shown
    $('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
        // Get the target tab's ID (e.g., #tab-1-pane)
        const targetTab = $(e.target).data('bs-target');

        // Check if the target tab is a gallery pane
        if (targetTab === '#tab-1-pane' || targetTab === '#tab-2-pane' || targetTab === '#tab-3-pane' || targetTab === '#tab-4-pane' || targetTab === '#tab-5-pane') {
            console.log(`${targetTab} is now active, initializing sliders...`);
            initiateGallerySlider(targetTab);
        }
    });
    // Increment quantity
    $('.pmm-swap-increment').click(function () {
        const quantityInput = $(this).siblings('div').find('.pmm-swap-quantity');
        let currentValue = parseInt(quantityInput.val());
        quantityInput.val(currentValue + 1);
    });

    // Decrement quantity
    $('.pmm-swap-decrement').click(function () {
        const quantityInput = $(this).siblings('div').find('.pmm-swap-quantity');
        let currentValue = parseInt(quantityInput.val());
        if (currentValue > 1) {
            quantityInput.val(currentValue - 1);
        }
    });

    $('.sib-add-btn').click(function () {
        $('.sib-inps').append(`<div class="d-flex wsc-flex-2">
                                                    <input type="text"
                                                        class="form-control fpf-inp sib-pn sfc-inp fw-light"
                                                        placeholder="Platform Name">
                                                    <input type="text"
                                                        class="form-control fpf-inp sib-pl sfc-inp fw-light"
                                                        placeholder="Link">
                                                </div>`);
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
function calculateChatBoxHeight() {
    // Get the height of the main element
    var mainHeight = $('.live-chat-page main').outerHeight();

    // Initialize a variable to hold the total height of the sections
    var sectionsHeight = 0;

    // Count the number of sections and calculate their combined height
    let secNum = 0;
    $('.live-chat-page main section:not(.chat-sec)').each(function () {
        sectionsHeight += $(this).outerHeight();
        secNum++;
    });

    let sectionsGap = secNum * 20 + 40;

    // Calculate the remaining height
    var remainingHeight = mainHeight - sectionsHeight - sectionsGap;

    // Log the results to the console
    console.log('Main Height: ' + mainHeight);
    console.log('Total Sections Height: ' + sectionsHeight);
    console.log('Sections Gap: ' + sectionsGap);
    console.log('Remaining Height: ' + remainingHeight);

    // Set the remaining height to the --live-chat-box custom property
    $('.live-chat-page').css('--live-chat-box', remainingHeight + 'px');
}
function scrollToBottomChat() {
    var $lcbMiddle = $('.lcb-middle');
    $lcbMiddle.scrollTop($lcbMiddle.prop('scrollHeight'));
}

function changeSocialCheck() {
    if ($('.sdsb-check-box .form-check-input[name="social-operator"]:checked').val() == 'Yes') {
        $('.socials-inp-box').show().css('display', 'flex');
    } else {
        $('.socials-inp-box').hide().css('display', 'none');
    }
}
$(document).ready(function () {
    if ($('.lcb-middle').length > 0) {
        scrollToBottomChat();
    }
    $(window).on('resize', function () {
        calculateChatBoxHeight();
    })
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

    // Dropzone.autoDiscover = false;

    // // Initialize Dropzone for a custom container
    // const customDropzone = new Dropzone("#customDropzone", {
    //     url: "/fake-upload", // Placeholder URL for testing
    //     paramName: "file", // The parameter name for the files
    //     maxFilesize: 10, // Maximum file size in MB
    //     maxFiles: 15, // Maximum number of files
    //     acceptedFiles: "image/*,application/pdf", // Limit accepted file types
    //     autoProcessQueue: false, // Prevent files from being auto-uploaded
    //     clickable: true, // Enable click to open file browser
    //     init: function () {
    //         this.on("addedfile", function (file) {
    //             console.log("File added:", file.name);
    //         });

    //         this.on("error", function (file, errorMessage) {
    //             console.error("Error uploading file:", errorMessage);
    //         });
    //     },
    // });


    $('.delivery-selection-cont').each(function () {
        $(this).on('change', function () {
            checkDeliverySelection();
        });
    });
    calculateChatBoxHeight();


    if ($('.editions-slider').length > 0) {
        $('.editions-slider').slick({
            dots: true,           // Show dots
            arrows: false,        // Hide navigation arrows
            fade: true,           // Enable fade effect
            autoplay: true,       // Optional: Add autoplay
            autoplaySpeed: 3000,  // Optional: Set autoplay speed
            infinite: true,       // Enable infinite looping
            speed: 500            // Set fade speed
        });
    }

    if ($('.editions-slider-2').length > 0) {
        $('.editions-slider-2').slick({
            dots: true,
            arrows: false,
            fade: false,
            autoplay: true,
            autoplaySpeed: 2000,
            infinite: true,
            speed: 500,
            variableWidth: false,
            centerMode: true,
            slidesToShow: 2,
            centerPadding: '100px',
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        centerPadding: '60px',
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: '80px',
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: '30px',
                    }
                }
            ]
        });
    }

    $('.ecf-btn').each(function () {
        $(this).on('click', function () {
            let target = $(this).attr('data-car-target');
            console.log(target);
            let filterCards = $(this).closest('section').find('.ec-filter-cards');
            if (target == 'all') {
                filterCards.find('.elp-card').parent('div').show();
            } else {
                filterCards.find('.elp-card').parent('div').hide();
                filterCards.find('.elp-card[data-car="' + target + '"]').parent('div').show();
            }
            $(this).addClass('active').siblings().removeClass('active');
        });
    });
});

function likeVehicle(event) {
    event.stopPropagation();
    let likeIcon = event.currentTarget;
    console.log(likeIcon);
    if ($(likeIcon).hasClass('liked')) {
        likeIcon.setAttribute('src', './assets/img/not-favourite.svg');
    } else {
        likeIcon.setAttribute('src', './assets/img/favourite.svg');
    }
    $(likeIcon).toggleClass('liked');
}
function startKYC() {
    $('.kyc-info-box').hide();
    $('.kyc-form-box').show();
}

function increasePrice(price) {
    let currentPrice = Number($('.swbb-inp').val());
    let newPrice = currentPrice + price;
    // console.log(newPrice,currentPrice);
    $('.swbb-inp').val(newPrice);
}

function checkDeliverySelection() {
    $('.delivery-selection-cont').each(function () {
        let deliveryRadio = $(this).find('.delivery-radio-inp');
        if (deliveryRadio.is(':checked')) {
            $(this).find('.hidden-table').show();
        } else {
            $(this).find('.hidden-table').hide();
        }
    });
}

function showLbb2() {
    $('.lcbl-box-bottom').hide();
    $('.lbb-2').show().css({ 'display': 'flex' });
}

function showLbb1() {
    $('.lcbl-box-bottom').hide();
    let selectedDate = $('.lbb-dates input[type="radio"]:checked').val();
    $('#lbb-date-cont').html(`<span class="text-purple text-decoration-underline">${selectedDate}</span>`);
    $('.lbb-1').show().css({ 'display': 'flex' });
}

function ac3f_radios_check() {
    $('.ac3f-inp-box .ac3f-ib-label .ac3f-ib-radio').each(function () {
        if ($(this).is(':checked')) {
            $(this).closest('.ac3f-inp-box').addClass('active');
        } else {
            $(this).closest('.ac3f-inp-box').removeClass('active');
        }
    });

    $('.ac3f-inp-box .ac3f-ib-day .ac3f-ib-radio').each(function () {
        if ($(this).is(':checked')) {
            $(this).closest('.ac3f-ib-day').addClass('active');
        } else {
            $(this).closest('.ac3f-ib-day').removeClass('active');
        }
    });
}

$(document).ready(function () {
    // Add 'rpfa-active' to initially shown accordion item
    $('.rpfa .accordion-collapse.show').closest('.accordion-item').addClass('rpfa-active');

    // Add event listener for accordion show event
    $('.rpfa .accordion-collapse').on('shown.bs.collapse', function () {
        // Remove 'rpfa-active' from all items
        $('.rpfa .accordion-item').removeClass('rpfa-active');

        // Add 'rpfa-active' to the shown accordion item
        $(this).closest('.accordion-item').addClass('rpfa-active');
    });

    // Add event listener for accordion hide event
    $('.rpfa .accordion-collapse').on('hidden.bs.collapse', function () {
        // Remove 'rpfa-active' from the hidden accordion item
        $(this).closest('.accordion-item').removeClass('rpfa-active');
    });


    $('.rpfa-pill .sfc-checks').on('click', function (e) {
        e.stopPropagation();
    });

    $('.elp-card').each(function () {
        let elpCard = $(this);
        let elpBanners = elpCard.find('.ec-banner');
        let totalHeight = 0;

        elpBanners.each(function () {
            totalHeight += $(this).outerHeight(true); // Include margin in height calculation
        });

        console.log(totalHeight);
        elpCard.find('.ec-badges').css('top', totalHeight + 6 + 'px');
    });

    $('.swb-inp-select-dark').select2({
        dropdownCssClass: 'swbc-dropdown', // Custom class for dropdown
        containerCssClass: 'swbc-container' // Custom class for container
    });

    $('.swb-inp-select-light').select2({
        dropdownCssClass: 'swbc-dropdown swbc-dropdown-dark', // Custom class for dropdown
        containerCssClass: 'swbc-container swbc-container-dark' // Custom class for container
    });
});

function openReplyForm(e) {
    let targetElm = e.currentTarget;
    console.log(targetElm, $(targetElm));
    $(targetElm).hide();
    $(targetElm).closest('.eacf-comment').find('.eac-reply').show().css('display', 'flex');
}