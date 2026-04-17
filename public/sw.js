// Simple offline shell: cache-first for app shell, network-first (with cache fallback)
// for same-origin HTML, and bypass for cross-origin cam/API requests.
const VERSION = "whistler-v1";
const SHELL = ["/", "/travel", "/favicon.ico", "/logo.svg", "/manifest.webmanifest"];

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

  const isHtml = req.headers.get("accept")?.includes("text/html");

  if (isHtml) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((cache) => cache.put(req, copy));
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
    return;
  }

  // Cache-first for static assets.
  event.respondWith(
    caches.match(req).then(
      (cached) =>
        cached ||
        fetch(req).then((res) => {
          if (res.ok && res.type === "basic") {
            const copy = res.clone();
            caches.open(VERSION).then((cache) => cache.put(req, copy));
          }
          return res;
        })
    )
  );
});
