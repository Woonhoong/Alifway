"use client";

import { useEffect } from "react";

export default function ClientScripts() {
  useEffect(() => {
    const app = document.createElement("script");
    const lenis = document.createElement("script");
    app.src = "/app.js?v=practice-reel-1";
    app.defer = true;
    lenis.src = "https://cdn.jsdelivr.net/npm/lenis@1.3.11/dist/lenis.min.js";
    lenis.onload = () => document.body.appendChild(app);
    lenis.onerror = () => document.body.appendChild(app);
    document.body.appendChild(lenis);

    return () => {
      app.remove();
      lenis.remove();
    };
  }, []);

  return null;
}
