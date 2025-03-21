$(document).ready(function() {
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
    
    // Mobile Dropdown Toggle
    $("#dropdown-btn").click(function(event) {
        event.stopPropagation(); 
        $("#dropdown-menu").toggle();
    });

    // Close dropdown when clicking outside
    $(document).click(function() {
        $("#dropdown-menu").hide();
    });

    $(window).resize(function() {
        updateNav();
        if ($(window).width() > 768) {
            $("#dropdown-menu").hide();
        }
    });

    updateNav();
});
