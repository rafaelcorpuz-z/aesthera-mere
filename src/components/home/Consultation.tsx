
"use client";

import { useBooking } from "@/components/booking/BookingProvider";
import { ArrowUpRightIcon } from "@/components/ui/Icons";

function CalendarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

export default function Consultation() {
  const { openBooking } = useBooking();
  return (
    <section
      id="consultation"
      className="relative overflow-hidden bg-[#FFFCF3]"
      style={{ padding: "1rem clamp(1.25rem, 3vw, 2rem) clamp(1.5rem, 2.5vw, 2.5rem)" }}
    >
      <div className="relative z-10 mx-auto flex max-w-[1280px] flex-col items-center rounded-[28px] border border-[#4F6442]/20 bg-white px-6 py-12 text-center md:px-12 md:py-16">

        {/* Small Heading */}
        <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-[#4F6442]">
          Your Journey Starts Here
        </p>

        {/* Main Heading */}
        <h2 className="font-seasons mt-4 max-w-[760px] text-4xl leading-tight text-[#1E3A2A] md:text-5xl">
          Ready to Begin Your Beauty Journey?
        </h2>

        {/* Description */}
        <p className="font-montserrat mt-6 max-w-[580px] text-sm leading-7 text-[#5C675D] md:text-base md:leading-8">
          Schedule a consultation with Aesthera Mère and find the treatments that are right for you.
        </p>

        <div className="mt-8 grid w-full max-w-[760px] gap-3 border-y border-[#4F6442]/15 py-5 font-montserrat text-sm text-[#5C675D] sm:grid-cols-2">
          <p><span className="font-semibold text-[#1E3A2A]">Clinic hours:</span> Mon–Tue &amp; Thu–Sun, 10:00 AM–8:00 PM · Wednesday closed</p>
          <a href="tel:+639189365679" className="transition-colors hover:text-[#1E3A2A]"><span className="font-semibold text-[#1E3A2A]">Call:</span> 0918 936 5679</a>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button type="button" onClick={() => openBooking()} className="font-montserrat group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-[#4C5534] bg-[#4C5534] px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#35452F] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4C5534]">
            <CalendarIcon /> <span>Book a Consultation</span><span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"><ArrowUpRight /></span>
          </button>
          <a href="https://www.facebook.com/aestheramereph/" target="_blank" rel="noopener noreferrer" className="font-montserrat inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#4C5534]/30 px-6 text-xs font-semibold text-[#4C5534] hover:bg-[#F6F3ED]">Facebook <ArrowUpRightIcon className="h-4 w-4" /></a>
          <a href="https://www.instagram.com/aestheramereph/" target="_blank" rel="noopener noreferrer" className="font-montserrat inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#4C5534]/30 px-6 text-xs font-semibold text-[#4C5534] hover:bg-[#F6F3ED]">Instagram <ArrowUpRightIcon className="h-4 w-4" /></a>
        </div>

      </div>
    </section>
  );
}
