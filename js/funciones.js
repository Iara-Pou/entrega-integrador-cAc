function calcularPorcentajeDescuento(porcentaje){
    return (PRECIO_INICIAL * porcentaje) / 100;
}
function calcularPrecioEntradas(cantidad, descuento){
    return (PRECIO_INICIAL - descuento)* cantidad;
}

const PRECIO_INICIAL = 200
