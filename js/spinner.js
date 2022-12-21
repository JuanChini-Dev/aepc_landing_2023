const w = window;
const loader = w.document.querySelector("#spinner");

w.addEventListener("load", () => {
  loader.classList.add("d-none");
});
