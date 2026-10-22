import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  Bus,
  Check,
  MapPin,
  Route,
  ShieldCheck,
  Users,
} from "lucide-react";

import PageHero from "@/components/common/pageHero";
import BookingForm from "@/components/hero/bookingForm";
import { aboutData, aboutFaqData } from "@/data/data";
import FAQSection from "@/components/common/faq";

export const metadata = {
  title: "About Bus Mantra - Group Travel Made Simple",
  description:
    "Learn about Bus Mantra and our approach to comfortable, reliable and well-coordinated group transportation across India.",
};

const STAT_ICONS = {
  bus: Bus,
  mapPin: MapPin,
  users: Users,
};

const VALUE_ICONS = {
  "Reliable Travel": ShieldCheck,
  "Right Vehicle": Bus,
  "Group Comfort": Users,
  "Simple Planning": Route,
};

const FEATURE_ICONS = {
  shield: ShieldCheck,
  bus: Bus,
  route: Route,
};

export default function AboutPage() {
  const content = aboutData;

  const heroData = {
    eyebrow: content.eyebrow,
    title: `${content.heading.line1} ${content.heading.line2}`,
    titleLines: [
      content.heading.line1,
      content.heading.line2,
    ],
    description: content.intro,
    image: content.image?.src,
    imageAlt:
      content.image?.alt ||
      "Bus Mantra group transportation",
  };

  return (
    <div className="relative w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-24 pb-12 sm:pb-16 lg:pb-20">

      <PageHero data={heroData} />

      <div
        id="booking-form"
        className="mt-8 w-full scroll-mt-24 sm:mt-10 lg:mt-12"
      >
        <BookingForm />
      </div>

      <section className="relative w-full pt-10 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 lg:pb-20">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-end mb-8 sm:mb-10 lg:mb-12">

          <div className="lg:col-span-7">

            <div className="inline-block px-3.5 py-1.5 rounded-full bg-white text-[11px] font-bold tracking-wider text-primary uppercase mb-4 border border-border">
              BUS MANTRA AT A GLANCE
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-black tracking-tight leading-[1.08]">
              Group travel,
              <span className="text-primary">
                {" "}made simpler.
              </span>
            </h2>

          </div>

          <div className="lg:col-span-5">

            <p className="text-sm sm:text-base lg:text-[17px] text-black/75 leading-relaxed max-w-xl">
              A better way to bring your entire group together on the same
              comfortable journey.
            </p>

          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">

          {content.highlights?.map((item) => {

            const Icon = STAT_ICONS[item.icon] || Bus;

            return (
              <article
                key={item.label}
                className="
                  group relative bg-white
                  rounded-2xl sm:rounded-3xl
                  border border-border
                  p-5 sm:p-6 lg:p-7
                  shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)]
                  hover:border-primary/40
                  hover:shadow-[0_14px_40px_-8px_rgba(0,0,0,0.08)]
                  transition-all duration-300
                "
              >

                <div className="flex items-center justify-between">

                  <div
                    className="
                      flex h-10 w-10
                      items-center justify-center
                      rounded-full
                      bg-surface-secondary
                      text-primary
                      transition-all duration-300
                      group-hover:bg-primary
                      group-hover:text-primary-foreground
                    "
                  >
                    <Icon
                      size={17}
                      strokeWidth={1.6}
                    />
                  </div>

                  <ArrowUpRight
                    size={16}
                    className="
                      text-primary
                      transition-all duration-300
                      group-hover:translate-x-1
                      group-hover:-translate-y-1
                      group-hover:text-primary
                    "
                  />

                </div>

                <div className="mt-7">

                  <div className="text-4xl sm:text-5xl font-black leading-none tracking-tight text-black">
                    {item.value}
                  </div>

                  <div className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-black/60">
                    {item.label}
                  </div>

                </div>

              </article>
            );
          })}

        </div>

      </section>

      <section className="relative w-full py-12 sm:py-16 lg:py-20">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-10 xl:gap-12 items-center">

          <div className="w-full">

            <div className="w-full rounded-2xl sm:rounded-3xl xl:rounded-[28px] bg-white p-3.5 sm:p-4 lg:p-5 xl:p-6 border border-border shadow-2xs">

              <div className="relative w-full aspect-16/10 overflow-hidden rounded-xl sm:rounded-2xl">

                {content.storyImage?.src ? (
                  <Image
                    src={content.storyImage.src}
                    alt={
                      content.storyImage.alt ||
                      "Bus Mantra group travel"
                    }
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="
                      object-cover
                      transition-transform duration-500
                      hover:scale-[1.02]
                    "
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm text-black/50">
                    Image unavailable
                  </div>
                )}

              </div>

            </div>

          </div>

          <div className="flex flex-col items-start text-left lg:px-2 xl:px-5">

            <div className="inline-block px-3.5 py-1.5 rounded-full bg-white text-[11px] font-bold tracking-wider text-primary uppercase mb-4 border border-border">
              {content.story?.eyebrow}
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-black tracking-tight leading-[1.08]">
              {content.story?.heading}
            </h2>

            <p className="text-base sm:text-lg text-black/75 leading-relaxed mt-4 sm:mt-5 max-w-xl">
              {content.story?.description}
            </p>

            <div className="w-full mt-6 sm:mt-7">

              {content.story?.points?.map((point) => (
                <div
                  key={point}
                  className="
                    group
                    flex items-center justify-between
                    gap-4
                    border-b border-border
                    py-3.5 sm:py-4
                  "
                >

                  <div className="flex items-center gap-3">

                    <span
                      className="
                        flex h-8 w-8 shrink-0
                        items-center justify-center
                        rounded-full
                        bg-surface-secondary
                        text-primary
                        transition-all duration-300
                        group-hover:bg-primary
                        group-hover:text-primary-foreground
                      "
                    >
                      <Check
                        size={14}
                        strokeWidth={2.2}
                      />
                    </span>

                    <span className="text-sm sm:text-[15px] font-medium text-black">
                      {point}
                    </span>

                  </div>

                  <ArrowRight
                    size={15}
                    className="
                      shrink-0
                      text-primary
                      transition-all duration-300
                      group-hover:translate-x-1
                      group-hover:text-primary
                    "
                  />

                </div>
              ))}

            </div>

          </div>

        </div>

      </section>

      <section className="relative w-full py-12 sm:py-16 lg:py-20">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-end mb-8 sm:mb-10 lg:mb-12">

          <div className="lg:col-span-7">

            <div className="inline-block px-3.5 py-1.5 rounded-full bg-white text-[11px] font-bold tracking-wider text-primary uppercase mb-4 border border-border">
              WHAT MATTERS TO US
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-black tracking-tight leading-[1.08]">
              Travel is better when{" "}
              <span className="text-primary">
                the details are right.
              </span>
            </h2>

          </div>

          <div className="lg:col-span-5">

            <p className="text-sm sm:text-base lg:text-[17px] text-black/75 leading-relaxed max-w-xl">
              We focus on the things that make group travel dependable,
              comfortable and easy to plan.
            </p>

          </div>

        </div>

        <div className="w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-border shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)]">

          {content.values?.map((value, index) => {

            const Icon =
              VALUE_ICONS[value.title] || ShieldCheck;

            const isLast =
              index === content.values.length - 1;

            return (
              <article
                key={value.title}
                className={`
                  group
                  grid
                  gap-5
                  items-center
                  px-5 py-6
                  sm:px-7 sm:py-7
                  lg:px-8 lg:py-8
                  transition-colors duration-300
                  hover:bg-surface-secondary/50
                  md:grid-cols-[52px_0.75fr_1.25fr_30px]
                  ${!isLast ? "border-b border-border" : ""}
                `}
              >

                <div
                  className="
                    flex h-11 w-11
                    items-center justify-center
                    rounded-full
                    border border-border
                    text-primary
                    transition-all duration-300
                    group-hover:border-primary
                    group-hover:bg-primary
                    group-hover:text-primary-foreground
                  "
                >
                  <Icon
                    size={18}
                    strokeWidth={1.6}
                  />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                  {value.title}
                </h3>

                <p className="text-sm leading-6 text-black/75 lg:text-[15px]">
                  {value.description}
                </p>

                <ArrowUpRight
                  size={17}
                  className="
                    hidden
                    text-primary
                    transition-all duration-300
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                    group-hover:text-primary
                    md:block
                  "
                />

              </article>
            );
          })}

        </div>

      </section>

      <section className="relative w-full py-12 sm:py-16 lg:py-20">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-10 xl:gap-12 items-center">

          <div className="flex flex-col items-start text-left order-2 lg:order-1">

            <div className="inline-block px-3.5 py-1.5 rounded-full bg-white text-[11px] font-bold tracking-wider text-primary uppercase mb-4 border border-border">
              {content.experience?.eyebrow}
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-black tracking-tight leading-[1.08]">
              {content.experience?.heading}
            </h2>

            <div className="mt-5 sm:mt-6 space-y-4 max-w-xl">

              {content.experience?.paragraphs?.map(
                (paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base sm:text-lg text-black/75 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                )
              )}

            </div>

            <div className="w-full mt-6 sm:mt-7 grid gap-2">

              {content.experience?.features?.map(
                (feature) => {

                  const Icon =
                    FEATURE_ICONS[feature.icon] || Route;

                  return (
                    <div
                      key={feature.label}
                      className="
                        group
                        flex items-center gap-4
                        rounded-xl sm:rounded-2xl
                        border border-border
                        bg-white
                        px-4 py-3.5
                        transition-all duration-300
                        hover:border-primary/40
                        hover:shadow-[0_8px_25px_-10px_rgba(0,0,0,0.08)]
                      "
                    >

                      <span
                        className="
                          flex h-9 w-9 shrink-0
                          items-center justify-center
                          rounded-full
                          bg-surface-secondary
                          text-primary
                        "
                      >
                        <Icon
                          size={16}
                          strokeWidth={1.6}
                        />
                      </span>

                      <span className="text-sm font-semibold text-black">
                        {feature.label}
                      </span>

                      <ArrowRight
                        size={14}
                        className="
                          ml-auto
                          text-primary
                          transition-transform duration-300
                          group-hover:translate-x-1
                          group-hover:text-primary
                        "
                      />

                    </div>
                  );
                }
              )}

            </div>

          </div>

          <div className="w-full order-1 lg:order-2">

            <div className="w-full rounded-2xl sm:rounded-3xl xl:rounded-[28px] bg-white p-3.5 sm:p-4 lg:p-5 xl:p-6 border border-border shadow-2xs">

              <div className="relative w-full aspect-16/10 overflow-hidden rounded-xl sm:rounded-2xl">

                {content.experienceImage?.src ? (
                  <Image
                    src={content.experienceImage.src}
                    alt={
                      content.experienceImage.alt ||
                      "Bus Mantra group transportation"
                    }
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="
                      object-cover
                      transition-transform duration-500
                      hover:scale-[1.02]
                    "
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm text-black/50">
                    Image unavailable
                  </div>
                )}

              </div>

            </div>

          </div>

        </div>

      </section>

      <section className="relative w-full py-12 sm:py-16 lg:py-20">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-end mb-8 sm:mb-10 lg:mb-12">

          <div className="lg:col-span-7">

            {content.occasions?.eyebrow && (
              <div className="inline-block px-3.5 py-1.5 rounded-full bg-white text-[11px] font-bold tracking-wider text-primary uppercase mb-4 border border-border">
                {content.occasions.eyebrow}
              </div>
            )}

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-black tracking-tight leading-[1.08]">
              {content.occasions?.heading}
            </h2>

          </div>

          <div className="lg:col-span-5">

            <p className="text-sm sm:text-base lg:text-[17px] text-black/75 leading-relaxed max-w-xl">
              Different reasons to travel. One comfortable journey
              for everyone.
            </p>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7">

          {content.occasions?.items?.map((item) => (
  <Link
    key={item.title}
    href={item.href}
    className="
      group
      relative
      block
      overflow-hidden
      rounded-2xl sm:rounded-3xl
      border border-border
      bg-white
      shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)]
      hover:border-primary/40
      hover:shadow-[0_14px_40px_-8px_rgba(0,0,0,0.08)]
      transition-all duration-300
    "
  >

              <div className="relative aspect-video overflow-hidden bg-surface-secondary">

                <Image
                  src={item.image}
                  alt={item.alt || item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="
                    object-cover
                    transition-transform duration-500 ease-out
                    group-hover:scale-[1.035]
                  "
                />

                <div className="absolute right-4 top-4 sm:right-5 sm:top-5">

                  <span
                    className="
                      flex h-10 w-10
                      items-center justify-center
                      rounded-full
                      bg-white
                      text-black
                      shadow-sm
                      transition-all duration-300
                      group-hover:rotate-45
                      group-hover:bg-primary
                      group-hover:text-primary-foreground
                    "
                  >
                    <ArrowUpRight size={16} />
                  </span>

                </div>

              </div>

              <div className="p-5 sm:p-6 lg:p-7">

                <h3 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm sm:text-[15px] leading-6 text-black/75 max-w-xl">
                  {item.description}
                </p>

              </div>

            </Link>

          ))}

        </div>

      </section>

      <FAQSection data={aboutFaqData} />

    </div>
  );
}