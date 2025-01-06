function devolverPorcentajeSegunCategoria(categoria) {
    let porcentaje;
    switch (categoria) {
        case "estudiante":
            porcentaje = 80;
            break;
        case "trainee":
            porcentaje = 50;
            break;
        case "junior":
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

const PRECIO_INICIAL = 200;

/* cosas que mejorar del form:
1- armar dos buttons adentro del div cartel: comprar (a con href que lleve a pag principal) y cancelar (saca el cartel, reinicia el form)
2- que el cartel aparezca cuando acepta el input, toggle class oculto
3- revisar validaciones, mejorarlas
4- puede haber un evento que escuche cuando lleno un input y si está bien ponga el borde en verde, class "correcto". sino en gris. o celeste y gris
 */
