import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function TreatmentRouteFallback() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] bg-[#FFFCF3] px-6 py-12 text-[#4C5534] md:px-10 md:py-16" aria-busy="true">
        <div className="mx-auto max-w-[1280px]">
          <div className="h-3 w-48 animate-pulse rounded-full bg-[#80755F]/15" />
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="h-3 w-36 animate-pulse rounded-full bg-[#80755F]/15" />
              <div className="mt-5 h-20 max-w-xl animate-pulse rounded-2xl bg-[#80755F]/10" />
              <div className="mt-6 h-5 max-w-lg animate-pulse rounded-full bg-[#80755F]/10" />
            </div>
            <div className="aspect-[4/3] animate-pulse rounded-[22px] bg-[#80755F]/10" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
