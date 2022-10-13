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
    }
    return porcentaje;
}
function calcularPorcentajeDescuento(porcentaje) {
    return (PRECIO_INICIAL * porcentaje) / 100;
}
function calcularPrecioEntradas(cantidad, descuento) {
    return (PRECIO_INICIAL - descuento) * cantidad;
}
function onlyLetters(str) {
    return /^[a-zA-Z]+$/.test(str);
  }

const PRECIO_INICIAL = 200
