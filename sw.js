const CACHE_NAME = "pollito-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./style3.css",
  "./manifest.json",
  "./foto1.png",
  "./foto2.png",
  "./foto3.png"
];

// ✅ Instalación y guardado de archivos en caché
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// ✅ Activación y limpieza de cachés antiguos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

// ✅ Intercepta las peticiones y responde desde caché (si existe)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
