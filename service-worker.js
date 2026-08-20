const CACHE_NAME = "radio-amizade-pwa-v9";

const APP_SHELL = [
  "./apple-touch-icon.png",
  "./apple-touch-icon-precomposed.png",
  "./",
  "./index.html",
  "./manifest.webmanifest?v=9",
  "./assets/avatar.png?v=9",
  "./assets/icone-instagram.svg",
  "./assets/icone-facebook.svg",
  "./assets/icone-youtube.svg",
  "./assets/icone-whatsapp.svg",
  "./icons/icon-192.png?v=9",
  "./icons/icon-512.png?v=9",
  "./icons/icon-maskable-512.png?v=9"
,
  "./icons/apple-touch-icon-radio-amizade-v8.png"];

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
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Nunca intercepta stream, CDN, fontes ou outros domínios externos.
  if (url.origin !== self.location.origin) return;

  // Navegação: tenta a versão nova primeiro e usa cache se estiver offline.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put("./index.html", copy));
          return response;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Assets locais: cache-first.
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      });
    })
  );
});
