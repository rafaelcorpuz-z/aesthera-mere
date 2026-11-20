"use client";

import Image, { type StaticImageData } from "next/image";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { useBooking } from "@/components/booking/BookingProvider";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import doctor1Image from "@/public/images/doctors/doctor1.png";
import doctor2Image from "@/public/images/doctors/doctor2.png";

type Doctor = {
  name: string;
  specialty: string;
  description: string;
  image?: StaticImageData;
};

const doctors: Doctor[] = [
  {
    name: "Dr. Dan",
    specialty: "Aesthetic Physician",
    description: "Specializes in facial injectables, skin boosters, biostimulators, and thread lifting.",
    image: doctor1Image,
  },
  {
    name: "Dr. Raine",
    specialty: "Aesthetic Physician",
    description: "Focuses on personalized treatments for skin concerns, injectables, dermal fillers, and skin rejuvenation.",
    image: doctor2Image,
  },
  {
    name: "Dr. Ian",
    specialty: "",
    description: "",
  },
];

export default function DoctorsPage() {
  const { openBooking } = useBooking();

  return (
    <>
      <Navbar />
      <main className="bg-[#FFFCF3] text-[#4C5534]">
        <section className="border-b border-[#80755F]/15 px-6 py-14 text-center md:px-10 md:py-20">
          <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.24em] text-[#80755F]">Aesthera Mère</p>
          <h1 className="font-seasons mt-4 text-[clamp(3.5rem,7vw,6rem)] leading-[0.92]">Meet Our Experts</h1>
          <p className="mx-auto mt-5 max-w-[600px] font-montserrat text-sm leading-7 text-[#80755F]">Get to know the professionals behind your personalized aesthetic care.</p>
        </section>

        <section className="mx-auto max-w-[1180px] space-y-16 px-6 py-14 md:px-10 md:py-20">
          {doctors.map((doctor, index) => (
            <article key={doctor.name} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
              <div className={`relative aspect-[4/4.5] overflow-hidden rounded-[24px] bg-[#4C5534]/10 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                {doctor.image ? (
                  <Image src={doctor.image} alt={`Portrait of ${doctor.name}`} fill quality={90} sizes="(max-width: 767px) 100vw, 50vw" className="object-cover object-top" />
                ) : (
                  <div className="flex h-full items-center justify-center font-seasons text-7xl text-[#4C5534]/25" aria-label={`Portrait of ${doctor.name} coming soon`}>{doctor.name.split(" ").at(-1)?.charAt(0)}</div>
                )}
              </div>

              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                {doctor.specialty && <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-[#80755F]">{doctor.specialty}</p>}
                <h2 className="font-seasons mt-3 text-[clamp(3rem,5vw,5rem)] leading-none">{doctor.name}</h2>
                {doctor.description && <p className="mt-6 max-w-lg font-montserrat text-sm leading-7 text-[#80755F]">{doctor.description}</p>}
                <button type="button" onClick={() => openBooking("", doctor.name)} className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#4C5534] px-8 font-montserrat text-xs font-semibold text-white transition hover:bg-[#35452F]">
                  Book with {doctor.name}<ArrowUpRightIcon className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
