import Link from "next/link";
import Footer from "@/components/layout/Footer";
import FacialCollectionTabs from "@/components/treatments/FacialCollectionTabs";
import Navbar from "@/components/layout/Navbar";
import BookingTrigger from "@/components/booking/BookingTrigger";
import TreatmentCard from "@/components/treatments/TreatmentCard";
import type { TreatmentCategory, TreatmentGroup } from "@/data/treatments";

export default function TreatmentListingPage({
  category,
  group,
}: {
  category: TreatmentCategory;
  group: TreatmentGroup;
}) {
  const basePath = `/treatments/${category.slug}/${group.slug}`;
  const facialCollections = (["Premium Facial Selections", "Elite Facial Selections"] as const)
    .map((title) => ({
      title,
      treatments: group.treatments.filter((treatment) => treatment.collection === title),
    }))
    .filter((collection) => collection.treatments.length > 0);
  return (
    <>
      <Navbar />
      <main className="bg-[#FFFCF3] text-[#4C5534]">
        <section className="relative overflow-hidden border-b border-[#80755F]/15 px-6 py-10 md:px-10 md:py-14 lg:py-16">
          <div aria-hidden="true" className="absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-[#4F6442]/[0.05] blur-3xl" />
          <div className="relative mx-auto max-w-[960px] text-center">
              <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-center gap-2 font-montserrat text-[10px] font-semibold uppercase tracking-[0.12em] text-[#80755F]">
                <Link href="/" className="hover:text-[#4C5534]">Home</Link><span aria-hidden="true">/</span>
                <Link href="/treatments" className="hover:text-[#4C5534]">Treatments</Link><span aria-hidden="true">/</span>
                <Link href={`/treatments/${category.slug}`} className="hover:text-[#4C5534]">{category.name}</Link><span aria-hidden="true">/</span>
                <span aria-current="page" className="text-[#4C5534]">{group.title}</span>
              </nav>
              <p className="mt-6 font-montserrat text-[11px] font-semibold uppercase tracking-[0.22em] text-[#80755F]">{category.name}</p>
              <h1 className="font-seasons mx-auto mt-2 max-w-[900px] text-[clamp(2.75rem,6vw,5rem)] leading-[0.94] text-[#4C5534]">{group.title}</h1>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-6 py-14 md:px-10 md:py-16">
          {facialCollections.length > 0 ? (
            <FacialCollectionTabs collections={facialCollections} basePath={basePath} />
          ) : group.treatments.length > 0 ? (
            <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
              {group.treatments.map((treatment) => (
                <TreatmentCard key={treatment.slug} treatment={treatment} href={`${basePath}/${treatment.slug}`} />
              ))}
            </div>
          ) : (
            <div className="rounded-[20px] border border-[#80755F]/20 bg-white px-6 py-10 text-center shadow-[0_12px_32px_rgba(76,85,52,0.05)]">
              <h2 className="font-seasons text-3xl text-[#4C5534]">Treatment menu coming soon</h2>
              <p className="mx-auto mt-3 max-w-[620px] font-montserrat text-sm leading-7 text-[#80755F]">The verified treatment names and prices for this collection are being prepared. Our team can help you explore suitable options now.</p>
              <BookingTrigger initialTreatment={group.title} className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[#4C5534] px-7 font-montserrat text-xs font-semibold text-white hover:bg-[#4F6442]">Ask About This Collection</BookingTrigger>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
