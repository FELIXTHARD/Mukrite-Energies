const CACHE = 'mukrite-v1';

// Files to cache immediately on install
const PRECACHE = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
];

// ── Install: pre-cache shell ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

// ── Activate: remove old caches ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ── Fetch: network-first, fall back to cache, then offline page ──
self.addEventListener('fetch', event => {
  // Only handle GET requests for same-origin or navigation
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // For navigation requests (page loads): network → cache → offline.html
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          // Cache a fresh copy
          const clone = res.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, clone));
          return res;
        })
        .catch(() =>
          caches.match(event.request)
            .then(cached => cached || caches.match('/offline.html'))
        )
    );
    return;
  }

  // For other assets: cache-first, then network
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, clone));
        return res;
      }).catch(() => {
        // For image requests, return nothing gracefully
        if (event.request.destination === 'image') return new Response('', { status: 404 });
      });
    })
  );
});
