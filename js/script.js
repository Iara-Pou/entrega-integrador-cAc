const $botonCalcular = document.querySelector("#boton-calcular");

$botonCalcular.onclick= function(){
    const cantidadEntradas = document.querySelector("#cantidad").value;
    const categoria = document.querySelector("#categoria").value;
    let $titulo = document.querySelector("h1");
    let $precio = document.querySelector("#precio"); 
    const $nombre = document.querySelector("#nombre").value;

    if (cantidadEntradas>0 && categoria!== ""){
        let descuento = calcularPorcentajeDescuento(devolverPorcentajeSegunCategoria(categoria));
        $precio.textContent = ` $${calcularPrecioEntradas(cantidadEntradas, descuento)}`;
        $titulo.textContent = `¡Gracias por participar, ${$nombre}!`

        let $elementosQueOcultar = document.querySelectorAll(".elemento-a-ocultar")
        $elementosQueOcultar.forEach(row => row.classList.toggle('oculto'));

    } else if (cantidadEntradas<=0) {
        alert("¡Debes ingresar 1 o más entradas!")
    } else {
        alert("¡No te olvides de seleccionar una categoría!")
    }

    return false;
}
