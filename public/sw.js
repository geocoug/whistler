// Simple offline shell: network-first for everything same-origin,
// bypass for cross-origin cam/API requests.
const VERSION = "whistler-v2";
const SHELL = ["/", "/travel", "/favicon.ico", "/favicon.svg", "/logo.svg", "/manifest.webmanifest"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) =>
      cache.addAll(SHELL).catch(() => {
        // Individual misses shouldn't block install.
      })
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Let cross-origin fetches (cams, APIs, fonts) go to the network directly.
  if (url.origin !== self.location.origin) return;

  // Network-first for everything same-origin.
  // Hashed _astro/ assets get long browser-cache anyway; this avoids stale SW cache on deploy.
  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok && res.type === "basic") {
          const copy = res.clone();
          caches.open(VERSION).then((cache) => cache.put(req, copy));
        }
        return res;
      })
      .catch(() =>
        caches.match(req).then(
          (cached) =>
            cached ||
            caches.match("/") ||
            new Response("Offline", { status: 503, statusText: "Offline" })
        )
      )
  );
});
