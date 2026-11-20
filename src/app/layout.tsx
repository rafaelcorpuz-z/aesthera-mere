import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono, Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { BookingProvider } from "@/components/booking/BookingProvider";
import { TreatmentsMenuProvider } from "@/components/providers/TreatmentsMenuProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const seasons = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-seasons",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aesthera Mère | Personalized Aesthetic Care",
  description: "Explore personalized aesthetic treatments, clinic services, and consultations at Aesthera Mère.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${montserrat.variable} ${seasons.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col"><BookingProvider><TreatmentsMenuProvider>{children}</TreatmentsMenuProvider></BookingProvider></body>
    </html>
  );
}
