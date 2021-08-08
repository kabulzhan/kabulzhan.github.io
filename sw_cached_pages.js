const cacheName = "v2";

const cacheAssets = [
  "index.html",
  "about.html",
  "/css/style.css",
  "/js/main.js",
];

// Call install event
self.addEventListener("install", (e) => {
  console.log("Service worker: Installed");

  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("Service worker: Caching files ");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// Call activate event
self.addEventListener("activate", (e) => {
  console.log("Service worker: Activated");
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("Service Worker: clearing old cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch event
self.addEventListener("fetch", (e) => {
  console.log("Service Worker: Fetching");
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
