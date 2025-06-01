(function ($) {

    "use strict";
    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    // Initiate the wowjs
    new WOW().init();

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow'); // Fade in the button when scrolled down
        } else {
            $('.back-to-top').fadeOut('slow'); // Fade out the button when scrolled back to top
        }

        // Fix: When at the very top, force About nav-link active
        if ($(this).scrollTop() < 10) {
            $('.navbar-nav .nav-link').removeClass('active');
            $('.navbar-nav .nav-link[href="#About"]').addClass('active');
        }
    });
    $('.back-to-top').click(function (e) {
        e.preventDefault();
        // Use native smooth scroll for better performance and less lag
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Optionally, set About nav-link active after scroll (with a slight delay)
        setTimeout(function () {
            $('.navbar-nav .nav-link').removeClass('active');
            $('.navbar-nav .nav-link[href="#About"]').addClass('active');
        }, 400);
        return false;
    });







    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }

    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    // Updated: Use button for nav-pills
    $('#portfolio-flters .nav-link').on('click', function () {
        $("#portfolio-flters .nav-link").removeClass('active');
        $(this).addClass('active');
        portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });



    // Custom ScrollSpy replacement for nav highlighting
    var sectionIds = [
        { id: "#About", nav: '.nav-link[href="#About"]' },
        { id: "#Skills", nav: '.nav-link[href="#Skills"]' },
        { id: "#Experience", nav: '.nav-link[href="#Experience"]' },
        { id: "#Projects", nav: '.nav-link[href="#Projects"]' },
        { id: "#Hobbies", nav: '.nav-link[href="#Hobbies"]' },
        { id: "#Contact", nav: '.nav-link[href="#Contact"]' }
    ];

    function updateNavHighlight() {
        var scrollPos = $(window).scrollTop();
        var found = false;
        // Loop from bottom up so the first section in view is selected
        for (var i = sectionIds.length - 1; i >= 0; i--) {
            var section = $(sectionIds[i].id);
            if (section.length) {
                var sectionTop = section.offset().top - 81; // 80px offset + 1 for rounding
                if (scrollPos >= sectionTop) {
                    $('.navbar-nav .nav-link').removeClass('active');
                    $(sectionIds[i].nav).addClass('active');
                    found = true;
                    break;
                }
            }
        }
        // If at very top, always highlight About
        if (!found) {
            $('.navbar-nav .nav-link').removeClass('active');
            $('.navbar-nav .nav-link[href="#About"]').addClass('active');
        }
    }

    $(window).on('scroll', updateNavHighlight);
    $(document).ready(updateNavHighlight);

    // Navbar fade in on scroll, start hidden
    function handleNavbarVisibility() {
        var $navbar = $('.navbar');
        if ($(window).scrollTop() > 10) {
            $navbar.addClass('navbar-visible');
        } else {
            $navbar.removeClass('navbar-visible');
        }
    }

    // On load, ensure navbar is hidden and only appears on scroll (no initial fade in)
    $(function () {
        $('.navbar').removeClass('navbar-visible');
        // Do not call handleNavbarVisibility() here, only let scroll event control it
    });

    $(window).on('scroll', handleNavbarVisibility);

    // Show/hide arrow indicator on scroll (arrow fades out)
    function handleArrowFade() {
        var $arrow = $('#navbar-arrow-indicator');
        var scrollTop = $(window).scrollTop();
        var fadeStart = 0;
        var fadeEnd = 80; // px after which arrow is fully hidden

        // Calculate opacity: 1 at top, 0 at fadeEnd or more
        var opacity = 1;
        if (scrollTop > fadeStart) {
            opacity = 1 - Math.min((scrollTop - fadeStart) / (fadeEnd - fadeStart), 1);
        }

        $arrow.css('opacity', opacity);

        // Only toggle .hide for pointer-events, not for visibility
        if (opacity <= 0) {
            $arrow.addClass('hide');
        } else {
            $arrow.removeClass('hide');
        }
    }

    // On load, insert arrow indicator if not present and set initial states
    $(function () {
        if ($('#navbar-arrow-indicator').length === 0) {
            $('body').prepend(
                '<div id="navbar-arrow-indicator">' +
                    '<span class="arrow-down">&#x25BC;</span>' +
                '</div>'
            );
        }
        $('#navbar-arrow-indicator').css('opacity', 1).removeClass('hide');
        // Do not call handleArrowFade() here, only let scroll event control it
    });

    $(window).on('scroll', handleArrowFade);

    // Timeline float-in animation on scroll
    function animateTimelineItems() {
        $('.timeline-item').each(function () {
            var $el = $(this);
            if ($el.hasClass('timeline-animate-in')) return;
            var rect = this.getBoundingClientRect();
            var windowHeight = window.innerHeight || document.documentElement.clientHeight;
            // Trigger when 80px of the item is visible
            if (rect.top < windowHeight - 80) {
                $el.addClass('timeline-animate-in');
            }
        });
    }

    // On load and scroll, animate timeline items
    $(function () {
        animateTimelineItems();
        $(window).on('scroll', animateTimelineItems);
    });

    // Uniform hobby card height for carousel
    function setUniformHobbyCardHeight() {
        var $carousel = $('.hobbies-carousel');
        var $cards = $carousel.find('.hobby-card');
        $cards.css('min-height', ''); // reset
        // Find the "SkyDiving" card's height
        var skydivingCard = $cards.filter(function () {
            return $(this).find('h3').text().trim().toLowerCase() === 'skydiving';
        });
        var targetHeight = 0;
        if (skydivingCard.length) {
            targetHeight = skydivingCard.outerHeight();
        } else {
            // fallback: use tallest card
            $cards.each(function () {
                var h = $(this).outerHeight();
                if (h > targetHeight) targetHeight = h;
            });
        }
        if (targetHeight > 0) {
            $cards.css('min-height', targetHeight + 'px');
            $carousel.addClass('uniform-height');
        }
    }
    $(window).on('resize', setUniformHobbyCardHeight);
    $(document).ready(setUniformHobbyCardHeight);

})(jQuery);
