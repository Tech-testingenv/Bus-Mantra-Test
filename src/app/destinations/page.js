import PopularDestinations from "@/components/destinations/popularDestinations";

export const metadata = {
  title: "Group Travel Destinations - Bus Mantra",
  description:
    "Explore popular group destinations across India with Bus Mantra. Jaipur, Agra, Udaipur, Manali, and more.",
};

export default function DestinationsPage() {
  return (
    <div className="relative w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20">
      <PopularDestinations />
    </div>
  );
}
