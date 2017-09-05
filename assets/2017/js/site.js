$(document).ready(() => {
    // If user reloads page not at top, display fixed nav
    if ($(window).scrollTop() >= 1 && !$('navbar').hasClass('affix')) {
        $('.navbar').addClass('affix');       
    }

    // Calculate section element positioning once on page load
    let navHeight = $('.navbar').outerHeight(true);
    
    let $about = $('section#about'),
        $aboutOffset = ($about.offset().top - navHeight),
        $aboutPosition = ($aboutOffset + $about.outerHeight()/2 - navHeight);
    let $schedule = $('section#schedule'),
        $scheduleOffset = ($schedule.offset().top - navHeight),
        $schedulePosition = ($scheduleOffset + $schedule.outerHeight()/2);
    let $register = $('section#register'),
        $registerOffset = ($register.offset().top - navHeight),
        $registerPosition = ($registerOffset + $register.outerHeight()/2);
    let $speakers = $('section#speakers'),
        $speakersOffset = ($speakers.offset().top - navHeight),
        $speakersPosition = ($speakersOffset + $speakers.outerHeight()/2);
    let $details = $('section#details'),
        $detailsOffset = ($details.offset().top - navHeight),
        $detailsPosition = ($detailsOffset + $details.outerHeight()/2);
    let $footerRibbon = $('.footer .ribbon'),
        $ribbonState = $footerRibbon.data('state');

    // Global scroll events
    $(window).scroll(function() {
        let scroll = $(window).scrollTop();    
        
        // When user scrolls, display fixed nav menu with background
        if (scroll >= 1 && !$('.navbar').hasClass('affix')) {
            $('.navbar').addClass('affix');        
        } else if (scroll < 1 && $('.navbar').hasClass('affix')) {
            $('.navbar').removeClass('affix');
        }

        // Highlight active nav links
        // To add active link, scroll position must be within the section and link element must not have the 'active' class
        // To remove link, scroll position must be outside of the section and link element must have 'active' class

        if (scroll >= $aboutOffset && scroll <= $aboutPosition && !$('nav li a[href="#about"]').hasClass('active')) {
            $('nav li a[href="#about"]').addClass('active').siblings().removeClass('active');
        } else if ((scroll < $aboutOffset && $('nav li a[href="#about"]').hasClass('active'))
                     || (scroll > $aboutPosition && $('nav li a[href="#about"]').hasClass('active'))) {
            $('nav li a[href="#about"]').removeClass('active');
        }

        if (scroll >= $scheduleOffset && scroll <= $schedulePosition && !$('nav li a[href="#schedule"]').hasClass('active')) {
            $('nav li a[href="#schedule"]').addClass('active');
        } else if ((scroll < $scheduleOffset && $('nav li a[href="#schedule"]').hasClass('active'))
                    || (scroll > $schedulePosition && $('nav li a[href="#schedule"]').hasClass('active'))) {
            $('nav li a[href="#schedule"]').removeClass('active');
        }

        if (scroll >= $registerOffset && scroll <= $registerPosition && !$('nav li a[href="#register"]').hasClass('active')) {
            $('nav li a[href="#register"]').addClass('active');
        } else if ((scroll < $registerOffset && $('nav li a[href="#register"]').hasClass('active'))
                    || (scroll > $registerPosition && $('nav li a[href="#register"]').hasClass('active'))) {
            $('nav li a[href="#register"]').removeClass('active');
        }

        if (scroll >= $speakersOffset && scroll <= $speakersPosition && !$('nav li a[href="#speaker"]').hasClass('active')) {
            $('nav li a[href="#speakers"]').addClass('active');
        } else if ((scroll < $speakersOffset && $('nav li a[href="#speakers"]').hasClass('active'))
                    || (scroll > $speakersPosition && $('nav li a[href="#speakers"]').hasClass('active'))) {
            $('nav li a[href="#speakers"]').removeClass('active');
        }

        if (scroll >= $detailsOffset && scroll <= $detailsPosition && !$('nav li a[href="#details"]').hasClass('active')) {
            $('nav li a[href="#details"]').addClass('active');
        } else if ((scroll < $detailsOffset && $('nav li a[href="#details"]').hasClass('active'))
                    || (scroll > $detailsPosition && $('nav li a[href="#details"]').hasClass('active'))) {
            $('nav li a[href="#details"]').removeClass('active');
        }

        // Only on desktop, toggle lightbulb to lit when user hits about section
        if ($('#lightbulb').css('display') !== 'none'
            && scroll > ($aboutOffset - 100)
            && scroll < ($aboutOffset + 100)) {
            $('#lightbulb').fadeOut('slow');
        } else if (($('#lightbulb').css('display') === 'none' && scroll < ($aboutOffset - 99))
                    || ($('#lightbulb').css('display') === 'none' && scroll > ($aboutOffset + 101))) {
            $('#lightbulb').fadeIn('slow');
        }

        if ($(window).width() > 768
            && scroll + $(window).height() === $(document).height()
            && $ribbonState === 'offscreen') {
            $footerRibbon.animate({left: '-14%'}, 300);
            $footerRibbon.data('state', 'onscreen');
        }
    });

    // Smooth scrolling from CSS Tricks
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(e) {
        // If the location pathname after the initial / matches the element pathname
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
            && location.hostname == this.hostname) {
            
            // Figure out element to scroll to and check if it exists
            let target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          
            // If it does exist, implement smooth scrolling
            if (target.length) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: (target.offset().top - $('.navbar').outerHeight(true))
                }, 1000, function() {
                    // Must change focus!
                    let $target = $(target);
                    $target.focus();

                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });

    // When you click the mobile nav menu expander, show the menu, vice versa
    $(document).on('click', '.expand-nav', () => {
        switch ($('nav').css('display')) {
            case 'none':
                $('nav').css('display', 'block');
                $('.navbar').css({
                    'background-color': '#FFF',
                    'box-shadow': '0 0 0.2em rgba(0,0,0,0.4)'
                });                
                break;
            default:
                $('nav').css('display', 'none');
                $('.navbar').css({
                    'background-color': '',
                    'box-shadow': ''
                });                                
                break;
        }
    });

    // If user clicks on a menu item on mobile, hide the menu
    if ($('.expand-nav').css('display') === "block") {
        $(document).on('click', 'nav *', () => {
            $('nav').css('display', 'none');
        });
    }

    // Modals

    $('.speaker.card').on('click', (e) => {
        let modalId = $(e.target).data('target-modal');
        $(`#${modalId}`).css('display', 'block');
        $('body').addClass('modal-open');
    });

    $('.modal .close').on('click', (e) => {
        $(`.modal`).css('display', 'none');
        $('body').removeClass('modal-open');
    });

    // Handle when someone clicks outside the modal window
    // Need to add each specific modal within this
    $(window).on('click', (e) => {
        if ($(e.target).hasClass('modal')) {
            $('.modal').css('display', 'none');
            $('body').removeClass('modal-open');
        }
    });
});