// This project previously shipped a caching Service Worker.
// In the Lovable preview (Vite dev + HMR), a stale SW can cache old
// optimized dependency chunks and cause "Invalid hook call" (dispatcher=null)
// when two React module graphs coexist.
//
// This SW is a safe "cleanup" worker:
// - It does NOT intercept network requests
// - It clears caches
// - It unregisters itself

self.addEventListener("install", (event) => {
  // Activate immediately.
  // @ts-ignore
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      try {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      } catch {
        // ignore
      }

      try {
        // Reload all open tabs so they drop any cached bundles.
        // @ts-ignore
        const clientList = await self.clients.matchAll({
          type: "window",
          includeUncontrolled: true,
        });
        clientList.forEach((client) => {
          try {
            client.navigate(client.url);
          } catch {
            // ignore
          }
        });
      } catch {
        // ignore
      }

      try {
        // Unregister itself so it won't run again.
        // @ts-ignore
        await self.registration.unregister();
      } catch {
        // ignore
      }
    })(),
  );
});

// Do not intercept fetch.
self.addEventListener("fetch", () => {});
