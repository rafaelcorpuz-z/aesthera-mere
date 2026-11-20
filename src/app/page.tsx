
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import MeetOurDoctors from "@/components/home/MeetOurDoctors";
import Treatments from "@/components/home/Treatments";
import Results from "@/components/home/Results";
import Testimonials from "@/components/home/Testimonials";
import About from "@/components/home/About";
import Promos from "@/components/home/Promos";
import Consultation from "@/components/home/Consultation";
import Footer from "@/components/layout/Footer";
import HomeScrollEffects from "@/components/home/HomeScrollEffects";

export default function Home() {
  return (
    <>
      <Navbar />
      <HomeScrollEffects />

      <main id="top">
        {/* 1. Hero */}
        <Hero />

        {/* 2. Meet Our Doctors */}
        <div data-scroll-reveal="up">
          <MeetOurDoctors />
        </div>

        {/* 3. Our Treatments */}
        <div data-scroll-reveal="up">
          <Treatments />
        </div>

        {/* 4. Treatment Results */}
        <div data-scroll-reveal="up">
          <Results />
        </div>

        {/* 5. Client Testimonials */}
        <div data-scroll-reveal="up">
          <Testimonials />
        </div>

        {/* 6. About Aesthera */}
        <div data-scroll-reveal="up">
          <About />
        </div>

        {/* 7. Our Promotions */}
        <div data-scroll-reveal="up">
          <Promos />
        </div>

        {/* 8. Ending Card */}
        <div data-scroll-reveal="up">
          <Consultation />
        </div>
      </main>

      {/* 9. Footer */}
      <Footer />
    </>
  );
}
