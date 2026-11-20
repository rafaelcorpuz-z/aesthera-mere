import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import TreatmentSubcategoryCard from "@/components/treatments/TreatmentSubcategoryCard";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import type { TreatmentCategory } from "@/data/treatments";

export default function TreatmentCategoryPage({ category }: { category: TreatmentCategory }) {
  return (
    <>
      <Navbar />
      <main className="bg-[#FFFCF3] text-[#4C5534]">
        <section className="relative isolate overflow-hidden border-b border-[#80755F]/15">
          <div className="mx-auto grid max-w-[1440px] lg:min-h-[500px] lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col justify-center px-6 py-12 md:px-10 lg:px-16 lg:py-16">
              <nav aria-label="Breadcrumb" className="font-montserrat flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#80755F]">
                <Link href="/" className="hover:text-[#4C5534]">Home</Link><span aria-hidden="true">/</span>
                <Link href="/treatments" className="hover:text-[#4C5534]">Treatments</Link><span aria-hidden="true">/</span>
                <span aria-current="page" className="text-[#4C5534]">{category.name}</span>
              </nav>
              <p className="mt-10 font-montserrat text-[11px] font-semibold uppercase tracking-[0.22em] text-[#80755F]">Personalized aesthetic care</p>
              <h1 className="font-seasons mt-3 max-w-[760px] text-[clamp(3.5rem,7vw,6.75rem)] leading-[0.92] tracking-[-0.035em] text-[#4C5534]">{category.name}</h1>
              <p className="mt-6 max-w-[590px] font-montserrat text-sm leading-7 text-[#80755F] sm:text-base">{category.introduction}</p>
            </div>
            <div className="relative min-h-[320px] lg:min-h-full">
              <Image src={category.image} alt="" fill priority quality={90} sizes="(max-width: 1023px) 100vw, 48vw" className="object-cover" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#FFFCF3]/20 to-transparent" />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-6 py-14 md:px-10 md:py-16" aria-labelledby="subcategory-heading">
          <div className="mb-8 flex flex-col justify-between gap-4 border-b border-[#80755F]/15 pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-[#80755F]">Explore by collection</p>
              <h2 id="subcategory-heading" className="font-seasons mt-2 text-[clamp(2.5rem,5vw,4rem)] leading-tight text-[#4C5534]">Choose a treatment category</h2>
            </div>
            <Link href="/treatments" className="group inline-flex w-fit items-center gap-2 border-b border-[#4C5534] pb-1 font-montserrat text-xs font-semibold text-[#4C5534]">View All Treatments <span aria-hidden="true" className="transition-transform group-hover:translate-x-1"><ArrowUpRightIcon className="h-4 w-4" /></span></Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {category.groups.map((group) => (
              <TreatmentSubcategoryCard key={group.slug} categorySlug={category.slug} group={group} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
