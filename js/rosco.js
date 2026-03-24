console.log ("rosco cargado");

const letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");

const preguntas = {
      "A": {def: "Selección actualmente campeona del mundo", resp: "argentina"},
      "B": {def: "Selección que terminó séptima en las eliminatorias de Conmebol para el mundial 2026", resp: "bolivia"},
      "C": {def: "Selección cuyo delantero es apodado el Tigre", resp: "colombia"},
      "D": {def: "Selección en la cual ataja Kasper Schmeichel", resp: "dinamarca"},
      "E": {def: "Selección, donde juega el balón de oro del año 2024", resp: "españa"},
      "F": {def: "Selección europea, campeona del mundo en 2018", resp: "francia"},
      "G": {def: "Selección europea campeona de la Eurocopa 2004", resp: "grecia"},
      "H": {def: "Selección europea, en donde juega Dominik Szoboszlai", resp: "hungria"},
      "I": {def: "Selección conocida como 'Azzurri'", resp: "italia"},
      "J": {def: "Selección donde juega Leon Bailey", resp: "jamaica"},
      "K": {def: "Selección, donde juega el delantero centro Vedat Muriqi", resp: "kosovo"},
      "L": {def: "Equipo inglés, dirigido por Marcelo Bielsa", resp: "leeds"},
      "M": {def: "Apellido del jugador con más balones de oro", resp: "messi"},
      "N": {def: "Selección, en donde juega el futbolista apodado 'El androide'", resp: "noruega"},
      "Ñ": {def: "Equipo chileno, que debutó en la copa libertadores en el año 2023", resp: "ñublense"},
      "O": {def: "Equipo español, donde juega el delantero croata Budimir", resp: "osasuna"},
      "P": {def: "Selección, donde juega el jugador apodado el 'comandante'", resp: "portugal"},
      "Q": {def: "Único equipo de la liga MX, que empieza con la letra Q", resp: "queretaro"},
      "R": {def: "Delantero centro brasileño, ganador del balón de oro en los años 1997 y 2002", resp: "ronaldo"},
      "S": {def: "Nombre del delantero centro mexicano de apellido Giménez", resp: "santiago"},
      "T": {def: "Selección, donde juega el jugador del Real Madrid, Arda Güler", resp: "turquia"},
      "U": {def: "Primera selección en ser campeona del mundo", resp: "uruguay"},
      "V": {def: "Selección de Conmebol, la cual quedó eliminada al perder 3-6 contra Colombia", resp: "venezuela"},
      "W": {def: "Equipo inglés, apodado los 'wolves'", resp: "wolverhampton"},
      "X": {def: "Mediocampista, que salió campeón de la Bundesliga con el Bayer Leverkusen", resp: "xhaka"},
      "Y": {def: "Equipo de suiza más conocido", resp: "young boys"},
      "Z": {def: "Jugador argentino, actual vicepresidente del Inter de Milán", resp: "zanetti"}
    };

    const rosco = document.getElementById("rosco");
    const pregunta = document.getElementById("pregunta");
    const respuesta = document.getElementById("respuesta");
    const comprobar = document.getElementById("comprobar");

    let letraActual = null;
    let intervalo;
    let aciertos = 0;

    // Colocar las letras en círculo (A arriba del todo)
    const radio =
    window.innerWidth < 500 ? 120 : 160;
    letras.forEach((l, i) => {
   // offset de -90 grados (arranca arriba)
  const angulo = (2 * Math.PI / letras.length) * i - Math.PI / 2;
  const x = 180 + radio * Math.cos(angulo);
  const y = 180 + radio * Math.sin(angulo);

      const div = document.createElement("div");
      div.className = "letra";
      div.style.left = x + "px";
      div.style.top = y + "px";
      div.textContent = l;
      div.onclick = () => {

        if(div.classList.contains("correcta") ||
           div.classList.contains("incorrecta")){

        return;

        }
        letraActual = l;
        if (preguntas[l]) {
          pregunta.textContent = preguntas[l].def;
        } else {
          pregunta.textContent = "No hay pregunta para esta letra aún.";
        }
      };
      rosco.appendChild(div);
    });

    // Comprobar respuesta
    comprobar.onclick = () => {
      if (!letraActual || !preguntas[letraActual]) return;
      const input = respuesta.value.trim().toLowerCase();
      const correcta = preguntas[letraActual].resp.toLowerCase();

      const letraDiv = [...document.getElementsByClassName("letra")]
        .find(el => el.textContent === letraActual);

      if (input === correcta) {

        aciertos++;

        document.getElementById("puntaje").textContent =
        "Aciertos: " + aciertos;
        letraDiv.classList.add("correcta");
        pregunta.textContent = "¡Correcto! ✅";
      } else {
        letraDiv.classList.add("incorrecta");
        pregunta.textContent = "Incorrecto ❌, era: " + correcta;
      }
      respuesta.value = "";
    };

    siguienteLetra();

    function siguienteLetra(){

let index =
letras.indexOf(letraActual);

for(let i=1; i<=letras.length; i++){

let siguiente =
letras[(index + i) % letras.length];

let letraDiv =
[...document.getElementsByClassName("letra")]
.find(el => el.textContent === siguiente);

if(!letraDiv.classList.contains("correcta") &&
   !letraDiv.classList.contains("incorrecta")){

letraActual = siguiente;

pregunta.textContent =
preguntas[siguiente].def;

break;

}

}

}