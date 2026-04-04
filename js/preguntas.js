console.log ("juego de preguntas cargado");

const preguntas = [
    {
        pregunta:"¿Único jugador en ganar tres copas del mundo?",
        correcta:"Pelé",
        incorrectas: [
                "Maradona",
                "Johan Cruyff",
                "Alfredo Di Stéfano"
            ]
    },
    {
        pregunta:"¿Jugador que posee más balones de oro?",
        correcta:"Lionel Andrés Messi",
        incorrectas: [ 
            "Cristiano Ronaldo",
            "Rivaldo", 
            "Karim Benzema"
        ] 
    },
    {
        pregunta:"¿Selección, apodada la canarinha?",
        correcta:"Brasil", 
        incorrectas: [
            "Colombia",
            "Venezuela",
            "Perú"
        ]
    },
    {
        pregunta:"¿Cuántas copas del mundo posee la selección de Brasil?",
        correcta:"5", 
        incorrectas: [
            "4",
            "3",
            "6"
        ]    
    },
    {
        pregunta:"¿Selección, apodada la vinotinto?",
        correcta: "Venezuela",
        incorrectas: [
            "Colombia",
            "perú",
            "Bolivia"
        ]
    },
    {
        pregunta:"¿Cuál fue la selección que ganó la copa del mundo 2022?",
        correcta:"Argentina",
        incorrectas:[
            "Francia",
            "Portugal",
            "España"
        ]
    }, 
    {
        pregunta:"¿En qué equipo jugó Juan Román Riquelme?",
        correcta:"Villarreal",
        incorrectas: [
            "Real Madrid",
            "River Plate",
            "Independiente"
        ]
    },
    {
        pregunta:"¿Cuál fue el resultado del partido entre Brasil y Alemania, en la semifinal del mundial 2014?",
        correcta:"7-1 ganó Alemania",
        incorrectas: [
            "3-0 ganó Brasil",
            "1-1 ganó Brasil en penales",
            "2-1 ganó Alemania"
        ]
    },
    {
        pregunta:"¿Quién es el único jugador, en ganar dos tripletes consecutivos, con equipos distintos?",
        correcta:"Samuel Eto",
        incorrectas: [
            "Lionel Andrés Messi",
            "Andrés Iniesta",
            "Didier Drogba"
        ]
    },
    {
        pregunta:"¿Quién ganó la Champions League 2009?",
        correcta:"Barcelona",
        incorrectas: [
            "Inter de Milán",
            "Real Madrid",
            "Bayern Múnich"
        ]
    },
    {
        pregunta:"¿En qué año, Lionel Andrés Messi, rompió el récord de más goles convertidos en una temporada?",
        correcta:"2012",
        incorrectas: [
            "2011",
            "2010",
            "2009"
        ]
    },
    {
        pregunta:"¿Cuántos goles convirtió Lionel Andrés Messi, para romper el récord de más goles en una temporada?",
        correcta:"91 goles",
        incorrectas: [
            "55 goles",
            "33 goles",
            "68 goles"
        ]
    },
    {
        pregunta:"¿A qué selección le ganó España la final de la copa del mundo 2010, para consagrarse campeón por primera vez en su historia?",
        correcta:"Países Bajos",
        incorrectas: [
            "Alemania",
            "Uruguay",
            "Argentina"
        ]
    },
    {
        pregunta:"¿Quién ganó el primer mundial de la historia de futbol del año 1930?",
        correcta:"Uruguay",
        incorrectas: [
            "Brasil",
            "Argentina",
            "Alemania"
        ]
    },
    {
        pregunta:"¿En qué mundial, se dió el evento conocido como el maracanazo?",
        correcta:"Brasil 1950",
        incorrectas: [
            "España 1982",
            "Suecia 1958",
            "Chile 1962"
        ]
    }
 ];

let preguntaActual = 0
let puntos = 0;
let tiempo = 8
let temporizador;
let record = localStorage.getItem("recordPreguntas") || 0;
document.getElementById("record").innerText =
"🏆 Récord: " + record;
let mensajeFinal = "";

const op1 = document.getElementById("op1");
const op2 = document.getElementById("op2");
const op3 = document.getElementById("op3");
const op4 = document.getElementById("op4");
const reiniciar = document.getElementById("reiniciar");
const sonidoCorrecto = new Audio("sonidos/correcto.mp3");
const sonidoIncorrecto = new Audio("sonidos/incorrecto.mp3");
const sonidoFinal = new Audio("sonidos/final.mp3");

mezclar(preguntas);

cargarPregunta();

function cargarPregunta(){

    const pregunta = preguntas[preguntaActual];

    const correcta = pregunta.correcta;

    const opciones = [
        correcta,
        pregunta.incorrectas[0],
        pregunta.incorrectas[1],
        pregunta.incorrectas[2]
    ];

    mezclar(opciones);

    document.getElementById("pregunta").innerText =
    pregunta.pregunta;

    op1.innerText = opciones[0];
    op2.innerText = opciones[1];
    op3.innerText = opciones[2];
    op4.innerText = opciones[3];

    tiempo = 8;
    iniciarTemporizador();

    document.getElementById("progreso").innerText =
   "Pregunta " + (preguntaActual + 1) +
   " de " + preguntas.length;

   document.getElementById("barra").value =
   preguntaActual + 1;

   op1.disabled = false;
op2.disabled = false;
op3.disabled = false;
op4.disabled = false;

op1.classList.remove("correcto", "incorrecto");
op2.classList.remove("correcto", "incorrecto");
op3.classList.remove("correcto", "incorrecto");
op4.classList.remove("correcto", "incorrecto");

}

op1.onclick = verificarRespuesta;
op2.onclick = verificarRespuesta;
op3.onclick = verificarRespuesta;
op4.onclick = verificarRespuesta;

function verificarRespuesta(event){

    clearInterval(temporizador);
    const respuestaJugador = event.target.innerText;
    const correcta = 
             preguntas[preguntaActual].correcta;

    const resultado = document.getElementById("resultado");
    const boton = event.target;

    if(respuestaJugador === correcta){

    resultado.innerText = "✅ Correcto";
    puntos++;

    boton.classList.add("correcto");

    sonidoCorrecto.play();

}else{

    resultado.innerText = "❌ Incorrecto";

    boton.classList.add("incorrecto");

    sonidoIncorrecto.play();

}
    setTimeout(siguientePregunta,1000);

    op1.disabled = true;
    op2.disabled = true;
    op3.disabled = true;
    op4.disabled = true;

}

function siguientePregunta(){

    preguntaActual++;

    if(preguntaActual < preguntas.length){

        cargarPregunta();

    }else{

        let mensajeFinal = "";

        if(puntos >= 13){

            mensajeFinal = "🏆 ¡Excelente! Sos un experto del fútbol";

        }else if(puntos >= 9){

            mensajeFinal = "⚽ Muy bien jugado";

        }else{

            mensajeFinal = "🙂 Podés mejorar, intentá otra vez";
        }

        document.getElementById("resultado").innerText =
        "🎮 Preguntas completadas: " + puntos + " puntos\n" +
        mensajeFinal;

        if(puntos > record){

            record = puntos;
            localStorage.setItem("recordPreguntas", record);

            document.getElementById("resultado").innerText +=
            " 🎉 ¡Nuevo récord!";
        }

        document.getElementById("record").innerText =
        "🏆 Récord: " + record;

        reiniciar.style.display = "block";

        op1.disabled = true;
        op2.disabled = true;
        op3.disabled = true;
        op4.disabled = true;

        sonidoFinal.play(); // 🔊 solo al terminar
    }

}

reiniciar.onclick = function(){

    preguntaActual = 0;
    puntos = 0;

    mezclar(preguntas);

    document.getElementById("resultado").innerText = "";
    reiniciar.style.display = "none";

    cargarPregunta();
}

function mezclar(array){

    for(let i = array.length - 1; i > 0; i--){

        let j = Math.floor(Math.random() * (i + 1));

        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function iniciarTemporizador(){

    const tiempoTexto = document.getElementById("tiempo");

    tiempoTexto.innerText = "⏱️ Tiempo: " + tiempo;

    temporizador = setInterval(() => {

        tiempo--;

        tiempoTexto.innerText = "⏱️ Tiempo: " + tiempo;

        // Color cuando queda poco tiempo
        if(tiempo <= 2){
            tiempoTexto.style.color = "red";
        }else{
            tiempoTexto.style.color = "black";
        }

        // Tiempo agotado
        if(tiempo === 0){

            clearInterval(temporizador);

            document.getElementById("resultado").innerText = "⏰ Incorrecto (sin tiempo)";

            op1.disabled = true;
            op2.disabled = true;
            op3.disabled = true;
            op4.disabled = true;

            setTimeout(siguientePregunta, 1000);
        }

    }, 1000);

}

