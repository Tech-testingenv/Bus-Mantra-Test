import PageHero from "@/components/common/pageHero";
import BookingForm from "@/components/hero/bookingForm";
import PopularDestinations from "@/components/destinations/popularDestinations";
import { destinationsPageHeroData } from "@/data/data";

export const metadata = {
  title: "Group Travel Destinations - Bus Mantra",
  description:
    "Explore popular group destinations across India with Bus Mantra. Jaipur, Agra, Udaipur, Manali, and more.",
};

export default function DestinationsPage() {
  return (
    <div className="relative mx-auto w-full max-w-360 px-4 pb-12 pt-20 sm:px-6 sm:pb-16 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-24">
      {/* =========================================================
          PAGE HERO
      ========================================================= */}

      <PageHero data={destinationsPageHeroData} />

      {/* =========================================================
          BOOKING FORM
          SAME FORM USED ON FLEET PAGE
      ========================================================= */}

      <div className="mt-8 w-full sm:mt-10 lg:mt-12">
        <BookingForm />
      </div>

      {/* =========================================================
          POPULAR DESTINATIONS
      ========================================================= */}

      <div className="mt-10 sm:mt-12 lg:mt-14">
        <PopularDestinations />
      </div>
    </div>
  );
}