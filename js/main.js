(function ($) {
  "use strict";

  new WOW().init();

  // Sticky Navbar (throttled con requestAnimationFrame para evitar reflows en cada evento de scroll)
  // No cacheamos el elemento al cargar: el navbar puede inyectarse después vía include.js,
  // por eso lo resolvemos de forma perezosa la primera vez que exista.
  var $stickyTop = null;
  var ticking = false;
  function updateStickyNavbar() {
    if (!$stickyTop || !$stickyTop.length) {
      $stickyTop = $(".sticky-top");
    }
    $stickyTop.css("top", window.pageYOffset > 300 ? "0px" : "-100px");
    ticking = false;
  }
  $(window).on("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(updateStickyNavbar);
      ticking = true;
    }
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    center: true,
    margin: 24,
    dots: true,
    loop: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });
})(jQuery);
