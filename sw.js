// Service worker mínimo: permite instalar la página como app.
// No guarda datos de turnos ni del panel: las reservas siempre van directo a internet.
const VERSION = "v1";
const CACHE = "augusto-" + VERSION;
const BASICOS = ["icon-192.png", "icon-512.png"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(BASICOS); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;          // base de datos, fuentes, mapa: sin tocar
  if (req.mode === "navigate") {                        // la página siempre fresca; si no hay internet, aviso simple
    e.respondWith(fetch(req).catch(function () {
      return new Response("<!doctype html><meta charset=utf-8><meta name=viewport content='width=device-width,initial-scale=1'><body style='background:#0a0a0a;color:#f5f0e6;font:18px system-ui;display:grid;place-items:center;min-height:100vh;text-align:center;padding:24px'><div>Sin conexión.<br>Conectate a internet para reservar tu turno.</div>", { headers: { "Content-Type": "text/html; charset=utf-8" } });
    }));
    return;
  }
  if (BASICOS.indexOf(url.pathname.replace(/^\//, "")) >= 0) {
    e.respondWith(caches.match(req).then(function (r) { return r || fetch(req); }));
  }
});
