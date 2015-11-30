self.addEventListener('install', function(event) {
    self.skipWaiting();
});

self.addEventListener('activate', function(event) {
    if (self.clients && clients.claim) {
        clients.claim();
    }
});

function timeout(delay) {
    return new Promise(function(resolve, reject) {
        setTimeout(function(){
          resolve(new Response('', {
              status: 408,
              statusText: 'Request timed out.'
          }));
        }, delay);
    });
}

self.addEventListener('fetch', function(event) {
    // Only fetch JavaScript files for now
    if (/\.js$/.test(event.request.url)) {
      event.respondWith(Promise.race([timeout(2000), fetch(event.request.url)]));
    } else {
      event.respondWith(fetch(event.request));
    }
});
