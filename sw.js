/* ═══════════════════════════════════════════════════════════
   MUKRITE ENERGIES — Service Worker v2
   Precache local assets + runtime-cache external CDN resources
═══════════════════════════════════════════════════════════ */

const CACHE_NAME     = 'mukrite-shell-v2';
const CDN_CACHE      = 'mukrite-cdn-v2';
const OFFLINE_PAGE   = '/pro-one/offline.html';

/* ── Local assets to precache on install ── */
const LOCAL_ASSETS = [
  '/pro-one/',
  '/pro-one/index.html',
  '/pro-one/offline.html',
  '/pro-one/manifest.json',
  '/pro-one/sw.js',
  /* Icons */
  '/pro-one/apple-touch-icon.png',
  '/pro-one/icon-192.png',
  '/pro-one/icon-512.png',
  '/pro-one/og-image.jpg',
  /* Hero slideshow images — heaviest files, most important to precache */
  '/pro-one/samples.jpeg',
  '/pro-one/workers.jpeg',
  '/pro-one/map.jpeg',
  '/pro-one/how to.jpeg',
];

/* ── External CDN origins to cache at runtime ── */
const CDN_ORIGINS = [
  'https://cdnjs.cloudflare.com',
];

/* ─────────────────────────────────────────────────────────
   INSTALL — precache all local assets
───────────────────────────────────────────────────────── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(LOCAL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

/* ─────────────────────────────────────────────────────────
   ACTIVATE — wipe old caches
───────────────────────────────────────────────────────── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== CDN_CACHE)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

/* ─────────────────────────────────────────────────────────
   FETCH — smart routing
───────────────────────────────────────────────────────── */
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  /* ── 1. CDN resources (Font Awesome CSS + webfonts)
         → cache-first: serve instantly after first load ── */
  if (CDN_ORIGINS.some(origin => url.href.startsWith(origin))) {
    event.respondWith(
      caches.open(CDN_CACHE).then(cache =>
        cache.match(event.request).then(cached => {
          if (cached) return cached;
          return fetch(event.request).then(response => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
      )
    );
    return;
  }

  /* ── 2. Local images & static files
         → cache-first: already precached, instant ── */
  if (url.pathname.match(/\.(jpe?g|png|webp|svg|gif|ico|woff2?|css|js|json)$/)) {
    event.respondWith(
      caches.match(event.request).then(cached =>
        cached || fetch(event.request).then(response => {
          caches.open(CACHE_NAME).then(c => c.put(event.request, response.clone()));
          return response;
        })
      ).catch(() => caches.match(OFFLINE_PAGE))
    );
    return;
  }

  /* ── 3. HTML navigation
         → network-first, fall back to cache then offline page ── */
  event.respondWith(
    fetch(event.request)
      .then(response => {
        caches.open(CACHE_NAME).then(c => c.put(event.request, response.clone()));
        return response;
      })
      .catch(() =>
        caches.match(event.request).then(cached => cached || caches.match(OFFLINE_PAGE))
      )
  );
});