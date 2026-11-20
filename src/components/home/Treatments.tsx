"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { treatmentCategories as categories } from "@/data/treatments";

export default function Treatments() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="treatments" className="bg-[#FFFCF3] px-5 py-10 font-montserrat md:px-10 md:py-14">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-9 text-center">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[#80755F]">The Aesthera Collection</p>
          <h2 className="text-4xl leading-tight text-[#4C5534] md:text-5xl" style={{ fontFamily: '"The Seasons", Georgia, serif' }}>Explore Our Treatments</h2>
          <p className="mt-3 text-sm text-[#80755F]">Discover care thoughtfully curated for you.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {categories.map((category, i) => {
            const open = expanded === i;
            const base = `/treatments/${category.slug}`;
            return (
              <article key={category.slug} className="group relative">
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#80755F] shadow-[0_12px_28px_rgba(76,85,52,0.12)]">
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    quality={90}
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-700 ease-out motion-reduce:transition-none group-hover:scale-105 group-focus-within:scale-105"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#4C5534]/95 via-[#4C5534]/20 to-transparent transition-colors duration-500" />
                  <div aria-hidden="true" className="absolute inset-0 bg-[#4C5534]/90 opacity-0 transition-opacity duration-300 motion-reduce:transition-none lg:group-hover:opacity-100 lg:group-focus-within:opacity-100" />

                  {/* Mobile/tablet: a visible button opens the accessible subcategory panel. */}
                  <button
                    type="button"
                    aria-controls={`treatment-options-${i}`}
                    aria-expanded={open}
                    onClick={() => setExpanded(open ? null : i)}
                    className="absolute inset-0 z-10 flex w-full flex-col items-start justify-end p-5 text-left text-white focus-visible:outline-2 focus-visible:outline-offset-[-5px] focus-visible:outline-white lg:hidden"
                  >
                    <span className="mb-2 text-[10px] tracking-[0.22em]">0{i + 1}</span>
                    <span className="text-2xl leading-tight" style={{ fontFamily: '"The Seasons", Georgia, serif' }}>{category.name}</span>
                    <span className="mt-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.1em]">{open ? "Hide treatments" : "Explore treatments"} <span aria-hidden="true">{open ? "−" : "+"}</span></span>
                  </button>

                  {/* Desktop: category heading is shown by default, and the links replace it on hover or keyboard focus. */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden p-5 text-white transition-opacity duration-300 lg:block lg:group-hover:opacity-0 lg:group-focus-within:opacity-0">
                    <span className="text-[10px] tracking-[0.22em]">0{i + 1}</span>
                    <h3 className="mt-2 text-[clamp(19px,1.8vw,27px)] leading-tight" style={{ fontFamily: '"The Seasons", Georgia, serif' }}>{category.name}</h3>
                    <p className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.12em]">Hover to explore <ArrowUpRightIcon className="h-3 w-3" /></p>
                  </div>
                  <nav aria-label={`${category.name} treatments`} className="pointer-events-none absolute inset-0 hidden flex-col justify-center overflow-y-auto px-4 py-4 text-white opacity-0 transition-opacity duration-300 lg:flex lg:group-hover:pointer-events-auto lg:group-hover:opacity-100 lg:group-focus-within:pointer-events-auto lg:group-focus-within:opacity-100">
                    <p className="mb-1 text-[9px] uppercase tracking-[0.18em] text-[#FFFCF3]">Explore treatments</p>
                    <h3 className="mb-2 text-xl leading-tight" style={{ fontFamily: '"The Seasons", Georgia, serif' }}>{category.name}</h3>
                    <div className="border-t border-white/40 pt-1">
                      {category.groups.map((group) => (
                        <Link key={group.slug} href={`${base}/${group.slug}`} scroll={true} className="am-desktop-treatment-link flex min-h-9 items-center justify-between gap-2 border-b border-white/20 py-1.5 text-[11px] leading-snug transition-colors hover:text-[#FFFCF3] focus-visible:outline-2 focus-visible:outline-white xl:text-xs">
                          <span>{group.title}</span><ArrowUpRightIcon className="h-3.5 w-3.5 shrink-0" />
                        </Link>
                      ))}
                    </div>
                    <Link href={base} scroll={true} className="am-desktop-treatment-link mt-3 inline-flex items-center gap-2 self-start border-b border-white pb-1 text-[10px] font-semibold uppercase tracking-[0.08em] focus-visible:outline-2 focus-visible:outline-white">View category <ArrowUpRightIcon className="h-3.5 w-3.5" /></Link>
                  </nav>
                  {/* Keyboard users can focus a persistent trigger rather than needing mouse hover. */}
                  <Link href={base} scroll={true} aria-label={`View ${category.name} treatments`} className="absolute inset-0 hidden rounded-xl focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white lg:block lg:group-hover:pointer-events-none lg:group-focus-within:pointer-events-none" />
                </div>

                {/* Touchscreen expansion: legible full-width panel, rather than tiny text on the photo. */}
                <div id={`treatment-options-${i}`} hidden={!open} className="mt-2 rounded-xl border border-[#80755F]/30 bg-white p-4 lg:hidden">
                  <p className="mb-2 text-xs font-semibold text-[#4C5534]">Explore {category.name}</p>
                  <nav aria-label={`${category.name} subcategories`} className="flex flex-col">
                    {category.groups.map((group) => (
                      <Link key={group.slug} href={`${base}/${group.slug}`} scroll={true} className="flex min-h-11 items-center justify-between gap-2 border-b border-[#80755F]/20 py-2 text-sm text-[#4C5534] focus-visible:outline-2 focus-visible:outline-[#4C5534]">
                        <span>{group.title}</span><ArrowUpRightIcon className="h-5 w-5 shrink-0" />
                      </Link>
                    ))}
                    <Link href={base} scroll={true} className="mt-3 inline-flex min-h-11 items-center gap-2 text-xs font-semibold uppercase tracking-[0.07em] text-[#4C5534]">View category <ArrowUpRightIcon className="h-4 w-4" /></Link>
                  </nav>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <Link href="/treatments" className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-[#4C5534] px-7 text-xs font-semibold uppercase tracking-[0.08em] text-[#4C5534] transition-colors hover:bg-[#4C5534] hover:text-white">
            View All Treatments <span aria-hidden="true" className="transition-transform group-hover:translate-x-1"><ArrowUpRightIcon className="h-4 w-4" /></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
