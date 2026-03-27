console.log ("Modo Ligas cargado");

const ligas = [
    {
        nombre:"Premier League",
        imagen:"img/premier.png",
        equipos: [
            {nombre:"Arsenal", imagen:"img/arsenal.png"},
            {nombre:"Manchester United", imagen:"img/manchesterunited.png"},
            {nombre:"Manchester City",imagen:"img/manchestercity.png"},
            {nombre:"Chelsea", imagen:"img/chelsea.png"},
            {nombre:"Liverpool", imagen:"img/liverpool.jpg"},
            {nombre:"Tottenham hotspur", imagen:"img/tottenham.png"},
            {nombre:"Aston Villa", imagen:"img/astonvilla.png"},
            {nombre:"Newcastle United", imagen:"img/newcastle.png"},
            {nombre:"Leeds United", imagen:"img/leeds.png"},
            {nombre:"West Ham United", imagen:"img/westham.png"}

        ]
    },
    {
        nombre:"LaLiga",
        imagen:"img/laliga.png",
        equipos: [
            {nombre:"Barcelona", imagen:"img/barcelona.png"},
            {nombre:"Real Madrid", imagen:"img/realmadrid.png"},
            {nombre:"Atlético de Madrid", imagen:"img/atleticodemadrid.png"},
            {nombre:"Sevilla", imagen:"img/sevilla.png"},
            {nombre:"Valencia", imagen:"img/valencia.png"},
            {nombre:"Real Sociedad", imagen:"img/realsociedad.png"}
        ]
    },
    {
        nombre:"Serie A",
        imagen:"img/seriea.png",
        equipos: [
            {nombre:"Juventus", imagen:"img/juventus.png"},
            {nombre:"Napoli", imagen:"img/napoli.png"},
            {nombre:"Roma", imagen:"img/roma.png"},
            {nombre:"Milan", imagen:"img/milan.png"},
            {nombre:"Inter de Milán", imagen:"img/interdemilan.png"},
            {nombre:"Atalanta", imagen:"img/atalanta.png"},
            {nombre:"Fiorentina", imagen:"img/fiorentina.png"},
            {nombre:"Lazio", imagen:"img/lazio.png"}
        ]
    },
    {
        nombre:"Bundesliga",
        imagen:"img/bundesliga.png",
        equipos: [
             {nombre:"Bayern Múnich", imagen:"img/bayernmunich.png"},
             {nombre:"Borussia Dortmund", imagen:"img/dortmund.png"},
             {nombre:"Leipzig", imagen:"img/leipzig.png"},
             {nombre:"Bayer Leverkusen", imagen:"img/leverkusen.png"}
        ]
    },
    {
        nombre:"Liga Portugal",
        imagen:"img/ligaportugal.png",
        equipos: [
            {nombre:"Benfica", imagen:"img/benfica.png"},
            {nombre:"Porto", imagen:"img/porto.png"},
            {nombre:"Sporting de Lisboa", imagen:"img/sporting.png"},
            {nombre:"Sporting de Braga", imagen:"img/braga.png"},
            {nombre:"Vitoria de Guimaraes", imagen:"img/vitoria.png"}
        ]
    },
    {
        nombre:"Ligue 1",
        imagen:"img/ligue1.png",
        equipos:[
            {nombre:"París Saint Germain", imagen:"img/psg.jpg"},
            {nombre:"Olympique de Marsella", imagen:"img/marsella.png"},
            {nombre:"Olympique de Lyon", imagen:"img/lyon.jpg"},
            {nombre:"Lille", imagen:"img/lille.png"},
            {nombre:"Monaco", imagen:"img/monaco.png"},
            {nombre:"Stade de Rennes", imagen:"img/rennes.png"}
        ]   
    },
    {
        nombre:"Brasileirao",
        imagen:"img/brasileirao.png",
        equipos:[
            {nombre:"Corinthians", imagen:"img/corinthians.png"},
            {nombre:"Cruzeiro", imagen:"img/cruzeiro.png"},
            {nombre:"Flamengo", imagen:"img/flamengo.png"},
            {nombre:"Internacional", imagen:"img/internacional.png"},
            {nombre:"Santos", imagen:"img/santos.png"}
        ]
    },
    {
        nombre:"Liga Profesional de Fútbol",
        imagen:"img/ligaargentina.png",
        equipos:[
            {nombre:"Boca Juniors", imagen:"img/bocajuniors.png"},
            {nombre:"Estudiantes de la Plata", imagen:"img/estudiantes.png"},
            {nombre:"Independiente", imagen:"img/independiente.png"},
            {nombre:"Rosario Central", imagen:"img/rosariocentral.png"},
            {nombre:"River Plate", imagen:"img/riverplate.png"},
            {nombre:"Racing Club", imagen:"img/racingclub.png"}
        ]
    },
    {
        nombre:"Liga Ecuabet",
        imagen:"img/ligaecuabet.png",
        equipos:[
            {nombre:"Barcelona de Ecuador", imagen:"img/barcelonaecuador.png"},
            {nombre:"Emelec", imagen:"img/emelec.png"},
            {nombre:"Independiente del Valle", imagen:"img/independientedelvalle.png"},
            {nombre:"Liga Universitaria de Quito", imagen:"img/ligadequito.png"}
        ]
    },
    {
        nombre:"Saudi Pro League",
        imagen:"img/saudiproleague.png",
        equipos:[
            {nombre:"Al-Ahli", imagen:"img/alahli.png"},
            {nombre:"Al-Nassr", imagen:"img/alnassr.png"},
            {nombre:"Al-Ittihad", imagen:"img/alittihad.png"},
            {nombre:"Al-Hilal", imagen:"img/alhilal.png"}
        ]
    } 
 ];

let ligaActual = 0;
let equipoActual = 0;
let puntos = 0;
let tiempo = 7;
let temporizador;
let record = localStorage.getItem("record") || 0;
document.getElementById("record").innerText =
"🏆 Récord: " + record;

const menuLigas = document.getElementById("menuLigas");
const listaLigas = document.getElementById("listaLigas");
const juego = document.getElementById("juego");

ligas.forEach((liga, index) => {

    const boton = document.createElement("button");

    const img = document.createElement("img");
    img.src = liga.imagen;
    img.width = 80;

    const texto = document.createElement("p");
    texto.innerText = liga.nombre;

    boton.appendChild(img);
    boton.appendChild(texto);

    boton.onclick = () => iniciarLiga(index);

    listaLigas.appendChild(boton);

});

const ligaLogo =  document.getElementById("ligaLogo");
const escudo = document.getElementById("escudo");

const op1 = document.getElementById("op1");
const op2 = document.getElementById("op2");
const op3 = document.getElementById("op3");
const op4 = document.getElementById("op4");
const reiniciar = document.getElementById("reiniciar");
const progreso = document.getElementById("progreso");
const sonidoCorrecto = new Audio("sonidos/correcto.mp3");
const sonidoIncorrecto = new Audio("sonidos/incorrecto.mp3");

ligas.forEach(liga => {
    mezclar(liga.equipos);
});

function cargarPregunta(){

    const equiposLiga = ligas[ligaActual].equipos;

    progreso.innerText =
    "⚽ Equipo " + (equipoActual + 1) +
    " de " + equiposLiga.length +
    " | 🏆 " + ligas[ligaActual].nombre;

    const correcta = equiposLiga[equipoActual].nombre;
    escudo.style.opacity = 0;

    setTimeout(() => {
    escudo.src = equiposLiga[equipoActual].imagen;
    escudo.style.opacity = 1;
    }, 200);

    ligaLogo.src = ligas[ligaActual].imagen;

    const incorrectas = equiposLiga
    .filter(e => e.nombre !== correcta)
    .map(e => e.nombre);

    incorrectas.sort(() => Math.random() - 0.5);

    const opciones = [
        correcta,
        incorrectas [0],
        incorrectas [1],
        incorrectas [2]
    ];

    opciones.sort (() => Math.random() - 0.5);

    op1.innerText = opciones[0];
    op2.innerText = opciones[1];
    op3.innerText = opciones[2];
    op4.innerText = opciones[3];

    tiempo = 5;
    iniciarTemporizador();
}


op1.onclick = verificarRespuesta;
op2.onclick = verificarRespuesta;
op3.onclick = verificarRespuesta;
op4.onclick = verificarRespuesta;

function verificarRespuesta(event){

    clearInterval(temporizador);
    const respuestaJugador = event.target.innerText;
    const correcta = ligas[ligaActual].equipos[equipoActual].nombre;

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
    setTimeout(siguienteEquipo,1000);

    op1.disabled = true;
    op2.disabled = true;
    op3.disabled = true;
    op4.disabled = true;

}

function siguienteEquipo(){

    equipoActual++;

    const equiposLiga = ligas[ligaActual].equipos;
    
    if(equipoActual < equiposLiga.length){

        cargarPregunta();

    }else{
        
        document.getElementById("resultado").innerText =
        "🏆 Liga completada: " + ligas[ligaActual].nombre +
        " | Puntos: " + puntos;

        if(puntos > record){
    
        record = puntos;
        localStorage.setItem("record", record);

        document.getElementById("resultado").innerText +=
        " 🎉 ¡Nuevo récord!";
}
        document.getElementById("record").innerText =
        "🏆 Récord: " + record;

        reiniciar.style.display = "block";
        }
        op1.disabled = false;
        op2.disabled = false;
        op3.disabled = false;
        op4.disabled = false;

        op1.classList.remove("correcto", "incorrecto");
        op2.classList.remove("correcto", "incorrecto");
        op3.classList.remove("correcto", "incorrecto");
        op4.classList.remove("correcto", "incorrecto");
}

reiniciar.onclick = function(){

    juego.style.display = "none";
    menuLigas.style.display = "block";

    document.getElementById("resultado").innerText = "";

    window.scrollTo(0,0);
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

            setTimeout(siguienteEquipo, 1000);
        }

    }, 1000);

}

function iniciarLiga(index){

    ligaActual = index;
    equipoActual = 0;
    puntos = 0;

    mezclar(ligas[ligaActual].equipos);

    reiniciar.style.display = "none";
    
    menuLigas.style.display = "none";
    juego.style.display = "block";

     window.scrollTo(0,0);

    cargarPregunta();
}
