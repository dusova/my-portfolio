const CACHE_NAME = 'portfolio-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/assets/css/styles.css',
  '/assets/images/heroImage.webp',
  '/assets/images/aboutImage.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

