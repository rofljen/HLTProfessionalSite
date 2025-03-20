/*
* Greedy Navigation
*
* http://codepen.io/lukejacksonn/pen/PwmwWV
*
*/

var $nav = $('#site-nav');
var $btn = $('#site-nav button');
var $vlinks = $('#site-nav .visible-links');
var $hlinks = $('#site-nav .hidden-links');

var breaks = [];

function updateNav() {
  var availableSpace = $btn.hasClass('hidden') ? $nav.width() : $nav.width() - $btn.width() - 30;

  // The visible list is overflowing the nav
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

// Window listeners
$(window).resize(function() {
  updateNav();
});

$btn.on('click', function() {
  $hlinks.toggleClass('hidden');
  $(this).toggleClass('close');
});

updateNav();

/*
* Mobile Menu Toggle
*/

$(document).ready(function() {
  var $menuToggle = $('.menu-toggle');
  var $navLinks = $('.nav-links');

  if ($menuToggle.length && $navLinks.length) {
    // Toggle menu on button click
    $menuToggle.on('click', function() {
      $navLinks.toggleClass('show');
    });

    // Close menu when clicking outside of it
    $(document).on('click', function(event) {
      if (!$navLinks.is(event.target) && !$menuToggle.is(event.target) && $navLinks.has(event.target).length === 0) {
        $navLinks.removeClass('show');
      }
    });

    // Close menu when a nav link is clicked
    $navLinks.find('a').on('click', function() {
      $navLinks.removeClass('show');
    });
  }
});
