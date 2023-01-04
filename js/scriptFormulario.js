const $botonCalcular = document.querySelector("#boton-calcular");
const $formulario = document.querySelector("form");
const $botonCompra = document.querySelector("#boton-confirmar-compra");

$botonCalcular.onclick= verificarInputs;
$botonCompra.onclick = simularCompra;

function verificarInputs(){
    const nombre = document.querySelector("#nombre").value;
    const apellido = document.querySelector("#apellido").value;
    const mail = document.querySelector("#correo").value;
    const cantidad = document.querySelector("#cantidad").value;
    const categoria = document.querySelector("#categoria").value;

    const errores = {
        nombre : validarNombreApellido(nombre),
        apellido : validarNombreApellido(apellido),
        mail : validarCorreo(mail),
        cantidad : validarCantidadEntradas(cantidad),
        "categoria-entrada" : validarCategoria(categoria) 
    }

    const esExito = contarErrores(errores) === 0;

    if (esExito){
        esconderErrores();
        esconderFormulario();
        //mostrar ventana compra
        let $titulo = document.querySelector("h1");
        let $mensajeFinal = document.querySelector("#mensaje-final")
        let $precio = document.querySelector("#precio"); 
        let descuento = calcularPorcentajeDescuento(devolverPorcentajeSegunCategoria(categoria));
        
        $titulo.textContent = `¡Gracias por participar, ${nombre}!`
        $precio.textContent = ` $${calcularPrecioEntradas(cantidad, descuento)}`;
        $mensajeFinal.classList.remove("oculto");

    } else {
        mostrarErrores(errores);
    }

}

function contarErrores(errores){
    let contador = 0;
    Object.values(errores).forEach(
        error => {if (error !== ""){
        contador ++;
    }}
    );
    return contador;
}

function mostrarErrores(errores){
    const $contenedorErrores = document.querySelector("#contenedor-errores");
    $contenedorErrores.classList.remove("oculto");
    const textoErrores = Object.keys(errores);

    textoErrores.forEach((error) => {
        if(errores[error] != ""){
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

function esconderErrores () {
    const $contenedorErrores = document.querySelector("#contenedor-errores");
    $contenedorErrores.classList.add("oculto");
}

function esconderFormulario(){
    $formulario.classList.add("oculto");
}

function simularCompra(){

}


function esconderMensaje(){
    let $mensajeFinal = document.querySelector("#mensaje-final");
    $mensajeFinal.classList.add("oculto");
}

function mostrarCartelConfirmacion(){
    const $mensajeConfirmacion = document.querySelector("#cartel-confirmacion");
    $mensajeConfirmacion.classList.remove("oculto");
}

function redirigirAlIndex(){
    setTimeout(()=> window.location.href = "index.html" ,
    3000)
}

function validarNombreApellido(nombre){
    if(nombre.trim() === ""){
        return "El campo debe contener por lo menos un carácter."
    }
    if(!/^[a-zA-Z]+$/.test(nombre)){
        return "El campo debe contener solo letras."
    }
    if(nombre.length > 20){
        return "El campo debe tener menos de 20 carácteres"
    }
    
    return "";
}

function validarCorreo(correo){   
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(correo)) {
        return "El correo no es válido.";
    }
    return "";
}

function validarCantidadEntradas(cantidad){
    if(cantidad<=0){
        return "El campo debe contener un número mayor a 0.";
    }
    if(cantidad>25){
        return "No puedes comprar más que 25 entradas.";
    }
    return "";
}

function validarCategoria(categoria){
    if(categoria === ""){
        return "Debes seleccionar una opción.";
    }
    return "";
}
