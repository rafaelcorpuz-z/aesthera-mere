import Image from "next/image";
import Link from "next/link";
import BookingTrigger from "@/components/booking/BookingTrigger";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import promo1Image from "@/public/images/promotions/promo1.png";
import promo2Image from "@/public/images/promotions/promo2.png";
import promo3Image from "@/public/images/promotions/promo3.png";

const offers = [
  { name: "Facial Holiday Treat", treatment: "Selected premium facial", sessions: "1 session", promoPrice: "Starts at ₱999", regularPrice: "Inquire for regular price", validity: "Confirm current validity when booking", image: promo1Image },
  { name: "Laser Holiday Treat", treatment: "Selected laser treatment", sessions: "1 session", promoPrice: "Starts at ₱999", regularPrice: "Inquire for regular price", validity: "Confirm current validity when booking", image: promo2Image },
  { name: "Aesthera Drip Treat", treatment: "Selected wellness drip", sessions: "1 session", promoPrice: "Starts at ₱899", regularPrice: "Inquire for regular price", validity: "Confirm current validity when booking", image: promo3Image },
];

export default function Promos() {
  return (
    <section id="promos" aria-labelledby="promos-heading" className="relative isolate overflow-hidden bg-[#FFFCF3] px-6 py-10 md:px-10 md:py-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#FFFCF3] to-transparent" />
      <div className="relative mx-auto max-w-[1280px]">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-[700px]">
            <p className="mb-3 font-montserrat text-[11px] font-semibold uppercase tracking-[0.22em] text-[#80755F]">Limited-time offers</p>
            <h2 id="promos-heading" className="font-seasons text-[clamp(2.6rem,5vw,4.5rem)] leading-[1.08] text-[#4C5534]">Our Promotions</h2>
            <p className="mt-4 font-montserrat text-sm leading-7 text-[#80755F]">Explore our current treatment offers. Final eligibility, inclusions, and validity are confirmed during consultation.</p>
          </div>
          <Link href="/promos" className="group inline-flex w-fit items-center gap-2 border-b border-[#4C5534] pb-1 font-montserrat text-[13px] font-semibold text-[#4C5534] transition-opacity hover:opacity-70">
            View Promos &amp; Packages <span aria-hidden="true" className="transition-transform group-hover:translate-x-1"><ArrowUpRightIcon className="h-4 w-4" /></span>
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {offers.map((offer) => (
            <article key={offer.name} className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-[#80755F]/20 bg-white shadow-[0_18px_45px_-30px_rgba(30,58,42,0.45)]">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#E7E1D7]">
                <Image src={offer.image} alt="" fill quality={90} sizes="(max-width: 1023px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute left-4 top-4 rounded-full bg-[#4C5534] px-3 py-2 font-montserrat text-[10px] font-semibold uppercase tracking-[0.12em] text-white">Current offer</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.16em] text-[#80755F]">{offer.treatment}</p>
                <h3 className="font-seasons mt-2 text-3xl leading-tight text-[#4C5534]">{offer.name}</h3>
                <dl className="mt-5 space-y-3 border-y border-[#80755F]/15 py-5 font-montserrat text-xs">
                  <div className="flex justify-between gap-4"><dt className="text-[#80755F]">Package</dt><dd className="text-right font-semibold text-[#4C5534]">{offer.sessions}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-[#80755F]">Promo price</dt><dd className="text-right font-semibold text-[#4C5534]">{offer.promoPrice}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-[#80755F]">Regular price</dt><dd className="text-right text-[#4C5534]">{offer.regularPrice}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-[#80755F]">Validity</dt><dd className="max-w-[190px] text-right text-[#4C5534]">{offer.validity}</dd></div>
                </dl>
                <BookingTrigger initialTreatment={offer.name} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#4C5534] px-5 font-montserrat text-xs font-semibold text-white transition-colors hover:bg-[#35452F]">
                  Book This Offer <ArrowUpRightIcon className="h-4 w-4" />
                </BookingTrigger>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
