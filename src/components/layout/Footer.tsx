
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpIcon, ArrowUpRightIcon } from "@/components/ui/Icons";
import { clinic, clinicSocialLinks } from "@/data/clinic";

const menuLinks = [
  { label: "Treatments", href: "/treatments" },
  { label: "Our Doctors", href: "/doctors" },
  { label: "Results", href: "/results" },
  { label: "Promos", href: "/promos" },
  { label: "About Us", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const CONSENT_KEY = "aesthera-cookie-consent";

function SocialIcon({ name }: { name: string }) {
  if (name === "Facebook") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden="true">
        <path d="M22 12a10 10 0 1 0-11.56 9.88v-7H7.9V12h2.54V9.8c0-2.51 1.5-3.9 3.78-3.9 1.1 0 2.25.2 2.25.2v2.47H15.2c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.88h-2.34v7A10 10 0 0 0 22 12Z" />
      </svg>
    );
  }

  if (name === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-[18px] w-[18px]" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden="true">
      <path d="M16.7 2h-3.2v13.3a3.3 3.3 0 1 1-2.8-3.27V8.76a6.5 6.5 0 1 0 6 6.48V8.5a8.3 8.3 0 0 0 4.9 1.45V5.34A5.1 5.1 0 0 1 16.7 2Z" />
    </svg>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="mb-2 text-[18px] leading-tight text-[#FFFCF3]"
      style={{ fontFamily: "'Bodoni FLF', Georgia, serif" }}
    >
      {children}
    </h3>
  );
}

export default function Footer() {
  const [cookieVisible, setCookieVisible] = useState(false);
  const [cookieReady, setCookieReady] = useState(false);
  const [year, setYear] = useState(2026);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setCookieVisible(!localStorage.getItem(CONSENT_KEY));
      setCookieReady(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setYear(new Date().getFullYear());
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const saveConsent = (choice: "accepted" | "rejected") => {
    localStorage.setItem(CONSENT_KEY, choice);
    setCookieVisible(false);

    window.dispatchEvent(
      new CustomEvent("aesthera-cookie-consent", {
        detail: choice,
      })
    );
  };

  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <footer className="overflow-hidden rounded-t-[30px] bg-[#4C5534] text-[#FFFCF3]">
        <div className="mx-auto max-w-[1280px] px-5 pb-3 pt-5 sm:px-6 sm:pb-4 sm:pt-6 md:px-10">

          {/* MAIN FOOTER */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:gap-x-6 lg:grid-cols-[1.2fr_0.65fr_1.2fr_1fr] lg:gap-x-8 lg:gap-y-0">

            {/* BRAND + SOCIALS */}
            <div>
              <Link href="/" aria-label="Aesthera Mère homepage" className="inline-flex">
                <Image
                  src="/images/brand/logo.png"
                  alt="Aesthera Mère"
                  width={210}
                  height={85}
                  quality={90}
                  className="h-auto w-[140px] max-w-full object-contain brightness-0 invert"
                />
              </Link>

              <p className="mt-1 max-w-[240px] font-montserrat text-[11px] leading-[1.45] text-[#FFFCF3]/85">
                Premium Aesthetic Care,
                <br />
                Made Accessible.
              </p>

              <p className="mb-1.5 mt-2 font-montserrat text-[10px] font-medium uppercase tracking-[0.18em] text-[#FFFCF3]/75">
                Follow Us
              </p>

              <div className="flex items-center gap-2.5">
                {clinicSocialLinks.map((social) =>
                  social.url ? (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow us on ${social.name}`}
                      title={social.name}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#FFFCF3]/35 text-[#FFFCF3] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FFFCF3] hover:text-[#4C5534] focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      <SocialIcon name={social.name} />
                    </a>
                  ) : (
                    <span
                      key={social.name}
                      title={`${social.name} link not yet configured`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#FFFCF3]/25 text-[#FFFCF3]/55"
                    >
                      <SocialIcon name={social.name} />
                    </span>
                  )
                )}
              </div>
            </div>

            {/* MENU LINKS */}
            <div>
              <FooterHeading>Explore</FooterHeading>

              <nav aria-label="Footer menu">
                <ul className="grid gap-1">
                  {menuLinks.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="font-montserrat text-[12px] text-[#FFFCF3]/85 transition-colors hover:text-white hover:underline hover:underline-offset-4"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* CONTACT */}
            <div>
              <FooterHeading>Contact Us</FooterHeading>

              <div className="space-y-2">
                <div>
                  <p className="mb-1 font-montserrat text-[10px] uppercase tracking-[0.14em] text-[#FFFCF3]/65">
                    Clinic Address
                  </p>
                  <address className="max-w-[270px] font-montserrat text-[11px] not-italic leading-[1.45] text-[#FFFCF3]/85">
                    {clinic.address}
                  </address>
                </div>

                <div>
                  <p className="mb-1 font-montserrat text-[10px] uppercase tracking-[0.14em] text-[#FFFCF3]/65">
                    Phone
                  </p>
                  <a
                    href={clinic.phoneHref}
                    className="font-montserrat text-[12px] text-[#FFFCF3] hover:underline"
                  >
                    {clinic.phoneDisplay}
                  </a>
                </div>

                {clinic.email && (
                  <div>
                    <p className="mb-1 font-montserrat text-[10px] uppercase tracking-[0.14em] text-[#FFFCF3]/65">
                      Email
                    </p>
                    <a
                      href={`mailto:${clinic.email}`}
                      className="break-all font-montserrat text-[12px] text-[#FFFCF3] hover:underline"
                    >
                      {clinic.email}
                    </a>
                  </div>
                )}

                {(clinic.viber || clinic.whatsapp) && (
                  <div>
                    <p className="mb-2 font-montserrat text-[10px] uppercase tracking-[0.14em] text-[#FFFCF3]/65">
                      Message Us
                    </p>

                    <div className="flex flex-wrap gap-x-5 gap-y-2">
                      {clinic.viber && (
                        <a
                          href={clinic.viber}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-montserrat text-[12px] underline-offset-4 hover:underline"
                        >
                          Viber
                        </a>
                      )}

                      {clinic.whatsapp && (
                        <a
                          href={clinic.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-montserrat text-[12px] underline-offset-4 hover:underline"
                        >
                          WhatsApp
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* HOURS + MAP */}
            <div>
              <FooterHeading>Visit Us</FooterHeading>

              <div className="mb-2">
                <p className="mb-1 font-montserrat text-[10px] uppercase tracking-[0.14em] text-[#FFFCF3]/65">
                  Opening Hours
                </p>

                <p className="font-montserrat text-[11px] leading-[1.45] text-[#FFFCF3]/85">
                  {clinic.openingHours.map(({ days, hours }) => (
                    <span key={days} className="block">
                      {days}: {hours}
                    </span>
                  ))}
                </p>
              </div>

              <div className="overflow-hidden rounded-[12px] border border-[#FFFCF3]/20">
                <iframe
                  title="Aesthera Mère location"
                  src={clinic.mapsEmbedUrl}
                  width="100%"
                  height="72"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block w-full border-0"
                />
              </div>

              <a
                href={clinic.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-0 inline-flex min-h-8 items-center gap-2 font-montserrat text-[11px] text-[#FFFCF3] hover:underline hover:underline-offset-4"
              >
                Get Directions
                <ArrowUpRightIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* LEGAL FOOTER */}
          <div className="mt-4 border-t border-[#FFFCF3]/20 pt-3">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">

              <p className="font-montserrat text-[11px] text-[#FFFCF3]/75">
                © {year} Aesthera Mère. All rights reserved.
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <Link
                  href="/privacy-policy"
                  className="font-montserrat text-[11px] text-[#FFFCF3]/80 hover:text-white"
                >
                  Privacy Policy
                </Link>

                <Link
                  href="/terms"
                  className="font-montserrat text-[11px] text-[#FFFCF3]/80 hover:text-white"
                >
                  Terms of Use
                </Link>

                <button
                  type="button"
                  onClick={() => setCookieVisible(true)}
                  className="font-montserrat text-[11px] text-[#FFFCF3]/80 hover:text-white"
                >
                  Cookie Settings
                </button>

                <button
                  type="button"
                  onClick={backToTop}
                  className="font-montserrat text-[11px] text-[#FFFCF3]/80 hover:text-white"
                >
                  <span className="inline-flex items-center gap-1.5">Back to Top <ArrowUpIcon className="h-3.5 w-3.5" /></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* COOKIE NOTICE */}
      {cookieReady && cookieVisible && (
        <div
          role="region"
          aria-label="Cookie preferences"
          className="fixed bottom-4 left-4 right-4 z-[100] mx-auto max-w-[680px] rounded-[16px] border border-[#80755F]/25 bg-[#FFFCF3] p-5 shadow-[0_12px_45px_rgba(76,85,52,0.18)] md:p-6"
        >
          <h2
            className="text-[23px] text-[#4C5534]"
            style={{ fontFamily: "'Bodoni FLF', Georgia, serif" }}
          >
            Your Privacy Matters
          </h2>

          <p className="mt-2 font-montserrat text-[12px] leading-[1.8] text-[#80755F]">
            We use essential storage to support this website.
            With your permission, we may also use optional
            cookies to improve your experience.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => saveConsent("accepted")}
              className="min-h-11 rounded-full bg-[#4C5534] px-6 py-3 font-montserrat text-[11px] font-medium text-[#FFFCF3] transition-colors hover:bg-[#4F6442]"
            >
              Accept Optional Cookies
            </button>

            <button
              type="button"
              onClick={() => saveConsent("rejected")}
              className="min-h-11 rounded-full border border-[#80755F] px-6 py-3 font-montserrat text-[11px] font-medium text-[#4C5534] transition-colors hover:bg-[#80755F] hover:text-white"
            >
              Reject Optional Cookies
            </button>
          </div>
        </div>
      )}
    </>
  );
}
