export const heroData = {
  eyebrow: "FULL BUS BOOKING",
  titleLines: ["Luxury Coach at ₹1/KM.", "Yes, You Read That Right."],
  description:
    "Book an entire luxury coach for your group and travel together in comfort, without the hassle.",
  primaryButton: {
    label: "Book a Bus",
    href: "#booking-form",
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
    src: "/fleet/fleet.png",
    alt: "BUS MANTRA Modern Luxury Coach Bus",
    width: 1920,
    height: 1080,
  },
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
      mobile: "MOBILE NUMBER",
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
        iconColor: "text-amber-600 bg-amber-50",
      },
      {
        id: "mobileNumber",
        label: "Mobile Number",
        placeholder: "+91 98765 43210",
        defaultValue: "+91 98765 43210",
        type: "tel",
        icon: "phone",
        iconColor: "text-emerald-600 bg-emerald-50",
      },
      {
        id: "email",
        label: "Email Address",
        placeholder: "e.g. rahul@example.com",
        defaultValue: "rahul@example.com",
        type: "email",
        icon: "mail",
        iconColor: "text-blue-600 bg-blue-50",
      },
      {
        id: "packs",
        label: "No. of Packs",
        placeholder: "e.g. 20",
        defaultValue: "20",
        type: "number",
        icon: "users",
        iconColor: "text-purple-600 bg-purple-50",
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
        iconColor: "text-emerald-600 bg-emerald-50",
      },
      {
        id: "destination",
        label: "Destination",
        placeholder: "Search Destination",
        defaultValue: "Jaipur",
        badge: "1 Stop",
        type: "searchable-dropdown",
        icon: "navigation",
        iconColor: "text-purple-600 bg-purple-50",
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
        iconColor: "text-brand-orange bg-orange-50",
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
        iconColor: "text-brand-orange bg-orange-50",
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
    href: "#booking-form",
  },

  /* =========================================================
     HERO IMAGE
  ========================================================= */

  image: {
    src: "/images/about/hero-bus.png",
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
    src: "/images/about/coach-road.png",
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

        alt:
          "Indian wedding guests travelling together inside a decorated luxury coach",
      },

      {
        number: "02",

        title: "Corporate Travel",

        description:
          "Move teams, clients and colleagues together for meetings, events and business travel.",

        image: "/images/about/corporate-travel.png",

        alt:
          "Indian corporate professionals travelling together inside a premium coach",
      },

      {
        number: "03",

        title: "School & College Trips",

        description:
          "Organized transportation for educational trips, excursions and campus events.",

        image: "/images/about/school-trip.png",

        alt:
          "Indian students travelling together inside a luxury coach",
      },

      {
        number: "04",

        title: "Family Tours",

        description:
          "Bring everyone together for comfortable local and multi-day family journeys.",

        image: "/images/about/family-travel.png",

        alt:
          "Indian family travelling together inside a comfortable luxury coach",
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

export const fleetTypesData = [
  {
    id: "mini-coach",
    slug: "mini-coach",
    name: "Mini Coach",
    capacity: "15–19 Seats",
    minSeats: 1,
    maxSeats: 19,
    ratePerKm: 28,
    badge: "City & Regional",
    isPopular: false,
    image: "/fleet/mini-coach.jpg",
    gallery: [
      "/fleet/mini-coach.jpg",
      "/fleet/fleet.png",
      "/fleet/coach.png",
    ],
    description:
      "Agile maneuverability, ideal for medium corporate teams, wedding parties, family trips, and airport pickups.",
    amenities: [
      "AC & Climate Control",
      "Push-back Reclining Seats",
      "Dedicated Luggage Space",
      "Music System & PA Mic",
      "USB Charging at Every Seat",
      "First Aid Kit & Fire Safety",
    ],
    features: {
      luggage: "15–20 Standard Bags",
      entertainment: "Stereo Audio & Mic",
      climate: "Dual Powerful AC Vents",
      seats: "Plush Recliners (2+2 Layout)",
    },
    ctaText: "View Details",
    href: "/fleets/mini-coach",
  },
  {
    id: "premium-coach",
    slug: "premium-coach",
    name: "Premium Coach",
    capacity: "20–45 Seats",
    minSeats: 20,
    maxSeats: 45,
    ratePerKm: 42,
    badge: "Most Popular",
    isPopular: true,
    image: "/fleet/premium-coach.jpg",
    gallery: [
      "/fleet/premium-coach.jpg",
      "/fleet/coach.png",
      "/fleet/fleet.png",
    ],
    description:
      "Ergonomic reclining seats, spacious luggage bays, and Wi-Fi connectivity for smooth multi-hour intercity transit.",
    amenities: [
      "Ergonomic Reclining Seats",
      "Fast Onboard Wi-Fi",
      "USB Charging at Every Seat",
      "Individual AC Vents",
      "Spacious Underfloor Luggage Bay",
      "Chilled Mineral Water Dispenser",
    ],
    features: {
      luggage: "40–45 Large Suitcases",
      entertainment: "HD Screen & Sound System",
      climate: "Individual Overhead AC",
      seats: "Executive Recliner (2+2 Layout)",
    },
    ctaText: "View Details",
    href: "/fleets/premium-coach",
  },
  {
    id: "luxury-coach",
    slug: "luxury-coach",
    name: "Luxury Coach",
    capacity: "46–60 Seats",
    minSeats: 46,
    maxSeats: 60,
    ratePerKm: 58,
    badge: "Long Distance",
    isPopular: false,
    image: "/fleet/luxury-coach.jpg",
    gallery: [
      "/fleet/luxury-coach.jpeg",
      "/fleet/fleet.png",
      "/fleet/coach.png",
    ],
    description:
      "Maximum capacity touring with onboard restroom, entertainment systems, and expansive undercarriage bays for long tours.",
    amenities: [
      "Executive Luxury Plush Seats",
      "Expansive Undercarriage Bays",
      "Dual LED Entertainment Screens",
      "Air Suspension Ride for Smooth Transit",
      "Onboard Clean Washroom",
      "Surround Audio System & Wireless Mic",
    ],
    features: {
      luggage: "60+ Large Suitcases",
      entertainment: "Dual Full-HD Displays",
      climate: "Multi-Zone Climate Control",
      seats: "Ultra Luxury Ergonomic (2+2)",
    },
    ctaText: "View Details",
    href: "/fleets/luxury-coach",
  },
];

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
  image: "/fleet/fleet.png",
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
  image: "/fleet/fleet.png",
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
      "Explore Jaipur with comfortable group transportation for heritage tours, weekend getaways, sightseeing and memorable journeys.",

    gallery: [
      "/images/destinations/jaipur.png",
      "/images/destinations/jaipur-2.jpg",
      "/images/destinations/jaipur-3.jpg",
    ],

    popularPlaces: [
      {
        id: "amber-fort",
        name: "Amber Fort",
        image: "/images/destinations/amber-fort.jpg",
        description:
          "Discover the grand Amber Fort, known for its impressive architecture, historic courtyards and beautiful views across the surrounding hills.",
      },

      {
        id: "city-palace-jaipur",
        name: "City Palace",
        image: "/images/destinations/city-palace-jaipur.jpg",
        description:
          "Explore Jaipur's historic City Palace with its elegant courtyards, royal architecture and fascinating heritage that makes it a popular group sightseeing stop.",
      },

      {
        id: "hawa-mahal",
        name: "Hawa Mahal",
        image: "/images/destinations/hawa-mahal.jpg",
        description:
          "Visit the iconic Hawa Mahal, one of Jaipur's most recognisable landmarks and a memorable stop for groups exploring the Pink City.",
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
      "Travel comfortably to Manali for mountain escapes, group tours, weekend trips and memorable journeys through the Himalayas.",

    gallery: [
      "/images/destinations/mountain.png",
      "/images/destinations/manali-2.jpg",
      "/images/destinations/manali-3.jpg",
    ],

    popularPlaces: [
      {
        id: "solang-valley",
        name: "Solang Valley",
        image: "/images/destinations/solang-valley.jpg",
        description:
          "Enjoy the mountain scenery of Solang Valley, a popular destination for groups looking for beautiful landscapes and outdoor experiences.",
      },

      {
        id: "hadimba-temple",
        name: "Hadimba Temple",
        image: "/images/destinations/hadimba-temple.jpg",
        description:
          "Visit the historic Hadimba Temple surrounded by tall cedar trees, offering a peaceful and memorable sightseeing experience in Manali.",
      },

      {
        id: "mall-road-manali",
        name: "Mall Road",
        image: "/images/destinations/mall-road-manali.jpg",
        description:
          "Explore Mall Road for local shopping, restaurants and a relaxed evening experience while travelling through Manali with your group.",
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
      "Discover Agra with comfortable group transportation for heritage tours, weekend travel and sightseeing around its famous landmarks.",

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
          "Visit the iconic Taj Mahal and experience one of India's most famous heritage landmarks, making it an ideal stop for group sightseeing.",
      },

      {
        id: "agra-fort",
        name: "Agra Fort",
        image: "/images/destinations/agra-fort.jpg",
        description:
          "Explore the historic Agra Fort with its impressive architecture, grand courtyards and fascinating connection to India's Mughal heritage.",
      },

      {
        id: "mehtab-bagh",
        name: "Mehtab Bagh",
        image: "/images/destinations/mehtab-bagh.jpg",
        description:
          "Enjoy views of the Taj Mahal from Mehtab Bagh, a peaceful garden destination that works well as part of an Agra sightseeing itinerary.",
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
      "Travel comfortably to Haridwar for pilgrimage trips, spiritual journeys, sightseeing and organised group travel.",

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
          "Visit Har Ki Pauri, one of Haridwar's most important spiritual landmarks and a popular destination for group pilgrimage journeys.",
      },

      {
        id: "ganga-aarti",
        name: "Ganga Aarti",
        image: "/images/destinations/ganga-aarti.jpg",
        description:
          "Experience the atmosphere of the Ganga Aarti and the spiritual traditions that make Haridwar an important destination for visitors from across India.",
      },

      {
        id: "mansa-devi",
        name: "Mansa Devi Temple",
        image: "/images/destinations/mansa-devi.jpg",
        description:
          "Explore Mansa Devi Temple and enjoy views across Haridwar while experiencing one of the city's important pilgrimage destinations.",
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
      "Experience the charm of Udaipur with comfortable group transportation for sightseeing, tours and memorable journeys.",

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
          "Explore the magnificent City Palace overlooking Lake Pichola, with grand courtyards, historic architecture and panoramic views.",
      },

      {
        id: "lake-pichola",
        name: "Lake Pichola",
        image: "/images/destinations/lake-pichola.png",
        description:
          "Enjoy the peaceful beauty of Lake Pichola, surrounded by palaces, ghats and hills, making it one of Udaipur's most memorable attractions.",
      },

      {
        id: "monsoon-palace",
        name: "Sajjangarh Monsoon Palace",
        image: "/images/destinations/monsoon-palace.png",
        description:
          "Located high above Udaipur, the Monsoon Palace offers beautiful views over the city, surrounding hills and lakes.",
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
      "Plan a comfortable group journey to Goa with reliable coach transportation for beach trips, holidays and group getaways.",

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
          "Baga Beach is one of Goa's popular coastal destinations, known for its lively atmosphere, beach activities, restaurants and relaxed seaside experiences.",
      },

      {
        id: "fort-aguada",
        name: "Fort Aguada",
        image: "/images/destinations/fort-aguada.png",
        description:
          "Visit the historic Fort Aguada for beautiful coastal views and a glimpse into Goa's Portuguese heritage.",
      },

      {
        id: "calangute-beach",
        name: "Calangute Beach",
        image: "/images/destinations/calangute.png",
        description:
          "Calangute offers a lively beach experience with plenty of space for groups to relax, explore local attractions and enjoy Goa's coastline.",
      },
    ],
  },
};
// ============================================================
// SERVICES
// ============================================================

export const servicesData = [
  {
    id: "corporate",
    number: "01",
    title: "Corporate",
    description:
      "Reliable group transportation for meetings, conferences, team travel, employee movement and corporate events.",
    bottomLabel: "Professional group transport",
    icon: "briefcase",
    image: "/images/services/corporate-india.jpg",
    ctaLabel: "Explore Service",
    href: "/fleets",
  },

  {
    id: "group-tours",
    number: "02",
    title: "Group Tours",
    description:
      "Comfortable coaches for sightseeing, multi-city journeys, weekend trips and organised group travel.",
    bottomLabel: "Travel together with ease",
    icon: "map",
    image: "/images/services/group-tours-india.jpg",
    ctaLabel: "Explore Service",
    href: "/fleets",
  },

  {
    id: "events",
    number: "03",
    title: "Events",
    description:
      "Seamless transportation for weddings, celebrations, conferences, exhibitions and large gatherings.",
    bottomLabel: "Coordinated event transport",
    icon: "calendar",
    image: "/images/services/events-india.jpg",
    ctaLabel: "Explore Service",
    href: "/fleets",
  },

  {
    id: "school-trips",
    number: "04",
    title: "School Trips",
    description:
      "Safe and organised group transportation for school excursions, educational trips and student travel.",
    bottomLabel: "Comfortable group travel",
    icon: "graduation-cap",
    image: "/images/services/school-trips-india.jpg",
    ctaLabel: "Explore Service",
    href: "/fleets",
  },

  {
    id: "airport-transfer",
    number: "05",
    title: "Airport Pick Up & Transfer",
    description:
      "Convenient group airport transfers with comfortable vehicles and coordinated pickup and drop-off.",
    bottomLabel: "Easy airport transfers",
    icon: "plane",
    image: "/images/services/airport-transfer-india.jpg",
    ctaLabel: "Explore Service",
    href: "/fleets",
  },

  {
    id: "hotel-transfer",
    number: "06",
    title: "Hotel Pick Up & Transfer",
    description:
      "Reliable hotel transfers for groups travelling together, with convenient pickup and destination coordination.",
    bottomLabel: "Door-to-door convenience",
    icon: "hotel",
    image: "/images/services/hotel-transfer-india.jpg",
    ctaLabel: "Explore Service",
    href: "/fleets",
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
  image: "/fleet/fleet.png",
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

  image: "/fleet/fleet.png",

  imageAlt:
    "Bus Mantra luxury coach for full-bus group charter travel",
};

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


export const footerData = {
  brand: {
    name: "BUS MANTRA",
    tagline: "FULL BUS FLEET PLATFORM",
    description:
      "India's trusted platform for full-bus charters and group road travel. Reserving the entire vehicle for weddings, corporate offsites, school trips, and pilgrimage tours with verified professional chauffeurs.",
    logo: "/logo.png",
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
    ctaHref: "#partner-register",
    subtext: "Fast 2-minute registration",
  },
  copyright:
    "© 2026 Bus Mantra Pvt Ltd. All rights reserved.",
  developer: {
    prefix: "Developed by",
    name: "Kanak Drishti Infotech Pvt. Ltd.",
    href: "https://kanakdrishtiinfo.com",
  },
};