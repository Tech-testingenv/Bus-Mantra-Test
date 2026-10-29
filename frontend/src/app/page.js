import HeroSection from "@/components/hero/heroSection";
import AboutSection from "@/components/hero/aboutSection";
import FleetTypes from "@/components/fleet/fleetTypes";
import BusMantraServices from "@/components/services/busMantraServices";
import PopularDestinations from "@/components/destinations/popularDestinations";
import CustomerTestimonials from "@/components/home/customerTestimonials";
import FAQSection from "@/components/common/faq";

import { homeFaqData } from "@/data/data";

export default function Home() {
  return (
    <>
      <section className="relative w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
        <HeroSection />
        <BusMantraServices />
        <PopularDestinations />
        <FleetTypes />
        {/* <AboutSection /> */}
        <CustomerTestimonials />
      </section>
      <section className="relative w-full border-t border-border bg-surface-warm">
        <div className="mx-auto w-full max-w-360 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <FAQSection data={homeFaqData} />
        </div>
      </section>
    </>
  );
}