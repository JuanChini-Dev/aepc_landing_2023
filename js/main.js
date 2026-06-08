(function ($) {
  "use strict";

  new WOW().init();

  // Sticky Navbar (throttled con requestAnimationFrame para evitar reflows en cada evento de scroll)
  var $stickyTop = $(".sticky-top");
  var ticking = false;
  function updateStickyNavbar() {
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
