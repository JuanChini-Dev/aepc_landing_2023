const $form = document.querySelector(".contact-form");
const $input = document.querySelectorAll(".form-control" || ".form-select");
const $button = document.querySelector(".btn");

$input.forEach((input) => {
  const $span = document.createElement("span");
  $span.id = input.name;
  $span.textContent = input.title;
  $span.classList.add("contact-form-error", "d-none", "text-danger");
  input.insertAdjacentElement("afterend", $span);
});

document.addEventListener("keyup", (e) => {
  if (e.target.matches(".contact-form [required]")) {
    let $input = e.target;

    let pattern = $input.pattern || $input.dataset.pattern;

    if (pattern && $input.value !== "") {
      let regex = new RegExp(pattern);
      if (!regex.exec($input.value)) {
        document.getElementById($input.name).classList.add("is-active");
        document.getElementById($input.name).classList.remove("d-none");
        $button.disabled = true;
      } else {
        document.getElementById($input.name).classList.remove("is-active");
        document.getElementById($input.name).classList.add("d-none");
        $button.disabled = false;
      }
    }
    if (!pattern) {
      if ($input.value === "") {
        document.getElementById($input.name).classList.add("is-active");
        document.getElementById($input.name).classList.remove("d-none");
        $button.disabled = true;
      } else {
        document.getElementById($input.name).classList.remove("is-active");
        document.getElementById($input.name).classList.add("d-none");
        $button.disabled = false;
      }
    }
  }
});

document.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    Nombre: $form.full_name.value,
    Correo: $form.email.value,
    Telefono: $form.phone.value,
    Interes: $form.subject[$form.subject.selectedIndex].text,
    Mensaje: $form.message.value,
  };

  try {
    const $loader = d.querySelector(".contact-form-loader");
    const $response = d.querySelector(".contact-form-response");
    $loader.classList.remove("d-none");

    if (
      data.Nombre === "" ||
      data.Correo === "" ||
      data.Telefono === "" ||
      data.Interes === "" ||
      data.Mensaje === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Todos los campos son obligatorios!",
      });
      $loader.classList.add("d-none");

      throw new Error("Todos los campos son obligatorios");
    } else {
      //

      fetch("https://formsubmit.co/ajax/1814c8352ba17cd6d358fa7c99ec8f1d", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((json) => {
          $loader.classList.add("d-none");
          $response.classList.remove("d-none");
          setTimeout(() => {
            Swal.fire(
              "Mensaje Enviado!",
              "En las proximas horas estaras recibiendo una respuesta a tu consulta",
              "success"
            );
            $response.classList.add("d-none");
          }, 1000);
          $form.reset();
        })
        .catch((err) => {
          console.error(err);
          let message =
            err.statusText || "Ocurrio un error al enviar el correo";
          $response.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
        })
        .finally(() => {
          $loader.classList.add("d-none");
          $button.disabled = true;
        });
    }
  } catch (error) {
    console.log(error);
  }
});
