/* ═══════════════════════════════════════════════════════════
   MUKRITE ENERGIES — Service Worker
   Online-only + custom offline page
═══════════════════════════════════════════════════════════ */

const CACHE_NAME = 'mukrite-offline-v1';
const OFFLINE_PAGE = '/pro-one/offline.html';

/* ── INSTALL: cache only the offline page ── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.add(OFFLINE_PAGE))
  );
  self.skipWaiting();
});

/* ── ACTIVATE: clear old caches ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

/* ── FETCH: always network first, offline page as fallback ── */
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(OFFLINE_PAGE)
    )
  );
});
