const CACHE_NAME = 'portfolio-cache-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/assets/css/styles.css',
  '/assets/js/ui.js',
  '/assets/images/heroImage.webp',
  '/assets/images/aboutImage.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/offline.html'))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(response => response || fetch(event.request))
    );
  }
});
