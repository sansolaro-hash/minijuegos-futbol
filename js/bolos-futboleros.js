console.log("bolos-futboleros cargado");

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

/* ===== TOCAR PINO ===== */

function tocarPino(div, opcion){

if(opcion.correcta){

document.getElementById("mensaje").innerText = "¡Correcto!";

setTimeout(() => {

indice++;

if(indice < preguntas.length){
cargarPregunta();
}else{
document.getElementById("pregunta").innerText = "¡Juego terminado!";
document.getElementById("pinos").innerHTML = "";
}

}, 1000);

}else{

div.classList.add("caido");

}

}

/* ===== INICIAR ===== */

cargarPregunta();