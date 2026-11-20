import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import TreatmentSubcategoryCard from "@/components/treatments/TreatmentSubcategoryCard";
import { getTreatmentCategory, treatmentCategories } from "@/data/treatments";

export const metadata: Metadata = {
  title: "Treatments | Aesthera Mère",
  description: "Explore Aesthera Mère treatment categories and find care suited to your goals.",
};

export default function TreatmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  return (
    <>
      <Navbar />
      <Suspense fallback={<TreatmentsPageFallback />}>
        <TreatmentsContent searchParams={searchParams} />
      </Suspense>
      <Footer />
    </>
  );
}

async function TreatmentsContent({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const value = (await searchParams).category;
  const requestedSlug = Array.isArray(value) ? value[0] : value;
  const activeCategory = requestedSlug ? getTreatmentCategory(requestedSlug) : undefined;
  const visibleCategories = activeCategory ? [activeCategory] : treatmentCategories;
  const visibleGroups = visibleCategories.flatMap((category) =>
    category.groups.map((group) => ({ category, group })),
  );

  return (
      <main className="bg-[#FFFCF3] text-[#4C5534]">
        <section className="border-b border-[#80755F]/15 px-6 py-12 md:px-10 md:py-16">
          <div className="mx-auto max-w-[1280px]">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-montserrat text-[10px] font-semibold uppercase tracking-[0.14em] text-[#80755F]">
              <Link href="/" className="hover:text-[#4C5534]">Home</Link><span aria-hidden="true">/</span><span aria-current="page" className="text-[#4C5534]">Treatments</span>
            </nav>
            <div className="mt-10 max-w-[760px]">
              <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.22em] text-[#80755F]">The Aesthera Collection</p>
              <h1 className="font-seasons mt-3 text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.92] text-[#4C5534]">Explore Our Treatments</h1>
              <p className="mt-6 font-montserrat text-sm leading-7 text-[#80755F] sm:text-base">Discover care thoughtfully curated for you. Choose a category, then explore its treatment collections.</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-6 py-12 md:px-10 md:py-16" aria-labelledby="treatment-collections-heading">
          <div className="mb-9">
            <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-[#80755F]">Filter by category</p>
            <div className="mt-4 flex flex-wrap gap-2" aria-label="Treatment category filters">
              <Link href="/treatments" scroll={false} aria-current={!activeCategory ? "page" : undefined} className={`inline-flex min-h-11 items-center rounded-full border px-5 font-montserrat text-xs font-semibold transition-colors ${!activeCategory ? "border-[#4C5534] bg-[#4C5534] text-white" : "border-[#80755F]/30 text-[#4C5534] hover:border-[#4C5534]"}`}>All Treatments</Link>
              {treatmentCategories.map((category) => {
                const active = activeCategory?.slug === category.slug;
                return (
                  <Link key={category.slug} href={`/treatments?category=${category.slug}`} scroll={false} aria-current={active ? "page" : undefined} className={`inline-flex min-h-11 items-center rounded-full border px-5 font-montserrat text-xs font-semibold transition-colors ${active ? "border-[#4C5534] bg-[#4C5534] text-white" : "border-[#80755F]/30 text-[#4C5534] hover:border-[#4C5534]"}`}>
                    {category.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="mb-7 flex items-end justify-between gap-5 border-b border-[#80755F]/15 pb-5">
            <div>
              <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.18em] text-[#80755F]">{activeCategory ? activeCategory.name : "All categories"}</p>
              <h2 id="treatment-collections-heading" className="font-seasons mt-2 text-[clamp(2.25rem,4vw,3.5rem)] leading-tight text-[#4C5534]">Treatment Collections</h2>
            </div>
            <p className="font-montserrat text-[10px] uppercase tracking-[0.14em] text-[#80755F]">{visibleGroups.length} collections</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleGroups.map(({ category, group }) => (
              <TreatmentSubcategoryCard key={`${category.slug}-${group.slug}`} categorySlug={category.slug} group={group} />
            ))}
          </div>
        </section>
      </main>
  );
}

function TreatmentsPageFallback() {
  return (
    <main className="bg-[#FFFCF3] text-[#4C5534]" aria-busy="true">
      <section className="border-b border-[#80755F]/15 px-6 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-[1280px]">
          <div className="h-3 w-32 animate-pulse rounded-full bg-[#80755F]/15" />
          <div className="mt-10 max-w-[760px]">
            <div className="h-3 w-40 animate-pulse rounded-full bg-[#80755F]/15" />
            <div className="mt-5 h-16 max-w-xl animate-pulse rounded-2xl bg-[#80755F]/10" />
            <div className="mt-6 h-5 max-w-2xl animate-pulse rounded-full bg-[#80755F]/10" />
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1280px] px-6 py-12 md:px-10 md:py-16">
        <div className="mb-9 h-11 max-w-3xl animate-pulse rounded-full bg-[#80755F]/10" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="aspect-[4/5] animate-pulse rounded-2xl bg-[#80755F]/10" />
          ))}
        </div>
      </section>
    </main>
  );
}
