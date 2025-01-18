const $botonEnviar = document.querySelector("#botonEnvio");
$botonEnviar.onclick = (e) => {
  e.preventDefault();
  verificarInputs();
};

function verificarInputs() {
  const $inputNombre = document.querySelector("#nombre");
  const $inputApellido = document.querySelector("#apellido");
  const $inputTemaCharla = document.querySelector("#temaCharla");

  //almaceno el input y su error
  const inputErrores = {
    nombre: [$inputNombre, validarNombreApellido($inputNombre.value)],
    apellido: [$inputApellido, validarNombreApellido($inputApellido.value)],
    temaCharla: [$inputTemaCharla, validarTemaCharla($inputTemaCharla.value)],
  };

  const esExito = contarErrores(inputErrores) === 0;

  if (esExito) {
    let $mensaje = document.querySelector("#mensaje");
    $mensaje.textContent = `¡Gracias por participar, ${$inputNombre.value}! En brevedad nos contactaremos.`;
    let $elementosQueOcultar = document.querySelectorAll(".elemento-a-ocultar");
    $elementosQueOcultar.forEach((row) => row.classList.toggle("oculto"));
  } else {
    borrarErroresAnteriores();
    mostrarErrores(inputErrores);
  }
}

function borrarErroresAnteriores() {
  let $errores = document.querySelectorAll(".error");
  $errores.forEach((error) => error.remove());
  let $inputsErrores = document.querySelectorAll(".input-error");
  $inputsErrores.forEach((input) => input.classList.remove("input-error"));
}

function contarErrores(errores) {
  let contador = 0;
  Object.values(errores).forEach((error) => {
    //si el texto de error no está vacío (campo 1)
    if (error[1] !== "") {
      contador++;
    }
  });
  return contador;
}

function mostrarErrores(errores) {
  const KEYS_INPUTS = Object.keys(errores);

  Object.values(errores).forEach((error, index) => {
    if (error[1] !== "") {
      //modifica input con error
      error[0].classList.add("input-error");
      error[0].id = KEYS_INPUTS[index];

      //maneja texto con error
      const TEXTO_ERROR = error[1];
      let $labelError = document.createElement("label");
      $labelError.textContent = TEXTO_ERROR;
      $labelError.classList.add("error");
      $labelError.setAttribute("for", KEYS_INPUTS[index]);
      error[0].insertAdjacentElement("afterend", $labelError);
    }
  });
}

function esconderFormulario() {
  $formulario.classList.add("oculto");
}

function validarNombreApellido(nombre) {
  if (nombre.trim() === "") {
    return "El campo debe contener por lo menos un carácter.";
  }
  if (!/^[a-zA-Z]+$/.test(nombre)) {
    return "El campo debe contener solo letras.";
  }
  if (nombre.length > 20) {
    return "El campo debe tener menos de 20 carácteres";
  }

  return "";
}

function validarTemaCharla(tema) {
  if (tema.trim() === "") {
    return "El campo debe contener por lo menos un carácter.";
  }
  if (tema.length > 100) {
    return "El campo debe tener menos de 100 carácteres.";
  }
  return "";
}

// Funcionalidad de widget scroll top
function scrollearArriba() {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

const $botonGoTop = document.querySelector("#go-top-container");
$botonGoTop.onclick = scrollearArriba;

const altoDePantalla = window.innerHeight;
const ALTURA_MOSTRAR_BOTON = altoDePantalla / 5.5;

window.addEventListener("scroll", () => {
  if (window.scrollY < ALTURA_MOSTRAR_BOTON) {
    $botonGoTop.classList.add("oculto");
    $botonGoTop.classList.remove("fade-in");
  } else {
    $botonGoTop.classList.remove("oculto");
    $botonGoTop.classList.add("fade-in");
  }
});
