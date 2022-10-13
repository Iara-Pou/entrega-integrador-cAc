function devolverPorcentajeSegunCategoria(categoria) {
    let porcentaje;
    switch (categoria) {
        case "Estudiante":
            porcentaje = 80;
            break;
        case "Trainee":
            porcentaje = 50;
            break;
        case "Junior":
            porcentaje = 15;
            break;
            //validación en switch o en script origen?
    }
    return porcentaje;
}
function calcularPorcentajeDescuento(porcentaje) {
    return (PRECIO_INICIAL * porcentaje) / 100;
}
function calcularPrecioEntradas(cantidad, descuento) {
    return (PRECIO_INICIAL - descuento) * cantidad;
}

const PRECIO_INICIAL = 200
