var CACHE_NAME = 'static-cache';
var urlsToCache = [
  '/',
  '/index.html',
  '/favicon.ico'
  '/static/js/bundle.js',
  'sockjs-node/info',
  'sockjs-node/718/yzsjlzx4/websocket'
];
self.addEventListener('fetch', catchFetch);
console.log("ANYAD PICSAJA")
function catchFetch(event) {
if(event.request.url.startsWith("http://localhost:3000")){
  console.log({url:event.request.url})
  event.respondWith(
    caches.match(event.request)
  );}
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});
