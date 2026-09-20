/* =====================================================
   UNIVERSO DE MAILY
   MAZORCA 🥸
===================================================== */


/* =====================================================
   ENTRAR AL UNIVERSO
===================================================== */

function entrarAlUniverso() {

    const historia = document.getElementById("historia");

    if (historia) {
        historia.scrollIntoView({
            behavior: "smooth"
        });
    }

    // Intentar iniciar la música al tocar el botón
    const musica = document.getElementById("musica");

    if (musica && musica.paused) {
        musica.play().catch(function () {
            // El navegador puede bloquear la reproducción automática
        });
    }
}


/* =====================================================
   CARTA
===================================================== */

function abrirCarta() {

    const carta = document.getElementById("carta");
    const boton = document.querySelector(".boton-carta");
    const interior = document.getElementById("cartaInterior");

    if (!carta || !boton || !interior) return;

    const estaAbierta = carta.classList.contains("abierta");

    if (!estaAbierta) {

        carta.classList.add("abierta");

        boton.textContent = "cerrar carta ✦";

        /*
         * Calculamos la altura REAL de la carta.
         * Esto evita que el contenido se corte en celulares.
         */
        interior.style.maxHeight = interior.scrollHeight + "px";

        setTimeout(function () {

            interior.style.maxHeight = "none";

            interior.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 1000);

    } else {

        /*
         * Antes de cerrar volvemos a poner
         * la altura real para permitir la animación.
         */
        interior.style.maxHeight = interior.scrollHeight + "px";

        requestAnimationFrame(function () {

            interior.style.maxHeight = "0px";

        });

        carta.classList.remove("abierta");

        boton.textContent = "abrir carta ✉";
    }
}


/* =====================================================
   REPRODUCTOR DE FOTOS
===================================================== */

const visor = document.getElementById("visor");
const fotoGrande = document.getElementById("fotoGrande");

function abrirFoto(imagen) {

    if (!visor || !fotoGrande) return;

    fotoGrande.src = imagen.src;

    visor.classList.add("activo");

    document.body.style.overflow = "hidden";
}

function cerrarFoto() {

    if (!visor) return;

    visor.classList.remove("activo");

    document.body.style.overflow = "";
}


/* =====================================================
   CERRAR VISOR CON ESCAPE
===================================================== */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        cerrarFoto();
    }

});


/* =====================================================
   CERRAR VISOR HACIENDO CLICK AFUERA
===================================================== */

if (visor) {

    visor.addEventListener("click", function (event) {

        if (event.target === visor) {
            cerrarFoto();
        }

    });

}


/* =====================================================
   ANIMACIONES AL HACER SCROLL
===================================================== */

const elementos = document.querySelectorAll(
    ".foto-card, .presentacion, .mensaje-caja, .titulo-seccion"
);

if ("IntersectionObserver" in window) {

    const observador = new IntersectionObserver(
        function (entradas) {

            entradas.forEach(function (entrada) {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add("visible");

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    elementos.forEach(function (elemento) {

        observador.observe(elemento);

    });

} else {

    elementos.forEach(function (elemento) {

        elemento.classList.add("visible");

    });

}


/* =====================================================
   EFECTO EN LAS FOTOS
===================================================== */

const fotos = document.querySelectorAll(".foto-card img");

fotos.forEach(function (foto) {

    foto.addEventListener("mouseenter", function () {

        foto.style.filter = "brightness(1.08)";

    });

    foto.addEventListener("mouseleave", function () {

        foto.style.filter = "brightness(1)";

    });

});


/* =====================================================
   MOVIMIENTO DE LOS PLANETAS
===================================================== */

document.addEventListener("mousemove", function (event) {

    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;

    const planetas = document.querySelectorAll(".planeta");

    planetas.forEach(function (elemento, index) {

        const velocidad = (index + 1) * 3;

        elemento.style.transform =
            `translate(${x * velocidad}px, ${y * velocidad}px)`;

    });

});


/* =====================================================
   MÚSICA — MAZORCA RADIO
===================================================== */

const musica = document.getElementById("musica");
const reproductorMusica =
    document.getElementById("reproductorMusica");

const botonMusica =
    document.getElementById("botonMusica");


if (musica) {

    musica.volume = 0.35;

}


function actualizarReproductor() {

    if (!musica || !reproductorMusica || !botonMusica) {
        return;
    }

    if (musica.paused) {

        reproductorMusica.classList.remove("reproduciendo");

        botonMusica.textContent = "▶";

        botonMusica.setAttribute(
            "aria-label",
            "Reproducir música"
        );

    } else {

        reproductorMusica.classList.add("reproduciendo");

        botonMusica.textContent = "❚❚";

        botonMusica.setAttribute(
            "aria-label",
            "Pausar música"
        );

    }

}


function alternarMusica() {

    if (!musica) return;


    if (musica.paused) {

        musica.play()
            .then(function () {

                actualizarReproductor();

            })
            .catch(function () {

                actualizarReproductor();

            });

    } else {

        musica.pause();

        actualizarReproductor();

    }

}


if (musica) {

    musica.addEventListener(
        "play",
        actualizarReproductor
    );

    musica.addEventListener(
        "pause",
        actualizarReproductor
    );

    musica.addEventListener(
        "ended",
        actualizarReproductor
    );

}


/* =====================================================
   AJUSTAR LA CARTA SI CAMBIA EL TAMAÑO
   DE LA PANTALLA
===================================================== */

window.addEventListener("resize", function () {

    const carta = document.getElementById("carta");
    const interior = document.getElementById("cartaInterior");

    if (
        carta &&
        interior &&
        carta.classList.contains("abierta")
    ) {

        interior.style.maxHeight = "none";

    }

});
