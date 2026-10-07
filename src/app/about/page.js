import AboutSection from "@/components/hero/aboutSection";
import CustomerTestimonials from "@/components/testimonials/customerTestimonials";

export const metadata = {
  title: "About Bus Mantra - Smart Group Travel",
  description:
    "Learn about Bus Mantra, our mission to simplify group travel, verified fleet standards, and trusted chauffeur network.",
};

export default function AboutPage() {
  return (
    <div className="relative w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20">
      <AboutSection />
      <CustomerTestimonials />
    </div>
  );
}
