self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", () => {
  // Network-first by default. This worker exists to satisfy installability
  // and standalone-launch requirements without adding cache complexity yet.
});
