/* ═══════════════════════════════════════════════════════════
   MUKRITE ENERGIES — Service Worker (Online Only)
   PWA install support only — no caching
═══════════════════════════════════════════════════════════ */

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

/* Always fetch fresh from network */
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
