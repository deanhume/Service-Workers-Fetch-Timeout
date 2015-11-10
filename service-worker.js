self.addEventListener('install', function(event) {
    self.skipWaiting();
});

self.addEventListener('activate', function(event) {
    if (self.clients && clients.claim) {
        clients.claim();
    }
});

self.onfetch = function(event) {
  if (/\.js$/.test(event.request.url)) {
    event.respondWith(
      Promise.race([
        fetch(event.request),
        new Promise(function(resolve) {
          setTimeout(resolve(new Response(''), {
            status: 408, statusText: 'Request timeout'
          }, 1000)); // timeout after 1 sec
        })
      ])
    );
  }
};
