
"use client";

import { useState } from "react";
import { StarIcon } from "@/components/ui/Icons";

type Testimonial = {
  id: number;
  quote: string;
  name: string;
  detail: string;
  rating?: number;
};

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=aesthera+mere+beauty+creations&sca_esv=9c0ea2fc79e91fa8&biw=1536&bih=695&sxsrf=AKL5yDh4Yw6YgVbTwB9yTzPXpWWkAP_DBg%3A1794556159209&ei=_8D2ariwDPW3rfcP75nWmQ4&uact=5&oq=aesthera+mere+beauty+creations&gs_lp=Egxnd3Mtd2l6LXNlcnAiHmFlc3RoZXJhIG1lcmUgYmVhdXR5IGNyZWF0aW9uczIEECMYJzIHECMY8AUYJzILEC4YgAQYxwEYrwEyBhAAGBYYHjIGEAAYFhgeMgIQJjILEAAYgAQYigUYhgMyCxAAGIAEGIoFGIYDMgsQABiABBiKBRiGAzIFEAAY7wVIwAJQL1gvcAF4AJABAJgBjAGgAYwBqgEDMC4xuAEDyAEA-AEBmAIBoAKRAZgDAIgGAZIHAzAuMaAHjguyBwMwLjG4B5EBwgcDMi0xyAcDgAgB&sclient=gws-wiz-serp#lrd=0x3397c9ff0d4effff:0x8f90fb8a8325a1c2,1,,,,";

// FEATURED REVIEWS
// Only these reviews will appear in the main green container.
const featuredTestimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Highly recommended! Very accommodating and professional staff. They explain the treatments very well, so you really understand what’s best for you. Great service overall!",
    name: "JMC DANUELLA NARVAEZ",
    detail: "",
  },
   {
    id: 2,
    quote:
      "The clinic is very clean and has a premium feel. Everyone was warm, friendly and welcoming. I really felt that I was getting a high-quality, premium experience without the premium price tag.",
    name: "Luis Robedillo",
    detail: "",
  },
     {
    id: 3,
    quote: "Had a wonderful time here and the service is great. Will definitely recommend and come back to avail the other service! The clinic is very clean and has a premium feel. Everyone was warm, friendly and welcoming. I really felt that I was getting a high-quality, premium experience without the premium price tag.",
    name: "Justin Eduardo",
    detail: "",
  },

  // Add more featured testimonials here.
];

// SUPPORTING REVIEWS
// These reviews always remain in the two smaller cards.
const supportingTestimonials: Testimonial[] = [
  {
    id: 2,
    quote:
      "I will definitely be coming back to this clinic! The staff are very accommodating, friendly, and professional, and I’m really satisfied with their services. I especially loved their Korean facial—it was such a relaxing and refreshing experience. Highly recommended!",
    name: "Reynard",
    detail: "Client Review",
  },
  {
    id: 3,
    quote:
      "Had a wonderful experience here! The ambiance is super warm and relaxing, and the whole team makes you feel comfortable and well cared for right away. Top-tier service and professional care!",
    name: "Kristian Sevilla",
    detail: "Client Review",
  },
  {
    id: 4,
    quote:
      "Highly recommended!! Absolutely loved my facial experience here! Sobrang soft at glowing ng face ko after the facial. Glass skin achieved. The staff were professional, gentle, and made me feel comfortable throughout.",
    name: "Mildred Del Rosario",
    detail: "Client Review",
  },
  {
    id: 5,
    quote:
      "From their treatments to how they care for their clients, you can really feel the passion and effort they put into every single service. All their work is consistently good, professional, and makes everyone feel and look their best. They truly know how to create beauty and give amazing experiences!",
    name: "JET Regilme",
    detail: "Client Review",
  },
  {
    id: 6,
    quote:
      "Staff are friendly and approachable. Ambiance is warm and welcoming. Facility is orderly and clean. Treatments so far are recommended :)",
    name: "Daniela De Luna",
    detail: "Client Review",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [supportingOffset, setSupportingOffset] = useState(0);

  const current = featuredTestimonials[active] ?? featuredTestimonials[0];

  const previous = () => {
    setActive(
      (index) =>
        (index - 1 + featuredTestimonials.length) %
        featuredTestimonials.length
    );
    setSupportingOffset(
      (index) =>
        (index - 1 + supportingTestimonials.length) %
        supportingTestimonials.length
    );
  };

  const next = () => {
    setActive(
      (index) => (index + 1) % featuredTestimonials.length
    );
    setSupportingOffset(
      (index) => (index + 1) % supportingTestimonials.length
    );
  };

  const visibleSupportingReviews = Array.from(
    {
      length: Math.min(2, supportingTestimonials.length),
    },
    (_, index) =>
      supportingTestimonials[
        (supportingOffset + index) % supportingTestimonials.length
      ]
  );

  return (
    <section
      id="testimonials"
      className="bg-[#FFFCF3] py-10 md:py-12"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">

        {/* SECTION HEADING */}
        <div className="mb-7 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#80755F]/50" />

            <span className="font-montserrat text-[10px] font-medium uppercase tracking-[0.22em] text-[#80755F]">
              Words From Our Clients
            </span>

            <span className="h-px w-8 bg-[#80755F]/50" />
          </div>

          <h2
            className="text-[36px] leading-tight text-[#4C5534] md:text-[48px]"
            style={{
              fontFamily: "'The Seasons', Georgia, serif",
            }}
          >
            The Aesthera Experience
          </h2>

          <p className="mx-auto mt-3 max-w-[480px] font-montserrat text-[13px] leading-relaxed text-[#80755F]">
            Thoughtful care, shared through real experiences.
          </p>
        </div>

        {/* FEATURED TESTIMONIAL */}
        <div className="relative mx-auto max-w-[1050px] overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,#4F6442_0%,#4C5534_100%)] px-6 py-8 text-center shadow-[0_10px_28px_rgba(76,85,52,0.09)] md:px-12 md:py-10">

          {/* Decorative quotation mark */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-9 left-5 select-none text-[130px] leading-none text-[#FFFCF3]/10"
            style={{
              fontFamily: "Georgia, serif",
            }}
          >
            “
          </span>

          <div className="relative z-10 mx-auto flex max-w-[850px] flex-col items-center">

            <span className="mb-4 h-px w-10 bg-[#FFFCF3]/50" />

            {/* Verified star rating, when provided */}
            {typeof current.rating === "number" && (
              <div
                className="mb-4 flex gap-1 text-[#FFFCF3]"
                aria-label={`${current.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon key={i} filled={i < (current.rating ?? 0)} className="h-4 w-4" />
                ))}
              </div>
            )}

            <blockquote
              key={current.id}
              className="text-[18px] leading-[1.65] text-[#FFFCF3] md:text-[23px]"
              style={{
                fontFamily: "'The Seasons', Georgia, serif",
              }}
            >
              “{current.quote}”
            </blockquote>

            <span className="my-4 h-px w-9 bg-[#FFFCF3]/40" />

            <p className="font-montserrat text-[12px] font-medium text-[#FFFCF3]">
              {current.name}
            </p>

            <p className="mt-1 font-montserrat text-[10px] uppercase tracking-[0.12em] text-[#FFFCF3]/75">
              {current.detail}
            </p>
          </div>

          {/* Only show arrows when there are multiple featured reviews */}
          {featuredTestimonials.length > 1 && (
            <div className="relative z-10 mt-5 flex items-center justify-center gap-5">

              <button
                type="button"
                onClick={previous}
                aria-label="Previous featured testimonial"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#FFFCF3]/50 text-[#FFFCF3] transition-all duration-300 hover:bg-[#FFFCF3] hover:text-[#4C5534] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFFCF3]"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>

              <span className="font-montserrat text-[10px] tracking-[0.12em] text-[#FFFCF3]/80">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(featuredTestimonials.length).padStart(2, "0")}
              </span>

              <button
                type="button"
                onClick={next}
                aria-label="Next featured testimonial"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#FFFCF3]/50 text-[#FFFCF3] transition-all duration-300 hover:bg-[#FFFCF3] hover:text-[#4C5534] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFFCF3]"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* SUPPORTING TESTIMONIALS */}
        <div className="mx-auto mt-7 max-w-[1050px]">
          <h3 className="mb-3 text-center font-montserrat text-[10px] font-medium uppercase tracking-[0.2em] text-[#80755F]">
            More Client Reviews
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            {visibleSupportingReviews.map((testimonial) => (
              <article
                key={testimonial.id}
                className="flex min-h-[135px] flex-col justify-between rounded-[16px] border border-[#80755F]/15 bg-white p-5 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(76,85,52,0.06)]"
              >
                <p className="font-montserrat text-[12px] leading-[1.75] text-[#4C5534]">
                  “{testimonial.quote}”
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                  <span className="font-montserrat text-[11px] font-medium text-[#80755F]">
                    {testimonial.name}
                  </span>

                  <span className="font-montserrat text-[10px] uppercase tracking-[0.1em] text-[#80755F]">
                    {testimonial.detail}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* GOOGLE REVIEWS BUTTON */}
        <div className="mt-7 flex flex-col items-center gap-3 text-center">

          <p className="font-montserrat text-[12px] text-[#80755F]">
            Discover what our clients are saying on Google.
          </p>

          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-full border border-[#4C5534] px-6 py-3 font-montserrat text-[12px] font-medium text-[#4C5534] transition-all duration-300 hover:bg-[#4C5534] hover:text-[#FFFCF3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C5534]"
          >
            Read Our Google Reviews

            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
