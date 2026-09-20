/* =====================================================
   UNIVERSO DE MAILY
   MAZORCA 🥸
===================================================== */


/* =====================================================
   MÚSICA — MAZORCA RADIO
===================================================== */

const musica =
    document.getElementById("musica");

const botonMusica =
    document.getElementById("botonMusica");

const estadoMusica =
    document.getElementById("estadoMusica");

const controlMusica =
    document.querySelector(".musica-control");


function actualizarMusica() {

    if (!musica || !botonMusica || !estadoMusica) {
        return;
    }

    if (!musica.paused) {

        botonMusica.textContent = "⏸";

        botonMusica.setAttribute(
            "aria-label",
            "Pausar música"
        );

        estadoMusica.textContent =
            "reproduciendo ✦";

        if (controlMusica) {
            controlMusica.classList.add(
                "reproduciendo"
            );
        }

    } else {

        botonMusica.textContent = "▶";

        botonMusica.setAttribute(
            "aria-label",
            "Reproducir música"
        );

        estadoMusica.textContent =
            "música apagada";

        if (controlMusica) {
            controlMusica.classList.remove(
                "reproduciendo"
            );
        }

    }

}


function reproducirMusica() {

    if (!musica) {
        return;
    }

    musica.volume = 0.35;

    musica.play()
        .then(function() {

            actualizarMusica();

        })
        .catch(function() {

            estadoMusica.textContent =
                "pulsa ▶ para escuchar";

        });

}


function alternarMusica() {

    if (!musica) {
        return;
    }

    if (musica.paused) {

        reproducirMusica();

    } else {

        musica.pause();

        actualizarMusica();

    }

}


/* =====================================================
   ENTRAR AL UNIVERSO
===================================================== */

function entrarAlUniverso() {

    reproducirMusica();

    const historia =
        document.getElementById("historia");

    if (historia) {

        historia.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =====================================================
   ABRIR / CERRAR CARTA
===================================================== */

function abrirCarta() {

    const carta =
        document.getElementById("carta");

    const boton =
        document.querySelector(".boton-carta");

    if (!carta || !boton) {
        return;
    }


    carta.classList.toggle("abierta");


    if (carta.classList.contains("abierta")) {

        boton.textContent =
            "cerrar carta ✦";


        setTimeout(function() {

            const interior =
                document.getElementById("cartaInterior");

            if (interior) {

                interior.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }

        }, 350);

    } else {

        boton.textContent =
            "abrir carta ✉";

    }

}


/* =====================================================
   VISOR DE FOTOS
===================================================== */

const visor =
    document.getElementById("visor");

const fotoGrande =
    document.getElementById("fotoGrande");


function abrirFoto(imagen) {

    if (!visor || !fotoGrande) {
        return;
    }

    fotoGrande.src =
        imagen.src;

    visor.classList.add("activo");

    document.body.style.overflow =
        "hidden";

}


function cerrarFoto() {

    if (!visor) {
        return;
    }

    visor.classList.remove("activo");

    document.body.style.overflow =
        "";

}


/* =====================================================
   CERRAR FOTO CON ESC
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            cerrarFoto();

        }

    }
);


/* =====================================================
   CERRAR AL HACER CLICK FUERA
===================================================== */

if (visor) {

    visor.addEventListener(
        "click",
        function(event) {

            if (event.target === visor) {

                cerrarFoto();

            }

        }
    );

}


/* =====================================================
   ANIMACIONES AL HACER SCROLL
===================================================== */

const elementos =
    document.querySelectorAll(
        ".foto-card, .presentacion, .mensaje-caja, .titulo-seccion"
    );


if ("IntersectionObserver" in window) {

    const observador =
        new IntersectionObserver(

            function(entradas) {

                entradas.forEach(
                    function(entrada) {

                        if (entrada.isIntersecting) {

                            entrada.target.classList.add(
                                "visible"
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.12
            }

        );


    elementos.forEach(
        function(elemento) {

            observador.observe(elemento);

        }
    );

} else {

    elementos.forEach(
        function(elemento) {

            elemento.classList.add("visible");

        }
    );

}


/* =====================================================
   EFECTO EN LAS FOTOS
===================================================== */

const fotos =
    document.querySelectorAll(
        ".foto-card img"
    );


fotos.forEach(
    function(foto) {

        foto.addEventListener(
            "mouseenter",
            function() {

                foto.style.filter =
                    "brightness(1.08)";

            }
        );


        foto.addEventListener(
            "mouseleave",
            function() {

                foto.style.filter =
                    "brightness(1)";

            }
        );

    }
);


/* =====================================================
   MOVIMIENTO SUAVE DE LOS PLANETAS
   No modifica el ancho de la página.
===================================================== */

document.addEventListener(
    "mousemove",
    function(event) {

        const x =
            event.clientX /
            window.innerWidth -
            0.5;

        const y =
            event.clientY /
            window.innerHeight -
            0.5;


        const planetas =
            document.querySelectorAll(
                ".planeta"
            );


        planetas.forEach(
            function(elemento, index) {

                const velocidad =
                    (index + 1) * 3;

                elemento.style.transform =
                    `translate(${x * velocidad}px, ${y * velocidad}px)`;

            }
        );

    }
);


/* =====================================================
   ESTADO INICIAL DE LA MÚSICA
===================================================== */

if (musica) {

    musica.volume = 0.35;

    musica.addEventListener(
        "play",
        actualizarMusica
    );

    musica.addEventListener(
        "pause",
        actualizarMusica
    );

    musica.addEventListener(
        "ended",
        actualizarMusica
    );

    actualizarMusica();

}
