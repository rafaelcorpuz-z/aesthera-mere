import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import BookingTrigger from "@/components/booking/BookingTrigger";
import type { Treatment, TreatmentCategory, TreatmentGroup } from "@/data/treatments";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function TreatmentDetailPage({
  category,
  group,
  treatment,
}: {
  category: TreatmentCategory;
  group: TreatmentGroup;
  treatment: Treatment;
}) {
  const collectionLabel = treatment.collection ?? group.title;
  const backHref = "/treatments/" + category.slug + "/" + group.slug;
  const facts = [
    ["Best for", treatment.benefits.join(", ")],
    ["Treatment time", treatment.duration],
    ["Downtime", treatment.downtime],
  ];

  return (
    <>
      <Navbar />
      <main className="bg-[#FFFCF3] text-[#4C5534]">
        <div className="border-b border-[#80755F]/15 px-6 py-5 md:px-10">
          <nav aria-label="Breadcrumb" className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-2 font-montserrat text-[9px] font-semibold uppercase tracking-[0.13em] text-[#80755F] sm:text-[10px]">
            <Link href="/" className="transition-colors hover:text-[#4C5534]">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/treatments" className="transition-colors hover:text-[#4C5534]">Treatments</Link>
            <span aria-hidden="true">/</span>
            <Link href={"/treatments/" + category.slug} className="transition-colors hover:text-[#4C5534]">{category.name}</Link>
            <span aria-hidden="true">/</span>
            <Link href={backHref} className="transition-colors hover:text-[#4C5534]">{group.title}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-[#4C5534]">{treatment.name}</span>
          </nav>
        </div>

        <section className="px-6 py-10 md:px-10 md:py-14 lg:py-16">
          <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16">
            <div className="max-w-[590px]">
              <p className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.2em] text-[#80755F]">{collectionLabel}</p>
              <h1 className="font-seasons mt-4 text-[clamp(3.5rem,6vw,6rem)] leading-[0.92] tracking-[-0.02em] text-[#4C5534]">{treatment.name}</h1>
              <p className="mt-6 font-montserrat text-sm leading-7 text-[#80755F] sm:text-[15px]">{treatment.description}</p>

              <div className="mt-9">
                <h2 className="font-seasons text-[2rem] leading-tight text-[#4C5534]">At a glance</h2>
                <dl className="mt-4 divide-y divide-[#80755F]/20 border-y border-[#80755F]/20">
                  {facts.map(([label, value]) => (
                    <div key={label} className="grid gap-1 py-3 sm:grid-cols-[150px_1fr] sm:gap-5">
                      <dt className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.12em] text-[#4C5534]">{label}</dt>
                      <dd className="font-montserrat text-[13px] leading-6 text-[#80755F]">{value}</dd>
                    </div>
                  ))}
                  <div className="grid gap-1 py-3 sm:grid-cols-[150px_1fr] sm:gap-5">
                    <dt className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.12em] text-[#4C5534]">{treatment.priceLabel}</dt>
                    <dd className="font-montserrat text-sm font-semibold text-[#4C5534]">{treatment.price}</dd>
                  </div>
                  {treatment.packagePrice && (
                    <div className="grid gap-1 py-3 sm:grid-cols-[150px_1fr] sm:gap-5">
                      <dt className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.12em] text-[#4C5534]">Package price</dt>
                      <dd className="font-montserrat text-sm font-semibold text-[#4C5534]">{treatment.packagePrice}</dd>
                    </div>
                  )}
                  {treatment.priceNote && (
                    <div className="grid gap-1 py-3 sm:grid-cols-[150px_1fr] sm:gap-5">
                      <dt className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.12em] text-[#4C5534]">Pricing note</dt>
                      <dd className="font-montserrat text-[13px] leading-6 text-[#80755F]">{treatment.priceNote}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <BookingTrigger initialTreatment={treatment.name} className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#4C5534] px-7 font-montserrat text-xs font-semibold text-white transition-colors hover:bg-[#4F6442]">
                  Book an Appointment
                  <span className="transition-transform duration-300 group-hover:translate-x-1"><ArrowIcon /></span>
                </BookingTrigger>
                <Link href={backHref} className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#4C5534]/25 px-7 font-montserrat text-xs font-semibold text-[#4C5534] transition-colors hover:border-[#4C5534]">
                  Back to Treatments
                </Link>
              </div>
              <p className="mt-4 font-montserrat text-[9px] uppercase tracking-[0.1em] text-[#80755F]">Suitability and final treatment plan are confirmed during consultation.</p>
            </div>

            <div className="relative min-h-[430px] overflow-hidden rounded-[26px] bg-[#80755F]/10 sm:min-h-[600px] lg:min-h-[680px]">
              {treatment.imageAvailable === false ? (
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-[#FFFCF3] to-[#4F6442]/15" />
              ) : (
                <>
                  <Image src={treatment.image} alt={treatment.name} fill priority quality={92} sizes="(max-width: 1023px) 100vw, 55vw" className="object-cover" />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#4C5534]/15 to-transparent" />
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
