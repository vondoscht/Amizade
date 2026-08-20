const CACHE_NAME = "radio-amizade-mobile-v1.6";

const APP_SHELL = [
  "./app.html",
  "./manifest.webmanifest?v=1.6",
  "./assets/avatar.png?v=1.6",
  "./assets/icone-instagram.svg",
  "./assets/icone-facebook.svg",
  "./assets/icone-youtube.svg",
  "./assets/icone-whatsapp.svg",
  "./icons/icon-192.png?v=1.6",
  "./icons/icon-512.png?v=1.6",
  "./icons/icon-maskable-512.png?v=1.6"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith("radio-amizade-mobile-") && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // O stream, fontes e CDNs externos nunca passam pelo cache do PWA.
  if (url.origin !== self.location.origin) return;

  // A navegação do app usa rede primeiro e cache apenas como fallback offline.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put("./app.html", copy));
          return response;
        })
        .catch(() => caches.match("./app.html"))
    );
    return;
  }

  // Assets locais: cache com atualização em segundo plano.
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request).then((response) => {
        if (response && response.status === 200 && response.type === "basic") {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });

      return cached || network;
    })
  );
});
