const $botonCalcular = document.querySelector("#boton-calcular");
$botonCalcular.onclick= manejarErrores;

function manejarErrores(){
    let $titulo = document.querySelector("h1");
    const $nombre = document.querySelector("#nombre").value;
    const cantidadEntradas = document.querySelector("#cantidad").value;
    const categoria = document.querySelector("#categoria").value;

    let esExito = cantidadEntradas>0 && categoria !== "" && $nombre !== "";

    if (esExito){
        let $formulario = document.querySelector("form");
        let $mensajeFinal = document.querySelector("#mensaje-final")
        let $precio = document.querySelector("#precio"); 
        let descuento = calcularPorcentajeDescuento(devolverPorcentajeSegunCategoria(categoria));
        
        $titulo.textContent = `¡Gracias por participar, ${$nombre}!`
        $precio.textContent = ` $${calcularPrecioEntradas(cantidadEntradas, descuento)}`;

        $formulario.classList.add("oculto");
        $mensajeFinal.classList.remove("oculto");

    } else if (cantidadEntradas<=0) {
        alert("¡Debes ingresar 1 o más entradas!")
    } else if (categoria===""){
        alert("¡No te olvides de seleccionar una categoría!")
    } else {
        alert("Por favor, ingresá todos los datos!")
    }

    return false;
}

function mostrarError(error){
    const $contenedorErrores = document.querySelector("#contenedor-errores");
    $contenedorErrores.classList.remove("oculto");
    $contenedorErrores.textContent = error;
}
