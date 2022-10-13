const $botonCalcular = document.querySelector("#boton-calcular");

$botonCalcular.onclick= function(){
    const cantidadEntradas = document.querySelector("#cantidad").value;
    const categoria = document.querySelector("#categoria").value;
    let $precio = document.querySelector("#precio"); 

    if (cantidadEntradas>0 && categoria!== ""){
        let descuento = calcularPorcentajeDescuento(devolverPorcentajeSegunCategoria(categoria));
        $precio.textContent = ` $${calcularPrecioEntradas(cantidadEntradas, descuento)}`;
    } else if (cantidadEntradas<=0) {
        alert("¡Debes ingresar 1 o más entradas!")
    } else {
        alert("¡No te olvides de seleccionar una categoría!")
    }

    return false;
}
