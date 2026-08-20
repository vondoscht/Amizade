const CACHE_NAME = "radio-amizade-mobile-v1.7";

const APP_SHELL = [
  "./app.html",
  "./manifest.webmanifest?v=1.7",
  "./assets/avatar.png?v=1.7",
  "./assets/icone-instagram.svg",
  "./assets/icone-facebook.svg",
  "./assets/icone-youtube.svg",
  "./assets/icone-whatsapp.svg",
  "./icons/icon-192.png?v=1.7",
  "./icons/icon-512.png?v=1.7",
  "./icons/icon-maskable-512.png?v=1.7"
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

  if (url.origin !== self.location.origin) return;

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