const CACHE_NAME = 'news-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/bundle.js'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache)))
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (event.request.url.includes('/news')) {
                    return fetch(event.request)
                        .then(networkResponse => {
                            const responseClone = networkResponse.clone();
                            caches.open(CACHE_NAME)
                                .then(cache => cache.put(event.request, responseClone));
                            return networkResponse;
                        })
                        .catch(() => {
                            return response || new Response(JSON.stringify([]), {
                                headers: { 'Content-Type': 'application/json' }
                            });
                        });
                }
                return response || fetch(event.request);
            })
    );
});