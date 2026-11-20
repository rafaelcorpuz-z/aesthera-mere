"use client";

import { useLayoutEffect } from "react";

export default function HomeScrollEffects() {
  useLayoutEffect(() => {
    const home = document.querySelector<HTMLElement>("main#top");
    if (!home) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const animated = new Set<HTMLElement>();
    const register = (
      element: HTMLElement,
      kind: "text" | "image" | "card",
      delay = 0,
    ) => {
      if (animated.has(element)) return;
      element.dataset.homeReveal = kind;
      element.style.setProperty("--home-reveal-delay", `${delay}ms`);
      animated.add(element);
    };

    const sections = Array.from(home.querySelectorAll<HTMLElement>("section"));

    sections.forEach((section) => {
      if (section.hasAttribute("data-home-hero")) return;

      const textElements = Array.from(
        section.querySelectorAll<HTMLElement>("h1, h2, p"),
      ).filter(
        (element) =>
          !element.closest("article") &&
          !element.closest("figure") &&
          !element.closest("nav") &&
          !element.closest("a") &&
          !element.closest("button"),
      );

      textElements.forEach((element, index) => {
        register(element, "text", Math.min(index * 80, 240));
      });

      const cards = Array.from(
        section.querySelectorAll<HTMLElement>("article, figure"),
      );
      cards.forEach((card, index) => {
        register(card, "card", Math.min(index * 100, 350));
      });

      const images = Array.from(
        section.querySelectorAll<HTMLElement>("img, video"),
      );
      images.forEach((image, index) => {
        register(image, "image", Math.min(index * 70, 280));
      });
    });

    const elements = Array.from(animated);
    if (elements.length === 0) return;

    document.documentElement.classList.add("home-motion-ready");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-revealed"));
      return () => {
        document.documentElement.classList.remove("home-motion-ready");
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
          } else {
            entry.target.classList.remove("is-revealed");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("home-motion-ready");
      elements.forEach((element) => {
        element.classList.remove("is-revealed");
        delete element.dataset.homeReveal;
        element.style.removeProperty("--home-reveal-delay");
      });
    };
  }, []);

  return null;
}
