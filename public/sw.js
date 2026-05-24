self.addEventListener("push", (event) => {
  let data = {
    title: "Naya message",
    body: "",
    url: "https://chat-steel-eta.vercel.app/",
    senderId: null,
  };

  try {
    if (event.data) {
      data = { ...data, ...event.data.json() };
    }
  } catch {
    data.body = event.data?.text() || "";
  }

  const options = {
    body: data.body,
    icon: "/logos.png",
    badge: "/logos.png",
    tag: data.senderId ? `chat-${data.senderId}` : "chat-message",
    renotify: true,
    data: {
      url: data.url || "https://chat-steel-eta.vercel.app/",
      senderId: data.senderId,
    },
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const targetUrl =
    event.notification.data?.url || "https://chat-steel-eta.vercel.app/";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if ("focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
  );
});
