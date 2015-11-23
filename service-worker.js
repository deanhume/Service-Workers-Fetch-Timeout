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
        setTimeout(resolve, delay);
    });
}

self.addEventListener('fetch', function(event) {
    // Only fetch JavaScript files for now
    if (/\.js$/.test(event.request.url)) {
      // Attempt to fetch with timeout of 3 secs
      Promise.race([timeout(500), fetch(event.request.url)]).then(
        function(value) {
          if (value instanceof Response && value.status === 200) {
              // Network replied in time.
              console.log('The network won');
              event.respondWith(value);
            } else {
              // Timeout won
              console.log('The timeout won');
              event.respondWith(new Response('', {
                  status: 408,
                  statusText: 'Request timed out.'
              }));
            }
        });
    }
});
