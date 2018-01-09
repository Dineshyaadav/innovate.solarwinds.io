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
        var $photos = $('section#photos'),
            $photosOffset = $photos.offset().top - navHeight,
            $photosPosition = $photosOffset + $photos.outerHeight() / 2;
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

            if (scroll >= $photosOffset && scroll <= $photosPosition && !$('nav li a[href="#photos"]').hasClass('active')) {
                $('nav li a[href="#photos"]').addClass('active');
            } else if (scroll < $photosOffset && $('nav li a[href="#photos"]').hasClass('active') || scroll > $photosPosition && $('nav li a[href="#photos"]').hasClass('active')) {
                $('nav li a[href="#photos"]').removeClass('active');
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

        function openGallery($image) {
            var image = $image.get(0);
            
            // Demo example from https://github.com/electerious/basicLightbox
            function init(instance) {
                var getSrc = function getSrc(elem) {
                    return elem.getAttribute('data-src');
                };
                var getPrev = function getPrev(elem) {
                    return document.getElementById(elem.getAttribute('data-prev'));
                };
                var getNext = function getNext(elem) {
                    return document.getElementById(elem.getAttribute('data-next'));
                };

                instance.element().querySelector('img').src = '';
                instance.element().querySelector('img').src = getSrc(image);

                var prev = instance.element().querySelector('#prev');
                var next = instance.element().querySelector('#next');

                prev.onclick = function (e) {
                    image = getPrev(image);
                    init(instance);
                };

                next.onclick = function (e) {
                    image = getNext(image);
                    init(instance);
                };

                $('body').addClass('modal-open');
            };

            function end(instance) {
                $('body').removeClass('modal-open');
            };

            basicLightbox.create('<img>', {
                beforePlaceholder: '<button id="prev">&#60;</button>',
                afterPlaceholder: '<button id="next">&#62;</button>',
                beforeShow: init,
                beforeClose: end
            }).show();
        }

        $('.gallery__thumb').on('click', function (e) {
            openGallery($(this));
            return;
        });
    });
})(jQuery);