"use client";

import type { ReactNode } from "react";
import { useBooking } from "@/components/booking/BookingProvider";

export default function BookingTrigger({ children, initialTreatment, initialDoctor, className }: { children: ReactNode; initialTreatment?: string; initialDoctor?: string; className?: string }) {
  const { openBooking } = useBooking();
  return <button type="button" onClick={() => openBooking(initialTreatment, initialDoctor)} className={className}>{children}</button>;
}
