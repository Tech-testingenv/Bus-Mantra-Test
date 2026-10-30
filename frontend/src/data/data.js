export const heroData = {
  eyebrow: "FULL BUS BOOKING",
  titleLines: ["Book your Luxury Coach @₹1/KM.", "Yes, You Read That Right!", "/bus_mantra_t&c_logo.png"],
  tcLogo: "/bus_mantra_t&c.png",
  description:
    "Book an entire luxury coach for your group and travel together in comfort, without the hassle.",
  primaryButton: {
    label: "Book a Bus",
    href: "/offer",
  },
  secondaryButton: {
    label: "Explore Fleet",
    href: "/fleets",
  },
  stats: [
    {
      value: "100%",
      label: "Dedicated Vehicle",
    },
    {
      value: "4.9/5",
      label: "Fleet Satisfaction",
    },
    {
      value: "24/7",
      label: "Dispatch Support",
    },
  ],
  image: {
    src: "/fleet/45-49_seater_tata_luxury_coach_1.png",
    alt: "Tata Luxury Coach",
    width: 1920,
    height: 1080,
  },
  heroSliderImages: [
    {
      src: "/fleet/45-49_seater_tata_luxury_coach_1.png",
      alt: "Tata Luxury Coach [45/49]",
      titleLine1: "",
      description:
        "Move your entire group seamlessly with high-capacity Tata commercial luxury coaches, transparent per-km billing, and zero hidden costs.",
    },
    {
      src: "/fleet/bus_mantra_bharatbenz.png",
      alt: "BharatBenz Executive Luxury Coach [20/45]",
      titleLine1: "",
      description:
        "Experience Daimler-engineered ride comfort, whisper-quiet acoustics, and premium executive recliner seating.",
    },
    {
      src: "/fleet/40_seater_volvo_with_washroom_1.png",
      alt: "40/45 Luxury Volvo Coach with & without Washroom",
      titleLine1: "40/45 Luxury Volvo Coach with & without Washroom",
      description:
        "Flagship multi-axle luxury touring with air suspension, onboard sanitized washroom, and business-class plush seating.",
    },
    {
      src: "/fleet/12_seater_maharaja_tempo_traveller_1.png",
      alt: "Maharaja Tempo Traveler [12/16/20/26]",
      titleLine1: "Maharaja Tempo Traveler [12/16/20/26]",
      description:
        "Dedicated Maharaja Tempo Travelers equipped with pushback seats, individual AC vents, and experienced chauffeurs.",
    },
    {
      src: "/fleet/bus_mantra_luxury_force_urbania.png",
      alt: "Luxury Force Urbania [12/16]",
      titleLine1: "Luxury Force Urbania [12/16]",
      description:
        "Next-generation European-styled luxury van offering world-class ride dynamics, panoramic windows, and plush seating.",
    },
  ],
  sliderTexts: [
    {
      titleLine2: "100% Free Cancellation, Always!",
      description:
        "Book your group journey with confidence and enjoy hassle-free booking with flexible cancellation.",
    },
    {
      titleLine2: "Luxury Travel, Made Easy for Everyone!",
      description:
        "Book an entire luxury coach for your group and travel together in comfort, without the hassle.",
    },
    {
      titleLine2: "Your Group, One Dedicated Coach!",
      description:
        "Travel together comfortably with spacious coaches for corporate trips, weddings, family outings, and group tours.",
    },
    {
      titleLine2: "Transparent Pricing, No Surprises!",
      description:
        "Plan your journey with clear fare estimates, dedicated vehicles, and reliable booking support from Bus Mantra.",
    },
    {
      titleLine2: "Sanitized & Verified Coaches, Always!",
      description:
        "Travel with peace of mind with 24/7 route tracking, verified professional chauffeurs, and sanitized bus interiors.",
    },
  ],
  form: {
    badge: "FULL BUS RESERVATION",
    title: "Quick Bus Fleet Search",
    defaultValues: {
      fullName: "",
      mobile: "",
      email: "",
      passengers: "",
      pickupPoint: "Delhi NCR",
      destination: "Jaipur",
      departureDateTime: "30-09-2026 | 07:00 AM",
      returnDateTime: "02-10-2026 | 09:00 PM",
    },
    destinationOptions: [
      "Jaipur",
      "Agra",
      "Delhi NCR",
      "Udaipur",
      "Manali",
      "Shimla",
      "Rishikesh",
      "Haridwar",
      "Goa",
      "Amritsar",
    ],
    labels: {
      fullName: "FULL NAME",
      mobile: "WHATSAPP NUMBER",
      email: "EMAIL ADDRESS",
      passengers: "NO. OF PASSENGERS",
      pickupPoint: "PICK-UP POINT",
      destination: "DESTINATION",
      departureDateTime: "DEPARTURE DATE & TIME",
      returnDateTime: "RETURN DATE & TIME",
    },
    placeholders: {
      fullName: "e.g. Rahul Sharma",
      mobile: "+91 XXXXX XXXXX",
      email: "eg@example.com",
      passengers: "20",
      pickupPoint: "e.g. Delhi NCR",
      destination: "e.g. Jaipur",
      departureDateTime: "30-09-2026 | 07:00 AM",
      returnDateTime: "02-10-2026 | 09:00 PM",
    },
    submitButton: {
      idleLabel: "Find Buses",
      successLabel: "Buses Found!",
    },
    routeSummary: {
      badge: "FULL COACH",
      label: "Selected Itinerary:",
      subtext: "Full Luxury Coach · Entire Bus Reserved",
    },
    row1: [
      {
        id: "fullName",
        label: "Full Name",
        placeholder: "e.g. Rahul Sharma",
        defaultValue: "Rahul Sharma",
        type: "text",
        icon: "user",
        iconColor: "text-primary bg-primary-subtle",
      },
      {
        id: "mobileNumber",
        label: "WHATSAPP NUMBER",
        placeholder: "+91 98765 43210",
        defaultValue: "+91 98765 43210",
        type: "tel",
        icon: "phone",
        iconColor: "text-primary bg-primary-subtle",
      },
      {
        id: "email",
        label: "Email Address",
        placeholder: "e.g. rahul@example.com",
        defaultValue: "rahul@example.com",
        type: "email",
        icon: "mail",
        iconColor: "text-primary bg-primary-subtle",
      },
      {
        id: "packs",
        label: "No. of Packs",
        placeholder: "e.g. 20",
        defaultValue: "20",
        type: "number",
        icon: "users",
        iconColor: "text-primary bg-primary-subtle",
      },
    ],
    row2: [
      {
        id: "pickupPoint",
        label: "Pick-up Point",
        placeholder: "Delhi NCR",
        defaultValue: "Delhi NCR",
        type: "text",
        icon: "mapPin",
        iconColor: "text-primary bg-primary-subtle",
      },
      {
        id: "destination",
        label: "Destination",
        placeholder: "Search Destination",
        defaultValue: "Jaipur",
        badge: "1 Stop",
        type: "searchable-dropdown",
        icon: "navigation",
        iconColor: "text-primary bg-primary-subtle",
        options: [
          { value: "Jaipur", label: "Jaipur, Rajasthan", badge: "Pink City" },
          { value: "Agra", label: "Agra, Uttar Pradesh", badge: "Taj Mahal" },
          { value: "Delhi NCR", label: "Delhi NCR Hub", badge: "Capital" },
          { value: "Manali", label: "Manali, Himachal Pradesh", badge: "Hills" },
          { value: "Goa", label: "Goa Beach Circuits", badge: "Coastal" },
          { value: "Udaipur", label: "Udaipur, Rajasthan", badge: "Lake City" },
          { value: "Amritsar", label: "Amritsar, Punjab", badge: "Golden Temple" },
          { value: "Rishikesh", label: "Rishikesh & Haridwar", badge: "Pilgrimage" },
          { value: "Shimla", label: "Shimla, Himachal Pradesh", badge: "Hills" },
          { value: "Chandigarh", label: "Chandigarh Hub", badge: "North" },
          { value: "Varanasi", label: "Varanasi, Uttar Pradesh", badge: "Spiritual" },
          { value: "Mathura", label: "Mathura & Vrindavan", badge: "Heritage" },
          { value: "Nainital", label: "Nainital, Uttarakhand", badge: "Lakes" },
          { value: "Jim Corbett", label: "Jim Corbett National Park", badge: "Wildlife" },
        ],
      },
      {
        id: "departureDateTime",
        label: "Departure Date & Time",
        defaultDate: "30-09-2026",
        defaultTime: "07:00 AM",
        datePlaceholder: "30-09-2026",
        timePlaceholder: "07:00 AM",
        type: "dateTime",
        icon: "calendar",
        timeIcon: "clock",
        iconColor: "text-primary bg-primary-subtle",
      },
      {
        id: "returnDateTime",
        label: "Return Date & Time",
        defaultDate: "02-10-2026",
        defaultTime: "09:00 PM",
        datePlaceholder: "02-10-2026",
        timePlaceholder: "09:00 PM",
        type: "dateTime",
        icon: "calendar",
        timeIcon: "clock",
        iconColor: "text-primary bg-primary-subtle",
      },
    ],
  },
};

export const aboutData = {
  /* =========================================================
     ABOUT HERO
  ========================================================= */

  eyebrow: "ABOUT BUS MANTRA",

  heading: {
    line1: "Your Journey.",
    line2: "Our Responsibility.",
  },

  intro:
    "Bus Mantra makes group travel simple, comfortable and reliable. From weddings and school trips to corporate events and family tours, we help you book the right bus for your journey without the hassle of coordinating multiple vehicles.",

  paragraphs: [
    "Bus Mantra makes group travel simple, comfortable and reliable. From weddings and school trips to corporate events and family tours, we help you book the right bus for your journey without the hassle of coordinating multiple vehicles.",

    "Whether you are planning a short local trip or a multi-day journey, our goal is simple: give your entire group one comfortable ride, one reliable coach and one journey to remember.",
  ],

  cta: {
    label: "Know More About Us",
    href: "/about",
  },

  /* =========================================================
     HERO IMAGE
  ========================================================= */

  image: {
    src: "/bus_mantra_about_bus.png",
    alt: "Luxury Bus Mantra coach travelling through a scenic Indian mountain route",
    width: 1920,
    height: 1080,
  },

  /* =========================================================
     STORY IMAGE
  ========================================================= */

  storyImage: {
    src: "/images/about/group-travel.png",
    alt: "Indian group travelling together inside a luxury coach",
    width: 1920,
    height: 1080,
  },

  /* =========================================================
     EXPERIENCE IMAGE
  ========================================================= */

  experienceImage: {
    src: "/images/about/corporate-travel.png",
    alt: "Luxury coach travelling through a scenic mountain route in India",
    width: 1920,
    height: 1080,
  },

  /* =========================================================
     QUICK STATS
  ========================================================= */

  highlights: [
    {
      value: "500+",
      label: "Buses Available",
      icon: "bus",
    },

    {
      value: "25+",
      label: "Cities Covered",
      icon: "mapPin",
    },

    {
      value: "10K+",
      label: "Group Journeys",
      icon: "users",
    },
  ],

  /* =========================================================
     OUR STORY
  ========================================================= */

  story: {
    eyebrow: "WHY BUS MANTRA",

    heading: "Built around the way groups actually travel.",

    description:
      "Group travel should feel coordinated, not complicated. Bus Mantra brings the vehicle, comfort and planning experience together so your group can focus on the journey instead of the logistics.",

    points: [
      "Reliable group travel",
      "Comfortable coaches",
      "Simple planning",
      "One shared journey",
    ],
  },

  /* =========================================================
     OUR APPROACH / VALUES
  ========================================================= */

  values: [
    {
      number: "01",

      title: "Reliable Travel",

      description:
        "We focus on dependable travel experiences that help groups move together with confidence.",
    },

    {
      number: "02",

      title: "Right Vehicle",

      description:
        "From smaller groups to larger gatherings, we help you find a coach that fits your journey.",
    },

    {
      number: "03",

      title: "Group Comfort",

      description:
        "One vehicle means one shared journey, making group travel easier and more comfortable.",
    },

    {
      number: "04",

      title: "Simple Planning",

      description:
        "We aim to remove the hassle of coordinating multiple vehicles, schedules and arrangements.",
    },
  ],

  /* =========================================================
     BUS MANTRA EXPERIENCE
  ========================================================= */

  experience: {
    eyebrow: "THE BUS MANTRA DIFFERENCE",

    heading: "More than getting from one place to another.",

    paragraphs: [
      "Every group journey has its own purpose. It could be a celebration, a business event, a school trip or simply time spent together with family and friends.",

      "Our approach is built around making that journey easier from the moment you start planning until the moment you reach your destination.",
    ],

    features: [
      {
        label: "Dependable",
        icon: "shield",
      },

      {
        label: "Comfortable",
        icon: "bus",
      },

      {
        label: "Flexible",
        icon: "route",
      },
    ],
  },

  /* =========================================================
     JOURNEYS / OCCASIONS
  ========================================================= */

  occasions: {
    eyebrow: "MADE FOR EVERY JOURNEY",

    heading: "Different journeys. One trusted ride.",

    items: [
      {
        number: "01",
        title: "Weddings & Celebrations",
        description:
          "Keep your guests together and make transportation one less thing to coordinate.",
        image: "/images/about/wedding-travel.png",
        alt: "Indian wedding guests travelling together inside a decorated luxury coach",
        href: "/services/events-weddings",
      },

      {
        number: "02",
        title: "Corporate Travel",
        description:
          "Move teams, clients and colleagues together for meetings, events and business travel.",
        image: "/images/about/corporate-travel.png",
        alt: "Indian corporate professionals travelling together inside a premium coach",
        href: "/services/corporate-travel",
      },

      {
        number: "03",
        title: "School & College Trips",
        description:
          "Organized transportation for educational trips, excursions and campus events.",
        image: "/images/about/school-trip.png",
        alt: "Indian students travelling together inside a luxury coach",
        href: "/services/school-trips",
      },

      {
        number: "04",
        title: "Airport Pickup & Transfer",
        description:
          "Enjoy convenient group transportation to and from the airport with comfortable, reliable transfers.",
        image: "/images/about/family-travel.png",
        alt: "Passengers travelling together in a comfortable luxury coach for an airport transfer",
        href: "/services/airport-transfers",
      },
    ],
  },

  /* =========================================================
     CLOSING CTA
  ========================================================= */

  closing: {
    eyebrow: "READY TO TRAVEL?",

    heading: "Your next group journey starts here.",

    description:
      "Tell us where you are going, how many people are travelling and what kind of journey you have in mind.",

    cta: {
      label: "Plan Your Journey",
      href: "#booking-form",
    },
  },
};

import {
  FLEET_CATEGORIES,
  FLEET_VEHICLE_VARIANTS,
  getAllVehicleVariants,
  getVehicleVariantById,
  getCategoryBySlug,
  getCategoryForVariant,
} from "./fleetData";

export const fleetTypesData = FLEET_CATEGORIES;
export {
  FLEET_CATEGORIES,
  FLEET_VEHICLE_VARIANTS,
  getAllVehicleVariants,
  getVehicleVariantById,
  getCategoryBySlug,
  getCategoryForVariant,
};


export const fleetSectionData = {
  eyebrow: "OUR FLEET",
  heading: "Choose your bus.",
  description: "Comfortable coaches for every group size.",
  fleets: fleetTypesData,
};

export const fleetPageHeroData = {
  eyebrow: "BUS MANTRA FLEET",
  title: "One fleet. Every kind of journey.",
  titleLines: ["One fleet.", "Every kind of journey."],
  description:
    "From compact coaches to premium luxury buses, our fleet is built to make group travel comfortable, reliable and easy — whatever the size of your journey.",
  image: "/bus_mantra_about_bus.png",
  imageAlt: "Bus Mantra luxury coach fleet",
};

export const fleetPageSectionData = {
  heading: "Choose your fleet.",
  description: "Explore our coaches and find the right fit for your group.",
  fleets: fleetTypesData,
};

export const ctaData = {
  eyebrow: "READY TO TRAVEL TOGETHER?",
  heading: "Your group. Your bus. Your journey.",
  headingLines: ["Your group. Your bus.", "Your journey."],
  description:
    "Tell us where you're going and we'll help you find the right coach for your group.",
  button: {
    label: "Book a Bus",
    href: "/fleets",
  },
};

export const holidayPackagesData = [
  {
    id: "jaipur-tour",
    destination: "Jaipur Group Tour",
    destinationBadge: "Rajasthan Heritage",
    busType: "Luxury Coach",
    capacity: "40–50 Passengers",
    charterType: "Full Coach Charter",
    description:
      "Travel together and explore Jaipur comfortably with a dedicated luxury coach for your group.",
    highlights: ["AC Coach", "Pushback Seats", "Large Luggage Space"],
    image: "/packages/jaipur.svg",
    cta: "Explore Package",
    href: "#booking-form",
  },
  {
    id: "manali-holiday",
    destination: "Manali Group Holiday",
    destinationBadge: "Himachal Hills",
    busType: "Premium Coach",
    capacity: "30–40 Passengers",
    charterType: "Full Coach Charter",
    description:
      "Make your mountain getaway comfortable with a dedicated coach for your entire group.",
    highlights: ["AC Coach", "Comfortable Seating", "Experienced Driver"],
    image: "/packages/manali.svg",
    cta: "Explore Package",
    href: "#booking-form",
  },
  {
    id: "goa-trip",
    destination: "Goa Group Trip",
    destinationBadge: "Coastal Getaway",
    busType: "Luxury Coach",
    capacity: "40–50 Passengers",
    charterType: "Full Coach Charter",
    description:
      "Travel with your entire group and enjoy a comfortable journey to your Goa holiday.",
    highlights: ["Luxury Seating", "AC Coach", "Ample Luggage"],
    image: "/packages/goa.svg",
    cta: "Explore Package",
    href: "#booking-form",
  },
];

export const holidaySectionData = {
  eyebrow: "HOLIDAY TRAVEL",
  heading: "Popular Buses For Holiday Packages",
  description:
    "Travel together, comfortably. Choose the right coach for your group holiday and enjoy a hassle-free journey from start to finish.",
  packages: holidayPackagesData,
  secondaryCta: {
    prompt: "Planning a Different Destination?",
    buttonText: "Explore All Holiday Packages",
    href: "#booking-form",
  },
};

export const popularDestinationsData = [
  {
    id: "jaipur",
    number: "01",
    name: "Jaipur",
    route: "Delhi → Jaipur • ~5.5 HRS",
    description: "Royal architecture & weekend getaways",
    ctaText: "Fleet to Jaipur",
    image: "/images/destinations/jaipur.png",
    href: "/destinations/jaipur",
  },

  {
    id: "manali",
    number: "02",
    name: "Manali",
    route: "Delhi → Manali • ~11.0 HRS",
    description: "Mountain escapes & group tours",
    ctaText: "Fleet to Manali",
    image: "/images/destinations/mountain.png",
    href: "/destinations/manali",
  },

  {
    id: "agra",
    number: "03",
    name: "Agra",
    route: "Delhi → Agra • ~3.5 HRS",
    description: "Heritage trips & weekend travel",
    ctaText: "Fleet to Agra",
    image: "/images/destinations/taj.png",
    href: "/destinations/agra",
  },

  {
    id: "haridwar",
    number: "04",
    name: "Haridwar",
    route: "Delhi → Haridwar • ~4.5 HRS",
    description: "Pilgrimage & group journeys",
    ctaText: "Fleet to Haridwar",
    image: "/images/destinations/screen.png",
    href: "/destinations/haridwar",
  },

  {
    id: "udaipur",
    number: "05",
    name: "Udaipur",
    route: "Delhi → Udaipur • ~10 HRS",
    description: "Lake city & group tours",
    ctaText: "Fleet to Udaipur",
    image: "/images/destinations/udaipur.png",
    href: "/destinations/udaipur",
  },

  {
    id: "goa",
    number: "06",
    name: "Goa",
    route: "Delhi → Goa • ~18.0 HRS",
    description: "Beaches & group getaways",
    ctaText: "Fleet to Goa",
    image: "/images/destinations/goa2.png",
    href: "/destinations/goa",
  },
];
export const destinationsPageHeroData = {
  eyebrow: "POPULAR DESTINATIONS",
  title: "Explore more.",
  titleLines: [
    "Explore more.",
    "Travel together.",
  ],
  description:
    "Discover popular destinations across India and make every group journey comfortable, convenient and memorable with Bus Mantra.",
  image: "/bus_mantra_about_bus.png",
  imageAlt:
    "Bus Mantra coach ready for group travel across India",
};

export const destinationsSectionData = {
  eyebrow: "DESTINATIONS",
  heading: "Where will your group go?",
  description: "Explore popular destinations for your next group journey.",
  headerCta: {
    label: "View All Destinations",
    href: "#booking-form",
  },
  destinations: popularDestinationsData,
};
export const destinationsData = {
  /* =======================================================
     JAIPUR
  ======================================================= */

  jaipur: {
    slug: "jaipur",

    name: "Jaipur",

    badge: "POPULAR DESTINATION",

    route: "Delhi → Jaipur",

    description:
      "Explore Jaipur with comfortable group transportation for heritage tours, weekend getaways, sightseeing and memorable journeys. Travel together in a dedicated coach while discovering the royal architecture, historic landmarks and vibrant culture of the Pink City.",

    gallery: [
      "/images/destinations/amber-fort.jpg",
      "/images/destinations/city-palace-jaipur.jpg",
      "/images/destinations/hawa-mahal.jpg",
    ],

    popularPlaces: [
      {
        id: "amber-fort",

        name: "Amber Fort",

        image: "/images/destinations/amber-fort.jpg",

        description:
          "Discover the grand Amber Fort, one of Jaipur's most impressive heritage landmarks. Surrounded by the Aravalli Hills, the fort combines magnificent architecture, historic courtyards and beautiful views, making it an excellent sightseeing stop for groups exploring Jaipur.",

        highlights: [
          "Explore grand courtyards, gateways and historic palace interiors.",
          "Enjoy beautiful views of the surrounding Aravalli Hills.",
          "Ideal for heritage tours and group sightseeing.",
        ],
      },

      {
        id: "city-palace-jaipur",

        name: "City Palace",

        image: "/images/destinations/city-palace-jaipur.jpg",

        description:
          "Explore Jaipur's historic City Palace, a remarkable complex showcasing royal architecture, elegant courtyards and fascinating heritage. Located in the heart of the Pink City, the palace provides visitors with an opportunity to experience Jaipur's royal history while enjoying a convenient stop during a group sightseeing itinerary.",

        highlights: [
          "Discover royal courtyards, museums and traditional architecture.",
          "Located conveniently in the heart of Jaipur.",
          "A great stop for history and heritage-focused group tours.",
        ],
      },

      {
        id: "hawa-mahal",

        name: "Hawa Mahal",

        image: "/images/destinations/hawa-mahal.jpg",

        description:
          "Visit the iconic Hawa Mahal, one of Jaipur's most recognisable landmarks and a defining symbol of the Pink City. Its distinctive facade, historic character and central location make it an easy and memorable attraction to include in a Jaipur group travel itinerary.",

        highlights: [
          "See Jaipur's iconic pink sandstone architecture.",
          "Explore one of the city's most photographed landmarks.",
          "Conveniently located near Jaipur's historic city centre.",
        ],
      },
    ],
  },


  /* =======================================================
     MANALI
  ======================================================= */

  manali: {
    slug: "manali",

    name: "Manali",

    badge: "POPULAR DESTINATION",

    route: "Delhi → Manali",

    description:
      "Travel comfortably to Manali for mountain escapes, group tours, weekend trips and memorable journeys through the Himalayas. A dedicated coach allows your group to travel together while enjoying scenic mountain roads, natural landscapes and the relaxed atmosphere of this popular hill destination.",

    gallery: [
      "/images/destinations/solang-valley.jpg",
      "/images/destinations/hadimba-temple.jpg",
      "/images/destinations/mall-road.jpg",
    ],

    popularPlaces: [
      {
        id: "solang-valley",

        name: "Solang Valley",

        image: "/images/destinations/solang-valley.jpg",

        description:
          "Enjoy the spectacular mountain scenery of Solang Valley, one of the most popular attractions around Manali. Surrounded by snow-covered peaks and green mountain landscapes, the valley offers groups a refreshing outdoor experience and an opportunity to enjoy the natural beauty of Himachal Pradesh.",

        highlights: [
          "Enjoy panoramic Himalayan mountain views.",
          "Popular for outdoor activities and scenic experiences.",
          "A great destination for group excursions from Manali.",
        ],
      },

      {
        id: "hadimba-temple",

        name: "Hadimba Temple",

        image: "/images/destinations/hadimba-temple.jpg",

        description:
          "Visit the historic Hadimba Temple, located among tall cedar trees in a peaceful forest setting. The temple's distinctive wooden architecture and natural surroundings make it one of Manali's most memorable cultural attractions and an excellent stop during a group sightseeing tour.",

        highlights: [
          "Experience distinctive traditional wooden architecture.",
          "Surrounded by peaceful cedar forests.",
          "A popular cultural and sightseeing attraction in Manali.",
        ],
      },

      {
        id: "mall-road-manali",

        name: "Mall Road",

        image: "/images/destinations/mall-road.jpg",

        description:
          "Explore Mall Road, one of the liveliest areas in Manali, with local shops, cafés, restaurants and places to experience the town's relaxed mountain atmosphere. It is particularly suitable for groups looking to spend a comfortable evening shopping, dining and exploring together.",

        highlights: [
          "Explore local shops, cafés and restaurants.",
          "Enjoy a relaxed evening atmosphere in central Manali.",
          "Convenient stop for group shopping and leisure.",
        ],
      },
    ],
  },


  /* =======================================================
     AGRA
  ======================================================= */

  agra: {
    slug: "agra",

    name: "Agra",

    badge: "POPULAR DESTINATION",

    route: "Delhi → Agra",

    description:
      "Discover Agra with comfortable group transportation for heritage tours, weekend travel and sightseeing around its famous landmarks. Travel together in a dedicated coach while exploring the city's remarkable Mughal architecture and some of India's most recognised historical attractions.",

    gallery: [
      "/images/destinations/taj.png",
      "/images/destinations/agra-2.jpg",
      "/images/destinations/agra-3.jpg",
    ],

    popularPlaces: [
      {
        id: "taj-mahal",

        name: "Taj Mahal",

        image: "/images/destinations/taj-mahal.jpg",

        description:
          "Visit the iconic Taj Mahal and experience one of India's most famous heritage landmarks. Known for its magnificent white marble architecture and historic significance, the Taj Mahal is the centrepiece of most Agra itineraries and an unforgettable stop for groups travelling together.",

        highlights: [
          "Explore one of India's most iconic architectural landmarks.",
          "Enjoy the beautiful gardens and surrounding complex.",
          "A must-visit attraction for Agra group sightseeing.",
        ],
      },

      {
        id: "agra-fort",

        name: "Agra Fort",

        image: "/images/destinations/agra-fort.jpg",

        description:
          "Explore the historic Agra Fort, an impressive red sandstone complex closely connected with India's Mughal heritage. Its massive walls, grand courtyards and historic buildings offer groups an opportunity to discover the architectural and cultural history of Agra.",

        highlights: [
          "Discover impressive Mughal-era architecture.",
          "Explore grand courtyards, gates and historic buildings.",
          "Located close to the Taj Mahal for convenient sightseeing.",
        ],
      },

      {
        id: "mehtab-bagh",

        name: "Mehtab Bagh",

        image: "/images/destinations/mehtab-bagh.jpg",

        description:
          "Enjoy beautiful views of the Taj Mahal from Mehtab Bagh, a peaceful garden located across the Yamuna River. The garden provides a different perspective of the monument and works well as part of a relaxed Agra sightseeing itinerary for groups.",

        highlights: [
          "Enjoy a different viewpoint of the Taj Mahal.",
          "Relax in a peaceful garden setting.",
          "A good addition to a complete Agra sightseeing route.",
        ],
      },
    ],
  },


  /* =======================================================
     HARIDWAR
  ======================================================= */

  haridwar: {
    slug: "haridwar",

    name: "Haridwar",

    badge: "POPULAR DESTINATION",

    route: "Delhi → Haridwar",

    description:
      "Travel comfortably to Haridwar for pilgrimage trips, spiritual journeys, sightseeing and organised group travel. A dedicated coach makes it easier for families, religious groups and larger parties to travel together while exploring the city's important spiritual landmarks.",

    gallery: [
      "/images/destinations/screen.png",
      "/images/destinations/haridwar-2.jpg",
      "/images/destinations/haridwar-3.jpg",
    ],

    popularPlaces: [
      {
        id: "har-ki-pauri",

        name: "Har Ki Pauri",

        image: "/images/destinations/har-ki-pauri.jpg",

        description:
          "Visit Har Ki Pauri, one of Haridwar's most important spiritual landmarks and a major gathering point along the Ganges. The riverside atmosphere and historic significance make it an essential stop for groups travelling to Haridwar for pilgrimage and cultural experiences.",

        highlights: [
          "Visit one of Haridwar's most important spiritual landmarks.",
          "Experience the atmosphere of the Ganges riverside.",
          "A central stop for pilgrimage and group sightseeing.",
        ],
      },

      {
        id: "ganga-aarti",

        name: "Ganga Aarti",

        image: "/images/destinations/ganga-aarti.jpg",

        description:
          "Experience the atmosphere of the Ganga Aarti and the spiritual traditions that make Haridwar an important destination for visitors from across India. The riverside ceremony creates a memorable experience for groups looking to connect with the cultural and religious character of the city.",

        highlights: [
          "Experience an important spiritual tradition of Haridwar.",
          "Enjoy the evening atmosphere along the Ganges.",
          "Well suited to pilgrimage and cultural group journeys.",
        ],
      },

      {
        id: "mansa-devi",

        name: "Mansa Devi Temple",

        image: "/images/destinations/mansa-devi.jpg",

        description:
          "Explore Mansa Devi Temple, an important pilgrimage destination located on the Bilwa Parvat overlooking Haridwar. The temple provides visitors with a spiritual experience as well as views across parts of the city and surrounding landscape.",

        highlights: [
          "Visit an important pilgrimage destination in Haridwar.",
          "Enjoy elevated views across the city.",
          "Suitable for religious and family group itineraries.",
        ],
      },
    ],
  },


  /* =======================================================
     UDAIPUR
  ======================================================= */

  udaipur: {
    slug: "udaipur",

    name: "Udaipur",

    badge: "POPULAR DESTINATION",

    route: "Delhi → Udaipur",

    description:
      "Experience the charm of Udaipur with comfortable group transportation for sightseeing, tours and memorable journeys. Known for its lakes, palaces and heritage architecture, Udaipur offers groups a beautiful combination of culture, history and scenic experiences.",

    gallery: [
      "/images/destinations/udaipur.png",
      "/images/destinations/udaipur-2.png",
      "/images/destinations/udaipur-3.png",
    ],

    popularPlaces: [
      {
        id: "city-palace-udaipur",

        name: "City Palace",

        image: "/images/destinations/city-palace-udaipur.png",

        description:
          "Explore the magnificent City Palace overlooking Lake Pichola, one of Udaipur's most important heritage attractions. The palace complex features grand courtyards, historic architecture and panoramic views that make it a memorable experience for groups exploring the city.",

        highlights: [
          "Explore grand royal courtyards and historic architecture.",
          "Enjoy panoramic views towards Lake Pichola.",
          "One of Udaipur's most important heritage attractions.",
        ],
      },

      {
        id: "lake-pichola",

        name: "Lake Pichola",

        image: "/images/destinations/lake-pichola.png",

        description:
          "Enjoy the peaceful beauty of Lake Pichola, surrounded by palaces, ghats, historic buildings and the Aravalli landscape. The lake forms an important part of Udaipur's identity and offers groups a scenic experience while exploring the city's famous heritage surroundings.",

        highlights: [
          "Enjoy beautiful views of Udaipur's historic waterfront.",
          "See palaces and heritage buildings around the lake.",
          "A memorable scenic stop for group tours.",
        ],
      },

      {
        id: "monsoon-palace",

        name: "Sajjangarh Monsoon Palace",

        image: "/images/destinations/monsoon-palace.png",

        description:
          "Located high above Udaipur, the Monsoon Palace offers beautiful views over the city, surrounding hills and lakes. Its elevated location makes it a popular sightseeing destination for groups looking to experience Udaipur's scenic landscape from above.",

        highlights: [
          "Enjoy panoramic views over Udaipur.",
          "Experience the palace's scenic hilltop setting.",
          "A great addition to a heritage and sightseeing itinerary.",
        ],
      },
    ],
  },


  /* =======================================================
     GOA
  ======================================================= */

  goa: {
    slug: "goa",

    name: "Goa",

    badge: "POPULAR DESTINATION",

    route: "Delhi → Goa",

    description:
      "Plan a comfortable group journey to Goa with reliable coach transportation for beach trips, holidays and group getaways. Travel together between beaches, heritage attractions, local markets and popular sightseeing destinations while keeping your entire group organised throughout the journey.",

    gallery: [
      "/images/destinations/goa2.png",
      "/images/destinations/goa-2.png",
      "/images/destinations/goa-3.png",
    ],

    popularPlaces: [
      {
        id: "baga-beach",

        name: "Baga Beach",

        image: "/images/destinations/baga-beach.png",

        description:
          "Baga Beach is one of Goa's popular coastal destinations, known for its lively atmosphere, beach activities, restaurants and relaxed seaside experiences. It is a convenient choice for groups looking to spend time together by the coast while enjoying the energy of North Goa.",

        highlights: [
          "Enjoy Goa's lively coastal atmosphere.",
          "Explore nearby restaurants, cafés and beach activities.",
          "Popular choice for group holidays and getaways.",
        ],
      },

      {
        id: "fort-aguada",

        name: "Fort Aguada",

        image: "/images/destinations/fort-aguada.png",

        description:
          "Visit the historic Fort Aguada for beautiful coastal views and a glimpse into Goa's Portuguese heritage. The fort's location overlooking the Arabian Sea makes it an excellent sightseeing stop for groups exploring the northern part of Goa.",

        highlights: [
          "Discover an important piece of Goa's coastal heritage.",
          "Enjoy views of the Arabian Sea.",
          "Easy to combine with other North Goa attractions.",
        ],
      },

      {
        id: "calangute-beach",

        name: "Calangute Beach",

        image: "/images/destinations/calangute.png",

        description:
          "Calangute offers a lively beach experience with plenty of space for groups to relax, explore local attractions and enjoy Goa's coastline. Its convenient location and range of nearby facilities make it a popular stop during group holidays.",

        highlights: [
          "Enjoy a popular beach destination in North Goa.",
          "Explore nearby restaurants, shops and local attractions.",
          "Suitable for relaxed group holidays and sightseeing.",
        ],
      },
    ],
  },
};
// ============================================================
// SERVICES
// ============================================================

export const servicesData = [
  {
    id: "inbound-trips",
    number: "01",
    title: "Inbound Trips",
    description:
      "Curated pan-India charter transport for international tourists, travel agencies, and inbound delegation tours exploring India's heritage.",
    bottomLabel: "International & inbound group travel",
    icon: "globe",
    image: "/images/services/inbound-trips.jpg",
    ctaLabel: "Explore Inbound Trips",
    href: "/services/group-tours",
  },
  {
    id: "corporate-trips",
    number: "02",
    title: "Corporate Trips",
    description:
      "Reliable executive transportation for meetings, offsites, employee commutes, and corporate group movements in premium modern coaches.",
    bottomLabel: "Executive group transportation",
    icon: "briefcase",
    image: "/images/services/corporate-trips.jpg",
    ctaLabel: "Explore Corporate Trips",
    href: "/services/corporate-travel",
  },
  {
    id: "mice-conference-trips",
    number: "03",
    title: "MICE / Conference Trips",
    description:
      "Seamless logistics and dedicated coach transfers for conferences, exhibitions, trade delegations, and large-scale MICE events.",
    bottomLabel: "Conferences, summits & expositions",
    icon: "users",
    image: "/images/services/mice-conference-trips.jpg",
    ctaLabel: "Explore MICE Trips",
    href: "/services/corporate-travel",
  },
  {
    id: "school-college-trips",
    number: "04",
    title: "School / College Trips",
    description:
      "Safe, vetted, and comfortable coaches for educational excursions, industrial visits, college study tours, and sports competitions.",
    bottomLabel: "Safe & vetted student travel",
    icon: "graduation-cap",
    image: "/images/services/school-college-trips.png",
    ctaLabel: "Explore Student Trips",
    href: "/services/school-trips",
  },
  {
    id: "destination-wedding",
    number: "05",
    title: "Destination Wedding",
    description:
      "Luxury guest transport and coordinated convoy services for grand Indian weddings, sangeet functions, and royal destination ceremonies.",
    bottomLabel: "Grand wedding & guest transfers",
    icon: "heart",
    image: "/images/services/destination-wedding.png",
    ctaLabel: "Explore Wedding Travel",
    href: "/services/events-weddings",
  },
  {
    id: "airport-railway-transfers",
    number: "06",
    title: "Airport / Railway Station Pick-Up & Drop-Off",
    description:
      "Punctual airport and railway station pickups with coordinated luggage handling and seamless transfers to hotels or venues.",
    bottomLabel: "Punctual station & airport pickups",
    icon: "plane",
    image: "/images/services/airport-railway-transfers.jpg",
    ctaLabel: "Explore Transit Transfers",
    href: "/services/airport-transfers",
  },
  {
    id: "leisure-trips",
    number: "07",
    title: "Leisure Trips",
    description:
      "Spacious luxury coaches for family reunions, holiday tours, weekend getaways, and scenic expeditions across scenic destinations.",
    bottomLabel: "Scenic group holidays & getaways",
    icon: "palmtree",
    image: "/images/services/leisure-trips.png",
    ctaLabel: "Explore Leisure Trips",
    href: "/services/group-tours",
  },
  {
    id: "meditation-trips",
    number: "08",
    title: "Meditation Trips",
    description:
      "Tranquil travel arrangements for spiritual retreats, yoga workshops, ashram visits, and silent meditation camps in peaceful nature.",
    bottomLabel: "Serene spiritual & yoga retreats",
    icon: "flower",
    image: "/images/services/meditation-trips.jpg",
    ctaLabel: "Explore Meditation Trips",
    href: "/services/group-tours",
  },
  {
    id: "cycling-trips",
    number: "09",
    title: "Cycling Trips",
    description:
      "Specialised expedition transit with custom bicycle racking, luggage logistics, and escort coach support for cycling groups and clubs.",
    bottomLabel: "Escort support & cycling expeditions",
    icon: "bike",
    image: "/images/services/cycling-trips.jpg",
    ctaLabel: "Explore Cycling Trips",
    href: "/services/group-tours",
  },
];

export const useCasesData = servicesData;


// ============================================================
// SERVICES SECTION
// ============================================================

export const servicesSectionData = {
  eyebrow: "SERVICES",
  heading: "Travel solutions for every group.",
  description:
    "From business travel to airport transfers, we make group transportation simple, comfortable and reliable.",
  services: servicesData,
  useCases: servicesData,
};


// ============================================================
// SERVICES PAGE HERO
// ============================================================

export const servicesPageHeroData = {
  eyebrow: "OUR SERVICES",
  title: "Group travel, made simple.",
  titleLines: ["Group travel,", "made simple."],
  description:
    "From corporate travel and school trips to airport transfers and group tours, Bus Mantra provides comfortable, reliable transportation for every kind of group journey.",
  image: "/bus_mantra_about_bus.png",
  imageAlt: "Bus Mantra comfortable coach fleet for group travel",
};


// ============================================================
// SERVICES PAGE SECTION
// ============================================================

export const servicesPageSectionData = {
  eyebrow: "OUR EXPERTISE",
  heading: "Travel built around your needs.",
  description:
    "Whatever brings your group together, we provide the right vehicle and support to get everyone there comfortably.",
  services: servicesData,
};


// ============================================================
// FEATURED SERVICE
// ============================================================

export const featuredServiceData = {
  eyebrow: "FULL-BUS CHARTERS",

  heading: "Your group. Your journey. Your coach.",

  description:
    "For larger groups, full-bus charters provide a comfortable and convenient way to keep everyone travelling together from pickup to destination.",

  points: [
    {
      title: "Comfortable group travel",
      description:
        "Give your entire group a shared, comfortable travel experience from start to finish.",
    },
    {
      title: "Flexible journey planning",
      description:
        "Choose pickup points, destinations and travel schedules around your group's requirements.",
    },
    {
      title: "One coordinated journey",
      description:
        "Keep transportation simple with one coach, one coordinated plan and everyone travelling together.",
    },
  ],

  image: "/bus_mantra_about_bus.png",

  imageAlt:
    "Bus Mantra luxury coach for full-bus group charter travel",
};
export const servicesSlugData = [
  {
    slug: "corporate-travel",
    title: "Corporate Travel",
    eyebrow: "CORPORATE TRAVEL",
    description:
      "Professional group transportation for meetings, conferences, employee movement, team travel and business events.",
    image: "/images/services/corporate-india.jpg",
    imageAlt:
      "Corporate group transportation in India",

    intro: {
      eyebrow: "TRAVEL FOR BUSINESS",
      heading: "Move your team with confidence.",
      description:
        "Keep your business group travelling together with comfortable, organised and dependable transportation.",
    },

    highlights: [
      {
        title: "Team Transportation",
        description:
          "Move employees and business teams together between offices, meetings, venues and destinations.",
      },
      {
        title: "Business Events",
        description:
          "Coordinated transportation for conferences, seminars, exhibitions and corporate gatherings.",
      },
      {
        title: "Flexible Group Travel",
        description:
          "Plan transportation around your team's schedule, pickup points and journey requirements.",
      },
    ],

    suitableFor: [
      "Corporate Teams",
      "Business Events",
      "Conferences",
      "Employee Travel",
    ],

    benefits: [
      {
        title: "Comfortable Group Travel",
        description:
          "Keep your team together in a comfortable coach instead of coordinating multiple vehicles.",
      },
      {
        title: "Easy Coordination",
        description:
          "Simplify employee movement with organised pickup, routing and destination coordination.",
      },
      {
        title: "Right-Sized Coach",
        description:
          "Choose a coach that fits your group size and travel requirements.",
      },
    ],
  },

  {
    slug: "group-tours",
    title: "Group Tours",
    eyebrow: "GROUP TOURS",
    description:
      "Comfortable coaches for sightseeing, weekend trips, multi-city journeys and organised group travel across India.",
    image: "/images/services/group-tours-india.jpg",
    imageAlt:
      "Group tour transportation in India",

    intro: {
      eyebrow: "TRAVEL TOGETHER",
      heading: "Make the journey part of the experience.",
      description:
        "Travel together comfortably while your group explores destinations, attractions and multiple cities.",
    },

    highlights: [
      {
        title: "Sightseeing Trips",
        description:
          "Comfortable transportation for groups visiting attractions, landmarks and popular destinations.",
      },
      {
        title: "Multi-City Journeys",
        description:
          "Plan longer journeys with multiple destinations and coordinated group transportation.",
      },
      {
        title: "Weekend Getaways",
        description:
          "Make short group trips easier with a dedicated coach for your complete journey.",
      },
    ],

    suitableFor: [
      "Tour Groups",
      "Family Trips",
      "Weekend Getaways",
      "Multi-City Tours",
    ],

    benefits: [
      {
        title: "Everyone Travels Together",
        description:
          "Keep your group together in one comfortable coach throughout the journey.",
      },
      {
        title: "Flexible Routes",
        description:
          "Plan custom routes based on your destinations, stops and travel requirements.",
      },
      {
        title: "Comfortable Long-Distance Travel",
        description:
          "Choose from suitable coach options for longer group journeys.",
      },
    ],
  },

  {
    slug: "events-weddings",
    title: "Events & Weddings",
    eyebrow: "EVENTS & WEDDINGS",
    description:
      "Coordinated transportation for weddings, celebrations, conferences, exhibitions and large gatherings.",
    image: "/images/services/events-india.jpg",
    imageAlt:
      "Event and wedding group transportation in India",

    intro: {
      eyebrow: "EVENT TRANSPORTATION",
      heading: "Keep every guest moving together.",
      description:
        "Make event transportation easier with coordinated group pickup, transfers and destination travel.",
    },

    highlights: [
      {
        title: "Wedding Transportation",
        description:
          "Organise comfortable transportation for guests travelling between hotels, venues and functions.",
      },
      {
        title: "Event Transfers",
        description:
          "Coordinate transportation for conferences, exhibitions, celebrations and large gatherings.",
      },
      {
        title: "Guest Movement",
        description:
          "Keep groups moving smoothly between multiple locations throughout the event.",
      },
    ],

    suitableFor: [
      "Weddings",
      "Conferences",
      "Exhibitions",
      "Large Gatherings",
    ],

    benefits: [
      {
        title: "Coordinated Guest Travel",
        description:
          "Keep event guests travelling together with organised pickup and drop-off arrangements.",
      },
      {
        title: "Multiple Pickup Points",
        description:
          "Plan transportation around hotels, venues and other required pickup locations.",
      },
      {
        title: "Comfortable Event Travel",
        description:
          "Give your guests a convenient and comfortable way to move throughout the event.",
      },
    ],
  },

  {
    slug: "school-trips",
    title: "School Trips",
    eyebrow: "SCHOOL TRIPS",
    description:
      "Safe and organised group transportation for school excursions, educational trips and student travel.",
    image: "/images/services/school-trips-india.jpg",
    imageAlt:
      "School trip transportation in India",

    intro: {
      eyebrow: "EDUCATIONAL TRAVEL",
      heading: "Make school journeys easier to organise.",
      description:
        "Provide students and groups with comfortable transportation for educational trips, excursions and tours.",
    },

    highlights: [
      {
        title: "Educational Excursions",
        description:
          "Comfortable group transportation for museums, educational centres, landmarks and field trips.",
      },
      {
        title: "Student Group Travel",
        description:
          "Keep students and accompanying staff together throughout the journey.",
      },
      {
        title: "Planned Group Routes",
        description:
          "Organise transportation around school schedules, destinations and planned stops.",
      },
    ],

    suitableFor: [
      "School Trips",
      "Educational Tours",
      "Student Groups",
      "Excursions",
    ],

    benefits: [
      {
        title: "Organised Group Movement",
        description:
          "Keep students and staff together with a dedicated group transportation solution.",
      },
      {
        title: "Comfortable Coaches",
        description:
          "Choose a suitable coach based on the size of your student group.",
      },
      {
        title: "Simpler Trip Planning",
        description:
          "Coordinate pickup, destination and return travel through one transportation arrangement.",
      },
    ],
  },

  {
    slug: "airport-transfers",
    title: "Airport Pick Up & Transfer",
    eyebrow: "AIRPORT TRANSFERS",
    description:
      "Convenient group airport pickup and drop-off with comfortable vehicles and coordinated travel.",
    image: "/images/services/airport-transfer-india.jpg",
    imageAlt:
      "Airport group transfer in India",

    intro: {
      eyebrow: "AIRPORT GROUP TRANSFERS",
      heading: "Start and finish your journey smoothly.",
      description:
        "Coordinate airport pickup and drop-off for your complete group without arranging multiple vehicles.",
    },

    highlights: [
      {
        title: "Airport Pick Up",
        description:
          "Arrange group transportation from the airport to your hotel, venue or destination.",
      },
      {
        title: "Airport Drop Off",
        description:
          "Plan convenient group transportation from your location to the airport.",
      },
      {
        title: "Group Coordination",
        description:
          "Keep your group travelling together with organised pickup and destination coordination.",
      },
    ],

    suitableFor: [
      "Corporate Groups",
      "Tour Groups",
      "Wedding Guests",
      "Large Families",
    ],

    benefits: [
      {
        title: "One Group, One Journey",
        description:
          "Keep your group together instead of arranging multiple taxis or smaller vehicles.",
      },
      {
        title: "Convenient Pickup",
        description:
          "Coordinate airport pickup and destination transfers around your group's requirements.",
      },
      {
        title: "Comfortable Transfers",
        description:
          "Travel between airports, hotels and destinations in a suitable coach.",
      },
    ],
  },

  {
    slug: "hotel-transfers",
    title: "Hotel Pick Up & Transfer",
    eyebrow: "HOTEL TRANSFERS",
    description:
      "Reliable hotel pickup and transfer services for groups travelling together between hotels, venues, airports and destinations.",
    image: "/images/services/hotel-transfer-india.jpg",
    imageAlt:
      "Hotel group transfer in India",

    intro: {
      eyebrow: "HOTEL GROUP TRANSFERS",
      heading: "Move your group smoothly between every stop.",
      description:
        "Make hotel pickups and transfers easier with comfortable group transportation coordinated around your journey.",
    },

    highlights: [
      {
        title: "Hotel Pick Up",
        description:
          "Arrange convenient group pickup directly from your hotel for your planned journey.",
      },
      {
        title: "Hotel To Venue Transfers",
        description:
          "Move groups comfortably between hotels, event venues, meeting locations and other destinations.",
      },
      {
        title: "Hotel To Airport Transfers",
        description:
          "Coordinate group transportation between hotels and airports for departures and arrivals.",
      },
    ],

    suitableFor: [
      "Hotel Guests",
      "Tour Groups",
      "Wedding Guests",
      "Corporate Teams",
    ],

    benefits: [
      {
        title: "Convenient Pickup",
        description:
          "Coordinate group transportation directly from your hotel or accommodation.",
      },
      {
        title: "Easy Destination Transfers",
        description:
          "Move your group between hotels, venues, airports and other destinations.",
      },
      {
        title: "Everyone Travels Together",
        description:
          "Keep your group together in a comfortable coach throughout the transfer.",
      },
    ],
  },
];


export const testimonialsData = [
  {
    id: "testimonial-1",
    quote:
      "BUS MANTRA made our family trip incredibly easy. Having the entire coach for our group meant everyone could travel together comfortably without the stress of managing multiple cars.",
    name: "Rahul Sharma",
    role: "Family Group Organizer",
    category: "Family Tour",
    location: "Delhi → Jaipur",
    rating: 5,
    avatar: null,
    initials: "RS",
    featured: true,
  },
  {
    id: "testimonial-2",
    quote:
      "Coordinating inter-city travel for 45 team members was seamless. The bus was punctual, air-conditioned, and the driver was extremely polite and experienced.",
    name: "Ananya Iyer",
    role: "Head of People Operations",
    category: "Corporate Event",
    location: "Gurugram → Agra",
    rating: 5,
    avatar: null,
    initials: "AI",
    featured: false,
  },
  {
    id: "testimonial-3",
    quote:
      "We booked two luxury coaches for our destination wedding guests. The coordination from pickup at the airport to the venue was flawless and on time.",
    name: "Vikram Singhania",
    role: "Wedding Coordinator",
    category: "Wedding",
    location: "Udaipur & Mount Abu",
    rating: 5,
    avatar: null,
    initials: "VS",
    featured: false,
  },
  {
    id: "testimonial-4",
    quote:
      "Safety and schedule adherence are our highest priorities for school trips. The coach was thoroughly clean, equipped with seatbelts, and arrived well ahead of time.",
    name: "Pooja Malhotra",
    role: "Academic Coordinator",
    category: "School Trip",
    location: "Delhi → Chandigarh",
    rating: 5,
    avatar: null,
    initials: "PM",
    featured: false,
  },
  {
    id: "testimonial-5",
    quote:
      "Outstanding service for our annual university reunion. Ample luggage room for everyone and pushback seating made the long journey completely relaxing.",
    name: "Kunal Mehra",
    role: "Alumni Group Lead",
    category: "Group Adventure",
    location: "Delhi → Manali",
    rating: 5,
    avatar: null,
    initials: "KM",
    featured: false,
  },
];

export const testimonialsSectionData = {
  eyebrow: "CUSTOMER STORIES",
  heading: "Trusted by Groups That Travel Together",
  description:
    "From family holidays and school trips to corporate events and weddings, see what our customers say about their BUS MANTRA experience.",
  testimonials: testimonialsData,
  trustStats: [
    {
      value: "500+",
      label: "Buses Available",
      subtext: "Verified operators",
    },
    {
      value: "10K+",
      label: "Group Journeys",
      subtext: "Safely completed",
    },
    {
      value: "25+",
      label: "Cities Covered",
      subtext: "Pan-India routes",
    },
    {
      value: "4.8/5",
      label: "Customer Rating",
      subtext: "Over 3,000+ reviews",
    },
  ],
  bottomCta: {
    prompt: "Ready to plan your next group journey?",
    buttonText: "Book Your Bus",
    href: "#booking-form",
  },
};

export const homeFaqData = {
  eyebrow: "FAQ",
  heading: "Questions about group travel?",
  description:
    "Find answers to some of the most common questions about booking group transportation with Bus Mantra.",
  faqs: [
    {
      id: "home-booking",
      question: "How do I book a bus with Bus Mantra?",
      answer:
        "Choose your pickup point, destination, travel dates and passenger count, then submit your booking request through our booking form.",
    },
    {
      id: "home-fleet",
      question: "What types of buses are available?",
      answer:
        "Our fleet includes mini coaches, premium coaches and luxury coaches for different group sizes and travel requirements.",
    },
    {
      id: "home-group-size",
      question: "Can I book transportation for a large group?",
      answer:
        "Yes. We provide different coach options so groups of different sizes can travel together comfortably.",
    },
    {
      id: "home-destinations",
      question: "Which destinations can I travel to?",
      answer:
        "Bus Mantra supports group journeys across a wide range of destinations. You can provide your required route through the booking form.",
    },
  ],
};

export const fleetFaqData = {
  eyebrow: "FLEET FAQ",
  heading: "Choosing the right coach.",
  description:
    "Learn more about our coaches, capacities and options for different group sizes.",
  faqs: [
    {
      id: "fleet-mini",
      question: "What is the capacity of the Mini Coach?",
      answer:
        "The Mini Coach is designed for smaller groups and can accommodate up to 19 passengers.",
    },
    {
      id: "fleet-premium",
      question: "What is the capacity of the Premium Coach?",
      answer:
        "The Premium Coach is designed for medium-sized groups and can accommodate up to 45 passengers.",
    },
    {
      id: "fleet-luxury",
      question: "What is the capacity of the Luxury Coach?",
      answer:
        "The Luxury Coach is designed for larger groups and can accommodate up to 60 passengers.",
    },
    {
      id: "fleet-selection",
      question: "How do I know which coach is right for my group?",
      answer:
        "Enter your number of passengers in the booking form to view coaches that can accommodate your group size.",
    },
  ],
};

export const servicesFaqData = {
  eyebrow: "SERVICES FAQ",
  heading: "Everything about our services.",
  description:
    "Understand how Bus Mantra supports different types of group journeys.",
  faqs: [
    {
      id: "services-corporate",
      question: "Do you provide transportation for corporate events?",
      answer:
        "Yes. We provide group transportation for meetings, conferences, employee movement, team travel and corporate events.",
    },
    {
      id: "services-tours",
      question: "Can I book transportation for a group tour?",
      answer:
        "Yes. Our coaches are available for sightseeing, weekend trips, multi-city journeys and organised group tours.",
    },
    {
      id: "services-events",
      question: "Do you provide transportation for events and weddings?",
      answer:
        "Yes. We provide coordinated transportation for weddings, celebrations, conferences, exhibitions and other large gatherings.",
    },
    {
      id: "services-transfers",
      question: "Do you provide airport and hotel transfers?",
      answer:
        "Yes. We provide group airport pickup, drop-off and hotel transfer services.",
    },
  ],
};

export const destinationsFaqData = {
  eyebrow: "DESTINATION FAQ",
  heading: "Planning your group journey.",
  description:
    "A few things to know before travelling with your group.",
  faqs: [
    {
      id: "destinations-routes",
      question: "Can I book a bus for a destination not listed here?",
      answer:
        "Yes. You can submit a custom route through the booking form with your required pickup point and destination.",
    },
    {
      id: "destinations-round-trip",
      question: "Can I book a round trip?",
      answer:
        "Yes. You can provide both departure and return dates and times when planning your journey.",
    },
    {
      id: "destinations-group",
      question: "Can the entire group travel together?",
      answer:
        "Yes. Our coach options are designed to keep groups travelling together in one comfortable vehicle whenever the group size matches the selected coach capacity.",
    },
    {
      id: "destinations-planning",
      question: "Can I plan multiple stops during my journey?",
      answer:
        "Yes. Multi-city and custom group journeys can be planned according to your travel requirements.",
    },
  ],
};

export const aboutFaqData = {
  eyebrow: "ABOUT BUS MANTRA",
  heading: "Why travel with Bus Mantra?",
  description:
    "Learn more about our approach to comfortable, reliable and organised group transportation.",
  faqs: [
    {
      id: "about-company",
      question: "What is Bus Mantra?",
      answer:
        "Bus Mantra provides comfortable and reliable group transportation for corporate travel, tours, events, school trips and transfers.",
    },
    {
      id: "about-reliability",
      question: "What makes Bus Mantra different?",
      answer:
        "We focus on making group transportation simple, comfortable and easier to coordinate from pickup to destination.",
    },
    {
      id: "about-support",
      question: "Do you provide support during the journey?",
      answer:
        "Our group transportation service is designed around coordinated travel and dependable journey support.",
    },
    {
      id: "about-groups",
      question: "Who can use Bus Mantra?",
      answer:
        "Bus Mantra is suitable for corporate groups, families, tour groups, schools, event organisers and other groups travelling together.",
    },
  ],
};

// ============================================================
// FLEET SLUG FAQ DATA
// Separate from fleetFaqData used on the main Fleet page.
// ============================================================

export const fleetSlugFaqData = {
  eyebrow: "COACH FAQ",
  heading: "More about this coach.",
  description:
    "Find answers to common questions about choosing and booking this coach for your group.",
  faqs: [
    {
      id: "fleet-slug-capacity",
      question: "How many passengers can this coach accommodate?",
      answer:
        "Passenger capacity depends on the coach you select. Check the capacity details shown on this fleet page to choose the right option for your group.",
    },
    {
      id: "fleet-slug-amenities",
      question: "What amenities are available on this coach?",
      answer:
        "Amenities vary by coach type. Review the amenities and features listed on this page for the selected coach.",
    },
    {
      id: "fleet-slug-luggage",
      question: "Can the coach accommodate our group's luggage?",
      answer:
        "Luggage capacity depends on the coach type and the amount of luggage your group is carrying. Share your requirements when submitting your booking request.",
    },
    {
      id: "fleet-slug-booking",
      question: "How can I book this coach?",
      answer:
        "Submit your pickup point, destination, travel dates and passenger count through the booking form to request a coach for your journey.",
    },
  ],
};


// ============================================================
// DESTINATION SLUG FAQ DATA
// Separate from destinationsFaqData used on the main page.
// ============================================================

export const destinationSlugFaqData = {
  eyebrow: "DESTINATION FAQ",
  heading: "Planning this destination.",
  description:
    "Useful information to help you plan a group journey to this destination.",
  faqs: [
    {
      id: "destination-slug-booking",
      question: "Can I book a coach for this destination?",
      answer:
        "Yes. Submit your pickup point, destination, travel dates and passenger count through the booking form to request group transportation.",
    },
    {
      id: "destination-slug-custom-route",
      question: "Can I choose a different pickup location?",
      answer:
        "You can provide your preferred pickup point and destination when submitting your journey requirements.",
    },
    {
      id: "destination-slug-return-trip",
      question: "Can I arrange return transportation?",
      answer:
        "Yes. Include your return travel date and time in your booking requirements so your journey can be planned accordingly.",
    },
    {
      id: "destination-slug-stops",
      question: "Can our group visit multiple places during the trip?",
      answer:
        "You can share your planned stops and route requirements when requesting your journey so the itinerary can be discussed with the team.",
    },
  ],
};


// ============================================================
// SERVICES SLUG FAQ DATA
// Separate from servicesFaqData used on the main page.
// ============================================================

export const servicesSlugFaqData = {
  eyebrow: "SERVICE FAQ",
  heading: "A little more about this service.",
  description:
    "Answers to common questions about arranging group transportation for this service.",
  faqs: [
    {
      id: "services-slug-booking",
      question: "How do I arrange transportation for this service?",
      answer:
        "Submit your pickup location, destination, travel dates and group size through the booking form, along with any specific requirements for your journey.",
    },
    {
      id: "services-slug-group-size",
      question: "Can you accommodate different group sizes?",
      answer:
        "Different coach options are available for different group sizes. Choose a coach based on your passenger count and travel requirements.",
    },
    {
      id: "services-slug-route",
      question: "Can I request a customised route or schedule?",
      answer:
        "Yes. Include your preferred route, pickup points, destinations and schedule when submitting your transportation request.",
    },
    {
      id: "services-slug-details",
      question: "What information should I provide when requesting a booking?",
      answer:
        "Provide your group size, pickup and drop-off locations, travel dates, timings and any service-specific requirements to help plan your journey.",
    },
  ],
};


// ============================================================
// CONTACT PAGE FAQ DATA
// ============================================================

export const contactFaqData = {
  eyebrow: "CONTACT FAQ",
  heading: "We're here to help.",
  description:
    "Find answers to common questions about contacting Bus Mantra and planning your group transportation.",
  faqs: [
    {
      id: "contact-faq-booking",
      question: "How can I enquire about a booking?",
      answer:
        "You can submit your journey details through the booking form, including your pickup point, destination, travel dates and passenger count.",
    },
    {
      id: "contact-faq-quote",
      question: "How can I request a quote?",
      answer:
        "Share your route, travel dates, timings and group size through the booking form so your transportation requirements can be reviewed.",
    },
    {
      id: "contact-faq-custom",
      question: "Can I discuss special travel requirements?",
      answer:
        "Yes. Include details such as multiple stops, return travel, event transfers or other group transportation needs in your enquiry.",
    },
    {
      id: "contact-faq-support",
      question: "Where can I find Bus Mantra's contact details?",
      answer:
        "You can find the available phone number and email address in the contact information displayed on the Contact page and website footer.",
    },
  ],
};

export const topContactData = {
  phone: "+91 9876543210",
  phoneHref: "tel:+919876543210",
  email: "charter@busmantra.in",
  emailHref: "mailto:charter@busmantra.in",
  supportText: "24/7 Group Charter Booking Assistance",
};

export const footerData = {
  brand: {
    name: "BUS MANTRA",
    description:
      "India's trusted platform for full-bus charters and group road travel. Reserving the entire vehicle for weddings, corporate offsites, school trips, and pilgrimage tours with verified professional chauffeurs.",
    logo: "/logo-bus-mantra.jpeg",
  },
  contact: {
    phone: "+91 9876543210",
    phoneHref: "tel:+919876543210",
    email: "charter@busmantra.in",
    emailHref: "mailto:charter@busmantra.in",
  },
  socialLinks: [
    { name: "Facebook", href: "https://facebook.com", key: "facebook" },
    { name: "Instagram", href: "https://instagram.com", key: "instagram" },
    { name: "X / Twitter", href: "https://x.com", key: "twitter" },
    { name: "LinkedIn", href: "https://linkedin.com", key: "linkedin" },
    { name: "YouTube", href: "https://youtube.com", key: "youtube" },
  ],
  quickLinks: [
    { label: "About Us", href: "/about" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Blogs", href: "/blogs" },
    { label: "Terms and Conditions", href: "/terms-conditions" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Contact Us", href: "/contact" },
  ],
  fleets: [
    ...fleetTypesData.map((fleet) => ({
      label: fleet.capacity ? `${fleet.name} (${fleet.capacity})` : fleet.name,
      href: "/fleets",
    })),
  ],
  services: [
    ...servicesData.map((service) => ({
      label: service.title,
      href: "/services",
    })),
  ],
  destinations: [
    ...popularDestinationsData.map((dest) => ({
      label: dest.name,
      href: "/destinations",
    })),
  ],
  partner: {
    eyebrow: "PARTNER WITH US",
    title: "Become A Vendor",
    description:
      "Bus operator or fleet owner? Partner with Bus Mantra to get verified corporate, wedding & holiday Fleetbookings with guaranteed payouts.",
    benefits: [
      "Zero Onboarding Fee",
      "100% Full-Bus Charters",
      "Direct Bank Payouts",
    ],
    cta: "Register as a Vendor",
    ctaHref: "/vendor",
    subtext: "Fast 2-minute registration",
  },
  copyright:
    "© 2026 Bus Mantra All rights reserved.",
  developer: {
    prefix: "Developed by",
    name: "Kanak Drishti Infotech Pvt. Ltd.",
    href: "https://kanakdrishtiinfo.com",
  },
};

export const offerBusCategories = {
  tata: {
    id: "tata",
    key: "tata",
    brand: "Tata",
    name: "Tata Starbus Ultra",
    shortName: "Tata Coach",
    offerTag: "₹1/KM OFFER",
    buttonLabel: "Book Tata — ₹1/km Offer",
    badge: "AFFORDABLE CHARTER OFFER",
    headline: "Affordable Group Travel at ₹1/KM",
    tagline: "India's most trusted commercial coach platform, now under our exclusive ₹1/km offer.",
    ratePerKm: 1,
    capacity: "19–32 Seats",
    minSeats: 1,
    maxSeats: 32,
    image: "/fleet/12_seater_maharaja_tempo_traveller_2.png",
    gallery: [
      "/fleet/12_seater_maharaja_tempo_traveller_1.png",
    ],
    description:
      "Engineered for high-mileage dependability, the Tata Starbus Ultra delivers exceptional economy without compromising passenger safety. Features 2+2 pushback seats, roof-mounted AC, and ample luggage space for medium group tours.",
    features: {
      seats: "Plush Recliners (2+2 Layout)",
      climate: "Dual Powerful AC Vents",
      luggage: "15–20 Standard Bags",
      entertainment: "Stereo Audio & Mic",
    },
    specs: [
      { label: "Vehicle Brand", value: "Tata Motors" },
      { label: "Model", value: "Starbus Ultra High-Deck" },
      { label: "Seating Capacity", value: "19 to 32 Passengers" },
      { label: "Air Conditioning", value: "Roof-Mounted Heavy Duty" },
      { label: "Engine Type", value: "Turbocharged Intercooled Diesel" },
      { label: "Suspension", value: "Parabolic Leaf Spring with Shock Absorbers" },
      { label: "Safety Kit", value: "Fire Extinguisher, First Aid, Speed Governor" },
    ],
    amenities: [
      "AC & Climate Control",
      "Push-back Reclining Seats",
      "Dedicated Luggage Space",
      "Music System & PA Mic",
      "USB Charging at Every Seat",
      "First Aid Kit & Fire Safety",
    ],
    pricingNote: "Promotional ₹1/km base tariff. 200 KM minimum billing & 5% GST apply.",
  },
  bharatbenz: {
    id: "bharatbenz",
    key: "bharatbenz",
    brand: "BharatBenz",
    name: "BharatBenz Executive Coach",
    shortName: "BharatBenz",
    offerTag: "PREMIUM COMFORT",
    buttonLabel: "Book Premium",
    badge: "PREMIUM CHARTER",
    headline: "Engineered For Executive Comfort",
    tagline: "Daimler-engineered chassis, superior soundproofing, and executive plush recliners.",
    ratePerKm: 42,
    capacity: "20–45 Seats",
    minSeats: 20,
    maxSeats: 45,
    image: "/fleet/45-49_seater_tata_luxury_coach_2.png",
    gallery: [
      "/fleet/45-49_seater_tata_luxury_coach_1.png",
    ],
    description:
      "German engineering meets Indian road conditions. The BharatBenz Executive Coach features whisper-quiet NVH insulation, executive high-back pushback recliners, individual overhead AC vents, and massive underfloor luggage compartments.",
    features: {
      seats: "Executive Recliner (2+2 Layout)",
      climate: "Individual Overhead Ducted AC",
      luggage: "40–45 Large Suitcases",
      entertainment: "HD Screen & Sound System",
    },
    specs: [
      { label: "Vehicle Brand", value: "BharatBenz (Daimler)" },
      { label: "Model", value: "1624 Executive High-Deck" },
      { label: "Seating Capacity", value: "20 to 45 Passengers" },
      { label: "Air Conditioning", value: "Climate Control Ducted Overhead" },
      { label: "Engine Type", value: "Daimler OM 926 6-Cylinder Diesel" },
      { label: "Suspension", value: "Full Air Suspension / Anti-Roll" },
      { label: "Safety Kit", value: "ABS, EBD, Emergency Exit, Fire Sensors" },
    ],
    amenities: [
      "Ergonomic Reclining Seats",
      "Fast Onboard Wi-Fi",
      "USB Charging at Every Seat",
      "Individual AC Vents",
      "Spacious Underfloor Luggage Bay",
      "Chilled Mineral Water Dispenser",
    ],
    pricingNote: "Standard Premium rate of ₹42/km. 200 KM minimum billing & 5% GST apply.",
  },
  volvo: {
    id: "volvo",
    key: "volvo",
    brand: "Volvo",
    name: "Volvo 9400 Multi-Axle Luxury Coach",
    shortName: "Volvo Coach",
    offerTag: "FLAGSHIP LUXURY",
    buttonLabel: "Book Luxury",
    badge: "LUXURY FLAGSHIP",
    headline: "The Gold Standard of Highway Touring",
    tagline: "Ultra-luxurious multi-axle touring coach with air suspension, dual LED screens, and business-class plush seating.",
    ratePerKm: 58,
    capacity: "46–60 Seats",
    minSeats: 46,
    maxSeats: 60,
    image: "/fleet/40_seater_volvo_with_washroom_1.png",
    gallery: [
      "/fleet/40_seater_volvo_with_washroom_2.png",
    ],
    description:
      "Unrivaled long-distance comfort for large groups, wedding entourages, and VIP delegations. Features electronically controlled air suspension for a cloud-like ride, business-class ergonomic plush recliners, onboard washroom, and surround audio.",
    features: {
      seats: "Business Class Plush Recliners",
      climate: "Full Climate Control Air Purification",
      luggage: "Expansive Undercarriage Bays",
      entertainment: "Dual LED Screens & Surround Sound",
    },
    specs: [
      { label: "Vehicle Brand", value: "Volvo Buses" },
      { label: "Model", value: "9400 B11R Multi-Axle" },
      { label: "Seating Capacity", value: "46 to 60 Passengers" },
      { label: "Air Conditioning", value: "Automatic Climate Control & Air Purification" },
      { label: "Engine Type", value: "Volvo D11A 430HP Euro VI Engine" },
      { label: "Suspension", value: "Electronically Controlled Air Suspension (ECS)" },
      { label: "Safety Kit", value: "Electronic Braking System (EBS), Roll Stability, Washroom" },
    ],
    amenities: [
      "Executive Luxury Plush Seats",
      "Expansive Undercarriage Bays",
      "Dual LED Entertainment Screens",
      "Air Suspension Ride for Smooth Transit",
      "Onboard Clean Washroom",
      "Surround Audio System & Wireless Mic",
    ],
    pricingNote: "Flagship Luxury rate of ₹58/km. 200 KM minimum billing & 5% GST apply.",
  },
};

export const offerFaqData = {
  eyebrow: "₹1/KM OFFER FAQ",
  heading: "Everything you need to know about our ₹1/km offer.",
  description:
    "Transparent answers about vehicle categories, pricing calculations, inclusions, and booking process.",
  faqs: [
    {
      id: "offer-pricing",
      question: "How does the ₹1/km Bus Booking Offer work?",
      answer:
        "Under this special promotional offer, groups can book our affordable Tata bus category starting at a promotional base tariff of ₹1 per kilometer. Standard minimum billing distance (200 KM round-trip) and statutory 5% transport GST apply to ensure upfront transparency with no hidden charges.",
    },
    {
      id: "offer-brands",
      question: "Which bus brands are available in this offer?",
      answer:
        "The standard ₹1/km offer features reliable Tata commercial coaches. You can also easily upgrade on the same form to Book Premium with BharatBenz (₹42/km) or Book Luxury with Volvo (₹58/km) based on your group's comfort preference.",
    },
    {
      id: "offer-switching",
      question: "Will switching between Tata, Premium, and Luxury reset my form details?",
      answer:
        "No. When you switch between Tata, Book Premium (BharatBenz), and Book Luxury (Volvo), all your entered trip details—including pickup location, destinations, travel dates, passenger count, and contact information—are preserved automatically.",
    },
    {
      id: "offer-inclusions",
      question: "What is included in the fare breakdown?",
      answer:
        "The fare breakdown displays the base vehicle charter fee and 5% transport GST. Chauffeur allowances, commercial insurance, and sanitized vehicles are included. Highway tolls and state boundary taxes are billed as per actual receipts.",
    },
    {
      id: "offer-distance",
      question: "What is the minimum billing distance?",
      answer:
        "As with standard interstate and outstation tourist charters, a minimum billing of 200 KM round-trip applies to cover vehicle dispatch and driver mobilization.",
    },
    {
      id: "offer-booking",
      question: "How quickly is my booking confirmed?",
      answer:
        "Once you submit your booking or request a quote, our dedicated dispatch team reviews your journey route, assigns the verified vehicle, and contacts you within 15–30 minutes to confirm your travel itinerary.",
    },
  ],
};

// Re-export dedicated testimonials page data
export {
  testimonialsHeroData,
  trustMetrics,
  mediaAndOrgRemarks,
  videoTestimonials,
  customerReviews,
  appreciationLetters,
  testimonialFaqs,
} from "./testimonialsData";

