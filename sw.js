/* ═══════════════════════════════════════════════════════════
   MUKRITE ENERGIES — Service Worker
   Caches the site for offline use
═══════════════════════════════════════════════════════════ */

const CACHE_NAME = 'mukrite-v1';

const ASSETS = [
  '/pro-one/',
  '/pro-one/index.html',
  '/pro-one/manifest.json',
  '/pro-one/apple-touch-icon.png',
  '/pro-one/og-image.jpg',
];

/* ── INSTALL: cache all assets ── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Caching app shell');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

/* ── ACTIVATE: remove old caches ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      )
    )
  );
  self.clients.claim();
});

/* ── FETCH: serve from cache, fall back to network ── */
self.addEventListener('fetch', event => {
  // Skip non-GET requests and external requests (WhatsApp, fonts, etc.)
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        // Serve from cache, but also update cache in background
        const networkFetch = fetch(event.request).then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        }).catch(() => {});
        return cached;
      }

      // Not in cache — fetch from network
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200) return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => {
        // Offline fallback — return cached homepage
        return caches.match('/pro-one/');
      });
    })
  );
});
