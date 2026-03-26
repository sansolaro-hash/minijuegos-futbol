console.log("bolos-futboleros cargado");

const equipos = [
{nombre:"Arsenal", img:"img/arsenal.png"},
{nombre:"Aston Villa", img:"img/astonvilla.png"},
{nombre:"Atalanta", img:"img/atalanta.png"},
{nombre:"Atlético de Madrid", img:"img/atleticodemadrid.png"},
{nombre:"Bayern Múnich", img:"img/bayernmunich.png"},
{nombre:"Benfica", img:"img/benfica.png"},
{nombre:"Barcelona", img:"img/barcelona.png"},
{nombre:"Real Madrid", img:"img/realmadrid.png"},
{nombre:"PSG", img:"img/psg.jpg"},
{nombre:"Manchester City", img:"img/manchestercity.png"}
]

const preguntas = [

{
pregunta: "¿Qué jugador ganó el Mundial 2022?",
opciones: [
{nombre:"Messi", img:"img/messi.png", correcta:true},
{nombre:"Neymar", img:"img/neymar.png", correcta:false},
{nombre:"Mbappé", img:"img/mbappe.png", correcta:false},
{nombre:"Cristiano", img:"img/cr7.png", correcta:false}
]
},

{
pregunta: "¿Qué equipo es argentino?",
opciones: [
{nombre:"River", img:"img/river.png", correcta:true},
{nombre:"Barcelona", img:"img/barcelona.png", correcta:false},
{nombre:"Real Madrid", img:"img/realmadrid.png", correcta:false},
{nombre:"Chelsea", img:"img/chelsea.png", correcta:false}
]
}

];

let indice = 0;
let cantidadPinos = 4;
let respuestaCorrecta = "";

/* ===== CARGAR PREGUNTA ===== */

function cargarPregunta(){

const contenedor = document.getElementById("pinos");
contenedor.innerHTML = "";

document.getElementById("mensaje").innerText = "";

let p = preguntas[indice];

document.getElementById("pregunta").innerText = p.pregunta;

p.opciones.forEach(opcion => {

let div = document.createElement("div");
div.classList.add("pino");

let img = document.createElement("img");
img.src = opcion.img;

div.appendChild(img);

div.onclick = () => tocarPino(div, opcion);

contenedor.appendChild(div);

});

}

/* Mostrar pinos */

const contenedor =
document.getElementById("pinos");

contenedor.innerHTML = "";

mezcla.forEach(opcion => {

let div =
document.createElement("div");

div.classList.add("pino");

let img =
document.createElement("img");

img.src = opcion.img;

div.appendChild(img);

div.onclick = () =>
tocarPino(div, opcion);

contenedor.appendChild(div);

});

/* ===== TOCAR PINO ===== */

function tocarPino(div, opcion){

if(opcion.nombre === respuestaCorrecta){

document.getElementById("mensaje").innerText = "¡Correcto!";

setTimeout(() => {

nuevaPregunta();

}, 1000);

}else{

div.classList.add("caido");

}

}

indice++;

if(indice < preguntas.length){
cargarPregunta();
}else{
document.getElementById("pregunta").innerText = "¡Juego terminado!";
document.getElementById("pinos").innerHTML = "";
}

/* ===== INICIAR ===== */

cargarPregunta();

/* ===== SELECCIONAR NIVEL ===== */
function seleccionarNivel(cantidad){

cantidadPinos = cantidad;

nuevaPregunta();

}

/* ===== NUEVA PREGUNTA ===== */

function nuevaPregunta(){

document.getElementById("mensaje").innerText = "";

let mezcla = [...equipos]
.sort(() => Math.random() - 0.5)
.slice(0, cantidadPinos);

}
/* Elegir respuesta correcta */

let correcta =
mezcla[Math.floor(Math.random()*mezcla.length)];

respuestaCorrecta = correcta.nombre;

/* Mostrar pregunta */

document.getElementById("pregunta")
.innerText =
"Deja solo el equipo: " + respuestaCorrecta;
