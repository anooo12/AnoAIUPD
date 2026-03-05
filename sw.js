const CACHE = 'astro-v10';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Never cache index.html
  if (e.request.url.includes('index.html') || e.request.url.endsWith('/')) {
    e.respondWith(fetch(e.request));
    return;
  }
  e.respondWith(fetch(e.request));
});
