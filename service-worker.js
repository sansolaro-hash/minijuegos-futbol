const CACHE_NAME = "minijuegos-futbol-v1";

const urlsToCache = [
  "index.html",
  "puzzle.html",
  "adivina.html",
  "liga.html",
  "preguntas.html",
  "rosco.html",
  "decision-var.html",

  "css/style.css",

  "js/adivina.js",
  "js/puzzle.js",
  "js/liga.js",
  "js/preguntas.js",
  "js/rosco.js",
  "js/desicion-var.js",

  "img/arsenal.png",
  "img/astonvilla.png",
  "img/atalanta.png",
  "img/atleticodemadrid.png",
  "img/barcelona.png",
  "img/bayernmunich.png",
  "img/benfica.png",
  "img/benzema.jpg",
  "img/bolivia.png",
  "img/braga.png",
  "img/brasil.png",
  "img/bundesliga.png",
  "img/chelsea.png",
  "img/colombia.png",
  "img/cr7.jpg",
  "img/cruyff.jpg",
  "img/distéfano.jpg",
  "img/dortmund.png",
  "img/fiorentina.png",
  "img/interdemilan.png",
  "img/juventus.png",
  "img/laliga.png",
  "img/lazio.png",
  "img/leipzig.png",
  "img/leverkusen.png",
  "img/ligaportugal.png",
  "img/ligue1.png",
  "img/lille.png",
  "img/liverpool.jpg",
  "img/manchestercity.png",
  "img/manchesterunited.png",
  "img/maradona.jpg",
  "img/marsella.png",
  "img/messi.jpg",
  "img/milan.png",
  "img/napoli.png",
  "img/newcastle.png",
  "img/pelé.png",
  "img/perú.png",
  "img/porto.png",
  "img/premier.png",
  "img/psg.jpg",
  "img/realmadrid.png",
  "img/realsociedad.png",
  "img/rivaldo.jpg",
  "img/roma.png",
  "img/seriea.png",
  "img/sevilla.png",
  "img/sporting.png",
  "img/tottenham.png",
  "img/valencia.png",
  "img/venezuela.png",

  "sonidos/correcto.mp3",
  "sonidos/incorrecto.mp3",
  "sonidos/final.mp3",

  "icon-192.png",
  "icon-512.png"
];

// Instalar
self.addEventListener("install", event => {
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// FETCH (modo offline)
self.addEventListener("fetch", event => {

  event.respondWith(
    caches.match(event.request)
      .then(response => {

        return response || fetch(event.request);

      })
  );

});

// Activar
self.addEventListener("activate", event => {
  console.log("Service Worker activado");
});

// Interceptar requests
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});