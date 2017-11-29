'use strict';

(function ($) {
  var modalOffset = '10%';

  if ($(window).width() < 992) {
    modalOffset = '0%';
  }

  if (document.cookie.match(/EUCookieCompliance=accepted;/)) {
      $('div.cookie-banner').addClass('hidden');
  }

  $(document).ready(function() {
    // Smooth scrolling from CSS Tricks
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]').not('[href="#0"]').click(function (e) {
        // If the location pathname after the initial / matches the element pathname
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

            // Figure out element to scroll to and check if it exists
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

            // If it does exist, implement smooth scrolling
            if (target.length) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - $('.navbar').outerHeight(true)
                }, 1000, function () {
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();

                    if ($target.is(":focus")) {
                        // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });

    // Modals
    $('div[data-target-modal]').on('click', function (e) {
        var modalId = $(e.target).data('target-modal');
        $('#' + modalId).css('display', 'block');
        if ($('#' + modalId).hasClass('full-screen')) {
            $('#' + modalId + ' .content').animate({
                opacity: 1,
                top: 0
            }, 300);
        } else {
            $('#' + modalId + ' .content').animate({
                opacity: 1,
                top: modalOffset
            }, 300);
        }
        $('body').addClass('modal-open');
    });

    $('.modal .close').on('click', function (e) {
        $('.modal .content').animate({
            opacity: 0,
            top: '40%'
        }, 300, function () {
            $('.modal').css('display', 'none');
        });
        $('body').removeClass('modal-open');
    });

    // Info popovers
    $('div[data-target-popover]').each(function (i, element) {
        if (i === 0 || i % 2 === 0) {
            var popoverId = $(element).data('target-popover');
            var offset = $(element).position().top + $(element).outerHeight(true);
            $('div#' + popoverId).css('top', offset);
        }
    });

    $('div[data-target-popover]').on('click', function (e) {
        if ($('div.popover').hasClass('js-pop-open')) {
            $('.popover').css('display', 'none');
            $('div.popover').removeClass('js-pop-open');
        }
        var popoverId = $(e.target).data('target-popover');
        $('div#' + popoverId).css('display', 'block');
        $('div#' + popoverId).animate({
            opacity: 1
        }, 300, function () {
            $('div#' + popoverId).addClass('js-pop-open');
        });
    });

    // Close dialogs if user clicks on window outside of them
    $(window).on('click touch', function (e) {
        if ($(e.target).hasClass('modal')) {
            $('.modal .content').animate({
                opacity: 0,
                top: '40%'
            }, 300, function () {
                $('.modal').css('display', 'none');
            });
            $('body').removeClass('modal-open');
        }

        if ($('div.popover').hasClass('js-pop-open')) {
            $('div.popover').animate({
                opacity: 0
            }, 300, function () {
                $('.popover').css('display', 'none');
                $('div.popover').removeClass('js-pop-open');
            });
        }
    });

    // Handle closing mobile nav modal when user clicks link
    $(document).on('click', '.mobile-nav .links li', function () {
        $('.modal .content').animate({
            opacity: 0,
            top: '40%'
        }, 300, function () {
            $('.modal').css('display', 'none');
        });
        $('body').removeClass('modal-open');
    });

    // Cookie acceptance in EU
    if (!$('div.cookie-banner').hasClass('hidden')) {
        $('span.js-accept-cookies').on('click', function() {
            document.cookie = 'EUCookieCompliance=accepted';
            $('div.cookie-banner').addClass('hidden');
        });
    }
  });
})(jQuery)