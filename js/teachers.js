// Listado de docentes de Agro Escuela.
// Para dar de alta/baja un docente, editá únicamente este array:
// agregá o quitá un objeto { nombre, cargo, img, tipo }.
// tipo: "directivo" (se muestra destacado) | "docente"
const teachers = [
  // --- Equipo Directivo ---
  {
    nombre: "Di Natale Carina",
    cargo: "Directora",
    img: "./img/teachers/cdinatale.png",
    tipo: "directivo",
  },
  {
    nombre: "Camuzzi Analía",
    cargo: "Coordinadora",
    img: "./img/teachers/acamuzzi.png",
    tipo: "directivo",
  },
  {
    nombre: "Sánchez Godoy Stella",
    cargo: "Secretaria Académica",
    img: "./img/teachers/ssanchezgodoy.png",
    tipo: "directivo",
  },

  // --- Cuerpo Docente ---
  {
    nombre: "Laguinge Amalia",
    cargo: "Docente",
    img: "./img/teachers/alaguinge.png",
    tipo: "docente",
  },
  {
    nombre: "Buffa Noel",
    cargo: "Docente",
    img: "./img/teachers/nbuffa.png",
    tipo: "docente",
  },
  {
    nombre: "Arnosio Maximiliano",
    cargo: "Docente",
    img: "./img/teachers/maarnosio.png",
    tipo: "docente",
  },
  {
    nombre: "Molina Lucas Leonel",
    cargo: "Docente",
    img: "./img/teachers/lmolina.png",
    tipo: "docente",
  },
  {
    nombre: "Fernandez Julieta",
    cargo: "Docente",
    img: "./img/teachers/jfernandez.png",
    tipo: "docente",
  },
  {
    nombre: "Silva Maria Paula",
    cargo: "Docente",
    img: "./img/teachers/mpsilva.png",
    tipo: "docente",
  },
  {
    nombre: "Vargas Rodolfo",
    cargo: "Docente",
    img: "./img/teachers/rvargas.png",
    tipo: "docente",
  },
];

// Devuelve el markup de una tarjeta de docente.
const cardHTML = (t, delay) => {
  const esLead = t.tipo === "directivo";
  return `
    <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="${delay}s">
      <div class="team-item${esLead ? " team-item-lead" : ""}">
        <div class="teacher-img overflow-hidden">
          <img
            src="${t.img}"
            alt="${t.nombre}, ${t.cargo} de Agro Escuela"
            loading="lazy"
          />
        </div>
        <div class="teacher-description text-center p-4">
          <h5 class="mb-0">${t.nombre}</h5>
          <small>${t.cargo}</small>
        </div>
      </div>
    </div>`;
};

// Renderiza un grupo de docentes en su contenedor, con delays escalonados.
const renderTeam = (lista, contenedor) => {
  if (!contenedor) return;
  contenedor.innerHTML = lista
    .map((t, i) => cardHTML(t, 0.1 + (i % 4) * 0.1))
    .join("");
};

document.addEventListener("DOMContentLoaded", () => {
  renderTeam(
    teachers.filter((t) => t.tipo === "directivo"),
    document.getElementById("team-directivos"),
  );
  renderTeam(
    teachers.filter((t) => t.tipo === "docente"),
    document.getElementById("team-docentes"),
  );
});
