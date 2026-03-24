console.log("VAR cargado");

// PREGUNTAS

const preguntas = [

{
pregunta:
"Messi debutó en el Barcelona en 2004",

respuesta: true,

parcial: ["2004"],

completa: [
"16",
"octubre",
"2004",
"espanyol"
]

},

{
pregunta:
"El Maracanazo ocurrió en el año 2014",

respuesta: false,

parcial: ["1950"],

completa: [
"1950",
"uruguay"
]

},

{
pregunta:
"Brasil tiene 6 mundiales",

respuesta: false,

parcial: ["5"],

completa: [
"1958",
"1962",
"1970",
"1994",
"2002"
]

},

{
pregunta:
"Rodri Hernández ganó el Balón de Oro en 2024",

respuesta: true,

parcial: [
"rodri",
"vinicius"
],

completa: [
"rodri",
"vinicius",
"manchester city"
]

},

{
pregunta:
"Real Madrid ganó cinco Copas de Europa consecutivas",

respuesta: true,

parcial: ["di stefano"],

completa: [
"1956",
"1957",
"1958",
"1959",
"1960"
]

}

];

// VARIABLES

let indice = 0;
let puntaje = 0;
let respuestaElegida = null;

// ELEMENTOS

const preguntaTexto =
document.getElementById("pregunta");

const puntajeTexto =
document.getElementById("puntaje");

const input =
document.getElementById("justificacion");

const resultadoTexto =
document.getElementById("resultado");

const btnVerdadero =
document.getElementById("verdadero");

const btnFalso =
document.getElementById("falso");

// MOSTRAR PREGUNTA

function mostrarPregunta(){

preguntaTexto.textContent =
preguntas[indice].pregunta;

input.value = "";

respuestaElegida = null;

resultadoTexto.textContent = "";

// limpiar botones

btnVerdadero.classList.remove(
"seleccionado-verdadero"
);

btnFalso.classList.remove(
"seleccionado-falso"
);

}

mostrarPregunta();

// BOTONES

btnVerdadero.onclick = () => {

respuestaElegida = true;

btnVerdadero.classList.add(
"seleccionado-verdadero"
);

btnFalso.classList.remove(
"seleccionado-falso"
);

};

btnFalso.onclick = () => {

respuestaElegida = false;

btnFalso.classList.add(
"seleccionado-falso"
);

btnVerdadero.classList.remove(
"seleccionado-verdadero"
);

};

// VERIFICAR RESPUESTA

function verificar(){

if(respuestaElegida === null){

preguntaTexto.textContent =
"⚠️ Primero elige Verdadero o Falso";

return;

}

let actual =
preguntas[indice];

let puntos = 0;

// verificar V/F

if(respuestaElegida === actual.respuesta){

puntos = 1;

let texto =
input.value.toLowerCase();

// PARCIAL

if(actual.parcial.some(p =>
texto.includes(p))){

puntos = 2;

}

// COMPLETA

if(actual.completa.every(p =>
texto.includes(p))){

puntos = 3;

}

}

// sumar puntos

puntaje += puntos;

puntajeTexto.textContent =
"Puntaje: " + puntaje;

// mostrar resultado

if(puntos > 0){

resultadoTexto.textContent =
"✅ Correcto +" + puntos + " puntos";

// color verde al botón correcto

if(respuestaElegida === true){

btnVerdadero.classList.add(
"seleccionado-verdadero"
);

}

if(respuestaElegida === false){

btnFalso.classList.add(
"seleccionado-verdadero"
);

}

}else{

resultadoTexto.textContent =
"❌ Incorrecto";

// color rojo al botón incorrecto

if(respuestaElegida === true){

btnVerdadero.classList.add(
"seleccionado-falso"
);

}

if(respuestaElegida === false){

btnFalso.classList.add(
"seleccionado-falso"
);

}

}

// siguiente pregunta

setTimeout(() => {

siguientePregunta();

}, 1200);

document.getElementById("siguiente")
.onclick = () => {

// si eligió verdadero o falso
if(respuestaElegida !== null){

verificar();

}else{

preguntaTexto.textContent =
"⚠️ Primero elige Verdadero o Falso";

}

};

}

function siguientePregunta(){

indice++;

if(indice < preguntas.length){

mostrarPregunta();

}else{

preguntaTexto.textContent =
"🏆 Juego terminado";

}

}

// ENTER para verificar

document.addEventListener("keydown",
function(event){

if(event.key === "Enter"){

verificar();

}

});