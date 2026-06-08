const d = document;

// Marca como activo el link del navbar que corresponde a la página actual.
const setActiveNav = (nav) => {
  let current = location.pathname.split("/").pop();
  if (!current) current = "index.html"; // raíz "/" => index
  nav.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
    const target = link.getAttribute("href").split("/").pop();
    const isActive = target === current;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

d.addEventListener("DOMContentLoaded", () => {
  const includeHTML = async (el, url) => {
    try {
      let res = await fetch(url);
      if (res.ok) {
        let html = await res.text();
        // Parseamos para conservar una referencia al nodo inyectado
        const template = d.createElement("template");
        template.innerHTML = html.trim();
        const node = template.content.firstElementChild;
        el.replaceWith(template.content);
        // Si el include trae un navbar, marcamos el link activo
        if (node && node.matches(".navbar")) {
          setActiveNav(node);
        }
      } else {
        console.log("Error: " + res.status);
        el.outerHTML = "<p>Error: " + res.status + "</p>";
      }
    } catch (error) {
      console.log(error);
      el.outerHTML = "<p>Error: " + error + "</p>";
    }
  };

  d.querySelectorAll("[data-include]").forEach((el) => {
    includeHTML(el, el.getAttribute("data-include"));
  });
});
