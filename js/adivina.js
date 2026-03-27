console.log("Juego cargado");

const equipos = [

{nombre:"Barcelona",imagen:"img/barcelona.png"},
{nombre:"Real Madrid",imagen:"img/realmadrid.png"},
{nombre:"Bayern Múnich",imagen:"img/bayernmunich.png"},
{nombre:"Arsenal",imagen:"img/arsenal.png"},
{nombre:"Manchester City",imagen:"img/manchestercity.png"},
{nombre:"Manchester United",imagen:"img/manchesterunited.png"},
{nombre:"Chelsea",imagen:"img/chelsea.png"},
{nombre:"Juventus",imagen:"img/juventus.png"},
{nombre:"Inter de Milán",imagen:"img/interdemilan.png"},
{nombre:"Milan",imagen:"img/milan.png"},
{nombre:"Napoli",imagen:"img/napoli.png"},
{nombre:"Atlético de Madrid",imagen:"img/atleticodemadrid.png"},
{nombre:"Roma",imagen:"img/roma.png"},
{nombre: "Liverpool", imagen: "img/liverpool.jpg"},
{nombre: "Tottenham", imagen: "img/tottenham.png"},
{nombre: "Newcastle", imagen: "img/newcastle.png"},
{nombre: "Aston Villa", imagen: "img/astonvilla.png"},
{nombre: "PSG", imagen: "img/psg.jpg"},
{nombre: "Olympique de Marsella", imagen: "img/marsella.png"},
{nombre: "Olympique de Lyon", imagen: "img/lyon.jpg"},
{nombre: "Borussia Dortmund", imagen: "img/dortmund.png"},
{nombre: "RB Leipzig", imagen: "img/leipzig.png"},
{nombre: "Bayer Leverkusen", imagen: "img/leverkusen.png"},
{nombre: "Benfica", imagen: "img/benfica.png"},
{nombre: "Porto", imagen: "img/porto.png"},
{nombre: "Sporting Lisboa", imagen: "img/sporting.png"},
{nombre: "Sevilla", imagen: "img/sevilla.png"},
{nombre: "Valencia", imagen: "img/valencia.png"},
{nombre: "Real Sociedad", imagen: "img/realsociedad.png"},
{nombre: "Lazio", imagen: "img/lazio.png"},
{nombre: "Fiorentina", imagen: "img/fiorentina.png"},
{nombre: "Atalanta", imagen: "img/atalanta.png"},
{nombre:"Lille", imagen:"img/lille.png"},
{nombre:"Sporting de Braga", imagen:"img/braga.png"},
{nombre:"Al-Hilal", imagen:"img/alhilal.png"},
{nombre:"Al-Nassr", imagen:"img/alnassr.png"},
{nombre:"Boca Juniors", imagen:"img/bocajuniors.png"},
{nombre:"Corinthians", imagen:"img/corinthians.png"},
{nombre:"Cruzeiro", imagen:"img/cruzeiro.png"},
{nombre:"Estudiantes de la Plata", imagen:"img/estudiantes.png"},
{nombre:"Fenerbache", imagen:"img/fenerbache.png"},
{nombre:"Flamengo", imagen:"img/flamengo.png"},
{nombre:"Galatasaray", imagen:"img/galatasaray.png"},
{nombre:"Hebei", imagen:"img/hebei.png"},
{nombre:"Inter Miami", imagen:"img/intermiami.png"},
{nombre:"Internacional", imagen:"img/internacional.png"},
{nombre:"Leeds United", imagen:"img/leeds.png"},
{nombre:"Monaco", imagen:"img/monaco.png"},
{nombre:"PSV", imagen:"img/psv.png"},
{nombre:"Stade de Rennes", imagen:"img/rennes.png"},
{nombre:"River Plate", imagen:"img/riverplate.png"},
{nombre:"Rosario Central", imagen:"img/rosariocentral.png"},
{nombre:"Salzburgo", imagen:"img/salzburgo.png"},
{nombre:"Santos", imagen:"img/santos.png"},
{nombre:"Vitoria de Guimaraes", imagen:"img/vitoria.png"},
{nombre:"West Ham United", imagen:"img/westham.png"},
{nombre:"Al-Ahli", imagen:"img/alahli.png"},
{nombre:"Al-Ittihad", imagen:"img/alittihad.png"},
{nombre:"Barcelona ecuador", imagen:"img/barcelonaecuador.png"},
{nombre:"Emelec", imagen:"img/emelec.png"},
{nombre:"Independiente", imagen:"img/independiente.png"},
{nombre:"Independiente del Valle", imagen:"img/independientevalle.png"},
{nombre:"Liga Universitaria de Quito", imagen:"img/ligadequito.png"},
{nombre:"Racing Club", imagen:"img/racingclub.png"}

];

let equipoActual = 0;
let puntos = 0;

let dificultad = "medio";
let cantidadOpciones = 4;

let record = localStorage.getItem("recordAdivina") || 0;

document.getElementById("resultado").innerText =
"🏆 Récord: " + record;

let tiempo = 5;
let temporizador;

mezclarEquipos();

const escudo = document.getElementById("escudo");

const op1 = document.getElementById("op1");
const op2 = document.getElementById("op2");
const op3 = document.getElementById("op3");
const op4 = document.getElementById("op4");
const op5 = document.getElementById("op5");
const op6 = document.getElementById("op6");

const reiniciar = document.getElementById("reiniciar");

const sonidoCorrecto =
new Audio("sonidos/correcto.mp3");

const sonidoIncorrecto =
new Audio("sonidos/incorrecto.mp3");

op1.onclick = verificarRespuesta;
op2.onclick = verificarRespuesta;
op3.onclick = verificarRespuesta;
op4.onclick = verificarRespuesta;
op5.onclick = verificarRespuesta;
op6.onclick = verificarRespuesta;

escudo.src = equipos[equipoActual].imagen;
document.getElementById("progreso").innerText =
"Equipo " + (equipoActual + 1) +
" de " + equipos.length;

cargaropciones();

function verificarRespuesta(event){

    clearInterval(temporizador);

const respuestaJugador =
event.target.innerText;

const respuestaCorrecta =
equipos[equipoActual].nombre;

if(respuestaJugador === respuestaCorrecta){

document.getElementById("resultado").innerText =
"✅ Correcto";

puntos++;

sonidoCorrecto.play();

}else{

document.getElementById("resultado").innerText =
"❌ Incorrecto";

sonidoIncorrecto.play();

}

setTimeout(siguienteequipo,1000);

}

function siguienteequipo(){

equipoActual++;

if(equipoActual < equipos.length){

escudo.style.transform = "scale(0)";
escudo.style.opacity = "0";

setTimeout(() => {

escudo.src =
equipos[equipoActual].imagen;

escudo.style.transform = "scale(1)";
escudo.style.opacity = "1";

},200);

document.getElementById("progreso").innerText =
"Equipo " + (equipoActual + 1) +
" de " + equipos.length;

document.getElementById("resultado").innerText = "";

cargaropciones();

}else{

let porcentaje =
Math.round((puntos / equipos.length) * 100);

document.getElementById("resultado").innerText =

"🏆 Resultado Final: " +
puntos + " / " + equipos.length +

"\n🎯 Precisión: " +
porcentaje + "%";

if(puntos > record){

record = puntos;

localStorage.setItem(
"recordAdivina",
record
);

document.getElementById("resultado").innerText +=
" 🎉 ¡Nuevo récord!";

}

reiniciar.style.display = "block";

}

}

function cargaropciones(){

const correcta =
equipos[equipoActual].nombre;

const incorrectas = equipos
.filter(e => e.nombre !== correcta)
.map(e => e.nombre);

incorrectas.sort(() => Math.random() - 0.5);

let opciones = [correcta];

for(let i=0;i<cantidadOpciones-1;i++){

opciones.push(incorrectas[i]);

}

opciones.sort(() => Math.random() - 0.5);

/* Ocultar todos */

[op1,op2,op3,op4,op5,op6].forEach(b=>{
b.style.display="none";
});

/* Mostrar necesarias */

[op1,op2,op3,op4,op5,op6]
.forEach((b,i)=>{

if(opciones[i]){

b.innerText = opciones[i];
b.style.display="block";

}

});

iniciarTemporizador();

}

function mezclarEquipos(){

for(let i=equipos.length-1;i>0;i--){

let j =
Math.floor(Math.random()*(i+1));

[equipos[i],equipos[j]] =
[equipos[j],equipos[i]];

}

}

reiniciar.onclick = function(){

    document.getElementById("progreso").innerText =
"Equipo 1 de " + equipos.length;

mezclarEquipos();

equipoActual = 0;
puntos = 0;

escudo.src =
equipos[equipoActual].imagen;

document.getElementById("resultado").innerText="";

reiniciar.style.display="none";

cargaropciones();

};

function seleccionarDificultad(nivel){

dificultad = nivel;

if(nivel==="facil"){

cantidadOpciones = 3;
escudo.style.filter="none";

}

if(nivel==="medio"){

cantidadOpciones = 4;
escudo.style.filter="blur(3px)";

}

if(nivel==="dificil"){

cantidadOpciones = 6;
escudo.style.filter="blur(6px)";

}

cargaropciones();

}

function iniciarTemporizador(){

if(dificultad !== "dificil"){
document.getElementById("tiempo").innerText = "";
return;
}

tiempo = 5;

document.getElementById("tiempo").innerText =
"⏱️ Tiempo: " + tiempo;

clearInterval(temporizador);

temporizador = setInterval(() => {

tiempo--;

document.getElementById("tiempo").innerText =
"⏱️ Tiempo: " + tiempo;

if(tiempo <= 2){

document.getElementById("tiempo").style.color =
"red";

}else{

document.getElementById("tiempo").style.color =
"black";

}

if(tiempo === 0){

clearInterval(temporizador);

document.getElementById("resultado").innerText =
"⏰ Tiempo agotado";

setTimeout(siguienteequipo,1000);

}

},1000);

}
