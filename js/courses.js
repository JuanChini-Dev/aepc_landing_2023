// Listado de cursos de Agro Escuela.
// Para dar de alta/baja o editar un curso, modificá únicamente este array.
// destacado: true  -> aparece en el index ("Próximos cursos")
// destacado: false -> aparece sólo en courses.html (catálogo completo)
const courses = [
  // Evento puntual: pasada la fecha (25/09/2026), cambiar a destacado: false
  // para que salga del index sin perder la URL ni el SEO.
  {
    titulo: "Nos Preparamos para el Trigo",
    img: "img/course/jornada-trigo-2026-optimized.webp",
    link: "nos-preparamos-para-el-trigo.html",
    inicio: "24 de Septiembre",
    modalidad: "Presencial",
    destacado: true,
  },
  {
    titulo: "Huella de Carbono",
    img: "img/course/huella-de-carbono.jpeg",
    link: "huella-de-carbono.html",
    inicio: "Agosto 2026",
    modalidad: "Online",
    destacado: true,
  },
  {
    titulo: "Tecnicatura Superior en Calidad y Comercializacion de Granos",
    img: "img/course/tecnicatura.webp",
    link: "2026-08-tecnicatura-d.html",
    inicio: "Agosto 2026",
    modalidad: "Distancia",
    destacado: true,
  },
  {
    titulo: "Perito Clasificador de Cereales Legumbres y Oleaginosas",
    img: "img/course/perito-distancia.webp",
    link: "2026-08-perito-d.html",
    inicio: "Agosto 2026",
    modalidad: "Distancia",
    destacado: true,
  },
  {
    titulo: "Agricultura Regenerativa desde la Base",
    img: "img/course/ag-regenerativa.jpg",
    link: "agricultura-regenerativa-desde-la-base.html",
    inicio: "Agosto 2025",
    modalidad: "Online",
    destacado: false,
  },
];

// Devuelve el markup de una card de curso.
const courseCardHTML = (c, delay) => `
  <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="${delay}s">
    <div class="course-item">
      <div class="position-relative overflow-hidden">
        <img
          class="img-fluid"
          src="${c.img}"
          alt="Curso de ${c.titulo}"
          loading="lazy"
        />
        <div
          class="more-information w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4"
        >
          <a
            href="${c.link}"
            class="flex-shrink-0 btn btn-sm btn-primary px-3"
          >
            Más información
          </a>
        </div>
      </div>
      <div class="course-title text-center p-4 pb-0">
        <h5 class="mb-0">${c.titulo}</h5>
      </div>
      <div class="d-flex border-top">
        <small class="flex-fill text-center border-end py-2">
          <i class="fa fa-user-tie text-primary me-2"></i>
          Inicio: ${c.inicio}
        </small>
        <small class="flex-fill text-center border-end py-2">
          <i class="fa fa-clock text-primary me-2"></i>
          ${c.modalidad}
        </small>
      </div>
    </div>
  </div>`;

// Renderiza una lista de cursos en su contenedor, con delays escalonados.
const renderCourses = (lista, contenedor) => {
  if (!contenedor) return;
  contenedor.innerHTML = lista
    .map((c, i) => courseCardHTML(c, 0.1 + (i % 3) * 0.1))
    .join("");
};

document.addEventListener("DOMContentLoaded", () => {
  // Index: sólo cursos destacados.
  renderCourses(
    courses.filter((c) => c.destacado),
    document.getElementById("courses-destacados")
  );
  // Página de cursos: catálogo completo.
  renderCourses(courses, document.getElementById("courses-todos"));
});
