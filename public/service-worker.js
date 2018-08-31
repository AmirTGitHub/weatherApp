"use strict";
const catchName = "weatherApp__";
const filesToCatch = [
  "/",
  "style/stylesheet.css",
  "script/index.js",
  "icon/Cloudy_w.png",
  "icon/Rainy_w.png",
  "icon/Sunny_w.png",
  "icon/logo_black.png",
  "icon/logo_32.png",
  "icon/logo_180.png",
  "icon/logo_194.png"

];

self.addEventListener("install", event => {
  console.log("WORKER: install event in progress.");
  event.waitUntil(
    caches.open(catchName).then(function (cache) {
      return cache.addAll(filesToCatch);
    })
    //installation completed
  );
});

self.addEventListener("fetch", event => {
  console.log("WORKER: fetch event in progress.");
  if (event.request.method !== "GET") {
    return;
  }
  event.respondWith(
    caches.match(event.request).then(cached => {
      const networked = fetch(event.request)
        .then(fetchedFromNetwork, unableToResolve)
        .catch(unableToResolve);
      return cached || networked;

      function fetchedFromNetwork(response) {
        const cacheCopy = response.clone();
        caches
          .open(catchName + "pages")
          .then(function add(cache) {
            cache.put(event.request, cacheCopy);
          })
          .then(function () {
            console.log(
              "WORKER: fetch response stored in cache.",
              event.request.url
            );
          });
        return response;
      }

      function unableToResolve() {
        console.log("WORKER: fetch request failed in both cache and network.");
        return new Response("<h1>Service Unavailable</h1>", {
          status: 503,
          statusText: "Service Unavailable",
          headers: new Headers({
            "Content-Type": "text/html"
          })
        });
      }
    })
  );
});

self.addEventListener("activate", event => {
  console.log("WORKER: activate event in progress.");
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter(key => {
            return !key.startsWith(catchName);
          })
          .map(key => {
            return caches.delete(key);
          })
      );
    })
    //service workers completed
  );
});
