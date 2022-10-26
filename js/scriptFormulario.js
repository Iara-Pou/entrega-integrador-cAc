const $botonCalcular = document.querySelector("#boton-calcular");

$botonCalcular.onclick= function(){
    const cantidadEntradas = document.querySelector("#cantidad").value;
    const categoria = document.querySelector("#categoria").value;
    let $titulo = document.querySelector("h1");
    let $precio = document.querySelector("#precio"); 
    const $nombre = document.querySelector("#nombre").value;

    if (cantidadEntradas>0 && categoria !== "" && $nombre !== ""){
        let $formulario = document.querySelector("form");
        let $mensajeFinal = document.querySelector("#mensaje-final")
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
