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
    const nombre = document.querySelector("#nombre").value;
    const apellido = document.querySelector("#apellido").value;
    const mail = document.querySelector("#correo").value;
    const cantidad = document.querySelector("#cantidad").value;
    const categoria = document.querySelector("#categoria").value;

    const errores = {
        nombre: validarNombreApellido(nombre),
        apellido: validarNombreApellido(apellido),
        mail: validarCorreo(mail),
        cantidad: validarCantidadEntradas(cantidad),
        "categoria-entrada": validarCategoria(categoria)
    }

    const esExito = contarErrores(errores) === 0;

    if (esExito) {
        esconderErrores();
        esconderFormulario();
        mostrarVentanaCompra(nombre, cantidad, categoria);
    } else {
        borrarErroresAnteriores();
        mostrarErrores(errores);
    }

}

function mostrarVentanaCompra(nombreUsuario, cantidadEntradas, categoriaEntradas) {
    let descuento = calcularPorcentajeDescuento(devolverPorcentajeSegunCategoria(categoriaEntradas));

    document.querySelector("#mensaje-final").classList.remove("oculto");
    document.querySelector("h1").textContent = `¡Gracias por participar, ${nombreUsuario}!`
    document.querySelector("#precio").textContent = ` $${calcularPrecioEntradas(cantidadEntradas, descuento)}`;
}

function contarErrores(errores) {
    let contador = 0;
    Object.values(errores).forEach(
        error => {
            if (error !== "") {
                contador++;
            }
        }
    );
    return contador;
}

function mostrarErrores(errores) {
    const $contenedorErrores = document.querySelector("#contenedor-errores");
    $contenedorErrores.classList.remove("oculto");
    const textoErrores = Object.keys(errores);

    textoErrores.forEach((error) => {
        if (errores[error] != "") {
            const $contenedorError = document.createElement("p");
            $contenedorError.textContent = errores[error];
            $contenedorErrores.appendChild($contenedorError);

            $formulario[error].classList.add("input-error");

        } else {
            $formulario[error].classList.remove("input-error");
        }
    }
    );
}

function borrarErroresAnteriores(){
    const $errores = document.querySelectorAll("#contenedor-errores p");
    $errores.forEach( error => error.remove())
}

function esconderErrores() {
    const $contenedorErrores = document.querySelector("#contenedor-errores");
    $contenedorErrores.classList.add("oculto");
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
    setTimeout(() => window.location.href = "index.html",
        3000)
}

function cancelarCompra() {
    esconderMensajeCompra();
    reiniciarFormulario();
}

function reiniciarFormulario() {
    mostrarFormulario();
    reiniciarInputs();
    reiniciarTitulo();
}

function mostrarFormulario() {
    $formulario.classList.remove("oculto");
}

function reiniciarInputs() {
    const inputs = document.querySelectorAll("input");
    const $opcionDefaultSelect = document.querySelector("#opcion-default");

    inputs.forEach(input => {
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
        return "El campo debe contener por lo menos un carácter."
    }
    if (!/^[a-zA-Z]+$/.test(nombre)) {
        return "El campo debe contener solo letras."
    }
    if (nombre.length > 20) {
        return "El campo debe tener menos de 20 carácteres"
    }

    return "";
}

function validarCorreo(correo) {
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(correo)) {
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
