export const heroData = {
  eyebrow: "FULL BUS BOOKING FOR EVERY JOURNEY",
  titlePrefix: "Book Your ",
  highlightedTitle: "Luxury Coach",
  priceText: "@ ₹1/KM",
  description:
    "Perfect for weddings, school trips, corporate events, family tours, and every group journey.",
  primaryButton: {
    label: "Book Bus Now",
    href: "#booking-form",
  },
  secondaryButton: {
    label: "Explore Fleets",
    href: "/fleets",
  },
  image: {
    src: "/hero.png",
    alt: "Bus Mantra Luxury Coach Illustration",
    width: 1436,
    height: 556,
  },
  form: {
    badge: "FULL BUS RESERVATION",
    title: "Quick Bus Charter Search",
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
    submitButton: {
      label: "Find Buses",
    },
    routeSummary: {
      from: "Delhi NCR",
      stop: "Jaipur",
      returnTo: "Delhi NCR",
      tripType: "Return",
      text: "Delhi NCR → Jaipur → Delhi NCR (Return)",
      badge: "Full Coach",
    },
  },
};

export const aboutData = {
  eyebrow: "ABOUT BUS MANTRA",
  heading: {
    line1: "Your Journey.",
    line2: "Our Responsibility.",
  },
  paragraphs: [
    "Bus Mantra makes group travel simple, comfortable and reliable. From weddings and school trips to corporate events and family tours, we help you book the right bus for your journey — without the hassle of coordinating multiple vehicles.",
    "Whether you are planning a short local trip or a multi-day journey, our goal is simple: give your entire group one comfortable ride, one reliable coach and one journey to remember.",
  ],
  cta: {
    label: "Know More About Us",
    href: "/about",
  },
  image: {
    src: "/about-bus.jpg",
    alt: "Bus Mantra Group Transportation Journey",
    width: 1024,
    height: 768,
  },
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
};

export const fleetTypesData = [
  {
    id: "mini-bus",
    name: "MINI BUS",
    description:
      "Compact and comfortable for smaller groups and short-distance journeys.",
    capacity: "15–25 Seats",
    features: ["AC", "Comfortable Seating", "Ideal for Small Groups"],
    image: "/fleet/mini-bus.svg",
    cta: "View Details",
    href: "/fleets/mini-bus",
    isPremium: false,
  },
  {
    id: "standard-coach",
    name: "STANDARD COACH",
    description:
      "A practical choice for school trips, local tours and group transfers.",
    capacity: "30–40 Seats",
    features: ["AC", "Pushback Seats", "Ample Luggage Space"],
    image: "/fleet/standard-coach.svg",
    cta: "View Details",
    href: "/fleets/standard-coach",
    isPremium: false,
  },
  {
    id: "luxury-coach",
    name: "LUXURY COACH",
    description:
      "Premium comfort for weddings, corporate events, family tours and long journeys.",
    capacity: "40–50 Seats",
    features: [
      "Luxury Interior",
      "AC",
      "Pushback Seats",
      "Entertainment",
    ],
    image: "/fleet/luxury-coach.svg",
    cta: "View Details",
    href: "/fleets/luxury-coach",
    isPremium: true,
    badge: "Most Popular",
  },
  {
    id: "sleeper-coach",
    name: "SLEEPER / PREMIUM COACH",
    description:
      "Designed for comfortable long-distance and overnight group journeys.",
    capacity: "30–40 Berths",
    features: [
      "Sleeper Berths",
      "AC",
      "Charging Points",
      "Luggage Space",
    ],
    image: "/fleet/sleeper-coach.svg",
    cta: "View Details",
    href: "/fleets/sleeper-coach",
    isPremium: false,
  },
];

export const fleetSectionData = {
  eyebrow: "OUR FLEET",
  heading: "Popular BUS MANTRA Fleet Types",
  description:
    "Choose the right coach for your group and journey. From compact group transfers to premium luxury coaches, book the entire bus that fits your travel needs.",
  fleets: fleetTypesData,
};

export const holidayPackagesData = [
  {
    id: "jaipur-tour",
    destination: "Jaipur Group Tour",
    destinationBadge: "Rajasthan Heritage",
    busType: "Luxury Coach",
    capacity: "40–50 Passengers",
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
    id: "agra",
    name: "Agra",
    subtitle: "Heritage & History",
    landmark: "Taj Mahal",
    image: "/images/destinations/agra.svg",
    cta: "Explore Destination",
    href: "#booking-form",
    featured: true,
  },
  {
    id: "jaipur",
    name: "Jaipur",
    subtitle: "The Pink City",
    landmark: "Hawa Mahal",
    image: "/images/destinations/jaipur.svg",
    cta: "Explore Destination",
    href: "#booking-form",
    featured: false,
  },
  {
    id: "delhi",
    name: "Delhi",
    subtitle: "Capital City",
    landmark: "India Gate",
    image: "/images/destinations/delhi.svg",
    cta: "Explore Destination",
    href: "#booking-form",
    featured: false,
  },
  {
    id: "manali",
    name: "Manali",
    subtitle: "Mountain Escape",
    landmark: "Himalayan Peaks",
    image: "/images/destinations/manali.svg",
    cta: "Explore Destination",
    href: "#booking-form",
    featured: false,
  },
  {
    id: "goa",
    name: "Goa",
    subtitle: "Coastal Getaway",
    landmark: "Beaches & Palms",
    image: "/images/destinations/goa.svg",
    cta: "Explore Destination",
    href: "#booking-form",
    featured: false,
  },
  {
    id: "udaipur",
    name: "Udaipur",
    subtitle: "The City of Lakes",
    landmark: "City Palace & Lake Pichola",
    image: "/images/destinations/udaipur.svg",
    cta: "Explore Destination",
    href: "#booking-form",
    featured: true,
  },
];

export const destinationsSectionData = {
  eyebrow: "EXPLORE INDIA",
  heading: "Popular Destinations",
  description:
    "Discover popular destinations with comfortable group travel from BUS MANTRA. Book an entire bus and travel together, wherever your journey takes you.",
  destinations: popularDestinationsData,
  secondaryCta: {
    prompt: "Planning a different destination?",
    buttonText: "Explore All Destinations",
    href: "#booking-form",
  },
};

export const servicesData = [
  {
    id: "corporate",
    title: "Corporate",
    category: "BUSINESS TRAVEL",
    description:
      "Reliable group transportation for meetings, conferences, corporate events and employee travel.",
    image: "/images/services/corporate.svg",
    cta: "Explore Service",
    href: "#booking-form",
    featured: true,
    badge: "POPULAR",
  },
  {
    id: "group-tours",
    title: "Group Tours",
    category: "LEISURE & HOLIDAYS",
    description:
      "Travel together comfortably with a dedicated bus for family trips, holidays, excursions and group adventures.",
    image: "/images/services/group-tours.svg",
    cta: "Explore Service",
    href: "#booking-form",
    featured: false,
  },
  {
    id: "events",
    title: "Events",
    category: "WEDDINGS & CELEBRATIONS",
    description:
      "Make transportation simple for weddings, celebrations, exhibitions, conferences and special occasions.",
    image: "/images/services/events.svg",
    cta: "Explore Service",
    href: "#booking-form",
    featured: false,
  },
  {
    id: "school-trips",
    title: "School Trips",
    category: "EDUCATIONAL TOURS",
    description:
      "Comfortable and organized transportation for school excursions, educational tours and student group travel.",
    image: "/images/services/school-trips.svg",
    cta: "Explore Service",
    href: "#booking-form",
    featured: false,
  },
  {
    id: "airport-transfer",
    title: "Airport Pick Up & Transfer",
    category: "AIRPORT TRANSFERS",
    description:
      "Convenient full-bus airport transfers for groups, with comfortable pickup and drop-off coordination.",
    image: "/images/services/airport-transfer.svg",
    cta: "Explore Service",
    href: "#booking-form",
    featured: false,
  },
  {
    id: "hotel-transfer",
    title: "Hotel Pick Up & Transfer",
    category: "HOSPITALITY TRANSFERS",
    description:
      "Easy and reliable group transfers between hotels, destinations, venues and transport hubs.",
    image: "/images/services/hotel-transfer.svg",
    cta: "Explore Service",
    href: "#booking-form",
    featured: false,
  },
];

export const servicesSectionData = {
  eyebrow: "WHAT WE OFFER",
  heading: "Services Bus Mantra Provides",
  description:
    "From corporate travel and school trips to events, airport transfers and group holidays, BUS MANTRA provides comfortable full-bus transportation for every occasion.",
  services: servicesData,
  bottomCta: {
    prompt: "Planning transportation for your next group journey?",
    buttonText: "Book Your Bus",
    href: "#booking-form",
  },
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

export const ctaData = {
  eyebrow: "READY TO TRAVEL TOGETHER?",
  title: "Your Group. One Bus. One Journey.",
  titleLines: ["Your Group.", "One Bus.", "One Journey."],
  description:
    "From weddings and school trips to corporate events and holidays, book a comfortable bus for your entire group and travel together with ease.",
  primaryButton: {
    label: "Book Your Bus",
    href: "#booking-form",
  },
  secondaryButton: {
    label: "Request a Quote",
    href: "#booking-form",
  },
  reassurance: "Quick response • Flexible options • Dedicated group travel",
  reassuranceItems: [
    "Quick response",
    "Flexible options",
    "Dedicated group travel",
  ],
  image: "/images/cta/cta-coach.svg",
};

export const footerData = {
  brand: {
    name: "BUS MANTRA",
    tagline: "FULL BUS CHARTER PLATFORM",
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
    { label: "Home", href: "/" },
    { label: "About Us", href: "#about" },
    { label: "Bus Mantra Fleets", href: "#fleets" },
    { label: "Destinations", href: "#destinations" },
    { label: "Services", href: "#services" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact Us", href: "#booking-form" },
  ],
  fleets: [
    { label: "Volvo Multi-Axle", href: "#fleets" },
    { label: "BharatBenz Sleeper", href: "#fleets" },
    { label: "Mini Buses (12–20 Seats)", href: "#fleets" },
    { label: "Luxury Highway Coaches", href: "#fleets" },
    { label: "Mercedes VIP Coach", href: "#fleets" },
    { label: "Explore All Fleets →", href: "#fleets", isCta: true },
  ],
  services: [
    { label: "Corporate Offsites", href: "#services" },
    { label: "Wedding Transportation", href: "#services" },
    { label: "Group & Family Tours", href: "#services" },
    { label: "School & College Trips", href: "#services" },
    { label: "Airport Pick-up & Transfer", href: "#services" },
    { label: "Pilgrimage Circuits", href: "#services" },
    { label: "All Services →", href: "#services", isCta: true },
  ],
  destinations: [
    { label: "Jaipur (Pink City)", href: "#destinations" },
    { label: "Agra & Taj Mahal", href: "#destinations" },
    { label: "Delhi NCR Hub", href: "#destinations" },
    { label: "Udaipur (Lake City)", href: "#destinations" },
    { label: "Manali & Himachal", href: "#destinations" },
    { label: "Goa Beach Circuits", href: "#destinations" },
    { label: "All Destinations →", href: "#destinations", isCta: true },
  ],
  partner: {
    eyebrow: "PARTNER WITH US",
    title: "Become A Vendor",
    description:
      "Bus operator or fleet owner? Partner with Bus Mantra to get verified corporate, wedding & holiday charter bookings with guaranteed payouts.",
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
    "© 2026 Bus Mantra Pvt Ltd. All rights reserved. Full Bus Charter Marketplace.",
  developer: {
    prefix: "Developed by",
    name: "Kanak Drishti Infotech Pvt. Ltd.",
    href: "https://kanakdrishtiinfo.com",
  },
};