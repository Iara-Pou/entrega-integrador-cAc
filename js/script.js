const $botonEnviar = document.querySelector("#botonEnvio");

$botonEnviar.onclick= function(){
    const $nombre = document.querySelector("#nombre").value;
    let $mensaje = document.querySelector("#mensaje"); 
    //seleccionaría el parrafo

        if($nombre.trim() !== ""){
            $mensaje.textContent = `¡Gracias por participar, ${$nombre}! En brevedad nos contactaremos.`

            let $elementosQueOcultar = document.querySelectorAll(".elemento-a-ocultar")
            $elementosQueOcultar.forEach(row => row.classList.toggle('oculto'));
        }


    return false;
}

function scrollearArriba (){
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    }

const $botonGoTop = document.querySelector("#go-top-container");
$botonGoTop.onclick = scrollearArriba;



window.addEventListener('scroll', () =>{
    if(window.scrollY < 130){
        $botonGoTop.classList.add("oculto");
    } else {
        $botonGoTop.classList.remove("oculto");
    }
}
);
