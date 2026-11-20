
"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { ArrowRightIcon } from "@/components/ui/Icons";

type BookingModalProps = {
  open: boolean;
  onClose: () => void;
  initialTreatment?: string;
  initialDoctor?: string;
};

type AppointmentType = "consultation" | "treatment";
type PatientType = "new" | "existing";

const GREEN = "#4C5534";

const timeSlots = [
  "10:00 AM", "10:30 AM", "11:00 AM",
  "11:30 AM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM",
  "3:30 PM", "4:00 PM",
];

// Starter list for the frontend.
// We can add all treatments from the clinic menu later.
const treatments = [
  "Aqua Reset Facial",
  "Oxy Radiance Facial",
  "Carbon Laser Facial",
  "Korean Skin Reset Facial",
  "Korean Acne Clarity Facial",
  "Korean Whitening Facial",
  "Korean Age Defy Facial",
  "Thera SkinPen Microneedling",
  "TheraTox",
  "TheraTox Elite",
  "Ultraformer MPT",
  "Other Treatment",
];

const fieldClass =
  "w-full rounded-xl border border-[#E3DDD1] " +
  "bg-white px-4 py-3 font-montserrat text-[13px] " +
  "text-[#4C5534] outline-none transition-colors " +
  "placeholder:text-[#898779] " +
  "focus:border-[#4C5534] focus:ring-1 focus:ring-[#4C5534]/15";

const labelClass =
  "mb-2 block font-montserrat text-xs font-medium text-[#4C5534]";

const cardClass =
  "rounded-[22px] border border-[#E3DDD1] bg-white " +
  "p-5 shadow-[0_10px_35px_rgba(60,50,30,0.05)] " +
  "sm:p-7";

function getToday() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const part = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "";

  return `${part("year")}-${part("month")}-${part("day")}`;
}

function makeDate(year: number, month: number, day: number) {
  return (
    `${year}-${String(month + 1).padStart(2, "0")}-` +
    String(day).padStart(2, "0")
  );
}

function readableDate(value: string) {
  if (!value) return "No date selected";

  const [year, month, day] = value.split("-").map(Number);

  return new Date(year, month - 1, day).toLocaleDateString(
    "en-PH",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );
}

export default function BookingModal({
  open,
  onClose,
  initialTreatment = "",
  initialDoctor = "",
}: BookingModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const [today, setToday] = useState("");
  const [month, setMonth] = useState<{
    year: number;
    index: number;
  } | null>(null);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [appointmentType, setAppointmentType] =
    useState<AppointmentType>("consultation");
  const [patientType, setPatientType] =
    useState<PatientType>("new");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [treatment, setTreatment] = useState("");
  const [notes, setNotes] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (!open) return;

    const current = getToday();
    const [year, monthNumber] = current.split("-").map(Number);

    setToday(current);
    setMonth({ year, index: monthNumber - 1 });
    setDate("");
    setTime("");

    setAppointmentType(
      initialTreatment ? "treatment" : "consultation"
    );
    setPatientType("new");
    setTreatment(initialTreatment);

    setName("");
    setPhone("");
    setEmail("");
    setNotes("");
    setPrivacy(false);
    setPreview(false);
  }, [open, initialTreatment, initialDoctor]);

  useEffect(() => {
    if (!open) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) return;

      const items = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), ' +
          'select:not([disabled]), textarea:not([disabled]), a[href]'
        )
      ).filter((item) => item.getClientRects().length > 0);

      if (!items.length) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey &&
        document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const year = month?.year ?? 2026;
  const monthIndex = month?.index ?? 0;

  const firstDay = new Date(year, monthIndex, 1).getDay();
  const totalDays = new Date(year, monthIndex + 1, 0).getDate();

  const days = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ] as (number | null)[];

  const canGoBack =
    month !== null &&
    makeDate(year, monthIndex, 1).slice(0, 7) >
      today.slice(0, 7);

  const service =
    appointmentType === "consultation"
      ? "In-Clinic Consultation"
      : treatment || "Treatment not selected";

  function changeMonth(direction: number) {
    const next = new Date(year, monthIndex + direction, 1);
    setMonth({
      year: next.getFullYear(),
      index: next.getMonth(),
    });
    setDate("");
    setTime("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!date || !time || !privacy) return;
    setPreview(true);
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center
        justify-center bg-black/55 p-0 backdrop-blur-sm
        md:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="relative h-full w-full max-w-[1100px]
          overflow-y-auto bg-[#F6F3ED]
          shadow-[0_25px_80px_rgba(0,0,0,0.18)]
          md:h-auto md:max-h-[92vh] md:rounded-[28px]"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close appointment form"
          className="absolute right-5 top-5 z-10 flex h-9 w-9
            items-center justify-center rounded-full
            border border-[#DAD5C9] bg-white
            text-lg text-[#4C5534] transition
            hover:bg-[#F6F3ED]"
        >
          ×
        </button>

        {/* HEADER */}
        <header className="px-6 pb-7 pt-9 text-center md:px-10">
          <p className="font-montserrat text-[10px] font-medium
            uppercase tracking-[0.3em] text-[#4C5534]">
            AESTHERA MÈRE
          </p>

          <h2
            id="booking-title"
            className="mt-2 font-bodoni text-[36px]
              leading-tight text-[#4C5534] md:text-[46px]"
          >
            Book Your Appointment
          </h2>

          <p className="mt-2 font-montserrat text-[13px]
            text-[#777568]">
            Your journey to feeling your best begins here.
          </p>
        </header>

        {preview ? (
          /* ELEGANT PREVIEW */
          <section className="mx-auto max-w-[760px] px-6 pb-10">
            <div className={cardClass}>
              <div className="border-b border-[#E3DDD1]
                pb-6 text-center">
                <p className="font-montserrat text-[10px]
                  uppercase tracking-[0.2em] text-[#777568]">
                  Review Your Details
                </p>
                <h3 className="mt-2 font-bodoni text-3xl
                  text-[#4C5534]">
                  Appointment Preview
                </h3>
                <p className="mt-2 font-montserrat text-xs
                  text-[#777568]">
                  Please review your information before booking.
                  This is a frontend preview only.
                </p>
              </div>

              <div className="mt-6 rounded-2xl border
                border-[#E3DDD1] bg-[#F6F3ED] p-5">
                <p className="mb-2 font-montserrat text-[10px]
                  uppercase tracking-[0.16em] text-[#777568]">
                  Selected Schedule
                </p>
                <h4 className="font-bodoni text-[26px]
                  text-[#4C5534]">
                  {readableDate(date)}
                </h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[time, service,
                    patientType === "new"
                      ? "New Patient"
                      : "Existing Patient"
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#E3DDD1]
                        bg-white px-3 py-1.5 font-montserrat
                        text-xs text-[#4C5534]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                {initialDoctor && (
                  <p className="mt-3 font-montserrat text-xs
                    text-[#4C5534]">
                    Preferred Doctor: {initialDoctor}
                  </p>
                )}
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {[
                  ["Full Name", name],
                  ["Contact Number", phone],
                  ["Email Address", email],
                  ["Appointment Type", appointmentType],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="mb-1 font-montserrat text-[10px]
                      uppercase tracking-[0.13em] text-[#777568]">
                      {label}
                    </p>
                    <p className="break-words font-montserrat
                      text-[13px] capitalize text-[#4C5534]">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              {notes && (
                <div className="mt-5 border-t border-[#E3DDD1] pt-5">
                  <p className="mb-2 font-montserrat text-[10px]
                    uppercase tracking-[0.13em] text-[#777568]">
                    Additional Notes
                  </p>
                  <p className="whitespace-pre-wrap font-montserrat
                    text-sm text-[#4C5534]">
                    {notes}
                  </p>
                </div>
              )}

              <p className="mt-6 text-center font-montserrat
                text-xs text-[#777568]">
                No appointment has been submitted or saved.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setPreview(false)}
                  className="flex-1 rounded-full border
                    border-[#4C5534]/25 bg-white px-5 py-3
                    font-montserrat text-sm text-[#4C5534]
                    transition hover:bg-[#F6F3ED]"
                >
                  Back to Booking
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-full bg-[#4C5534]
                    px-5 py-3 font-montserrat text-sm
                    text-white transition hover:bg-[#39432D]"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </section>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid items-start gap-5 px-5 pb-8
              md:grid-cols-[0.9fr_1.1fr] md:gap-6
              md:px-8 md:pb-9"
          >
            {/* LEFT WHITE CARD */}
            <section className={cardClass}>
              <h3 className="mb-5 font-bodoni text-[27px]
                text-[#4C5534]">
                Select Your Schedule
              </h3>

              <div className="mb-5 flex items-center
                justify-between">
                <button
                  type="button"
                  disabled={!canGoBack}
                  onClick={() => changeMonth(-1)}
                  aria-label="Previous month"
                  className="flex h-9 w-9 items-center
                    justify-center rounded-full border
                    border-[#E3DDD1] text-[#4C5534]
                    transition hover:bg-[#F6F3ED]
                    disabled:opacity-30"
                >
                  ‹
                </button>

                <span className="font-montserrat text-sm
                  font-medium text-[#4C5534]">
                  {month
                    ? new Date(year, monthIndex, 1)
                        .toLocaleDateString("en-PH", {
                          month: "long",
                          year: "numeric",
                        })
                    : "Loading"}
                </span>

                <button
                  type="button"
                  aria-label="Next month"
                  onClick={() => changeMonth(1)}
                  className="flex h-9 w-9 items-center
                    justify-center rounded-full border
                    border-[#E3DDD1] text-[#4C5534]
                    transition hover:bg-[#F6F3ED]"
                >
                  ›
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(
                  (item) => (
                    <span
                      key={item}
                      className="py-2 font-montserrat
                        text-[11px] text-[#777568]"
                    >
                      {item}
                    </span>
                  )
                )}

                {days.map((day, index) => {
                  if (!day || !month) {
                    return <div key={`empty-${index}`} />;
                  }

                  const value = makeDate(year, monthIndex, day);
                  const selected = date === value;

                  return (
                    <button
                      key={value}
                      type="button"
                      disabled={value < today}
                      aria-pressed={selected}
                      aria-label={readableDate(value)}
                      onClick={() => {
                        setDate(value);
                        setTime("");
                      }}
                      className={`aspect-square rounded-full
                        font-montserrat text-[13px] transition
                        ${selected
                          ? "bg-[#4C5534] text-white"
                          : "text-[#4C5534] hover:bg-[#F6F3ED]"}
                        disabled:cursor-not-allowed
                        disabled:opacity-25`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              <div className="my-6 h-px bg-[#E3DDD1]" />

              <h4 className="mb-3 font-montserrat text-sm
                font-medium text-[#4C5534]">
                Preferred Time
              </h4>

              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    disabled={!date}
                    aria-pressed={time === slot}
                    onClick={() => setTime(slot)}
                    className={`rounded-full border px-2
                      py-2.5 font-montserrat text-[11px]
                      transition
                      ${time === slot
                        ? "border-[#4C5534] bg-[#4C5534] text-white"
                        : "border-[#E3DDD1] bg-white text-[#4C5534] hover:bg-[#F6F3ED]"}
                      disabled:opacity-35`}
                  >
                    {slot}
                  </button>
                ))}
              </div>

              <p className="mt-5 text-center font-montserrat
                text-[11px] leading-5 text-[#777568]">
                Philippine Time (GMT+8). Preferred times are
                illustrative and not confirmed availability.
              </p>
            </section>

            {/* RIGHT WHITE CARD */}
            <section className={`${cardClass} space-y-4`}>
              <h3 className="font-bodoni text-[27px]
                text-[#4C5534]">
                Appointment Details
              </h3>

              {/* APPOINTMENT TYPE */}
              <div>
                <p className={labelClass}>Appointment Type</p>
                <div className="flex rounded-full border
                  border-[#E3DDD1] bg-[#F6F3ED] p-1">
                  {(["consultation", "treatment"] as const).map(
                    (item) => (
                      <button
                        key={item}
                        type="button"
                        aria-pressed={appointmentType === item}
                        onClick={() => setAppointmentType(item)}
                        className={`flex-1 rounded-full px-3 py-2.5
                          font-montserrat text-[12px]
                          capitalize transition
                          ${appointmentType === item
                            ? "bg-[#4C5534] text-white shadow-sm"
                            : "text-[#4C5534] hover:bg-white"}`}
                      >
                        {item}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* PATIENT TYPE */}
              <div>
                <p className={labelClass}>Patient Type</p>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    ["new", "New Patient"],
                    ["existing", "Existing Patient"],
                  ] as const).map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={patientType === value}
                      onClick={() => setPatientType(value)}
                      className={`rounded-full border px-3
                        py-2.5 font-montserrat text-xs transition
                        ${patientType === value
                          ? "border-[#4C5534] bg-[#4C5534]/10 text-[#4C5534]"
                          : "border-[#E3DDD1] bg-white text-[#777568] hover:bg-[#F6F3ED]"}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {initialDoctor && (
                <div className="rounded-xl bg-[#F6F3ED] p-3">
                  <p className="font-montserrat text-[11px]
                    text-[#777568]">
                    Preferred Doctor
                  </p>
                  <p className="mt-1 font-montserrat text-sm
                    font-medium text-[#4C5534]">
                    {initialDoctor}
                  </p>
                </div>
              )}

              {/* FULL NAME */}
              <div>
                <label htmlFor="booking-name" className={labelClass}>
                  Full Name *
                </label>
                <input
                  id="booking-name"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className={fieldClass}
                />
              </div>

              {/* CONTACT */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="booking-phone" className={labelClass}>
                    Contact Number *
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    pattern="[0-9+() -]{7,20}"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="09XXXXXXXXX"
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label htmlFor="booking-email" className={labelClass}>
                    Email Address *
                  </label>
                  <input
                    id="booking-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className={fieldClass}
                  />
                </div>
              </div>

              {/* TREATMENT */}
              {appointmentType === "treatment" && (
                <div>
                  <label
                    htmlFor="booking-treatment"
                    className={labelClass}
                  >
                    Select Treatment *
                  </label>
                  <select
                    id="booking-treatment"
                    required
                    value={treatment}
                    onChange={(e) => setTreatment(e.target.value)}
                    className={fieldClass}
                  >
                    <option value="">Select a treatment</option>
                    {treatment && !treatments.includes(treatment) && (
                      <option value={treatment}>{treatment}</option>
                    )}
                    {treatments.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* NOTES */}
              <div>
                <label htmlFor="booking-notes" className={labelClass}>
                  {appointmentType === "consultation"
                    ? "What would you like to discuss? (Optional)"
                    : "Additional Notes (Optional)"}
                </label>
                <textarea
                  id="booking-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us about your concerns or requests"
                  className={`${fieldClass} resize-none`}
                />
              </div>

              {/* SUMMARY */}
              <div className="rounded-xl border border-[#E3DDD1]
                bg-[#F6F3ED] p-4">
                <p className="mb-1 font-montserrat text-xs
                  font-semibold text-[#4C5534]">
                  Your Appointment
                </p>
                <p className="font-montserrat text-[13px]
                  text-[#4C5534]">
                  {readableDate(date)}
                </p>
                <p className="mt-1 font-montserrat text-xs
                  text-[#777568]">
                  {time || "Choose a time"} · {service}
                </p>
                {initialDoctor && (
                  <p className="mt-1 font-montserrat text-xs
                    text-[#777568]">
                    {initialDoctor}
                  </p>
                )}
              </div>

              {/* PRIVACY */}
              <label className="flex items-start gap-3
                font-montserrat text-[11px] leading-5
                text-[#777568]">
                <input
                  type="checkbox"
                  checked={privacy}
                  required
                  onChange={(e) => setPrivacy(e.target.checked)}
                  className="mt-1 accent-[#4C5534]"
                />
                <span>
                  I agree to the collection and processing of
                  my information for appointment booking,
                  subject to the clinic's Privacy Policy.
                </span>
              </label>

              <button
                type="submit"
                disabled={!date || !time || !privacy}
                className="w-full rounded-full bg-[#4C5534]
                  px-6 py-3.5 font-montserrat text-sm
                  font-medium text-white transition
                  hover:bg-[#39432D]
                  disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span className="inline-flex items-center justify-center gap-2">Preview Appointment Request <ArrowRightIcon className="h-4 w-4" /></span>
              </button>

              <p className="text-center font-montserrat
                text-[11px] text-[#777568]">
                Frontend preview only. No booking is submitted.
              </p>
            </section>
          </form>
        )}
      </div>
    </div>
  );
}
