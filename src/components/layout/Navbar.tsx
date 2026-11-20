
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TreatmentsMegaMenu from "@/components/layout/TreatmentsMegaMenu";
import { useBooking } from "@/components/booking/BookingProvider";
import { useTreatmentsMenu } from "@/components/providers/TreatmentsMenuProvider";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { treatmentCategories as treatmentCatalog } from "@/data/treatments";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Treatments", href: "/treatments" },
  { name: "Our Doctors", href: "/doctors" },
  { name: "Results", href: "/results" },
  { name: "Promos", href: "/promos" },
  { name: "About Us", href: "/about" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

const treatmentCategories = treatmentCatalog.map((category) => ({
  title: category.name,
  slug: category.slug,
  items: category.groups.map((group) => ({ title: group.title, slug: group.slug })),
}));


function CalendarIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return open ? (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  ) : (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 8h16M9 16h11" />
    </svg>
  );
}

function BookingButton({
  fullWidth = false,
  onClick,
}: {
  fullWidth?: boolean;
  onClick?: () => void;
}) {
  const { openBooking } = useBooking();
  return (
    <button
      type="button"
      onClick={() => { onClick?.(); openBooking(); }}
      className={`font-montserrat inline-flex items-center justify-center gap-2 rounded-full bg-[#FFFCF3] px-5 py-3 text-[13px] font-semibold text-[#4C5534] shadow-sm transition-all duration-300 hover:bg-white hover:shadow-md ${
        fullWidth ? "w-full" : "whitespace-nowrap"
      }`}
    >
      <CalendarIcon />
      <span>Book Appointment</span>
    </button>
  );
}

function MobileNavigation({ pathname, onClose, onTreatments }: { pathname: string; onClose: () => void; onTreatments: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    const desktop = window.matchMedia("(min-width: 1280px)");
    const closeOnDesktop = () => { if (desktop.matches) onClose(); };
    desktop.addEventListener("change", closeOnDesktop);
    closeOnDesktop();
    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, [onClose]);

  return (
    <dialog ref={dialogRef} id="mobile-navigation" aria-labelledby="mobile-menu-title" onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} className="fixed inset-y-0 left-auto right-0 m-0 ml-auto h-dvh max-h-none w-[min(92vw,420px)] max-w-none overflow-y-auto overscroll-contain border-0 bg-[#FFFCF3] p-0 text-[#4C5534] shadow-2xl backdrop:bg-[#4C5534]/45 backdrop:backdrop-blur-sm">
      <div className="flex min-h-full flex-col px-6 py-6 sm:px-8">
        <div className="flex items-center justify-between gap-4 border-b border-[#80755F]/35 pb-5">
          <div>
            <p id="mobile-menu-title" className="font-seasons text-2xl text-[#4C5534]">Aesthera Mère</p>
            <p className="font-montserrat mt-1 text-[9px] uppercase tracking-[0.22em] text-[#80755F]">Beauty Creations</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close navigation menu" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#4F6442]/25 text-[#4F6442] transition-colors hover:bg-[#4C5534] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F6442]"><MenuIcon open /></button>
        </div>
        <p className="font-montserrat mb-3 mt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#80755F]">Explore Aesthera</p>
        <nav aria-label="Mobile navigation" className="mb-7">
          {navLinks.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname === link.href || pathname.startsWith(`${link.href}/`);
            const classes = `group flex min-h-12 w-full items-center justify-between gap-4 border-b border-[#80755F]/15 py-2.5 text-left transition-colors hover:text-[#4F6442] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F6442] ${active ? "text-[#4F6442]" : "text-[#4C5534]"}`;
            const label = <><span className="font-montserrat text-[14px] font-medium leading-tight">{link.name}</span><span aria-hidden="true" className={`text-[14px] transition-transform group-hover:translate-x-1 ${active ? "text-[#4F6442]" : "text-[#80755F]"}`}>{link.name === "Treatments" ? "+" : active ? "•" : <ArrowUpRightIcon className="h-4 w-4" />}</span></>;
            return link.name === "Treatments" ? (
              <button key={link.name} type="button" onClick={onTreatments} aria-haspopup="dialog" aria-controls="treatments-mega-menu" className={classes}>{label}</button>
            ) : <Link key={link.name} href={link.href} onClick={onClose} aria-current={active ? "page" : undefined} className={classes}>{label}</Link>;
          })}
        </nav>
        <div className="mt-auto border-t border-[#80755F]/35 pt-6">
          <div className="rounded-full bg-[#4C5534] [&_button]:bg-[#4C5534] [&_button]:text-white [&_button:hover]:bg-[#4F6442]">
            <BookingButton fullWidth onClick={onClose} />
          </div>
          <p className="font-montserrat mt-4 text-center text-[14px] leading-6 text-[#80755F]">Premium Aesthetic Care, Made Accessible.</p>
        </div>
      </div>
    </dialog>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { treatmentsOpen, setTreatmentsOpen } = useTreatmentsMenu();
  const { openBooking } = useBooking();
  const treatmentsTriggerRef = useRef<HTMLButtonElement>(null);
  const treatmentsMenuRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const updateScrolledState = () => setIsScrolled(window.scrollY > 24);

    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  useEffect(() => {
    if (!treatmentsOpen) return;

    const closeOnOutsideInteraction = (event: PointerEvent) => {
      const target = event.target;
      if (
        target instanceof Node &&
        !treatmentsTriggerRef.current?.contains(target) &&
        !treatmentsMenuRef.current?.contains(target)
      ) {
        setTreatmentsOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setTreatmentsOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideInteraction);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideInteraction);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [treatmentsOpen, setTreatmentsOpen]);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href ||
        pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-white/15 shadow-sm backdrop-blur-md transition-colors duration-300 ${
        isScrolled ? "bg-[#4C5534]/75" : "bg-[#4C5534]/95"
      }`}
    >

      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[82px] w-full max-w-[1440px] items-center justify-between gap-4 px-5 md:px-8"
      >




{/* Official Brand Logo */}

<Link
  href="/"
  scroll={true}
  onClick={() => {
    setMenuOpen(false);

    if (pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }}
  aria-label="Aesthera Mère - Back to Top"
  className="flex shrink-0 items-center gap-3"
>

  {/* Circular AM Emblem */}
  <div className="relative h-[58px] w-[58px] shrink-0">
    <Image
      src="/images/brand/logo_green.png"
      alt=""
      fill
      priority
      quality={90}
      sizes="58px"
      className="object-contain brightness-0 invert"
    />
  </div>

  {/* Aesthera Mère Wordmark */}
  <Image
    src="/images/brand/logo_name.png"
    alt="Aesthera Mère Beauty Creations"
    width={300}
    height={55}
    priority
    quality={90}
    className="hidden h-auto w-[170px] object-contain brightness-0 invert sm:block sm:w-[190px] xl:w-[210px]"
  />
</Link>


{/* Desktop Navigation - Center */}
<div className="hidden min-w-0 flex-1 items-center justify-center gap-3 xl:flex 2xl:gap-5">
  {navLinks.map((link) => {
    const active = treatmentsOpen ? link.name === "Treatments" : isActive(link.href);
    const isTreatments = link.name === "Treatments";

    const linkClasses = `font-montserrat group relative flex shrink-0 items-center gap-1 whitespace-nowrap py-2 text-[14px] font-medium transition-colors ${
      active
        ? "text-white"
        : "text-white/85 hover:text-white"
    }`;

    const underline = (
      <span
        className={`absolute bottom-0 left-0 h-[1.5px] bg-[#FFFCF3] transition-all duration-300 ${
          active
            ? "w-full"
            : "w-0 group-hover:w-full"
        }`}
      />
    );

    if (isTreatments) {
      return (
        <button
          ref={treatmentsTriggerRef}
          key={link.name}
          type="button"
          onClick={() => setTreatmentsOpen((open) => !open)}
          aria-expanded={treatmentsOpen}
          aria-haspopup="dialog"
          aria-controls="treatments-mega-menu"
          className={linkClasses}
        >
          Treatments

          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-200 ${
              treatmentsOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>

          {underline}
        </button>
      );
    }

    return (
      <Link
        key={link.name}
        href={link.href}
        onClick={() => setTreatmentsOpen(false)}
        aria-current={active ? "page" : undefined}
        className={linkClasses}
      >
        {link.name}
        {underline}
      </Link>
    );
  })}
</div>


        {/* Booking Button - Right */}
        <div className="hidden shrink-0 items-center gap-2 xl:flex">
         
          <BookingButton />
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => openBooking()}
          className="font-montserrat ml-auto inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-[#FFFCF3] px-4 text-[11px] font-semibold text-[#4C5534] shadow-sm xl:hidden"
        >
           <CalendarIcon />
          Book Appointment
        </button>
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-haspopup="dialog"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/40 bg-transparent text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white xl:hidden"
        >
          <MenuIcon open={menuOpen} />
        </button>
      </nav>


{/* Shared full-screen treatment menu */}
{treatmentsOpen && (
  <div ref={treatmentsMenuRef}>
    <TreatmentsMegaMenu
      categories={treatmentCategories}
      onClose={() => setTreatmentsOpen(false)}
    />
  </div>
)}

      {menuOpen && (
        <MobileNavigation pathname={pathname} onClose={closeMenu} onTreatments={() => { setMenuOpen(false); setTreatmentsOpen(true); }} />
      )}
    </header>
  );
}
