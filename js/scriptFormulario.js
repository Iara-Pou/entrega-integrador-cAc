const $botonCalcular = document.querySelector("#boton-calcular");
$botonCalcular.onclick= verificarInputs;

function verificarInputs(){
    const nombre = document.querySelector("#nombre").value;
    const apellido = document.querySelector("#apellido").value;
    const correo = document.querySelector("#correo").value;
    const cantidadEntradas = document.querySelector("#cantidad").value;
    const categoria = document.querySelector("#categoria").value;

    const errores = {
        nombre : validarNombreApellido(nombre),
        apellido : validarNombreApellido(apellido),
        correo : validarCorreo(correo),
        cantidadEntradas : validarCantidadEntradas(cantidadEntradas),
        categoria: validarCategoria(categoria) 
    }

    const esExito = contarErrores(errores) === 0;

    if (esExito){
        //mostrar ventana compra
        let $titulo = document.querySelector("h1");
        let $formulario = document.querySelector("form");
        let $mensajeFinal = document.querySelector("#mensaje-final")
        let $precio = document.querySelector("#precio"); 
        let descuento = calcularPorcentajeDescuento(devolverPorcentajeSegunCategoria(categoria));
        
        $titulo.textContent = `¡Gracias por participar, ${nombre}!`
        $precio.textContent = ` $${calcularPrecioEntradas(cantidadEntradas, descuento)}`;

        $formulario.classList.add("oculto");
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
    const textoErrores = Object.values(errores);

    textoErrores.forEach((error) => {
        const $contenedorError = document.createElement("p");
        $contenedorError.textContent = error;
        $contenedorErrores.appendChild($contenedorError);
    }
    );
}

function mostrarError(error){
    const $contenedorErrores = document.querySelector("#contenedor-errores");
    $contenedorErrores.classList.remove("oculto");
    $contenedorErrores.textContent = error;
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
