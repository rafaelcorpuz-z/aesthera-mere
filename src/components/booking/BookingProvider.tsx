"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import BookingModal from "@/components/booking/BookingModal";

type BookingContextValue = {
  openBooking: (initialTreatment?: string, initialDoctor?: string) => void;
  closeBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [initialTreatment, setInitialTreatment] = useState("");
  const [initialDoctor, setInitialDoctor] = useState("");
  const openBooking = useCallback((treatment = "", doctor = "") => {
    setInitialTreatment(treatment);
    setInitialDoctor(doctor);
    setOpen(true);
  }, []);
  const closeBooking = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ openBooking, closeBooking }), [openBooking, closeBooking]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      {open && <BookingModal open onClose={closeBooking} initialTreatment={initialTreatment} initialDoctor={initialDoctor} />}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBooking must be used inside BookingProvider.");
  return context;
}
