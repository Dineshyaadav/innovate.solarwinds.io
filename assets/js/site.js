$(document).ready(() => {
    // Set a scroll position for certain sections so we can
    // recognize when user has gotten to that area

    $('.hero:after').scrollTop(1);

    $(window).scroll(function() {
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

        if (scroll >= $schedule.offset().top
            && scroll <= ($schedule.offset().top + $schedule.outerHeight()/2 - navHeight)) {
            $('nav li a[href="#schedule"]').addClass('active');
        } else {
            $('nav li a[href="#schedule"]').removeClass('active');
        }

        if (scroll >= $register.offset().top
            && scroll <= ($register.offset().top + $register.outerHeight()/2 - navHeight)) {
            $('nav li a[href="#register"]').addClass('active');
        } else {
            $('nav li a[href="#register"]').removeClass('active');
        }

        if (scroll >= $speakers.offset().top
            && scroll <= ($speakers.offset().top + $speakers.outerHeight()/2 - navHeight)) {
            $('nav li a[href="#speakers"]').addClass('active');
        } else {
            $('nav li a[href="#speakers"]').removeClass('active');
        }

        if (scroll >= $details.offset().top
            && scroll <= ($details.offset().top + $details.outerHeight()/2 - navHeight)) {
            $('nav li a[href="#details"]').addClass('active');
        } else {
            $('nav li a[href="#details"]').removeClass('active');
        }

    });

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

    if ($('.expand-nav').css('display') === "block") {
        $(document).on('click', 'nav *', () => {
            $('nav').css('display', 'none');
        });
    }

    $('#about .container').hover(() => {
        $('#lightbulb').fadeToggle('fast', 0);
    })
});