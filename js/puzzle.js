console.log("Puzzle cargado");

const escudos = [

"img/barcelona.png",
"img/realmadrid.png",
"img/manchestercity.png",
"img/bayernmúnich.png",
"img/chelsea.png",
"img/arsenal.png",
"img/atleticodemadrid.png",
"img/juventus.png",
"img/interdemilán.png",
"img/manchesterunited.png",
"img/milan.png",
"img/napoli.png",
"img/roma.png",

];
const puzzle = document.getElementById("puzzle");
const mensaje = document.getElementById("mensaje");
const reiniciar = document.getElementById("reiniciar");

let piezas = [];
let tiempo = 0;
let temporizador;
let recordPuzzle =
localStorage.getItem("recordPuzzle") || null;

if(recordPuzzle){

document.getElementById("recordPuzzle").innerText =
"🏆 Récord: " + recordPuzzle + " s";

}

function crearPuzzle(){

puzzle.innerHTML = "";

piezas = [];
let escudoActual = escudos[
Math.floor(Math.random() * escudos.length)
];

for(let i=0; i<9; i++){

const pieza = document.createElement("div");

pieza.classList.add("pieza");

// Última pieza vacía
if(i === 8){

pieza.classList.add("vacia");

}else{

pieza.style.backgroundImage =
"url('" + escudoActual + "')";

pieza.style.backgroundPosition =
(-100*(i%3))+"px "+
(-100*Math.floor(i/3))+"px";

}

pieza.dataset.index = i;

pieza.onclick = moverPieza;

piezas.push(pieza);

}

do{

mezclar(piezas);

}while(estaResuelto());

piezas.forEach(p => puzzle.appendChild(p));

tiempo = 0;

clearInterval(temporizador);

temporizador = setInterval(() => {

tiempo++;

document.getElementById("tiempo").innerText =
"⏱️ Tiempo: " + tiempo + " s";

}, 1000);

}

function mezclar(array){

for(let i=0; i<100; i++){

let vaciaIndex = array.findIndex(p =>
p.classList.contains("vacia"));

let vecinos = obtenerVecinos(vaciaIndex);

let randomVecino =
vecinos[Math.floor(Math.random()*vecinos.length)];

[array[vaciaIndex], array[randomVecino]] =
[array[randomVecino], array[vaciaIndex]];

}

}

function moverPieza(){

let vaciaIndex = piezas.findIndex(p =>
p.classList.contains("vacia"));

let piezaIndex = piezas.indexOf(this);

if(esVecina(piezaIndex, vaciaIndex)){

[piezas[piezaIndex], piezas[vaciaIndex]] =
[piezas[vaciaIndex], piezas[piezaIndex]];

actualizarPuzzle();

verificarVictoria();

}

}

function esVecina(i1, i2){

let fila1 = Math.floor(i1/3);
let col1 = i1%3;

let fila2 = Math.floor(i2/3);
let col2 = i2%3;

return (

(Math.abs(fila1 - fila2) === 1 && col1 === col2) ||

(Math.abs(col1 - col2) === 1 && fila1 === fila2)

);

}

function actualizarPuzzle(){

puzzle.innerHTML = "";

piezas.forEach(p =>
puzzle.appendChild(p));

}

function verificarVictoria(){

let correcto = true;

for(let i=0;i<piezas.length;i++){

if(piezas[i].dataset.index != i){

correcto = false;
break;

}

}

if(correcto){

clearInterval(temporizador);

mensaje.innerText =
"🏆 ¡Puzzle completado en " +
tiempo + " segundos!";

// Verificar récord

if(!recordPuzzle || tiempo < recordPuzzle){

recordPuzzle = tiempo;

localStorage.setItem(
"recordPuzzle",
recordPuzzle
);

mensaje.innerText +=
" 🎉 ¡Nuevo récord!";
}

// Mostrar récord

document.getElementById("recordPuzzle").innerText =
"🏆 Récord: " + recordPuzzle + " s";

}

}

function estaResuelto(){

for(let i=0;i<piezas.length;i++){

if(piezas[i].dataset.index != i){

return false;

}

}

return true;

}

reiniciar.onclick = crearPuzzle;

crearPuzzle();

function obtenerVecinos(index){

let vecinos = [];

let fila = Math.floor(index/3);
let col = index%3;

// Arriba
if(fila > 0) vecinos.push(index-3);

// Abajo
if(fila < 2) vecinos.push(index+3);

// Izquierda
if(col > 0) vecinos.push(index-1);

// Derecha
if(col < 2) vecinos.push(index+1);

return vecinos;

}