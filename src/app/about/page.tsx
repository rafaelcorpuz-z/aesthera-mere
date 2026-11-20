import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { clinic, clinicSocialLinks } from "@/data/clinic";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "About Us | Aesthera Mère",
  description:
    "Learn about Aesthera Mère Beauty Creations, the flagship brand of RiveraMère Innovations Inc., and the Mère Standard behind our work.",
};

const facilityPhotos = [
  {
    src: "/images/about/about2.png",
    alt: "Aesthera Mère treatment room",
    caption: "A calm, considered space for your visit",
  },
  {
    src: "/images/about/about3.png",
    alt: "Aesthera Mère reception area",
    caption: "A warm welcome at Aesthera Mère",
  },
];

const trustDetails = [
  {
    title: "Licenses & accreditations",
    description:
      "Official clinic and practitioner credentials will be listed here once confirmed.",
    imageLabel: "Credential photo placeholder",
  },
  {
    title: "Products & technologies",
    description:
      "Verified product names, device details, and any applicable FDA status will be added here.",
    imageLabel: "Product or device photo placeholder",
  },
  {
    title: "HMO partners",
    description:
      "Partner HMO names and coverage details will be added if applicable.",
    imageLabel: "HMO partner logo placeholder",
  },
];

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[#80755F]/35 bg-[#F4F0E7] px-5 text-center text-[#80755F]"
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <rect x="4" y="5" width="24" height="22" rx="3" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="m6 24 7-7 4 4 3-3 6 6" />
      </svg>
      <span className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.12em]">
        {label}
      </span>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#FFFCF3] text-[#4C5534]">
        <section className="border-b border-[#80755F]/15 px-6 py-12 md:px-10 md:py-16">
          <div className="mx-auto grid max-w-[1280px] items-center gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
            <div>
              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-2 font-montserrat text-[10px] font-semibold uppercase tracking-[0.14em] text-[#80755F]"
              >
                <Link href="/" className="hover:text-[#4C5534]">
                  Home
                </Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page" className="text-[#4C5534]">
                  About Us
                </span>
              </nav>
              <p className="mt-10 font-montserrat text-[11px] font-semibold uppercase tracking-[0.22em] text-[#80755F]">
                {company.tagline}
              </p>
              <h1 className="font-seasons mt-3 max-w-[700px] text-[clamp(3.5rem,7vw,6.25rem)] leading-[0.94] tracking-[-0.035em]">
                Beauty, wellness, and care with purpose.
              </h1>
              <p className="mt-6 max-w-[590px] font-montserrat text-sm leading-7 text-[#80755F] sm:text-base">
                {company.flagship} is the flagship brand of{" "}
                {company.legalName}, a parent company supporting businesses
                across beauty, wellness, healthcare, and lifestyle services.
                Aesthera Mère brings that vision to life through aesthetic and
                wellness services shaped around care and the client experience.
              </p>
              <Link
                href="/treatments"
                className="mt-8 inline-flex min-h-11 items-center rounded-full bg-[#4C5534] px-6 font-montserrat text-xs font-semibold text-[#FFFCF3] transition-colors hover:bg-[#4F6442]"
              >
                Explore Treatments
              </Link>
            </div>
            <div className="relative aspect-[4/4.2] overflow-hidden rounded-[20px] bg-[#F4F0E7]">
              <Image
                src="/images/about/about.png"
                alt="Reception and lounge at Aesthera Mère"
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1280px] gap-8 px-6 py-14 md:px-10 md:py-20 lg:grid-cols-[0.7fr_1fr] lg:gap-20">
          <div>
            <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-[#80755F]">
              Our philosophy
            </p>
            <h2 className="font-seasons mt-3 text-[clamp(2.5rem,5vw,4rem)] leading-tight">
              The Mère Standard
            </h2>
          </div>
          <div className="space-y-5 font-montserrat text-sm leading-7 text-[#80755F]">
            <p>
              {company.philosophy}
            </p>
            <p>
              This philosophy grounds the group&apos;s work: building genuine
              relationships through care, professional excellence, and
              integrity.
            </p>
          </div>
        </section>

        <section className="bg-[#4C5534] px-6 py-14 text-[#FFFCF3] md:px-10 md:py-20">
          <div className="mx-auto grid max-w-[1280px] gap-8 md:grid-cols-2 md:gap-12">
            <article className="border-b border-[#FFFCF3]/20 pb-8 md:border-b-0 md:border-r md:pb-0 md:pr-12">
              <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFFCF3]/65">
                Our mission
              </p>
              <p className="font-seasons mt-4 text-3xl leading-tight md:text-4xl">
                Build businesses that make care matter.
              </p>
              <p className="mt-4 font-montserrat text-sm leading-7 text-[#FFFCF3]/80">
                {company.mission}
              </p>
            </article>
            <article>
              <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFFCF3]/65">
                Our vision
              </p>
              <p className="font-seasons mt-4 text-3xl leading-tight md:text-4xl">
                Lasting value for people and communities.
              </p>
              <p className="mt-4 font-montserrat text-sm leading-7 text-[#FFFCF3]/80">
                {company.vision}
              </p>
            </article>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-6 py-14 md:px-10 md:py-20">
          <div className="mb-8 max-w-[650px]">
            <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-[#80755F]">
              What guides us
            </p>
            <h2 className="font-seasons mt-3 text-[clamp(2.5rem,5vw,4rem)] leading-tight">
              Our core values
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {company.values.map((value, index) => (
              <article
                key={value.title}
                className="rounded-[18px] border border-[#80755F]/15 bg-white p-6"
              >
                <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.16em] text-[#80755F]">
                  0{index + 1}
                </p>
                <h3 className="font-seasons mt-3 text-2xl">{value.title}</h3>
                <p className="mt-2 font-montserrat text-xs leading-6 text-[#80755F]">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#F4F0E7] px-6 py-12 md:px-10 md:py-16">
          <div className="mx-auto max-w-[1280px]">
            <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-[#80755F]">
              The company behind the clinic
            </p>
            <h2 className="font-seasons mt-3 text-[clamp(2.5rem,5vw,4rem)] leading-tight">
              {company.legalName}
            </h2>
            <p className="mt-3 max-w-[680px] font-montserrat text-sm leading-7 text-[#80755F]">
              A parent company providing strategic leadership, governance, and
              operational support to its businesses.
            </p>
            <dl className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Established", company.established],
                ["Flagship brand", company.flagship],
                ["Industry", company.businessScope],
                ["Business model", company.businessModel],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="border-t border-[#80755F]/25 pt-4"
                >
                  <dt className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.14em] text-[#80755F]">
                    {label}
                  </dt>
                  <dd className="mt-2 font-montserrat text-sm leading-6 text-[#4C5534]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 font-montserrat text-xs leading-6 text-[#80755F]">
              Parent company head office: {company.headquarters}
            </p>
          </div>
        </section>

        <section className="bg-[#F4F0E7] px-6 py-14 md:px-10 md:py-20">
          <div className="mx-auto max-w-[1280px]">
            <div className="mb-8 max-w-[650px]">
              <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-[#80755F]">
                The clinic
              </p>
              <h2 className="font-seasons mt-3 text-[clamp(2.5rem,5vw,4rem)] leading-tight">
                A space to feel at ease
              </h2>
              <p className="mt-4 font-montserrat text-sm leading-7 text-[#80755F]">
                A look inside the Aesthera Mère clinic and treatment spaces.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {facilityPhotos.map((photo) => (
                <figure
                  key={photo.src}
                  className="overflow-hidden rounded-[18px] bg-white"
                >
                  <div className="relative aspect-[16/10] bg-[#E8E2D7]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 767px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="px-5 py-4 font-montserrat text-xs text-[#80755F]">
                    {photo.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-6 py-14 md:px-10 md:py-20">
          <div className="mb-8 max-w-[700px]">
            <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-[#80755F]">
              Trust & transparency
            </p>
            <h2 className="font-seasons mt-3 text-[clamp(2.5rem,5vw,4rem)] leading-tight">
              The details that matter
            </h2>
            <p className="mt-4 font-montserrat text-sm leading-7 text-[#80755F]">
              We are preparing verified information about our credentials,
              products, technologies, and partners. These placeholders are
              intentionally marked so no unconfirmed claims are presented as
              facts.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {trustDetails.map((detail) => (
              <article
                key={detail.title}
                className="rounded-[18px] border border-[#80755F]/15 bg-white p-4"
              >
                <ImagePlaceholder label={detail.imageLabel} />
                <h3 className="font-seasons mt-5 text-2xl">
                  {detail.title}
                </h3>
                <p className="mt-2 font-montserrat text-xs leading-6 text-[#80755F]">
                  {detail.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#4C5534] px-6 py-14 text-[#FFFCF3] md:px-10 md:py-16">
          <div className="mx-auto grid max-w-[1280px] gap-10 md:grid-cols-2">
            <div>
              <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFFCF3]/65">
                Visit Aesthera Mère
              </p>
              <h2 className="font-seasons mt-3 text-[clamp(2.5rem,5vw,4rem)] leading-tight">
                We look forward to welcoming you.
              </h2>
              <address className="mt-6 max-w-[450px] font-montserrat text-sm not-italic leading-7 text-[#FFFCF3]/80">
                {clinic.address}
              </address>
              <a
                href={clinic.phoneHref}
                className="mt-3 inline-block font-montserrat text-sm text-[#FFFCF3] underline underline-offset-4"
              >
                {clinic.phoneDisplay}
              </a>
              <div className="mt-6">
                <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.16em] text-[#FFFCF3]/65">
                  Opening hours
                </p>
                <ul className="mt-2 space-y-1 font-montserrat text-xs leading-6 text-[#FFFCF3]/80">
                  {clinic.openingHours.map(({ days, hours }) => (
                    <li key={days}>
                      {days}: {hours}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={clinic.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex font-montserrat text-xs text-[#FFFCF3] underline underline-offset-4"
              >
                Get directions
              </a>
            </div>

            <div className="grid content-start gap-8 sm:grid-cols-2">
              <div>
                <h3 className="font-seasons text-2xl">Contact channels</h3>
                <ul className="mt-4 space-y-3 font-montserrat text-xs text-[#FFFCF3]/80">
                  <li>
                    Email:{" "}
                    {clinic.email ? (
                      <a
                        href={`mailto:${clinic.email}`}
                        className="underline underline-offset-4"
                      >
                        {clinic.email}
                      </a>
                    ) : (
                      <span className="text-[#FFFCF3]/60">
                        official email to be added
                      </span>
                    )}
                  </li>
                  <li>
                    Viber:{" "}
                    {clinic.viber ? (
                      <a
                        href={clinic.viber}
                        className="underline underline-offset-4"
                      >
                        Message us
                      </a>
                    ) : (
                      <span className="text-[#FFFCF3]/60">
                        official link to be added
                      </span>
                    )}
                  </li>
                  <li>
                    WhatsApp:{" "}
                    {clinic.whatsapp ? (
                      <a
                        href={clinic.whatsapp}
                        className="underline underline-offset-4"
                      >
                        Message us
                      </a>
                    ) : (
                      <span className="text-[#FFFCF3]/60">
                        official link to be added
                      </span>
                    )}
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-seasons text-2xl">Follow along</h3>
                <ul className="mt-4 space-y-3 font-montserrat text-xs">
                  {clinicSocialLinks.map((social) => (
                    <li key={social.name}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FFFCF3]/80 underline-offset-4 hover:underline"
                      >
                        {social.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
