"use client";

import { useEffect } from "react";
import MediaIcon from "./media-icons";

export default function MotionSystem() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let leaveTimer = 0;
    root.classList.add("motion-ready");
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add("page-entered")));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .14, rootMargin: "0px 0px -8%" });

    const observe = (scope: ParentNode = document) => {
      scope.querySelectorAll<HTMLElement>("[data-motion]:not(.is-motion-observed)").forEach((node) => {
        node.classList.add("is-motion-observed");
        observer.observe(node);
      });
    };
    observe();
    const mutations = new MutationObserver((items) => items.forEach((item) => item.addedNodes.forEach((node) => {
      if (!(node instanceof HTMLElement)) return;
      if (node.matches("[data-motion]")) { node.classList.add("is-motion-observed"); observer.observe(node); }
      observe(node);
    })));
    mutations.observe(document.body, { childList: true, subtree: true });

    const onScroll = () => {
      const travel = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      root.style.setProperty("--page-progress", String(Math.min(1, scrollY / travel)));
    };
    const onPointer = (event: PointerEvent) => {
      if (reducedMotion) return;
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((node) => {
        const depth = Number(node.dataset.parallax || 1);
        node.style.setProperty("--parallax-x", `${(event.clientX / innerWidth - .5) * depth}px`);
        node.style.setProperty("--parallax-y", `${(event.clientY / innerHeight - .5) * depth}px`);
      });
    };
    const onClick = (event: MouseEvent) => {
      if (reducedMotion || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const next = new URL(anchor.href, location.href);
      const current = new URL(location.href);
      if (next.origin !== current.origin || (next.pathname === current.pathname && next.search === current.search)) return;
      event.preventDefault();
      root.classList.add("page-leaving");
      clearTimeout(leaveTimer);
      leaveTimer = window.setTimeout(() => { location.href = next.href; }, 620);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("click", onClick, true);
    return () => {
      clearTimeout(leaveTimer); observer.disconnect(); mutations.disconnect();
      removeEventListener("scroll", onScroll); removeEventListener("pointermove", onPointer);
      document.removeEventListener("click", onClick, true);
      root.classList.remove("motion-ready", "page-entered", "page-leaving");
    };
  }, []);

  return <><div className="page-progress" aria-hidden="true"><i /></div><div className="page-transition" aria-hidden="true"><span>Alifway</span><div className="page-transition-glyph"><MediaIcon name="clapper" /></div><small>Vision in motion</small></div></>;
}
