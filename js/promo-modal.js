// Modal promocional del index.
// Se muestra una sola vez por navegador y deja de mostrarse solo cuando pasa
// el evento. Para dar de baja la campaña alcanza con borrar el markup de
// #welcomeModal en index.html; para lanzar otra, cambiar PROMO_ID.

// Cambiar PROMO_ID => la promo se vuelve a mostrar a todos (clave nueva).
const PROMO_ID = "trigo-2026-09";
const PROMO_KEY = `aepc:promo:${PROMO_ID}`;
// Kill switch: pasada esta fecha el modal no aparece más, sin tocar código.
const PROMO_FIN = new Date("2026-09-25T00:00:00-03:00");
const PROMO_DELAY_MS = 6000;

// Fallback en memoria por si el navegador bloquea el almacenamiento
// (Safari en privado y algunos bloqueadores lanzan excepción al escribir).
let promoDescartadaEnMemoria = false;

// Devuelve el primer storage utilizable, o null si ninguno lo es.
const getStorage = () => {
  for (const nombre of ["localStorage", "sessionStorage"]) {
    try {
      const s = window[nombre];
      const test = "__aepc_test__";
      s.setItem(test, "1");
      s.removeItem(test);
      return s;
    } catch (e) {
      // Seguimos probando con el siguiente.
    }
  }
  return null;
};

const yaDescartada = () => {
  const s = getStorage();
  if (!s) return promoDescartadaEnMemoria;
  try {
    return s.getItem(PROMO_KEY) !== null;
  } catch (e) {
    return promoDescartadaEnMemoria;
  }
};

const marcarDescartada = (motivo) => {
  promoDescartadaEnMemoria = true;
  const s = getStorage();
  if (!s) return;
  try {
    s.setItem(
      PROMO_KEY,
      JSON.stringify({ v: 1, at: new Date().toISOString(), motivo })
    );
  } catch (e) {
    // El fallback en memoria ya cubre esta sesión.
  }
};

// Evento GA4, solo si gtag está disponible.
const trackear = (evento, params) => {
  if (typeof gtag === "function") gtag("event", evento, params || {});
};

const iniciarPromo = () => {
  if (Date.now() >= PROMO_FIN.getTime()) return;
  if (yaDescartada()) return;

  const el = document.getElementById("welcomeModal");
  if (!el || !window.bootstrap) return;

  const modal = new bootstrap.Modal(el);

  // Un clic en cualquier CTA cuenta como visto: quien fue al programa o a
  // WhatsApp no vuelve a ver el aviso al regresar al index.
  el.querySelectorAll("[data-promo-cta]").forEach((cta) => {
    cta.addEventListener("click", () => {
      marcarDescartada("cta");
      trackear("promo_modal_cta", {
        promo_id: PROMO_ID,
        destino: cta.dataset.promoCta,
      });
    });
  });

  el.addEventListener("hidden.bs.modal", () => {
    if (!yaDescartada()) {
      marcarDescartada("close");
      trackear("promo_modal_dismiss", { promo_id: PROMO_ID });
    }
  });

  window.setTimeout(() => {
    modal.show();
    trackear("promo_modal_view", { promo_id: PROMO_ID });
  }, PROMO_DELAY_MS);
};

// Esperamos a que la página termine de cargar para no competir con el hero.
if (document.readyState === "complete") {
  iniciarPromo();
} else {
  window.addEventListener("load", iniciarPromo);
}
