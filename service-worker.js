// Service Worker V3: atualização imediata
const CACHE = 'treino-tatiane-v3';
const ASSETS = ['./','./index.html','./manifest.webmanifest'];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // ativa a nova versão sem esperar
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  // assume controle das páginas abertas
  self.clients.claim();
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request).catch(() => caches.match('./index.html')))
  );
});
