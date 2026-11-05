"use client";

import { useEffect } from "react";

/* Marks each [data-reveal] block with data-in the first time it enters the
   viewport; globals.css plays that block's entrance once from there.
   data-motion on <html> arms the hidden start state only once this runs, so
   without JavaScript nothing is ever left hidden. */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.motion = "";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.in = "";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      delete root.dataset.motion;
    };
  }, []);

  return null;
}
