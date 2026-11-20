
"use client";

import Image from "next/image";
import Link from "next/link";
import { useBooking } from "@/components/booking/BookingProvider";
import { ArrowRightIcon } from "@/components/ui/Icons";

import doctor1Image from "@/public/images/doctors/doctor1.png";
import doctor2Image from "@/public/images/doctors/doctor2.png";

const doctors = [
  {
    id: "doctor-1",
    name: "Dr. Dan",
    specialty: "Aesthetic Physician",
    credentials:
      "Specializes in facial injectables, skin boosters, biostimulators, and thread lifting.",
    experience: "",
    image: doctor1Image,
  },
  {
    id: "doctor-2",
    name: "Dr. Raine",
    specialty: "Aesthetic Physician",
    credentials:
      "Focuses on personalized treatments for skin concerns, injectables, dermal fillers, and skin rejuvenation.",
    experience: "",
    image: doctor2Image,
  },
  {
    id: "doctor-3",
    name: "Dr. Ian",
    specialty: "Aesthetic Physician",
    credentials: "[Input credentials]",
    experience: "",
    image: "/images/doctors/doctor3.png",
  },
];

export default function MeetOurDoctors() {
  const { openBooking } = useBooking();
  return (
    <section
      id="our-doctors"
      className="relative -mt-[2px] bg-[#FFFCF3] py-10 md:py-12"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">

        {/* Section heading */}
        <div className="mb-9 text-center">
          <div className="mb-4 flex items-center justify-center gap-4">
            <span className="h-px w-8 bg-[#80755F]/50" />

            <span className="font-montserrat text-[10px] font-medium uppercase tracking-[0.22em] text-[#80755F]">
              The Experts Behind Aesthera Mère
            </span>

            <span className="h-px w-8 bg-[#80755F]/50" />
          </div>

          <h2
            className="text-[38px] leading-tight text-[#4C5534] md:text-[52px]"
            style={{
              fontFamily: "'The Seasons', Georgia, serif",
            }}
          >
            Meet Our Doctors
          </h2>

          <p className="mx-auto mt-3 max-w-[480px] font-montserrat text-[13px] leading-relaxed text-[#80755F]">
            Expertise, care, and a personalized approach to beauty.
          </p>
        </div>

        {/* Doctor cards */}
        <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
          {doctors.map((doctor) => (
            <article
              key={doctor.id}
              className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-[#4C5534]/10 bg-[#4C5534] shadow-[0_8px_28px_rgba(76,85,52,0.09)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(76,85,52,0.17)]"
            >

              {/* Doctor image */}
              <div className="relative aspect-[4/3.8] overflow-hidden bg-[#FFFCF3]">
                <Image
                  src={doctor.image}
                  alt={`Portrait of ${doctor.name}`}
                  fill
                  quality={90}
                  sizes="(max-width: 767px) 100vw, 33vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>

              {/* Doctor information */}
              <div className="flex flex-1 flex-col items-center px-5 pb-6 pt-5 text-center lg:px-6">

                {/* Name */}
                <h3
                  className="text-[27px] leading-tight text-[#FFFCF3] lg:text-[30px]"
                  style={{
                    fontFamily: "'Bodoni FLF', Georgia, serif",
                  }}
                >
                  {doctor.name}
                </h3>

                {/* Specialty */}
                {doctor.specialty && (
                  <p className="mt-2 font-montserrat text-[11px] font-medium uppercase tracking-[0.12em] text-[#FFFCF3]/85">
                    {doctor.specialty}
                  </p>
                )}

                {/* Decorative divider */}
                <span className="my-4 h-px w-10 bg-[#FFFCF3]/40" />

                {/* Expertise */}
                {doctor.credentials && (
                  <p className="max-w-[300px] font-montserrat text-[12px] leading-[1.8] text-[#FFFCF3]/90">
                    {doctor.credentials}
                  </p>
                )}

                {/* Experience */}
                {doctor.experience && (
                  <p className="mt-3 font-montserrat text-[11px] text-[#FFFCF3]/75">
                    {doctor.experience}
                  </p>
                )}

                {/* Booking button */}
                <div className="mt-auto w-full pt-6">
                  <button
                    type="button"
                    onClick={() => openBooking("", doctor.name)}
                    className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#FFFCF3] px-4 py-3 font-montserrat text-[12px] font-medium text-[#4C5534] transition-all duration-300 hover:bg-white hover:shadow-[0_4px_14px_rgba(0,0,0,0.10)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFFCF3]"
                  >
                    Book with {doctor.name}

                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View all doctors */}
        <div className="mt-9 text-center">
          <Link
            href="/doctors"
            className="inline-flex min-h-11 items-center gap-3 border-b border-[#4C5534] pb-1 font-montserrat text-[12px] font-medium tracking-[0.08em] text-[#4C5534] transition-all duration-300 hover:gap-5"
          >
            View All Doctors
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
