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

const sonidoPino =
new Audio("sonidos/pin.mp3");

let indice = 0;
let cantidadPinos = 4;
let respuestaCorrecta = "";
let puntaje = 0;
let tiempoRestante = 0;
let temporizador;
let record =
localStorage.getItem("recordBolos") || 0;

document.getElementById("facil")
.onclick = () => iniciarNivel(4);

document.getElementById("medio")
.onclick = () => iniciarNivel(6);

document.getElementById("dificil")
.onclick = () => iniciarNivel(8);

document.getElementById("extremo")
.onclick = () => iniciarNivel(10);

/* ===== INICIAR NIVEL ===== */

function iniciarNivel(cantidad){

cantidadPinos = cantidad;

/* Definir tiempo según nivel */

if(cantidad === 4){
tiempoRestante = 25;
}

if(cantidad === 6){
tiempoRestante = 20;
}

if(cantidad === 8){
tiempoRestante = 15;
}

if(cantidad === 10){
tiempoRestante = 10;
}

iniciarCronometro();

nuevaPregunta();

actualizarRecord();
}

/* ===== NUEVA PREGUNTA ===== */

function nuevaPregunta(){

document.getElementById("mensaje").innerText = "";

/* Mezclar equipos */

let mezcla =
[...equipos]
.sort(() => Math.random() - 0.5)
.slice(0, cantidadPinos);

/* Elegir correcta */

let correcta =
mezcla[Math.floor(Math.random()*mezcla.length)];

respuestaCorrecta = correcta.nombre;

/* Mostrar pregunta */

document.getElementById("pregunta")
.innerText =
"Deja solo el equipo: " + respuestaCorrecta;

/* Crear pinos */

let contenedor =
document.getElementById("pinos");

contenedor.innerHTML = "";

/* Crear filas triangulares */

let filas = [
[0],
[1,2],
[3,4,5],
[6,7,8,9]
];

let index = 0;

filas.forEach(filaArray => {

let fila =
document.createElement("div");

fila.classList.add("fila");

filaArray.forEach(() => {

if(index < mezcla.length){

let opcion = mezcla[index];

let div =
document.createElement("div");

div.classList.add("pino");

/* Imagen */

let img =
document.createElement("img");

img.src = opcion.img;

div.appendChild(img);

/* Click */

div.onclick = () =>
tocarPino(div, opcion);

fila.appendChild(div);

index++;

}

});

if(fila.children.length > 0){

contenedor.appendChild(fila);

}

});

actualizarContador();

}
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

function tocarPino(div, opcion){

/* Solo tirar si es incorrecto */

if(opcion.nombre !== respuestaCorrecta){

/* Elegir caída aleatoria */

let direccion =
Math.random() < 0.5
? "caido-izq"
: "caido-der";

/* Aplicar caída */

div.classList.add(direccion);

puntaje += 10;
actualizarPuntaje();

actualizarContador();

/* Sonido (lo agregamos abajo) */

if(typeof sonidoPino !== "undefined"){
sonidoPino.currentTime = 0;
sonidoPino.play();
}

/* Contar pinos que siguen de pie */

let pinos =
document.querySelectorAll(
".pino:not(.caido-izq):not(.caido-der)"
);

/* Si queda uno solo */

if(pinos.length === 1){

puntaje += 50;
actualizarPuntaje();

setTimeout(() => {

document.getElementById("mensaje")
.innerText = "¡Correcto! ⚽🎳";

/* Nueva ronda */

setTimeout(() => {

nuevaPregunta();

}, 1000);

}, 500);

}

}

}

/* ===== SIGUIENTE NIVEL ===== */
function siguienteNivel(cantidad){

cantidadPinos = cantidad;

nuevaPregunta();

}

function actualizarContador(){

let pinos =
document.querySelectorAll(
".pino:not(.caido-izq):not(.caido-der)"
);

document.getElementById("contador")
.innerText =
"🎳 Pinos restantes: " + pinos.length;

}

function actualizarPuntaje(){

document.getElementById("puntaje")
.innerText =
"⭐ Puntaje: " + puntaje;

}

function iniciarCronometro(){

/* Limpiar si ya había uno */

clearInterval(temporizador);

/* Mostrar tiempo inicial */

actualizarTiempo();

/* Empezar conteo */

temporizador = setInterval(() => {

tiempoRestante--;

actualizarTiempo();

/* Si llega a 0 */

if(tiempoRestante <= 0){

clearInterval(temporizador);

finDelTiempo();

}

}, 1000);

}

function actualizarTiempo(){

document.getElementById("tiempo")
.innerText =
"⏱️ Tiempo: " + tiempoRestante;

}

function finDelTiempo(){

document.getElementById("mensaje")
.innerText = "⏰ ¡Tiempo agotado!";

/* Limpiar pinos */

document.getElementById("pinos")
.innerHTML = "";

if(puntaje > record){

record = puntaje;

localStorage.setItem(
"recordBolos",
record
);

actualizarRecord();

document.getElementById("mensaje")
.innerText =
"🏆 ¡Nuevo récord!";

}
}

document.getElementById("volver")
.onclick = () => {

window.location.href = "index.html";

};

function actualizarRecord(){

document.getElementById("record")
.innerText =
"🏆 Récord: " + record;

}
