const CACHE = "wheelmate-v12-core";
const RUNTIME = "wheelmate-v12-runtime";
const OFFLINE = "/offline.html";
const PRECACHE = ["/", "/book", OFFLINE, "/manifest.webmanifest", "/icons/icon-192.png", "/icons/icon-512.png", "/brand/wheelmate-logo.webp"];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(PRECACHE)));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => ![CACHE, RUNTIME].includes(key)).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", event => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(RUNTIME).then(cache => cache.put(request, copy));
          return response;
        })
        .catch(async () => (await caches.match(request)) || (await caches.match(OFFLINE)))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => cached || fetch(request).then(response => {
      if (response.ok) caches.open(RUNTIME).then(cache => cache.put(request, response.clone()));
      return response;
    }))
  );
});

self.addEventListener("push", event => {
  const data = event.data?.json?.() || { title: "WheelMateDrive", body: "You have a new update." };
  event.waitUntil(self.registration.showNotification(data.title || "WheelMateDrive", {
    body: data.body,
    icon: "/icons/icon-192.png",
    badge: "/icons/icon-192.png",
    data: { url: data.url || "/customer/notifications" },
    actions: [{ action: "open", title: "Open" }]
  }));
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
    const url = event.notification.data?.url || "/";
    for (const client of list) {
      if (client.url.includes(url) && "focus" in client) return client.focus();
    }
    return clients.openWindow ? clients.openWindow(url) : undefined;
  }));
});
