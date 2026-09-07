/**
 * Jornada "Nos Preparamos para el Trigo".
 *
 * Archivo aparte a proposito: js/main.js llama a .owlCarousel() y la libreria
 * solo se carga en index.html, asi que en las paginas de curso ese IIFE se
 * corta con un TypeError y todo lo que se agregue ahi nunca llega a correr.
 *
 * Sin dependencias (no usa jQuery).
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initCopyButtons();
    initStickyCta();
    initSmoothScroll();
  });

  /* ---------------------------------------------------------------
   * Copiar datos bancarios al portapapeles
   * ------------------------------------------------------------- */
  function initCopyButtons() {
    var buttons = document.querySelectorAll(".jt-copy");
    if (!buttons.length) return;

    var status = document.getElementById("jt-copy-status");

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        var value = button.getAttribute("data-copy");
        var label = button.getAttribute("data-label") || "El dato";
        if (!value) return;

        copyText(value).then(function (ok) {
          showFeedback(button, status, label, ok);
        });
      });
    });
  }

  function copyText(text) {
    // navigator.clipboard solo existe en contextos seguros (https o localhost).
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(
        function () {
          return true;
        },
        function () {
          return legacyCopy(text);
        }
      );
    }
    return Promise.resolve(legacyCopy(text));
  }

  function legacyCopy(text) {
    var area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "-1000px";
    area.style.opacity = "0";
    document.body.appendChild(area);

    var ok = false;
    try {
      area.select();
      area.setSelectionRange(0, area.value.length);
      ok = document.execCommand("copy");
    } catch (err) {
      ok = false;
    }

    document.body.removeChild(area);
    return ok;
  }

  function showFeedback(button, status, label, ok) {
    var text = button.querySelector(".jt-copy__text");
    var icon = button.querySelector("i");

    if (button.dataset.jtTimer) {
      window.clearTimeout(Number(button.dataset.jtTimer));
    }

    if (ok) {
      button.classList.add("is-copied");
      if (icon) icon.className = "fa-solid fa-check";
      if (text) text.textContent = "Copiado";
      if (status) status.textContent = label + " copiado al portapapeles.";
    } else {
      if (status) {
        status.textContent =
          "No se pudo copiar. Seleccioná el dato y copialo a mano.";
      }
      return;
    }

    var timer = window.setTimeout(function () {
      button.classList.remove("is-copied");
      if (icon) icon.className = "fa-regular fa-copy";
      if (text) text.textContent = "Copiar";
      if (status) status.textContent = "";
    }, 2000);

    button.dataset.jtTimer = String(timer);
  }

  /* ---------------------------------------------------------------
   * Barra CTA fija en mobile: aparece al dejar atras el hero
   * ------------------------------------------------------------- */
  function initStickyCta() {
    var bar = document.querySelector(".jt-sticky-cta");
    var hero = document.querySelector(".jt-hero");
    if (!bar || !hero) return;

    // La clase en <body> reserva espacio al final y sube el boton flotante
    // de WhatsApp, que vive fijo en la misma esquina.
    function toggle(visible) {
      bar.classList.toggle("is-visible", visible);
      document.body.classList.toggle("has-jt-cta", visible);
    }

    if (!("IntersectionObserver" in window)) {
      toggle(true);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          toggle(!entry.isIntersecting);
        });
      },
      { rootMargin: "-80px 0px 0px 0px", threshold: 0 }
    );

    observer.observe(hero);
  }

  /* ---------------------------------------------------------------
   * Scroll suave con offset por el navbar sticky
   * ------------------------------------------------------------- */
  function initSmoothScroll() {
    var NAV_OFFSET = 80;
    var links = document.querySelectorAll('.jt-page a[href^="#"]');

    links.forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href || href === "#") return;

      link.addEventListener("click", function (event) {
        var target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();

        var top =
          target.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;
        var reduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

        window.scrollTo({ top: top, behavior: reduced ? "auto" : "smooth" });

        // El foco debe seguir al scroll para quien navega con teclado.
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });

        if (history.pushState) history.pushState(null, "", href);
      });
    });
  }
})();
