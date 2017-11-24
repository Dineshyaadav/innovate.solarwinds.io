'use strict';

(function ($) {
    $(document).ready(function () {
        // Screen breaks
        var sizeS = 576,
            sizeM = 768,
            sizeL = 992,
            sizeXl = 1200;

        // If user reloads page not at top, display fixed nav
        if ($(window).scrollTop() >= 1 && !$('navbar').hasClass('affix')) {
            $('.navbar').addClass('affix');
        }

        // Calculate section element positioning once on page load
        var navHeight = $('.navbar').outerHeight(true);

        var $about = $('section#about'),
            $aboutOffset = $about.offset().top - navHeight,
            $aboutPosition = $aboutOffset + $about.outerHeight() / 2 - navHeight;
        var $schedule = $('section#schedule'),
            $scheduleOffset = $schedule.offset().top - navHeight,
            $schedulePosition = $scheduleOffset + $schedule.outerHeight() / 2;
        var $register = $('section#register'),
            $registerOffset = $register.offset().top - navHeight,
            $registerPosition = $registerOffset + $register.outerHeight() / 2;
        var $speakers = $('section#speakers'),
            $speakersOffset = $speakers.offset().top - navHeight,
            $speakersPosition = $speakersOffset + $speakers.outerHeight() / 2;
        var $details = $('section#details'),
            $detailsOffset = $details.offset().top - navHeight,
            $detailsPosition = $detailsOffset + $details.outerHeight() / 2;
        var $footerRibbon = $('.footer-wrapper .ribbon-container .ribbon'),
            $ribbonState = $footerRibbon.data('state');

        // Global scroll events
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();

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
            } else if (scroll < $aboutOffset && $('nav li a[href="#about"]').hasClass('active') || scroll > $aboutPosition && $('nav li a[href="#about"]').hasClass('active')) {
                $('nav li a[href="#about"]').removeClass('active');
            }

            if (scroll >= $scheduleOffset && scroll <= $schedulePosition && !$('nav li a[href="#schedule"]').hasClass('active')) {
                $('nav li a[href="#schedule"]').addClass('active');
            } else if (scroll < $scheduleOffset && $('nav li a[href="#schedule"]').hasClass('active') || scroll > $schedulePosition && $('nav li a[href="#schedule"]').hasClass('active')) {
                $('nav li a[href="#schedule"]').removeClass('active');
            }

            if (scroll >= $registerOffset && scroll <= $registerPosition && !$('nav li a[href="#register"]').hasClass('active')) {
                $('nav li a[href="#register"]').addClass('active');
            } else if (scroll < $registerOffset && $('nav li a[href="#register"]').hasClass('active') || scroll > $registerPosition && $('nav li a[href="#register"]').hasClass('active')) {
                $('nav li a[href="#register"]').removeClass('active');
            }

            if (scroll >= $speakersOffset && scroll <= $speakersPosition && !$('nav li a[href="#speaker"]').hasClass('active')) {
                $('nav li a[href="#speakers"]').addClass('active');
            } else if (scroll < $speakersOffset && $('nav li a[href="#speakers"]').hasClass('active') || scroll > $speakersPosition && $('nav li a[href="#speakers"]').hasClass('active')) {
                $('nav li a[href="#speakers"]').removeClass('active');
            }

            if (scroll >= $detailsOffset && scroll <= $detailsPosition && !$('nav li a[href="#details"]').hasClass('active')) {
                $('nav li a[href="#details"]').addClass('active');
            } else if (scroll < $detailsOffset && $('nav li a[href="#details"]').hasClass('active') || scroll > $detailsPosition && $('nav li a[href="#details"]').hasClass('active')) {
                $('nav li a[href="#details"]').removeClass('active');
            }

            // Only on desktop, toggle lightbulb to lit when user hits about section
            if ($('#light').css('display') === 'none' && scroll > $aboutOffset && scroll < $aboutOffset + 200) {
                $('#light').fadeIn('slow');
            }

            if ($('#light').css('display') !== 'none' && scroll < $aboutOffset || $('#light').css('display') !== 'none' && scroll > $aboutOffset + 200) {
                $('#light').fadeOut('slow');
            }

            if ($(window).width() >= 1500 && scroll + $(window).height() === $(document).height() && $ribbonState === 'offscreen') {
                $footerRibbon.animate({ left: '-102px' }, 300);
                $footerRibbon.data('state', 'onscreen');
            }
        });

        // If window resizes, make sure correct navigation is displaying
        $(window).resize(function () {
            if ($(window).width() >= sizeL) {
                $('nav').css('display', 'block');
                $('#expand-nav').css('display', 'none');
            } else {
                $('nav').css('display', 'none');
                $('#expand-nav').css('display', 'block');
                $('.ribbon').css('left', '0');
            }
        });
    });
})(jQuery);