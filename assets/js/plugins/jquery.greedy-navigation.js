$(document).ready(function() {
    // Greedy Nav logic for handling visible/hidden links (if needed)
    var $nav = $('#site-nav');
    var $btn = $('#site-nav button');
    var $vlinks = $('#site-nav .visible-links');
    var $hlinks = $('#site-nav .hidden-links');
    var breaks = [];

    function updateNav() {
        var availableSpace = $btn.hasClass('hidden') ? $nav.width() : $nav.width() - $btn.width() - 30;
        if ($vlinks.width() > availableSpace) {
            breaks.push($vlinks.width());
            $vlinks.children().last().prependTo($hlinks);
            if ($btn.hasClass('hidden')) {
                $btn.removeClass('hidden');
            }
        } else {
            if (availableSpace > breaks[breaks.length - 1]) {
                $hlinks.children().first().appendTo($vlinks);
                breaks.pop();
            }
            if (breaks.length < 1) {
                $btn.addClass('hidden');
                $hlinks.addClass('hidden');
            }
        }
        $btn.attr("count", breaks.length);
        if ($vlinks.width() > availableSpace) {
            updateNav();
        }
    }

    // Mobile Menu Toggle (Now part of the greedy-nav.js or navbar.js)
    $('.menu-toggle').click(function(e) {
        e.stopPropagation();
        $('.mobile-menu').toggleClass('show');
    });

    $(document).click(function(event) {
        if (!$('.mobile-menu').is(event.target) && $('.mobile-menu').has(event.target).length === 0) {
            $('.mobile-menu').removeClass('show');
        }
    });

    $('.mobile-menu a').click(function() {
        $('.mobile-menu').removeClass('show');
    });

    // Ensure the menu closes if window width increases
    $(window).resize(function() {
        if ($(window).width() > 768) {
            $('.mobile-menu').removeClass('show');
        }
    });

    // Call the updateNav function to initialize on load
    updateNav();
});
