import HeroSection from "@/components/hero/heroSection";
import AboutSection from "@/components/hero/aboutSection";
import FleetTypes from "@/components/fleet/fleetTypes";
import BusMantraServices from "@/components/services/busMantraServices";
import PopularDestinations from "@/components/destinations/popularDestinations";
import CustomerTestimonials from "@/components/home/customerTestimonials";
import FAQSection from "@/components/common/faq";
import FinalCtaSection from "@/components/cta/finalCtaSection";

import { homeFaqData } from "@/data/data";

export default function Home() {
  return (
    <main className="w-full">

      {/* HOMEPAGE SECTIONS */}

      <section className="relative mx-auto flex w-full max-w-360 flex-col gap-6 px-4 pt-20 sm:gap-18 sm:px-16 sm:pt-24 lg:gap-20 lg:px-8 lg:pt-28 *:my-0! *:py-2! mb-16">
        <HeroSection />
        <BusMantraServices />
        <PopularDestinations />
        <FleetTypes />
        {/* <AboutSection /> */}
        <CustomerTestimonials />

        {/* FAQ SECTION */}
        <section className="relative w-full bg-white">
          <div className="mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-8">
            <FAQSection data={homeFaqData} />
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <FinalCtaSection />
      </section>

    </main>
  );
}