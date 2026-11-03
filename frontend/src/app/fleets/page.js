import PageHero from "@/components/common/pageHero";
import BookingForm from "@/components/hero/bookingForm";
import FleetTypes from "@/components/fleet/fleetTypes";
import FinalCtaSection from "@/components/cta/finalCtaSection";
import {fleetPageHeroData, fleetPageSectionData } from "@/data/data";


export const metadata = {
  title: "Bus Mantra Fleet - Mini, Premium & Luxury Coaches",
  description:
    "Explore our complete fleet of comfortable coaches for every group size. Mini coaches, premium coaches, and luxury buses for corporate travel, tours, and events.",
};

export default function FleetsPage() {
  return (
    <div className="relative w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-24 pb-12 sm:pb-16 lg:pb-20">
      {/* ========================================================= */}
      {/* 1. REFINED PAGE HERO                                      */}
      {/* ========================================================= */}
      <PageHero data={fleetPageHeroData} />
      <div className="mt-8 sm:mt-10 lg:mt-12 w-full">
        <BookingForm />
      </div>

      {/* ========================================================= */}
      {/* 2. REUSED EXISTING FLEET SECTION (DESKTOP GRID + MOBILE)  */}
      {/* ========================================================= */}
      <FleetTypes
        sectionData={fleetPageSectionData}
        className="pt-8 sm:pt-10 lg:pt-12 pb-12 sm:pb-16 lg:pb-20 my-0"
      />
    </div>
  );
}
