const CACHE_NAME = "minijuegos-cache-v1";

const urlsToCache = [
  "index.html",
  "juego1.html",
  "juego2.html",

  "css/estilos.css",

  "js/juego1.js",
  "js/juego2.js",

  "img/",
  "sonido/"
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