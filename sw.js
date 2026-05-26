const CACHE = 'mukrite-v3';

// ── Install: cache files individually — one failure won't break the rest ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => {
      const files = ['/', '/index.html', '/offline.html', '/manifest.json'];
      return Promise.allSettled(
        files.map(url =>
          fetch(url).then(res => {
            if (res.ok) return cache.put(url, res);
          }).catch(() => {/* skip missing files silently */})
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

  // Skip chrome-extension://, data:, blob: and any non-http(s) scheme
  if (!event.request.url.startsWith('http')) return;

  // Navigation requests: network-first → cached index → offline page
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

  // Assets: cache-first → network → silent fail
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
