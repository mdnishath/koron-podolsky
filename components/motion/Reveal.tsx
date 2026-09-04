"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll reveal. Any element with `data-reveal` starts hidden (via CSS) and is
 * marked `data-reveal-done` once it enters the viewport. Elements already in
 * view on load are shown immediately, new elements added later are picked up
 * by a MutationObserver, and a safety timer guarantees nothing stays hidden.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const show = (el: HTMLElement, instant = false) => {
      if (el.hasAttribute("data-reveal-done")) return;
      const delay = Number(el.getAttribute("data-reveal-delay") || 0);
      if (instant || reduce) el.style.transition = "none";
      else if (delay) el.style.transitionDelay = `${delay}ms`;
      el.setAttribute("data-reveal-done", "");
    };

    const supportsIO = "IntersectionObserver" in window;
    const io = supportsIO
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                show(entry.target as HTMLElement);
                io?.unobserve(entry.target);
              }
            });
          },
          { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
        )
      : null;

    const armed = new WeakSet<HTMLElement>();
    const arm = (root: ParentNode = document) => {
      const els = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]:not([data-reveal-done])"));
      if (root instanceof HTMLElement && root.matches("[data-reveal]:not([data-reveal-done])")) els.unshift(root);
      const h = window.innerHeight || 800;
      els.forEach((el) => {
        if (armed.has(el)) return;
        armed.add(el);
        if (reduce || !io) return show(el, true);
        const r = el.getBoundingClientRect();
        if (r.top < h * 0.92 && r.bottom > 0) show(el, true);
        else io.observe(el);
      });
    };

    arm();

    const mo = new MutationObserver((records) => {
      records.forEach((rec) => {
        rec.addedNodes.forEach((n) => {
          if (n instanceof HTMLElement) arm(n);
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    const safety = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-reveal-done])").forEach((el) => show(el, true));
    }, 7000);

    return () => {
      io?.disconnect();
      mo.disconnect();
      window.clearTimeout(safety);
    };
  }, [pathname]);

  return null;
}
