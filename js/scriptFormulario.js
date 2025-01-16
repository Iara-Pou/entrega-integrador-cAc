const $botonCalcular = document.querySelector("#boton-calcular");
const $botonReiniciar = document.querySelector("#boton-borrar");
const $formulario = document.querySelector("form");
const $botonCompra = document.querySelector("#boton-confirmar-compra");
const $botonCancelarCompra = document.querySelector("#boton-cancelar-compra");

$botonCalcular.onclick = verificarInputs;
$botonCompra.onclick = simularCompra;
$botonCancelarCompra.onclick = cancelarCompra;
$botonReiniciar.onclick = reiniciarFormulario;

function verificarInputs() {
  const $inputNombre = document.querySelector("#nombre");
  const $inputApellido = document.querySelector("#apellido");
  const $inputMail = document.querySelector("#correo");
  const $inputCantidad = document.querySelector("#cantidad");
  const $inputCategoria = document.querySelector("#categoria");

  //almaceno el input y su error
  const inputErrores = {
    nombre: [$inputNombre, validarNombreApellido($inputNombre.value)],
    apellido: [$inputApellido, validarNombreApellido($inputApellido.value)],
    mail: [$inputMail, validarCorreo($inputMail.value)],
    cantidad: [$inputCantidad, validarCantidadEntradas($inputCantidad.value)],
    "categoria-entrada": [
      $inputCategoria,
      validarCategoria($inputCategoria.value),
    ],
  };

  const esExito = contarErrores(inputErrores) === 0;

  if (esExito) {
    borrarErroresAnteriores();
    esconderFormulario();
    mostrarVentanaCompra(
      $inputNombre.value,
      $inputCantidad.value,
      $inputCategoria.value
    );
  } else {
    borrarErroresAnteriores();
    mostrarErrores(inputErrores);
  }
}

function mostrarVentanaCompra(
  nombreUsuario,
  cantidadEntradas,
  categoriaEntradas
) {
  let descuento = calcularPorcentajeDescuento(
    devolverPorcentajeSegunCategoria(categoriaEntradas)
  );

  document.querySelector("#mensaje-final").classList.remove("oculto");
  document.querySelector(
    "h1"
  ).textContent = `¡Gracias por participar, ${nombreUsuario}!`;
  document.querySelector("#precio").textContent = ` $${calcularPrecioEntradas(
    cantidadEntradas,
    descuento
  )}`;
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
  Object.values(errores).forEach((error) => {
    if (error[1] !== "") {
      //modifica input con error
      error[0].classList.add("input-error");

      //maneja texto con error
      const TEXTO_ERROR = error[1];
      let $labelError = document.createElement("label");
      $labelError.textContent = TEXTO_ERROR;
      $labelError.classList.add("error");
      error[0].insertAdjacentElement("afterend", $labelError);
    }
  });
}

function borrarErroresAnteriores() {
  let $errores = document.querySelectorAll(".error");
  $errores.forEach((error) => error.remove());
  let $inputsErrores = document.querySelectorAll(".input-error");
  $inputsErrores.forEach((input) => input.classList.remove("input-error"));
}

function esconderFormulario() {
  $formulario.classList.add("oculto");
}

function simularCompra() {
  esconderMensajeCompra();
  mostrarCartelConfirmacion();
  redirigirAlIndex();
}

function esconderMensajeCompra() {
  let $mensajeFinal = document.querySelector("#mensaje-final");
  $mensajeFinal.classList.add("oculto");
}

function mostrarCartelConfirmacion() {
  const $mensajeConfirmacion = document.querySelector("#confirma-compra");
  $mensajeConfirmacion.classList.remove("oculto");
}

function redirigirAlIndex() {
  setTimeout(() => (window.location.href = "index.html"), 3000);
}

function cancelarCompra() {
  esconderMensajeCompra();
  reiniciarFormulario();
}

function reiniciarFormulario() {
  mostrarFormulario();
  reiniciarInputs();
  reiniciarTitulo();
  borrarErroresAnteriores();
}

function mostrarFormulario() {
  $formulario.classList.remove("oculto");
}

function reiniciarInputs() {
  const inputs = document.querySelectorAll("input");
  const $opcionDefaultSelect = document.querySelector("#opcion-default");

  inputs.forEach((input) => {
    input.value = "";
    input.classList.remove("input-error");
  });
  $opcionDefaultSelect.selected = true;
}

function reiniciarTitulo() {
  let $titulo = document.querySelector("h1");
  $titulo.textContent = "VALOR DE TICKET $200";
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

function validarCorreo(correo) {
  if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      correo
    )
  ) {
    return "El correo no es válido.";
  }
  return "";
}

function validarCantidadEntradas(cantidad) {
  if (cantidad <= 0) {
    return "El campo debe contener un número mayor a 0.";
  }
  if (cantidad > 25) {
    return "No puedes comprar más que 25 entradas.";
  }
  return "";
}

function validarCategoria(categoria) {
  if (categoria === "") {
    return "Debes seleccionar una opción.";
  }
  return "";
}
