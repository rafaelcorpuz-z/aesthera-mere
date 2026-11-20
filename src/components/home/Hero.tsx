"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useBooking } from "@/components/booking/BookingProvider";
import { useTreatmentsMenu } from "@/components/providers/TreatmentsMenuProvider";
import { ArrowUpRightIcon } from "@/components/ui/Icons";

// Hero slideshow assets live in public/images/hero/.
const slides = [
  "/images/hero/hero1.png",
  "/images/hero/hero2.png",
  "/images/hero/hero3.png",
  "/images/hero/hero4.png",
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const { setTreatmentsOpen } = useTreatmentsMenu();
  const { openBooking } = useBooking();
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches || slides.length < 2) return;

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!hero || reduceMotion.matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = hero.getBoundingClientRect();
      const travel = Math.min(hero.offsetHeight * 0.72, window.innerHeight * 0.9);
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(travel, 1)));

      hero.style.setProperty("--hero-content-y", `${progress * -46}px`);
      hero.style.setProperty("--hero-content-opacity", `${Math.max(0, 1 - progress * 1.5)}`);
      hero.style.setProperty("--hero-media-y", `${progress * 52}px`);
      hero.style.setProperty("--hero-media-scale", `${1.025 + progress * 0.035}`);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      hero.style.removeProperty("--hero-content-y");
      hero.style.removeProperty("--hero-content-opacity");
      hero.style.removeProperty("--hero-media-y");
      hero.style.removeProperty("--hero-media-scale");
    };
  }, []);

  return (
    <section
      ref={heroRef}
      data-home-hero
      aria-label="Welcome to Aesthera Mère"
      className="relative isolate flex min-h-[590px] items-center overflow-hidden bg-[#4C5534] sm:min-h-[650px] lg:min-h-[730px]"
    >
      {/* Automatic crossfade slideshow */}
      <div className="hero-scroll-media absolute -inset-[4%] -z-20" aria-hidden="true">
        {slides.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-[1000ms] ease-in-out motion-reduce:transition-none ${
              activeSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt=""
              fill
              priority={index === 0}
              quality={90}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>

      {/* Subtle brand-green overlay for readable text */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#4C5534]/65 via-[#4C5534]/30 to-[#4C5534]/5"
      />

      {/* Long image-to-ivory fade shared with the doctors section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[clamp(190px,24vw,320px)]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(76,85,52,0) 0%, rgba(76,85,52,0.06) 16%, rgba(255,252,243,0.14) 34%, rgba(255,252,243,0.40) 52%, rgba(255,252,243,0.72) 72%, rgba(255,252,243,0.94) 88%, #FFFCF3 100%)",
        }}
      />

      <div className="hero-scroll-content relative z-10 mx-auto w-full max-w-[1440px] px-6 py-24 md:px-10 lg:px-16">
        <div className="max-w-[780px]">
          <h1 className="hero-intro-title font-seasons max-w-[760px] text-[clamp(2.5rem,5vw,5rem)] leading-[1.08] tracking-[-0.025em] text-white">
            Premium Aesthetic,
            <br />
            Made Accessible.
          </h1>

          <div className="hero-intro-actions mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => openBooking()}
              className="font-montserrat inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#FFFCF3] px-7 py-3 text-[13px] font-semibold text-[#4C5534] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M8 3v4M16 3v4M3 10h18" />
              </svg>
              Book an Appointment
            </button>

            <button
              type="button"
              onClick={() => setTreatmentsOpen(true)}
              aria-haspopup="dialog"
              aria-controls="treatments-mega-menu"
              className="font-montserrat inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-[#FFFCF3] bg-transparent px-7 py-3 text-[13px] font-semibold text-[#FFFCF3] transition-colors hover:border-[#B39552] hover:bg-[#B39552] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Explore Treatments
              <ArrowUpRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
