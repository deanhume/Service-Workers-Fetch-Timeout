"use strict";

function timeout(delay) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(new Response('', {
                status: 408,
                statusText: 'Request timed out.'
            }));
        }, delay);
    });
}

self.addEventListener('fetch', function(event) {

  // Only check if the extension is *.js
  if (/\.js$/.test(event.request.url)) {
    // Attempt to fetch with timeout
    event.respondWith(Promise.race([timeout(10), fetch(event.request)]));
  }
});
