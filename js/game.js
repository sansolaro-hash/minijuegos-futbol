console.log("JS cargado");

const canvas = document.getElementById("cancha");
const ctx = canvas.getContext("2d");

let juegoIniciado = false;

let teclas = {};

let velocidadJugador = 5;

// pelota
let pelotaX = 600;
let pelotaY = 325;
let pelotaRadio = 12;
let velX = 0;
let velY = 0;

// jugadores
let jugador1 = {x:200,y:325,radio:15};
let jugador2 = {x:1000,y:325,radio:15};

// arquero
let arqueroX = 1180;
let arqueroY = 325;
let direccionArquero = 1;

// defensores
let defensores = [
{x:600,y:325},
{x:750,y:300}
];

// goles
let goles1 = 0;
let goles2 = 0;


// teclado

document.addEventListener("keydown", function(e){

if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(e.key)){
e.preventDefault();
}

teclas[e.key] = true;

});

document.addEventListener("keyup",function(e){
teclas[e.key]=false;
});


// iniciar juego

function toggleJuego(){

document.getElementById("menu").style.display="none";

juegoIniciado=true;

}


// cancha

function dibujarCancha(){

ctx.fillStyle="green";
ctx.fillRect(0,0,1200,650);

ctx.strokeStyle="white";
ctx.lineWidth=4;

ctx.beginPath();
ctx.moveTo(600,0);
ctx.lineTo(600,650);
ctx.stroke();

ctx.beginPath();
ctx.arc(600,325,80,0,Math.PI*2);
ctx.stroke();

ctx.strokeRect(0,275,40,100);
ctx.strokeRect(1160,275,40,100);

ctx.strokeRect(0,200,180,250);
ctx.strokeRect(1020,200,180,250);

ctx.beginPath();
ctx.arc(120,325,5,0,Math.PI*2);
ctx.fillStyle="white";
ctx.fill();

ctx.beginPath();
ctx.arc(1080,325,5,0,Math.PI*2);
ctx.fill();

}


// pelota

function dibujarPelota(){

ctx.beginPath();
ctx.arc(pelotaX,pelotaY,pelotaRadio,0,Math.PI*2);
ctx.fillStyle="white";
ctx.fill();

}


// jugadores

function dibujarJugadores(){

ctx.beginPath();
ctx.arc(jugador1.x,jugador1.y,jugador1.radio,0,Math.PI*2);
ctx.fillStyle="blue";
ctx.fill();

ctx.beginPath();
ctx.arc(jugador2.x,jugador2.y,jugador2.radio,0,Math.PI*2);
ctx.fillStyle="orange";
ctx.fill();

}


// arquero

function dibujarArquero(){

ctx.beginPath();
ctx.arc(arqueroX,arqueroY,18,0,Math.PI*2);
ctx.fillStyle="yellow";
ctx.fill();

}


// defensores

function dibujarDefensores(){

for(let d of defensores){

ctx.beginPath();
ctx.arc(d.x,d.y,20,0,Math.PI*2);
ctx.fillStyle="red";
ctx.fill();

}

}


// movimiento jugadores

function moverJugadores(){

if(teclas["ArrowUp"]) jugador1.y-=velocidadJugador;
if(teclas["ArrowDown"]) jugador1.y+=velocidadJugador;
if(teclas["ArrowLeft"]) jugador1.x-=velocidadJugador;
if(teclas["ArrowRight"]) jugador1.x+=velocidadJugador;

if(teclas["w"]) jugador2.y-=velocidadJugador;
if(teclas["s"]) jugador2.y+=velocidadJugador;
if(teclas["a"]) jugador2.x-=velocidadJugador;
if(teclas["d"]) jugador2.x+=velocidadJugador;

}


// arquero movimiento

function moverArquero(){

arqueroY += direccionArquero*2;

if(arqueroY>360 || arqueroY<290){
direccionArquero*=-1;
}

}


// rebote pelota

function moverPelota(){

pelotaX += velX;
pelotaY += velY;

velX *= 0.99;
velY *= 0.99;

if(pelotaX<0 || pelotaX>1200) velX*=-1;
if(pelotaY<0 || pelotaY>650) velY*=-1;

}


// patear pelota

function patear(jugador){

let dx = pelotaX - jugador.x;
let dy = pelotaY - jugador.y;

let distancia = Math.sqrt(dx*dx + dy*dy);

if(distancia < jugador.radio + pelotaRadio){

velX = dx*0.5;
velY = dy*0.5;

}

}


// gol

function verificarGol(){

if(pelotaX>1160 && pelotaY>275 && pelotaY<375){

goles1++;

reset();

}

if(pelotaX<40 && pelotaY>275 && pelotaY<375){

goles2++;

reset();

}

}


// reset

function reset(){

pelotaX=600;
pelotaY=325;

velX=0;
velY=0;

}


// HUD

function dibujarHUD(){

ctx.fillStyle="white";
ctx.font="24px Arial";

ctx.fillText("Jugador 1: "+goles1,400,30);
ctx.fillText("Jugador 2: "+goles2,650,30);

}


// loop

function actualizarJuego(){

if(!juegoIniciado) return;

moverJugadores();
moverArquero();
moverPelota();

patear(jugador1);
patear(jugador2);

verificarGol();

dibujarCancha();
dibujarPelota();
dibujarJugadores();
dibujarArquero();
dibujarDefensores();
dibujarHUD();

}

setInterval(actualizarJuego,30);