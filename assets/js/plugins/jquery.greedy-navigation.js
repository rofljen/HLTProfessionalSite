<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
$(document).ready(function() {
    // Navigation Overflow Handling
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
  
    $(window).resize(function() {
        updateNav();
    });
  
    $btn.on('click', function() {
        $hlinks.toggleClass('hidden');
        $(this).toggleClass('close');
    });
  
    if ($nav.length && $vlinks.length && $hlinks.length) {
        updateNav();
    }

    // Mobile Menu Toggle
    const menuToggle = $('.menu-toggle');
    const navLinks = $('.nav-links');

    menuToggle.click(function(e) {
        e.stopPropagation();
        navLinks.toggleClass('show');
    });

    $(document).click(function(event) {
        if (!navLinks.is(event.target) && navLinks.has(event.target).length === 0) {
            navLinks.removeClass('show');
        }
    });

    $('.nav-links a').click(function() {
        navLinks.removeClass('show');
    });

    // Dropdown Toggle
    $("#dropdown-btn").click(function(event) {
        event.stopPropagation(); // Prevents closing when clicking inside
        $("#dropdown-menu").toggle();
    });

    // Close dropdown when clicking outside
    $(document).click(function() {
        $("#dropdown-menu").hide();
    });

    // Ensure menu closes on resize if window width increases
    $(window).resize(function() {
        if ($(window).width() > 768) {
            navLinks.removeClass('show');
            $("#dropdown-menu").hide();
        }
    });
});
</script>
