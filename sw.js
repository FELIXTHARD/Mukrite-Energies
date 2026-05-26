const CACHE = 'mukrite-v2';

// ── Install: cache each file individually so one failure doesn't kill all ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => {
      // Cache offline.html first — it's the only critical file
      // Each fetch is independent; a missing manifest.json won't break anything
      const files = ['/', '/index.html', '/offline.html', '/manifest.json'];
      return Promise.allSettled(
        files.map(url =>
          fetch(url).then(res => {
            if (res.ok) return cache.put(url, res);
          }).catch(() => {/* ignore — file may not exist */})
        )
      );
    })
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

// ── Fetch ──
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  // Navigation requests: network-first → cache → offline page
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, clone));
          return res;
        })
        .catch(() =>
          caches.match('/index.html')
            .then(cached => cached || caches.match('/offline.html'))
        )
    );
    return;
  }

  // Assets: cache-first → network
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, clone));
        }
        return res;
      }).catch(() => new Response('', { status: 404 }));
    })
  );
});
