(function($) {
    $(document).ready(() => {
        // Screen breaks
        const sizeS = 576,
              sizeM = 768,
              sizeL = 992,
              sizeXl = 1200;

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
        let $footerRibbon = $('.footer-wrapper .ribbon-container .ribbon'),
            $ribbonState = $footerRibbon.data('state');

        // Global scroll events
        $(window).scroll(() => {
            const scroll = $(window).scrollTop();    
            
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
            if ($('#light').css('display') === 'none'
                && scroll > ($aboutOffset)
                && scroll < ($aboutOffset + 200)) {
                    $('#light').fadeIn('slow');
            }
            
            if (($('#light').css('display') !== 'none'
                && scroll < ($aboutOffset)) ||
                ($('#light').css('display') !== 'none'
                && scroll > ($aboutOffset + 200))) {
                    $('#light').fadeOut('slow');                       
            }

            if ($(window).width() >= 1500
                && scroll + $(window).height() === $(document).height()
                && $ribbonState === 'offscreen') {
                $footerRibbon.animate({left: '-102px'}, 300);
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
                var target = $(this.hash);
                target = target.length ? target : $(`[name=${this.hash.slice(1)}]`);
            
                // If it does exist, implement smooth scrolling
                if (target.length) {
                    e.preventDefault();
                    $('html, body').animate({
                        scrollTop: (target.offset().top - $('.navbar').outerHeight(true))
                    }, 1000, function() {
                        // Must change focus!
                        var $target = $(target);
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

        // If window resizes, make sure correct navigation is displaying
        $(window).resize(() => {
            if ($(window).width() >= sizeL) {
                $('nav').css('display', 'block');
                $('#expand-nav').css('display', 'none');
            } else {
                $('nav').css('display', 'none');
                $('#expand-nav').css('display', 'block');
                $('.ribbon').css('left', '0');            
            }
        })

        // Modals
        $('div[data-target-modal]').on('click', e => {
            var modalId = $(e.target).data('target-modal');
            $(`#${modalId}`).css('display', 'block');
            if ($(`#${modalId}`).hasClass('full-screen')) {
                $(`#${modalId} .content`).animate({
                    opacity: 1,
                    top: 0
                }, 300);
            } else {
                $(`#${modalId} .content`).animate({
                    opacity: 1,
                    top: '10%'
                }, 300);
            }
            $('body').addClass('modal-open');
        });

        $('.modal .close').on('click', e => {
            $(`.modal .content`).animate({
                opacity: 0,
                top: '40%'
            }, 300, function() {
                $(`.modal`).css('display', 'none');
            });
            $('body').removeClass('modal-open');
        });

        // Info popovers
        $('div[data-target-popover]').each((i, element) => {
          if (i === 0 || i % 2 === 0) {
            var popoverId = $(element).data('target-popover');
            var offset = ($(element).position().top + $(element).outerHeight(true));
            $(`div#${popoverId}`).css('top', offset);
          }
        });

        $('div[data-target-popover]').on('click', e => {
          if ($('div.popover').hasClass('js-pop-open')) {
            $('.popover').css('display', 'none');
            $(`div.popover`).removeClass('js-pop-open');
          }
          var popoverId = $(e.target).data('target-popover');          
          $(`div#${popoverId}`).css('display', 'block');
          $(`div#${popoverId}`).animate({
              opacity: 1
          }, 300, function() {
            $(`div#${popoverId}`).addClass('js-pop-open');
          });
        });

        // Close dialogs if user clicks on window outside of them
        $(window).on('click', e => {
            if ($(e.target).hasClass('modal')) {
                $(`.modal .content`).animate({
                    opacity: 0,
                    top: '40%'
                }, 300, function() {
                    $(`.modal`).css('display', 'none');
                });
                $('body').removeClass('modal-open');
            }

            if ($('div.popover').hasClass('js-pop-open')) {
              $('div.popover').animate({
                opacity: 0
              }, 300, function() {
                $('.popover').css('display', 'none');
                $(`div.popover`).removeClass('js-pop-open');
              });
            }
        });

        // Handle closing mobile nav modal when user clicks link
        $(document).on('click', '.mobile-nav .links li', () => {
            $(`.modal .content`).animate({
                opacity: 0,
                top: '40%'
            }, 300, function() {
                $(`.modal`).css('display', 'none');
            });
            $('body').removeClass('modal-open');
        });
    });
})(jQuery);