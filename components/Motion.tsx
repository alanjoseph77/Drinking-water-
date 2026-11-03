"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Page-level scroll animations. Everything is scoped to this wrapper and reverted on unmount. */
export function Motion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);
        const charIn = (chars: Element[] | NodeListOf<Element>, extra: gsap.TweenVars = {}) =>
          gsap.fromTo(
            chars,
            { opacity: 0, filter: "blur(12px)", y: "0.25em" },
            { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.7, stagger: 0.03, ease: "power2.out", clearProps: "filter,transform", ...extra }
          );

        // Hero intro, after the 1.25s brand splash
        const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 1.25 });
        tl.add(charIn(q(".hero-title .ch"), { stagger: 0.045, duration: 0.8 }), 0.05)
          .from(q(".hero-sub"), { opacity: 0, y: 14, duration: 0.8 }, 0.2)
          .from(q(".strip span"), { opacity: 0, y: 12, stagger: 0.07, duration: 0.6 }, 0.6)
          .from(q(".hero-corner"), { opacity: 0, duration: 0.8 }, 0.8)
          .from(q(".scroll-cue"), { opacity: 0, y: -16, duration: 0.8 }, 1);

        // Headline lines drift apart as you leave the hero
        const heroST = { trigger: q("#hero")[0], start: "top top", end: "bottom top", scrub: true };
        gsap.to(q(".hero-title .line:first-child"), { xPercent: -14, ease: "none", scrollTrigger: heroST });
        gsap.to(q(".hero-title .line:last-child"), { xPercent: 14, ease: "none", scrollTrigger: heroST });
        gsap.to(q(".hero-sub, .strip, .hero-corner, .scroll-cue"), {
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: q("#hero")[0], start: "top top", end: "40% top", scrub: true },
        });

        // Product columns
        gsap.from(q(".prod-left > :not([data-chars])"), { opacity: 0, y: 30, stagger: 0.08, duration: 0.9, scrollTrigger: { trigger: q("#product")[0], start: "top 65%" } });
        gsap.from(q(".prod-right > *"), { opacity: 0, y: 30, stagger: 0.08, duration: 0.9, scrollTrigger: { trigger: q("#product")[0], start: "top 60%" } });
        gsap.from(q(".frame"), { opacity: 0, scale: 0.94, duration: 1, scrollTrigger: { trigger: q("#product")[0], start: "top 70%" } });

        // Letter-by-letter headings outside the hero
        q("[data-chars]").forEach((el) => {
          if (el.closest(".hero")) return;
          charIn(el.querySelectorAll(".ch"), { scrollTrigger: { trigger: el, start: "top 88%", once: true } });
        });
        q("[data-fade]").forEach((el) =>
          gsap.from(el, { opacity: 0, y: 24, duration: 0.9, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } })
        );

        // Panels, cards, gallery, FAQ, footer word
        q(".track .panel").forEach((p, i) =>
          gsap.from(p, { opacity: 0, y: 60, scale: 0.97, duration: 1, ease: "power3.out", delay: (i % 2) * 0.12, scrollTrigger: { trigger: p, start: "top 88%", once: true } })
        );
        gsap.from(q(".q"), { opacity: 0, y: 50, stagger: 0.1, duration: 0.9, scrollTrigger: { trigger: q(".cards")[0], start: "top 80%" } });
        const gallery = q("#gallery")[0] as HTMLElement | undefined;
        if (gallery) {
          gsap.fromTo(
            gallery,
            { x: 0 },
            {
              x: () => -(gallery.scrollWidth - window.innerWidth) * 0.6,
              ease: "none",
              scrollTrigger: { trigger: gallery, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
            }
          );
        }
        gsap.from(q(".acc-item"), { opacity: 0, x: -30, stagger: 0.09, duration: 0.7, scrollTrigger: { trigger: q(".acc")[0], start: "top 85%" } });
        gsap.from(q(".enq-form"), { opacity: 0, y: 40, duration: 0.9, scrollTrigger: { trigger: q(".enq-form")[0], start: "top 88%" } });
        gsap.from(q("#giant span"), {
          yPercent: 80,
          opacity: 0,
          filter: "blur(14px)",
          clearProps: "filter",
          stagger: 0.07,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: q("#giant")[0], start: "top 95%" },
        });
      });

      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      return () => mm.revert();
    },
    { scope: root }
  );

  return <div ref={root}>{children}</div>;
}
