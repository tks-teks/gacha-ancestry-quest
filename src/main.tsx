import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// DEV safety: make sure a stale Service Worker doesn't keep serving old bundles
// which can create multiple React module graphs and trigger "Invalid hook call".
if (import.meta.env.DEV && "serviceWorker" in navigator) {
  navigator.serviceWorker
    .getRegistrations()
    .then((regs) => Promise.all(regs.map((r) => r.unregister())))
    .catch(() => {});

  // Clear any caches created by older SW versions.
  // (caches API is not available in all environments)
  // @ts-ignore
  if (typeof caches !== "undefined") {
    // @ts-ignore
    caches.keys().then((keys: string[]) => Promise.all(keys.map((k) => caches.delete(k)))).catch(() => {});
  }
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
