// this version must match the package.json version
const version = "v0.37.0";

const CACHE = `static-and-network-${version}`;

const expectedCaches = [CACHE];

const staticResources = self.__precacheManifest.map(it => it.url);

function preCache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll(staticResources);
  });
}

function fromNetwork(request) {
  return fetch(request).then((response) => {
    return caches.open(CACHE).then((cache) => {
      cache.put(request, response.clone());
      return response;
    });
  })
}

function fromCache(request) {
  return caches.match(request).then(function (matching) {
    return matching || Promise.reject('no-match');
  });
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    preCache()
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  const deleteOlderCaches = caches.keys().then(keys => Promise.all(
    keys.map((key) => {
      if (!expectedCaches.includes(key)) {
        return caches.delete(key);
      }
    })
  ));

  event.waitUntil(deleteOlderCaches);
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== 'GET') return;

  event.respondWith(
    fromCache(request)
      .catch(() => fromNetwork(request))
  );
});
