// Greedy Navigation
$(document).ready(function() {
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
  
  // Initialize nav
  if ($nav.length && $vlinks.length && $hlinks.length) {
    updateNav();
  }
});

// Mobile Menu Toggle Function
document.addEventListener('DOMContentLoaded', function() {
  // Get the menu toggle button and navigation links
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    // Toggle menu on button click
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent event from bubbling
      navLinks.classList.toggle('show');
    });
    
    // Close menu when clicking outside of it
    document.addEventListener('click', function(event) {
      const isClickInsideNav = navLinks.contains(event.target);
      const isClickOnToggle = menuToggle.contains(event.target);
      
      if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
      }
    });
    
    // Close menu when a nav link is clicked
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('show');
      });
    });
    
    // Add touchstart event for better mobile responsiveness
    menuToggle.addEventListener('touchstart', function(e) {
      e.stopPropagation();
      navLinks.classList.toggle('show');
    }, {passive: true});
    
    // Handle window resize (close menu if screen size changes)
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
      }
    });
  }
});
