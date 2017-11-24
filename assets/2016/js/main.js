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
        var $footerRibbon = $('.footer-wrapper .ribbon-container .ribbon'),
            $ribbonState = $footerRibbon.data('state');

        // Global scroll events
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();

            // When user scrolls, display fixed nav menu with background
            // if (scroll >= 1 && !$('.navbar').hasClass('affix')) {
            //     $('.navbar').addClass('affix');
            // } else if (scroll < 1 && $('.navbar').hasClass('affix')) {
            //     $('.navbar').removeClass('affix');
            // }

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

        if ($(window).width() > sizeL) {
          $('.js-card-modal').hover(function() {
            $(this).parent().css({
              transform: 'scale(1.019, 1.019)',
              zoom: '100%'
            });
          }, function() {
            $(this).parent().css({
              transform: 'scale(1, 1)'
            });
          });
        }
    });
})(jQuery);