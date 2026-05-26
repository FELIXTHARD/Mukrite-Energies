const CACHE = 'mukrite-v5';

// ── Install: explicitly fetch and store offline.html ──
self.addEventListener('install', event => {
  event.waitUntil(
    fetch('/offline.html', { cache: 'reload' })
      .then(res => {
        if (!res.ok) throw new Error('offline.html fetch failed: ' + res.status);
        return caches.open(CACHE).then(cache => cache.put('/offline.html', res));
      })
  );
  self.skipWaiting();
});

// ── Activate: wipe old caches ──
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
  if (!event.request.url.startsWith('http')) return;

  // Navigation: network → offline.html from named cache → inline fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const cache  = await caches.open(CACHE);
        const cached = await cache.match('/offline.html');
        if (cached) return cached;
        // Ultimate fallback if cache somehow empty
        return new Response(
          `<!DOCTYPE html><html><head><meta charset="UTF-8">
           <title>Offline</title></head><body style="font-family:sans-serif;
           background:#060f09;color:#fff;display:flex;align-items:center;
           justify-content:center;height:100vh;margin:0;text-align:center">
           <div><h1 style="color:#12A362">Mukrite Energies</h1>
           <p>You are offline. Please check your connection.</p>
           <p>Call us: <a href="tel:+256785239229" style="color:#12A362">
           +256 785 239 229</a></p></div></body></html>`,
          { status: 200, headers: { 'Content-Type': 'text/html' } }
        );
      })
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
          caches.open(CACHE).then(c => c.put(event.request, clone));
        }
        return res;
      }).catch(() => new Response('', { status: 404 }));
    })
  );
});
