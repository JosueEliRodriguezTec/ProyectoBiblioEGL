
   // Reiniciar juego (si en algún momento quieres volver a habilitarlo)
// document.getElementById("rel").addEventListener("click",()=>{
//     location.reload()
// })
let touchStartBox = null;
let touchStartX = 0;
let touchStartY = 0;
var a;

var aud1 = document.getElementById("aud1");

document.addEventListener("DOMContentLoaded", function () {
    create1();
});

document.getElementById("mut").addEventListener("click", () => {
    const audios = document.querySelectorAll("audio");

    for (let i = 0; i < audios.length; i++) {
        audios[i].muted = true;
    }
});

function ply() {

    var aud = document.getElementById("aud");
    aud.play();

    document.getElementById("board1").style.display = "none";

    a = setInterval(tim, 1500);
}

var scr;
var time = 60;
var rand;

function tim() {

    time--;

    document.getElementById("time").innerHTML = time;

    if (time <= 0) {

        clearInterval(a);

        document.getElementById("time").innerHTML = "0";

        // Oculta el tablero
        document.getElementById("board").style.display = "none";

        // Muestra la pantalla de resultados
        document.getElementById("board1").style.display = "flex";

        document.getElementById("inicio").style.display = "none";

        document.getElementById("final").style.display = "flex";

        // Muestra la puntuación obtenida
        document.getElementById("finalScore").innerHTML = scr;

        // Cambia el mensaje según la puntuación
        let mensaje = "";

        if (scr >= 500) {

            document.getElementById("tituloFinal").innerHTML = "🏆 ¡Objetivo cumplido!";
            mensaje = "¡Excelente trabajo!";

        } else if (scr >= 350) {

            document.getElementById("tituloFinal").innerHTML = "🥇 Muy buen trabajo";
            mensaje = "Estuviste muy cerca.";

        } else if (scr >= 200) {

            document.getElementById("tituloFinal").innerHTML = "🥈 Buen intento";
            mensaje = "Sigue practicando.";

        } else {

            document.getElementById("tituloFinal").innerHTML = "⏰ Tiempo agotado";
            mensaje = "Inténtalo nuevamente.";

        }

        document.getElementById("mensajeFinal").innerHTML = mensaje;

        return;
    }

}

const width = 8;
var arr = [];
var element = null;

function create1() {

    scr = 0;

    document.getElementById("score").innerHTML = scr;

    var board = document.getElementById("board");

    for (let i = 0; i < width * width; i++) {

        var div = document.createElement("div");

        div.className = "box";

        rand = Math.ceil(Math.random() * 6);

        div.style.backgroundImage = `url("img/color (${rand}).png")`;

        arr.push(div);

        board.append(div);


       div.addEventListener("click", selectBox);
div.addEventListener("touchstart", touchStart);
div.addEventListener("touchend", touchEnd);
    }

   

    check();
}

function touchStart(e) {

    touchStartBox = e.target;

    touchStartX = e.touches[0].clientX;

    touchStartY = e.touches[0].clientY;

}

function touchEnd(e) {

    // Aquí irá el código del swipe en el siguiente paso

}

function dragStart(event) {

    element = event.target;

}



function dragOver(event) {
    event.preventDefault();
}

function drop(event) {

    event.preventDefault();

    var imgelemt = event.target;

    if (imgelemt && imgelemt.className === "box") {

        var dragimg = element.style.backgroundImage;

        element.style.backgroundImage = imgelemt.style.backgroundImage;

        imgelemt.style.backgroundImage = dragimg;

        check();
    }
}

function check() {

    var flg = false;

    // Horizontales
    for (let i = 0; i < width * width; i++) {

        if (i % width < width - 2) {

            if (
                arr[i].style.backgroundImage === arr[i + 1].style.backgroundImage &&
                arr[i].style.backgroundImage === arr[i + 2].style.backgroundImage &&
                arr[i].style.backgroundImage !== "none"
            ) {

                arr[i].style.backgroundImage = "none";
                arr[i + 1].style.backgroundImage = "none";
                arr[i + 2].style.backgroundImage = "none";

                flg = true;

                scr += 10;

                document.getElementById("score").innerHTML = scr;
            }
        }
    }

    // Verticales
    for (let i = 0; i < width * (width - 2); i++) {

        if (
            arr[i].style.backgroundImage === arr[i + width].style.backgroundImage &&
            arr[i].style.backgroundImage === arr[i + 2 * width].style.backgroundImage &&
            arr[i].style.backgroundImage !== "none"
        ) {

            arr[i].style.backgroundImage = "none";
            arr[i + width].style.backgroundImage = "none";
            arr[i + 2 * width].style.backgroundImage = "none";

            flg = true;

            scr += 10;

            document.getElementById("score").innerHTML = scr;
        }
    }

    if (flg) {

        setTimeout(refill, 100);

    }
}

function refill() {

    for (let i = 0; i < width * width; i++) {

        var rand = Math.ceil(Math.random() * 6);

        if (arr[i].style.backgroundImage === "none") {

            arr[i].classList.add("flow");

            arr[i].style.backgroundImage = `url("img/color (${rand}).png")`;

            arr[i].addEventListener("animationend", () => {

                arr[i].classList.remove("flow");

            });

        }

    }

    setTimeout(check, 10);

}

let firstBox = null;

function swapBoxes(box1, box2) {

    let temp = box1.style.backgroundImage;
    box1.style.backgroundImage = box2.style.backgroundImage;
    box2.style.backgroundImage = temp;

    check();
}

function selectBox(e) {

    let box = e.target;

    if (!firstBox) {
        firstBox = box;
        box.style.outline = "3px solid white"; // solo visual
        return;
    }

    // evitar seleccionar el mismo
    if (firstBox === box) {
        firstBox.style.outline = "none";
        firstBox = null;
        return;
    }

    // intercambio
   swapBoxes(firstBox, box);

firstBox.style.outline = "none";
firstBox = null;
}
     
    

