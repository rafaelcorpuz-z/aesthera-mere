
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/Icons";

const results = [
  {
    title: "Facial Contouring",
    image: "/images/results/result1.png",
  },
  {
    title: "Botox",
    image: "/images/results/result2.png",
  },
  {
    title: "Nose Lift",
    image: "/images/results/result3.png",
  },
];

export default function Results() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(3);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setVisible(1);
      else if (window.innerWidth < 1024) setVisible(2);
      else setVisible(3);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const previous = () =>
    setIndex((i) => (i - 1 + results.length) % results.length);

  const next = () =>
    setIndex((i) => (i + 1) % results.length);

  const visibleResults = Array.from(
    { length: Math.min(visible, results.length) },
    (_, offset) => results[(index + offset) % results.length]
  );

  return (
    <section
      id="results"
      className="bg-[#FFFCF3] px-5 py-10 md:px-10 lg:py-12"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Heading */}
        <div className="mb-11 text-center">
          <p className="mb-4 font-montserrat text-[11px] uppercase tracking-[0.24em] text-[#80755F]">
            AESTHERA MÈRE — REAL RESULTS
          </p>

          <h2
            className="text-[clamp(34px,5vw,56px)] leading-tight text-[#4C5534]"
            style={{ fontFamily: "The Seasons, Georgia, serif" }}
          >
            The Beauty of Real Results
          </h2>

          <p className="mt-3 font-montserrat text-sm text-[#80755F]">
            Before-and-after highlights shared with signed patient consent.
          </p>
        </div>

        {/* Carousel cards */}
        <div
          className="grid gap-5 md:gap-6"
          style={{
            gridTemplateColumns: `repeat(${visibleResults.length}, minmax(0, 1fr))`,
          }}
        >
          {visibleResults.map((result, offset) => (
            <article
              key={`${index}-${offset}`}
              className="min-w-0"
            >
              {/* One combined photo per card */}
              <div className="overflow-hidden rounded-2xl border border-[#80755F]/50 p-[5px]">
                <div className="relative aspect-[15/8] overflow-hidden rounded-xl bg-white">
                  <Image
                    src={result.image}
                    alt={`${result.title} before and after results`}
                    fill
                    quality={90}
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Labels */}
              <div className="mt-3 grid grid-cols-2 text-center">
                <span className="font-montserrat text-[10px] tracking-[0.15em] text-[#80755F]">
                  BEFORE
                </span>
                <span className="font-montserrat text-[10px] tracking-[0.15em] text-[#80755F]">
                  AFTER
                </span>
              </div>

              {/* Treatment name */}
              <h3
                className="mt-4 text-center text-[22px] text-[#4C5534]"
                style={{ fontFamily: "The Seasons, Georgia, serif" }}
              >
                {result.title}
              </h3>
            </article>
          ))}
        </div>

        {/* Navigation */}
        {results.length > 1 && (
          <div className="mt-9 flex items-center justify-center gap-7">
            <button
              type="button"
              onClick={previous}
              aria-label="Previous results"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#80755F]/60 text-[#4C5534] transition hover:bg-[#4C5534] hover:text-white"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>

            <span className="font-montserrat text-xs tracking-[0.15em] text-[#80755F]">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(results.length).padStart(2, "0")}
            </span>

            <button
              type="button"
              onClick={next}
              aria-label="Next results"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#80755F]/60 text-[#4C5534] transition hover:bg-[#4C5534] hover:text-white"
            >
              <ArrowRightIcon className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-7 text-center">
          <p className="font-montserrat text-[11px] text-[#80755F]">
            Results vary per individual.
          </p>

          <Link
            href="/results"
            className="mt-6 inline-flex items-center gap-3 border-b border-[#4C5534] pb-2 font-montserrat text-xs font-medium uppercase tracking-[0.12em] text-[#4C5534] transition hover:gap-5"
          >
            Explore More Results <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
