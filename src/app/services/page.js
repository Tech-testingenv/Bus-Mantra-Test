import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  Briefcase,
  Calendar,
  CheckCircle2,
  GraduationCap,
  Hotel,
  Map,
  Navigation,
  Plane,
  Route,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import PageHero from "@/components/common/pageHero";
import BookingForm from "@/components/hero/bookingForm";
import ServiceCard from "@/components/services/serviceCard";
import FAQSection from "@/components/common/faq";

import {
  servicesPageHeroData,
  servicesPageSectionData,
  featuredServiceData,
  servicesFaqData,
} from "@/data/data";

export const metadata = {
  title: "Group Travel Services - Bus Mantra",
  description:
    "Comprehensive group transportation services for corporate travel, tours, events, school trips, airport transfers and hotel transfers.",
};

const FEATURED_POINT_ICONS = [
  ShieldCheck,
  Sparkles,
  Route,
];

export default function ServicesPage() {
  return (
    <div className="relative w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-24 pb-12 sm:pb-16 lg:pb-20">

      <PageHero data={servicesPageHeroData} />

      <div
        id="booking-form"
        className="mt-8 w-full scroll-mt-24 sm:mt-10 lg:mt-12"
      >
        <BookingForm />
      </div>

      <section
        id="services"
        className="relative w-full pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-14 lg:pb-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 lg:gap-12 items-end mb-8 sm:mb-10 lg:mb-12">

          <div className="lg:col-span-7">
            <div className="inline-block px-3.5 py-1.5 rounded-full bg-neutral-100 text-[11px] font-bold tracking-wider text-neutral-600 uppercase mb-4">
              {servicesPageSectionData.eyebrow}
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-neutral-900 tracking-tight leading-[1.1]">
              {servicesPageSectionData.heading}
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base lg:text-[17px] text-neutral-500 leading-relaxed max-w-xl">
              {servicesPageSectionData.description}
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
          {servicesPageSectionData.services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
            />
          ))}
        </div>
      </section>

      <section className="relative w-full py-14 sm:py-18 lg:py-24">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

          <div className="lg:col-span-5">

            <div className="inline-block px-3.5 py-1.5 rounded-full bg-neutral-100 text-[11px] font-bold tracking-wider text-neutral-600 uppercase mb-4">
              THE BUS MANTRA APPROACH
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-neutral-900 tracking-tight leading-[1.08]">
              Built around
              <span className="block text-brand-orange">
                your journey.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-neutral-500 leading-relaxed mt-5 max-w-lg">
              Every group travels differently. We build the transportation
              experience around your destination, group size, schedule and
              the way you want the journey to feel.
            </p>

            <Link
              href="/fleets"
              className="inline-flex items-center gap-2 mt-7 text-sm font-bold text-neutral-900 hover:text-brand-orange transition-colors group"
            >
              <span>Find the right coach</span>

              <ArrowRight
                className="w-4 h-4 text-brand-orange transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

          </div>

          <div className="lg:col-span-7">

            <div className="relative rounded-3xl overflow-hidden bg-[#f0f2f5] border border-neutral-200/80">

              <Image
                src="/images/services/group-tours-india.jpg"
                alt="Group tour transportation in India"
                width={1400}
                height={900}
                className="
                  w-full
                  h-80
                  sm:h-105
                  lg:h-120
                  object-cover
                  transition-transform
                  duration-700
                  hover:scale-[1.025]
                "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 sm:left-7 sm:bottom-7 sm:right-7">

                <div className="max-w-md">

                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 text-[10px] font-bold tracking-wider uppercase text-neutral-700 mb-3">
                    Designed for Indian journeys
                  </span>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    From city streets to scenic highways.
                  </h3>

                </div>

              </div>

            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-4">

              <JourneyCard
                icon={Users}
                title="Group Size"
                text="Small groups to large organised journeys."
              />

              <JourneyCard
                icon={Route}
                title="Trip Type"
                text="Tours, events, corporate and more."
              />

              <JourneyCard
                icon={Navigation}
                title="Travel Needs"
                text="Transfers, charters and coordination."
              />

            </div>

          </div>

        </div>

      </section>

      <section className="relative w-full py-14 sm:py-18 lg:py-24">

        <div className="mb-8 sm:mb-10 lg:mb-12">

          <div className="inline-block px-3.5 py-1.5 rounded-full bg-neutral-100 text-[11px] font-bold tracking-wider text-neutral-600 uppercase mb-4">
            TRAVEL FOR EVERY OCCASION
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-neutral-900 tracking-tight leading-[1.1]">
            One service for every
            <span className="text-brand-orange">
              {" "}kind of journey.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-500 leading-relaxed mt-3 max-w-2xl">
            Whether it is a business trip, destination wedding, school
            excursion or airport transfer, your group stays together.
          </p>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">

          <EditorialService
            className="lg:col-span-7"
            image="/images/services/corporate-india.jpg"
            title="Corporate Travel"
            description="Professional group transportation for meetings, conferences, teams and business events."
            icon={Briefcase}
            href="/services/corporate-travel"
          />

          <EditorialService
            className="lg:col-span-5"
            image="/images/services/events-india.jpg"
            title="Events & Weddings"
            description="Coordinated transportation for celebrations, weddings and large gatherings."
            icon={Calendar}
            href="/services/events-weddings"
          />

          <EditorialService
            className="lg:col-span-5"
            image="/images/services/school-trips-india.jpg"
            title="School Trips"
            description="Comfortable and organised transportation for educational journeys and excursions."
            icon={GraduationCap}
            href="/services/school-trips"
          />

          <EditorialService
            className="lg:col-span-7"
            image="/images/services/airport-transfer-india.jpg"
            title="Airport Transfers"
            description="Smooth group pickup and drop-off at airports across your journey."
            icon={Plane}
            href="/services/airport-transfers"
          />

        </div>

      </section>

      <section className="relative w-full py-14 sm:py-18 lg:py-24">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">

          <div className="lg:col-span-4">

            <div className="inline-block px-3.5 py-1.5 rounded-full bg-neutral-100 text-[11px] font-bold tracking-wider text-neutral-600 uppercase mb-4">
              HOW IT WORKS
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-neutral-900 tracking-tight leading-[1.08]">
              Group travel,
              <span className="block text-brand-orange">
                without the friction.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-neutral-500 leading-relaxed mt-5 max-w-md">
              From the first conversation to the final drop-off, we keep
              your group journey organised and straightforward.
            </p>

          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

            <ProcessCard
              icon={Users}
              title="Tell us your trip"
              description="Share your destination, dates, group size and travel requirements."
            />

            <ProcessCard
              icon={BusIcon}
              title="Choose your coach"
              description="Select the vehicle that fits your group and journey."
            />

            <ProcessCard
              icon={Navigation}
              title="We coordinate"
              description="Pickup points, transfers and journey details are organised around your plan."
            />

            <ProcessCard
              icon={CheckCircle2}
              title="Travel together"
              description="Your group gets to the destination comfortably and together."
            />

          </div>

        </div>

      </section>

      <section className="relative w-full py-14 sm:py-18 lg:py-24">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          <div className="lg:col-span-5">

            <div className="inline-block px-3.5 py-1.5 rounded-full bg-neutral-100 text-[11px] font-bold tracking-wider text-neutral-600 uppercase mb-4">
              FROM SERVICE TO FLEET
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-neutral-900 tracking-tight leading-[1.08]">
              The right coach
              <span className="block text-brand-orange">
                changes the journey.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-neutral-500 leading-relaxed mt-5 max-w-lg">
              Match your group with a coach that fits the size, style and
              purpose of your journey.
            </p>

            <Link
              href="/fleets"
              className="inline-flex items-center gap-2 mt-7 px-5 py-3 rounded-xl bg-neutral-900 text-white text-sm font-bold hover:bg-neutral-800 transition-all group"
            >
              <span>Explore Our Fleet</span>

              <ArrowRight
                className="w-4 h-4 text-brand-orange transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

          </div>

          <div className="lg:col-span-7">

            <div className="relative rounded-3xl overflow-hidden bg-[#f0f2f5] border border-neutral-200/80 p-4 sm:p-5">

              <Image
                src="/fleet/fleet.png"
                alt="Bus Mantra luxury coach fleet"
                width={1400}
                height={800}
                className="
                  w-full
                  h-auto
                  object-contain
                  transition-transform
                  duration-500
                  hover:scale-[1.02]
                "
              />

            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-4">

              <MiniCapability
                icon={Briefcase}
                title="Corporate"
              />

              <MiniCapability
                icon={Map}
                title="Tours"
              />

              <MiniCapability
                icon={Calendar}
                title="Events"
              />

              <MiniCapability
                icon={Plane}
                title="Transfers"
              />

            </div>

          </div>

        </div>

      </section>

      <section className="relative w-full py-14 sm:py-18 lg:py-24">

        <div className="rounded-3xl sm:rounded-[32px] bg-[#f8f9fa] border border-neutral-200/80 p-6 sm:p-10 lg:p-14 overflow-hidden">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">

            <div className="lg:col-span-7">

              <span className="inline-block px-3 py-1 rounded-full bg-white border border-neutral-200/80 text-[11px] font-bold tracking-wider text-brand-orange uppercase mb-4">
                {featuredServiceData.eyebrow}
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-black text-neutral-900 tracking-tight leading-[1.1]">
                {featuredServiceData.heading}
              </h2>

              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-xl mt-4 mb-7">
                {featuredServiceData.description}
              </p>

              <div className="space-y-3">

                {featuredServiceData.points.map((point, index) => {

                  const IconComponent =
                    FEATURED_POINT_ICONS[index] || CheckCircle2;

                  return (
                    <div
                      key={index}
                      className="
                        flex
                        items-start
                        gap-3
                        p-3.5
                        rounded-2xl
                        bg-white
                        border
                        border-neutral-200/70
                      "
                    >
                      <div className="w-8 h-8 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center shrink-0">
                        <IconComponent className="w-4 h-4 stroke-[2]" />
                      </div>

                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-neutral-900">
                          {point.title}
                        </h4>

                        <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed mt-0.5">
                          {point.description}
                        </p>
                      </div>

                    </div>
                  );
                })}

              </div>

              <Link
                href="/fleets"
                className="
                  inline-flex
                  items-center
                  gap-2
                  mt-7
                  px-6
                  py-3.5
                  rounded-xl
                  bg-neutral-900
                  hover:bg-neutral-800
                  text-white
                  text-xs
                  sm:text-sm
                  font-bold
                  transition-all
                  group
                "
              >
                <span>Explore Fleet for Your Group</span>

                <ArrowRight
                  className="w-4 h-4 text-brand-orange transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

            </div>

            <div className="lg:col-span-5">

              <div className="relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-neutral-200/80 shadow-sm">

                <Image
                  src={featuredServiceData.image}
                  alt={featuredServiceData.imageAlt}
                  width={1200}
                  height={900}
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-700
                    hover:scale-[1.035]
                  "
                />

                <div className="absolute inset-x-4 bottom-4">

                  <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-black/75 text-white backdrop-blur-sm border border-white/10 text-xs font-semibold">

                    <span className="w-2 h-2 rounded-full bg-brand-orange" />

                    <span>
                      Dedicated Full-Bus Charters · Pan-India
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      <FAQSection data={servicesFaqData} />

    </div>
  );
}

function JourneyCard({
  icon: Icon,
  title,
  text,
}) {
  return (
    <div
      className="
        group
        bg-white
        rounded-2xl
        border
        border-neutral-200/70
        p-4
        sm:p-5
        shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)]
        hover:border-neutral-300
        hover:shadow-[0_10px_35px_-5px_rgba(0,0,0,0.07)]
        transition-all
        duration-300
      "
    >
      <div
        className="
          w-9
          h-9
          rounded-xl
          bg-[#f0f2f5]
          flex
          items-center
          justify-center
          mb-3
          group-hover:bg-orange-50
          transition-colors
        "
      >
        <Icon className="w-4 h-4 text-brand-orange stroke-[1.8]" />
      </div>

      <h3 className="text-sm sm:text-base font-bold text-neutral-900">
        {title}
      </h3>

      <p className="text-[11px] sm:text-xs text-neutral-500 leading-relaxed mt-1.5">
        {text}
      </p>
    </div>
  );
}

function EditorialService({
  image,
  title,
  description,
  icon: Icon,
  href,
  className = "",
}) {
  return (
    <Link
      href={href}
      className={`
        group
        relative
        min-h-80
        sm:min-h-95
        lg:min-h-105
        rounded-3xl
        overflow-hidden
        bg-neutral-200
        ${className}
      `}
    >
      <Image
        src={image}
        alt={title}
        width={1400}
        height={900}
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          transition-transform
          duration-700
          group-hover:scale-[1.045]
        "
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

      <div className="absolute top-5 left-5">

        <div className="w-11 h-11 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center text-brand-orange shadow-lg">
          <Icon className="w-5 h-5 stroke-[1.8]" />
        </div>

      </div>

      <div className="absolute left-5 right-5 bottom-5 sm:left-7 sm:right-7 sm:bottom-7">

        <h3 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-white tracking-tight">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-white/75 leading-relaxed max-w-lg mt-2">
          {description}
        </p>

        <div className="inline-flex items-center gap-2 mt-4 text-xs sm:text-sm font-bold text-white">
          <span>Explore service</span>

          <ArrowRight
            className="w-4 h-4 text-brand-orange transition-transform duration-300 group-hover:translate-x-1"
          />
        </div>

      </div>

    </Link>
  );
}

function ProcessCard({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div
      className="
        group
        bg-white
        rounded-2xl
        border
        border-neutral-200/70
        p-6
        sm:p-7
        shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)]
        hover:border-neutral-300
        hover:shadow-[0_10px_35px_-5px_rgba(0,0,0,0.07)]
        transition-all
        duration-300
      "
    >
      <div
        className="
          w-12
          h-12
          rounded-2xl
          bg-[#f0f2f5]
          flex
          items-center
          justify-center
          mb-6
          group-hover:bg-orange-50
          transition-colors
        "
      >
        <Icon className="w-5 h-5 text-brand-orange stroke-[1.8]" />
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight">
        {title}
      </h3>

      <p className="text-sm text-neutral-500 leading-relaxed mt-2.5">
        {description}
      </p>
    </div>
  );
}

function MiniCapability({
  icon: Icon,
  title,
}) {
  return (
    <div
      className="
        group
        bg-white
        rounded-xl
        sm:rounded-2xl
        border
        border-neutral-200/70
        p-3
        sm:p-4
        hover:border-brand-orange/30
        hover:shadow-[0_8px_25px_-8px_rgba(0,0,0,0.08)]
        transition-all
        duration-300
      "
    >
      <Icon
        className="
          w-4
          h-4
          sm:w-5
          sm:h-5
          text-brand-orange
          stroke-[1.8]
          mb-2.5
          sm:mb-3
          transition-transform
          duration-300
          group-hover:scale-110
        "
      />

      <span className="text-[11px] sm:text-sm font-bold text-neutral-900">
        {title}
      </span>
    </div>
  );
}

function BusIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 17h12" />
      <path d="M5 17V7c0-2 1.5-3 4-3h6c2.5 0 4 1 4 3v10" />
      <path d="M5 10h14" />
      <path d="M8 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 17v2" />
      <path d="M16 17v2" />
      <path d="M7 7h10" />
    </svg>
  );
}