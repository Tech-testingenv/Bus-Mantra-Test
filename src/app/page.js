import HeroSection from "@/components/hero/heroSection";
import AboutSection from "@/components/hero/aboutSection";
import FleetTypes from "@/components/fleet/fleetTypes";
import HolidayPackages from "@/components/packages/holidayPackages";
import PopularDestinations from "@/components/destinations/popularDestinations";
import BusMantraServices from "@/components/services/busMantraServices";
import CustomerTestimonials from "@/components/testimonials/customerTestimonials";
import FinalCtaSection from "@/components/cta/finalCtaSection";

export default function Home() {
  return (
    <>
      <section className="relative w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
        <HeroSection />
        <AboutSection />
        {/* <HolidayPackages /> */}
        <FleetTypes />
        <PopularDestinations />
        <BusMantraServices />
        <CustomerTestimonials />
        <FinalCtaSection />
      </section>
    </>
  );
}
