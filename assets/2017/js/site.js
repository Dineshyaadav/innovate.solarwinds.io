$(document).ready(() => {
    let scroll = $(window).scrollTop();    

    // If user reloads page not at top, display fixed nav
    if (scroll >= 1) {
        $('.navbar').addClass('affix');        
    }

    // Function to capture data when user is scrolling
    $(window).scroll(function() {

        // When user scrolls, display fixed nav menu with background
        let scroll = $(window).scrollTop();
        if (scroll >= 1) {
            $('.navbar').addClass('affix');        
        } else {
            $('.navbar').removeClass('affix');
        }

        // Highlight active nav links
        let $about = $('section#about');
        let $schedule = $('section#schedule');
        let $register = $('section#register');
        let $speakers = $('section#speakers');
        let $details = $('section#details');
        let navHeight = $('.navbar').outerHeight(true);       

        if (scroll >= ($about.offset().top - navHeight)
            && scroll <= ($about.offset().top + $about.outerHeight()/2 - navHeight)) {
            $('nav li a[href="#about"]').addClass('active');
        } else {
            $('nav li a[href="#about"]').removeClass('active');
        }

        if (scroll >= ($schedule.offset().top - navHeight)
            && scroll <= ($schedule.offset().top + $schedule.outerHeight()/2 - navHeight)) {
            $('nav li a[href="#schedule"]').addClass('active');
        } else {
            $('nav li a[href="#schedule"]').removeClass('active');
        }

        if (scroll >= ($register.offset().top - navHeight)
            && scroll <= ($register.offset().top + $register.outerHeight()/2 - navHeight)) {
            $('nav li a[href="#register"]').addClass('active');
        } else {
            $('nav li a[href="#register"]').removeClass('active');
        }

        if (scroll >= ($speakers.offset().top - navHeight)
            && scroll <= ($speakers.offset().top + $speakers.outerHeight()/2 - navHeight)) {
            $('nav li a[href="#speakers"]').addClass('active');
        } else {
            $('nav li a[href="#speakers"]').removeClass('active');
        }

        if (scroll >= ($details.offset().top - navHeight)
            && scroll <= ($details.offset().top + $details.outerHeight()/2 - navHeight)) {
            $('nav li a[href="#details"]').addClass('active');
        } else {
            $('nav li a[href="#details"]').removeClass('active');
        }

        if ($('.expand-nav').css('display') === 'none') {
            // Toggle lightbulb to lit when user hits about section
            if (scroll > ($about.offset().top - navHeight - 100)
                && scroll < ($about.offset().top - navHeight + 100)) {
                $('#lightbulb').fadeOut('slow');
            } else {
                $('#lightbulb').fadeIn('slow');
            }
        }

    });

    // When you click the mobile nav menu expander, show the menu, vice versa
    $(document).on('click', '.expand-nav', () => {
        switch ($('nav').css('display')) {
            case 'none':
                $('nav').css('display', 'block');
                $('.navbar').css('background-color', '#FFF');                
                break;
            default:
                $('nav').css('display', 'none');
                $('.navbar').css('background-color', '');                                
                break;
        }
    });

    // If user clicks on a menu item on mobile, hide the menu
    if ($('.expand-nav').css('display') === "block") {
        $(document).on('click', 'nav *', () => {
            $('nav').css('display', 'none');
        });
    }

    // Show lit lightbulb when user hovers on about section content
    // $('#about .container').hover(() => {
    //     $('#lightbulb').fadeToggle('fast', 0);
    // })

    // Modals

    // Call for speakers
    $('#open-speakerModal').on('click', (e) => {
        $(`#speakerModal`).css('display', 'block');
        $('body').addClass('modal-open');
    });

    $('#close-speakerModal').on('click', (e) => {
        $(`#speakerModal`).css('display', 'none');
        $('body').removeClass('modal-open');
    });

    // Handle when someone clicks outside the modal window
    // Need to add each specific modal within this
    $(window).on('click', (e) => {
        if (e.target.id == 'speakerModal') {
            $('#speakerModal').css('display', 'none');
            $('body').removeClass('modal-open');
        }
    });
});