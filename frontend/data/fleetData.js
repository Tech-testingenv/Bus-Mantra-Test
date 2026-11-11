/**
 * Centralized Fleet and Vehicle Variant Data Architecture
 * Defines 5 primary fleet categories and 18 specific vehicle variants.
 */

// -------------------------------------------------------------
// SHARED VEHICLE DATA
// -------------------------------------------------------------

const COMMON_INCLUSIONS = [
  "Dedicated Vehicle & Chauffeur",
  "Fuel, Toll & Interstate Permits",
  "Driver Night Allowances",
  "Standard 5% Transport GST",
  "24/7 Operations Support",
];

const VEHICLE_TEMPLATES = {
  "tempo-traveller": {
    vehicleType: "Luxury Tourist Tempo Traveller",
    image: "/fleet/12_seater_maharaja_tempo_traveller_1.png",
    gallery: [
      "/fleet/12_seater_maharaja_tempo_traveller_1.png",
      "/fleet/12_seater_maharaja_tempo_traveller_2.png",
      "/fleet/maharaja_tempo_traveller.jpg",
    ],
    climate: "Dual AC Climate Control",
    entertainment: "Music System & PA Mic",
    washroom: "Not Available",
    charging: "USB Charging Points",
    amenities: [
      "Air Conditioning & Climate Control",
      "Comfortable Reclining Seats",
      "Dedicated Luggage Space",
      "Music System & PA Mic",
      "USB Charging Points",
      "First Aid Kit & Fire Safety",
    ],
  },

  "force-urbania": {
    vehicleType: "Modern Monocoque Tourist Van",
    image: "/fleet/bus_mantra_luxury_force_urbania.png",
    gallery: ["/fleet/bus_mantra_luxury_force_urbania.png"],
    climate: "Dual Zone Air Conditioning",
    entertainment: "Multimedia Screen & Audio System",
    washroom: "Not Available",
    charging: "USB Charging Points",
    amenities: [
      "Silent Monocoque Cabin",
      "Premium Reclining Seats",
      "Independent Front Suspension",
      "Dual Zone Air Conditioning",
      "USB Charging Points",
      "Panoramic Windows",
    ],
  },

  "tata-luxury-coach": {
    vehicleType: "Tata Luxury Tourist Coach",
    image: "/fleet/45-49_seater_tata_luxury_coach_1.png",
    gallery: [
      "/fleet/45-49_seater_tata_luxury_coach_1.png",
      "/fleet/45-49_seater_tata_luxury_coach_2.png",
    ],
    climate: "High-Capacity Dual AC",
    entertainment: "HD Display & Audio System",
    washroom: "Not Available",
    charging: "USB Charging Points",
    amenities: [
      "Powerful Air Conditioning",
      "Comfortable Reclining Seats",
      "Large Undercarriage Luggage Space",
      "HD Display & PA Audio System",
      "USB Charging Points",
      "Highway Safety Equipment",
    ],
  },

  "bharat-benz-coach": {
    vehicleType: "Bharat Benz Luxury Tourist Coach",
    image: "/fleet/bus_mantra_bharatbenz.png",
    gallery: ["/fleet/bus_mantra_bharatbenz.png"],
    climate: "Multi-Zone Automatic AC",
    entertainment: "LED Screens & Hi-Fi Audio",
    washroom: "Not Available",
    charging: "Individual USB Charging Ports",
    amenities: [
      "Air Suspension Highway Ride",
      "Comfortable Reclining Seats",
      "Large Luggage Storage",
      "LED Entertainment Screens",
      "Individual USB Charging Ports",
      "Electronic Braking & ABS",
    ],
  },

  "volvo-coach": {
    vehicleType: "Volvo Multi-Axle Luxury Coach",
    image: "/fleet/40_seater_volvo_with_washroom_1.png",
    gallery: [
      "/fleet/40_seater_volvo_with_washroom_1.png",
      "/fleet/40_seater_volvo_with_washroom_2.png",
    ],
    climate: "Multi-Zone Automatic Climate Control",
    entertainment: "Dual Full-HD Displays & Surround Audio",
    charging: "Individual USB & AC Sockets",
    amenities: [
      "Electronically Controlled Air Suspension",
      "Ultra-Luxury Reclining Seats",
      "Expansive Undercarriage Luggage Space",
      "Dual Full-HD Displays & Audio",
      "Individual AC Vents & Reading Lamps",
      "Individual Charging Sockets",
    ],
  },
};

// -------------------------------------------------------------
// ALL 18 VEHICLE VARIANTS
// -------------------------------------------------------------

export const FLEET_VEHICLE_VARIANTS = [
  // -------------------------------------------------------------
  // TEMPO TRAVELLER RANGE (4 VARIANTS)
  // -------------------------------------------------------------

  {
    id: "12-seater-maharaja-tempo-traveller-1x1",
    slug: "12-seater-maharaja-tempo-traveller-1x1",
    name: "12 Seater Maharaja Tempo Traveller (1×1)",
    shortName: "12S Maharaja (1×1)",
    categorySlug: "tempo-traveller",
    categoryName: "Tempo Traveller",
    capacity: "12 Seats",
    seats: 12,
    minSeats: 1,
    maxSeats: 12,
    layout: "1×1 Maharaja Layout",
    ratePerKm: 28,
    description:
      "Ultra-luxury Maharaja seating with premium plush recliners, generous personal space, and executive travel comfort.",
    features: {
      luggage: "12–15 Standard Bags",
      climate: "Front & Rear Dual AC Vents",
      seats: "1×1 Maharaja Push-Back Recliners",
      entertainment: "LED TV & Stereo Audio with PA Mic",
      washroom: "Not Available",
      charging: "Individual USB Ports",
      recliner: "Plush Recliners with Calf Support",
    },
    ...VEHICLE_TEMPLATES["tempo-traveller"],
    amenities: [
      "AC & Dual Climate Control",
      "1×1 Maharaja Reclining Seats",
      "Dedicated Boot Luggage Space",
      "Music System & PA Mic",
      "USB Charging at Every Seat",
      "First Aid Kit & Fire Safety",
    ],
    inclusions: COMMON_INCLUSIONS,
  },

  {
    id: "16-seater-tempo-traveller-2x1",
    slug: "16-seater-tempo-traveller-2x1",
    name: "16 Seater Tempo Traveller (2×1)",
    shortName: "16S Executive (2×1)",
    categorySlug: "tempo-traveller",
    categoryName: "Tempo Traveller",
    capacity: "16 Seats",
    seats: 16,
    minSeats: 13,
    maxSeats: 16,
    layout: "2×1 Recliner Layout",
    ratePerKm: 27,
    description:
      "A spacious 16-seater tempo traveller featuring comfortable push-back recliners, dual AC blowers, and rear luggage space.",
    features: {
      luggage: "15–18 Standard Bags",
      climate: "Dual Overhead AC Vents",
      seats: "2×1 Executive Push-Back Seats",
      entertainment: "LCD Screen & Audio System",
      washroom: "Not Available",
      charging: "USB Charging at Every Row",
      recliner: "Comfortable Push-Back Recliners",
    },
    ...VEHICLE_TEMPLATES["tempo-traveller"],
    amenities: [
      "Individual AC Vents",
      "Push-Back Reclining Seats",
      "Rear Boot Luggage Space",
      "Music System",
      "USB Charging Points",
      "Emergency Exit & First Aid",
    ],
    inclusions: COMMON_INCLUSIONS,
  },

  {
    id: "20-seater-tempo-traveller-2x1",
    slug: "20-seater-tempo-traveller-2x1",
    name: "20 Seater Tempo Traveller (2×1)",
    shortName: "20S Coach (2×1)",
    categorySlug: "tempo-traveller",
    categoryName: "Tempo Traveller",
    capacity: "20 Seats",
    seats: 20,
    minSeats: 17,
    maxSeats: 20,
    layout: "2×1 Recliner Layout",
    ratePerKm: 30,
    description:
      "An extended-wheelbase 20-seater traveller designed for medium-sized tour groups, wedding transfers, and corporate outings.",
    features: {
      luggage: "18–22 Bags",
      climate: "High-Capacity Dual AC",
      seats: "2×1 Luxury Recliners",
      entertainment: "Audio System & Wireless Mic",
      washroom: "Not Available",
      charging: "Charging at Every Row",
      recliner: "Deep Reclining Seats",
    },
    ...VEHICLE_TEMPLATES["tempo-traveller"],
    amenities: [
      "High-Capacity Dual AC",
      "2×1 Luxury Reclining Seats",
      "Spacious Luggage Hold",
      "Surround Sound & PA Mic",
      "Row-Wise USB Charging",
      "First Aid Kit & Fire Safety",
    ],
    inclusions: COMMON_INCLUSIONS,
  },

  {
    id: "26-seater-tempo-traveller-2x2",
    slug: "26-seater-tempo-traveller-2x2",
    name: "26 Seater Tempo Traveller (2×2)",
    shortName: "26S Large (2×2)",
    categorySlug: "tempo-traveller",
    categoryName: "Tempo Traveller",
    capacity: "26 Seats",
    seats: 26,
    minSeats: 21,
    maxSeats: 26,
    layout: "2×2 Pushback Layout",
    ratePerKm: 34,
    description:
      "A high-capacity 26-seater tempo traveller offering comfortable 2×2 seating, powerful air conditioning, and luggage space for larger groups.",
    features: {
      luggage: "22–26 Standard Bags",
      climate: "Multi-Zone Powerful AC",
      seats: "2×2 Pushback Reclining Seats",
      entertainment: "Stereo Audio & Mic",
      washroom: "Not Available",
      charging: "Charging Ports across Cabin",
      recliner: "Highback Pushback Seats",
    },
    ...VEHICLE_TEMPLATES["tempo-traveller"],
    amenities: [
      "Multi-Zone Air Conditioning",
      "2×2 Pushback Recliners",
      "Dedicated Rear Luggage Bay",
      "PA Mic & Audio System",
      "Mobile Charging Ports",
      "Safety Equipment",
    ],
    inclusions: COMMON_INCLUSIONS,
  },

  // -------------------------------------------------------------
  // FORCE URBANIA RANGE (2 VARIANTS)
  // -------------------------------------------------------------

  {
    id: "12-seater-maharaja-force-urbania-1x1",
    slug: "12-seater-maharaja-force-urbania-1x1",
    name: "12 Seater Maharaja Force Urbania (1×1)",
    shortName: "12S Urbania Maharaja (1×1)",
    categorySlug: "force-urbania",
    categoryName: "Force Urbania",
    capacity: "12 Seats",
    seats: 12,
    minSeats: 1,
    maxSeats: 12,
    layout: "1×1 VIP Maharaja Layout",
    ratePerKm: 35,
    description:
      "A premium Force Urbania featuring bespoke 1×1 VIP Maharaja seating, a quiet monocoque cabin, and executive travel comfort.",
    features: {
      luggage: "12–15 Bags",
      climate: "Monocoque Silent Dual AC",
      seats: "1×1 VIP Maharaja Captain Seats",
      entertainment: "Full HD TV & Surround Audio",
      washroom: "Not Available",
      charging: "Fast USB-C / USB-A at Every Seat",
      recliner: "Calf-Support Deep Recliners",
    },
    ...VEHICLE_TEMPLATES["force-urbania"],
    amenities: [
      "Silent Monocoque Cabin",
      "1×1 VIP Maharaja Captain Seats",
      "Independent Front Suspension",
      "Full HD Display & Sound",
      "USB-C & USB-A Fast Charging",
      "Panoramic Glass Windows",
    ],
    inclusions: COMMON_INCLUSIONS,
  },

  {
    id: "16-seater-force-urbania-2x1",
    slug: "16-seater-force-urbania-2x1",
    name: "16 Seater Force Urbania (2×1)",
    shortName: "16S Urbania Executive (2×1)",
    categorySlug: "force-urbania",
    categoryName: "Force Urbania",
    capacity: "16 Seats",
    seats: 16,
    minSeats: 13,
    maxSeats: 16,
    layout: "2×1 Executive Layout",
    ratePerKm: 36,
    description:
      "A modern Force Urbania combining monocoque styling, independent suspension, dual-zone air conditioning, and comfortable 2×1 seating.",
    features: {
      luggage: "15–18 Bags",
      climate: "Individual Overhead AC Vents",
      seats: "2×1 Executive Recliners",
      entertainment: "Multimedia Screen & PA Mic",
      washroom: "Not Available",
      charging: "USB Charging Slots",
      recliner: "Ergonomic Recliners",
    },
    ...VEHICLE_TEMPLATES["force-urbania"],
    amenities: [
      "Next-Gen Monocoque Comfort",
      "2×1 Executive Reclining Seats",
      "Independent Coil Spring Ride",
      "Individual Reading Lights & AC",
      "USB Charging at Every Row",
      "ABS, EBD & Safety Features",
    ],
    inclusions: COMMON_INCLUSIONS,
  },

  // -------------------------------------------------------------
  // PREMIUM MAHARAJA LUXURY COACHES (2 VARIANTS)
  // -------------------------------------------------------------

  {
    id: "18-21-seater-maharaja-tata-luxury-coach-2x1",
    slug: "18-21-seater-maharaja-tata-luxury-coach-2x1",
    name: "18/21 Seater Maharaja Tata Luxury Coach (2×1)",
    shortName: "18/21S Tata Maharaja (2×1)",
    categorySlug: "tata-luxury-coach",
    categoryName: "Tata Luxury Coach",
    displayGroup: "premium-maharaja-luxury-coaches",
    displayGroupName: "Premium Maharaja Luxury Coaches",
    capacity: "18/21 Seats",
    seats: 21,
    minSeats: 17,
    maxSeats: 21,
    layout: "2×1 Maharaja Recliner Layout",
    ratePerKm: 38,
    description:
      "A custom-crafted Tata luxury midi-coach featuring wide 2×1 Maharaja recliners, comfortable interiors, and executive travel amenities.",
    features: {
      luggage: "20–25 Bags",
      climate: "Powerful Overhead AC",
      seats: "2×1 Maharaja Wide Recliners",
      entertainment: "LCD TV & Stereo Audio",
      washroom: "Not Available",
      charging: "Charging at Every Seat",
      recliner: "Maharaja Calf-Rest Recliners",
    },
    ...VEHICLE_TEMPLATES["tata-luxury-coach"],
    amenities: [
      "Air Suspension Ride",
      "2×1 Maharaja Wide Recliners",
      "Underfloor Luggage Hold",
      "LCD TV & PA Audio System",
      "Individual Reading Lights",
      "USB Charging Points",
    ],
    inclusions: COMMON_INCLUSIONS,
  },

  {
    id: "18-21-seater-maharaja-bharat-benz-coach-2x1",
    slug: "18-21-seater-maharaja-bharat-benz-coach-2x1",
    name: "18/21 Seater Maharaja Bharat Benz Coach (2×1)",
    shortName: "18/21S Bharat Benz Maharaja (2×1)",
    categorySlug: "bharat-benz-coach",
    categoryName: "Bharat Benz Coach",
    displayGroup: "premium-maharaja-luxury-coaches",
    displayGroupName: "Premium Maharaja Luxury Coaches",
    capacity: "18/21 Seats",
    seats: 21,
    minSeats: 17,
    maxSeats: 21,
    layout: "2×1 Maharaja Club Class Layout",
    ratePerKm: 42,
    description:
      "A luxury Bharat Benz coach featuring plush 2×1 Maharaja seating, individual USB ports, and a comfortable cabin for long-distance travel.",
    features: {
      luggage: "20–25 Bags",
      climate: "Individual AC Vents",
      seats: "2×1 Maharaja Club Class Recliners",
      entertainment: "LED Screen & Hi-Fi Audio",
      washroom: "Not Available",
      charging: "USB Charging at Every Seat",
      recliner: "Ultra-Plush Calf-Support Recliners",
    },
    ...VEHICLE_TEMPLATES["bharat-benz-coach"],
    amenities: [
      "Anti-Roll Safety Chassis",
      "2×1 Maharaja Club Class Seats",
      "Underfloor Large Luggage Space",
      "Hi-Fi Audio & LED Entertainment",
      "USB Port at Every Seat",
      "Emergency Exit Doors",
    ],
    inclusions: COMMON_INCLUSIONS,
  },

  // -------------------------------------------------------------
  // TATA LUXURY COACH RANGE (3 VARIANTS)
  // -------------------------------------------------------------

  {
    id: "27-seater-tata-luxury-coach-2x2",
    slug: "27-seater-tata-luxury-coach-2x2",
    name: "27 Seater Tata Luxury Coach (2×2)",
    shortName: "27S Tata Coach (2×2)",
    categorySlug: "tata-luxury-coach",
    categoryName: "Tata Luxury Coach",
    capacity: "27 Seats",
    seats: 27,
    minSeats: 22,
    maxSeats: 27,
    layout: "2×2 Executive Layout",
    ratePerKm: 42,
    description:
      "An ergonomic 27-seater Tata coach suitable for corporate transport, sports teams, wedding groups, and mid-sized tours.",
    features: {
      luggage: "25–30 Bags",
      climate: "Individual AC Vents",
      seats: "2×2 Executive Recliners",
      entertainment: "HD Screen & Audio",
      washroom: "Not Available",
      charging: "USB Charging Points",
      recliner: "Pushback Seats",
    },
    ...VEHICLE_TEMPLATES["tata-luxury-coach"],
    amenities: [
      "Roof-Mounted Dual AC",
      "2×2 Executive Reclining Seats",
      "Underfloor Luggage Hold",
      "HD Screen & Mic",
      "USB Sockets across Rows",
      "Highway Safety Equipment",
    ],
    inclusions: COMMON_INCLUSIONS,
  },

  {
    id: "45-49-seater-tata-luxury-coach-2x2",
    slug: "45-49-seater-tata-luxury-coach-2x2",
    name: "45/49 Seater Tata Luxury Coach (2×2)",
    shortName: "45/49S Tata Coach (2×2)",
    categorySlug: "tata-luxury-coach",
    categoryName: "Tata Luxury Coach",
    capacity: "45/49 Seats",
    seats: 49,
    minSeats: 28,
    maxSeats: 49,
    layout: "2×2 Plush Recliner Layout",
    ratePerKm: 46,
    description:
      "A full-sized Tata tourist coach with comfortable push-back seats, powerful roof-mounted AC, and a large luggage hold.",
    features: {
      luggage: "45–50 Large Suitcases",
      climate: "Roof-Mounted Heavy AC",
      seats: "2×2 Plush Push-Back Recliners",
      entertainment: "Dual Full-HD Displays & Sound System",
      washroom: "Not Available",
      charging: "USB Charging Ports",
      recliner: "Plush Recliners",
    },
    ...VEHICLE_TEMPLATES["tata-luxury-coach"],
    amenities: [
      "Roof-Mounted Heavy Climate AC",
      "2×2 Plush Pushback Seats",
      "Large Undercarriage Luggage Bay",
      "Dual Full-HD Displays & PA Mic",
      "Row-Wise Charging Ports",
      "First Aid & Fire Extinguishers",
    ],
    inclusions: COMMON_INCLUSIONS,
  },

  {
    id: "53-seater-tata-luxury-coach-2x2",
    slug: "53-seater-tata-luxury-coach-2x2",
    name: "53 Seater Tata Luxury Coach (2×2)",
    shortName: "53S Tata Coach (2×2)",
    categorySlug: "tata-luxury-coach",
    categoryName: "Tata Luxury Coach",
    capacity: "53 Seats",
    seats: 53,
    minSeats: 50,
    maxSeats: 53,
    layout: "2×2 High-Capacity Layout",
    ratePerKm: 52,
    description:
      "A high-capacity Tata passenger coach designed for large group tours, school excursions, conventions, and pilgrim travel.",
    features: {
      luggage: "50+ Large Suitcases",
      climate: "High-Capacity Dual AC Blowers",
      seats: "2×2 High-Comfort Seats",
      entertainment: "PA Mic & Audio System",
      washroom: "Not Available",
      charging: "Row-Wise Charging",
      recliner: "Ergonomic Highback Seats",
    },
    ...VEHICLE_TEMPLATES["tata-luxury-coach"],
    amenities: [
      "High-Capacity Twin Blowers AC",
      "2×2 Highback Comfort Seats",
      "Massive Underfloor Storage",
      "PA Audio System for Guides",
      "USB Ports",
      "Highway Safety Equipment",
    ],
    inclusions: COMMON_INCLUSIONS,
  },

  // -------------------------------------------------------------
  // BHARAT BENZ LUXURY COACHES (1 VARIANT)
  // -------------------------------------------------------------

  {
    id: "45-seater-bharat-benz-coach-2x2",
    slug: "45-seater-bharat-benz-coach-2x2",
    name: "45 Seater Luxury Bharat Benz Bus and Coaches (2×2)",
    shortName: "45S Bharat Benz Luxury (2×2)",
    categorySlug: "bharat-benz-coach",
    categoryName: "Bharat Benz Coach",
    capacity: "45 Seats",
    seats: 45,
    minSeats: 28,
    maxSeats: 45,
    layout: "2×2 Luxury Recliner Layout",
    ratePerKm: 50,
    description:
      "A premium Bharat Benz luxury coach with comfortable 2×2 reclining seats, air-conditioned interiors, and spacious luggage storage.",
    features: {
      luggage: "45–50 Large Suitcases",
      climate: "Multi-Zone Automatic AC",
      seats: "2×2 Luxury Recliners",
      entertainment: "Dual LED Displays & Audio System",
      washroom: "Not Available",
      charging: "USB Charging Ports",
      recliner: "Club Class Recliners",
    },
    ...VEHICLE_TEMPLATES["bharat-benz-coach"],
    amenities: [
      "Air Suspension Highway Ride",
      "2×2 Luxury Reclining Seats",
      "Acoustically Insulated Cabin",
      "Dual LED Screens & Audio",
      "Individual USB Sockets",
      "Electronic Braking & ABS",
    ],
    inclusions: COMMON_INCLUSIONS,
  },

  // -------------------------------------------------------------
  // VOLVO LUXURY COACHES (6 VARIANTS)
  // -------------------------------------------------------------

  {
    id: "40-seater-volvo-with-washroom-2x2",
    slug: "40-seater-volvo-with-washroom-2x2",
    name: "40 Seater Luxury Volvo Bus/Coaches With Washroom (2×2)",
    shortName: "40S Volvo With Washroom (2×2)",
    categorySlug: "volvo-coach",
    categoryName: "Volvo Coach",
    capacity: "40 Seats",
    seats: 40,
    minSeats: 1,
    maxSeats: 40,
    layout: "2×2 Luxury Recliner Layout with Washroom",
    ratePerKm: 60,
    description:
      "A luxury Volvo coach featuring an onboard washroom, multi-zone climate control, air suspension, and comfortable reclining seats for long-distance journeys.",
    ...VEHICLE_TEMPLATES["volvo-coach"],
    image: "/fleet/40_seater_volvo_with_washroom_1.png",
    gallery: [
      "/fleet/40_seater_volvo_with_washroom_1.png",
      "/fleet/40_seater_volvo_with_washroom_2.png",
    ],
    features: {
      luggage: "50+ Large Suitcases",
      climate: "Multi-Zone Automatic Climate Control",
      seats: "2×2 Ultra-Luxury Recliners with Calf Rest",
      entertainment: "Dual Full-HD Displays & Surround Audio",
      washroom: "Available (Onboard Chemical Restroom)",
      charging: "Individual Sockets & USB",
      recliner: "Calf-Rest Luxury Recliner",
    },
    amenities: [
      "Onboard Clean Chemical Washroom",
      "Electronically Controlled Air Suspension",
      "2×2 Calf-Rest Ultra-Luxury Recliners",
      "Multi-Zone Automatic Climate Control",
      "Dual Full-HD Displays & Surround Audio",
      "Individual AC Vents, Lights & Sockets",
    ],
    inclusions: COMMON_INCLUSIONS,
  },

  {
    id: "40-seater-volvo-without-washroom-2x2",
    slug: "40-seater-volvo-without-washroom-2x2",
    name: "40 Seater Luxury Volvo Bus/Coaches Without Washroom (2×2)",
    shortName: "40S Volvo Without Washroom (2×2)",
    categorySlug: "volvo-coach",
    categoryName: "Volvo Coach",
    capacity: "40 Seats",
    seats: 40,
    minSeats: 1,
    maxSeats: 40,
    layout: "2×2 Ultra-Luxury Layout",
    ratePerKm: 56,
    description:
      "A premium Volvo multi-axle coach with air suspension, dual AC climate control, and comfortable luxury seating for long-haul travel.",
    ...VEHICLE_TEMPLATES["volvo-coach"],
    features: {
      luggage: "50+ Large Suitcases",
      climate: "Multi-Zone Automatic Climate Control",
      seats: "2×2 Volvo Executive Plush Recliners",
      entertainment: "Dual LED Screens & Wireless Mic",
      washroom: "Not Available",
      charging: "Individual USB & AC Sockets",
      recliner: "Ultra-Luxury Ergonomic Recliner",
    },
    amenities: [
      "Electronically Controlled Air Suspension",
      "2×2 Volvo Executive Plush Recliners",
      "Expansive Underfloor Luggage Hold",
      "Dual LED Screens & Wireless Mic",
      "Individual AC Vents & Reading Lamps",
      "Individual Charging Sockets",
    ],
    inclusions: COMMON_INCLUSIONS,
  },

  {
    id: "41-41-seater-volvo-with-washroom-2x2",
    slug: "41-41-seater-volvo-with-washroom-2x2",
    name: "41/41 Seater Luxury Volvo Bus/Coaches With Washroom (2×2)",
    shortName: "41/41S Volvo With Washroom (2×2)",
    categorySlug: "volvo-coach",
    categoryName: "Volvo Coach",
    capacity: "41/41 Seats",
    seats: 41,
    minSeats: 1,
    maxSeats: 41,
    layout: "2×2 Luxury Recliner Layout with Washroom",
    ratePerKm: 60,
    description:
      "A 41-seater Volvo luxury coach with an onboard washroom, premium reclining seats, and climate-controlled interiors for comfortable group journeys.",
    ...VEHICLE_TEMPLATES["volvo-coach"],
    features: {
      luggage: "50+ Large Suitcases",
      climate: "Multi-Zone Automatic Climate Control",
      seats: "2×2 Ultra-Luxury Recliners",
      entertainment: "Dual Full-HD Displays & Audio",
      washroom: "Available (Onboard Chemical Restroom)",
      charging: "Individual USB & AC Sockets",
      recliner: "Luxury Reclining Seats",
    },
    amenities: [
      "Onboard Clean Chemical Washroom",
      "Electronically Controlled Air Suspension",
      "2×2 Ultra-Luxury Recliners",
      "Multi-Zone Automatic Climate Control",
      "Dual Full-HD Displays & Audio",
      "Individual AC Vents & Charging Sockets",
    ],
    inclusions: COMMON_INCLUSIONS,
  },

  {
    id: "41-seater-volvo-without-washroom-2x2",
    slug: "41-seater-volvo-without-washroom-2x2",
    name: "41 Seater Luxury Volvo Bus/Coaches Without Washroom (2×2)",
    shortName: "41S Volvo Without Washroom (2×2)",
    categorySlug: "volvo-coach",
    categoryName: "Volvo Coach",
    capacity: "41 Seats",
    seats: 41,
    minSeats: 1,
    maxSeats: 41,
    layout: "2×2 Ultra-Luxury Layout",
    ratePerKm: 56,
    description:
      "A luxury 41-seater Volvo coach offering a spacious cabin, electronically controlled air suspension, and comfortable reclining seats.",
    ...VEHICLE_TEMPLATES["volvo-coach"],
    features: {
      luggage: "50+ Large Suitcases",
      climate: "Multi-Zone Automatic Climate Control",
      seats: "2×2 Volvo Executive Recliners",
      entertainment: "Dual LED Screens & Wireless Mic",
      washroom: "Not Available",
      charging: "Individual USB & AC Sockets",
      recliner: "Ultra-Luxury Ergonomic Recliner",
    },
    amenities: [
      "Electronically Controlled Air Suspension",
      "2×2 Volvo Executive Recliners",
      "Expansive Underfloor Luggage Hold",
      "Dual LED Screens & Wireless Mic",
      "Individual AC Vents & Reading Lamps",
      "Individual Charging Sockets",
    ],
    inclusions: COMMON_INCLUSIONS,
  },

  {
    id: "45-seater-volvo-without-washroom-2x2",
    slug: "45-seater-volvo-without-washroom-2x2",
    name: "45 Seater Luxury Volvo Bus/Coaches Without Washroom (2×2)",
    shortName: "45S Volvo Without Washroom (2×2)",
    categorySlug: "volvo-coach",
    categoryName: "Volvo Coach",
    capacity: "45 Seats",
    seats: 45,
    minSeats: 42,
    maxSeats: 45,
    layout: "2×2 Ultra-Luxury Layout",
    ratePerKm: 56,
    description:
      "A 45-seater Volvo luxury coach featuring a spacious passenger cabin, powerful air conditioning, and comfortable reclining seats for group travel.",
    ...VEHICLE_TEMPLATES["volvo-coach"],
    features: {
      luggage: "50+ Large Suitcases",
      climate: "Multi-Zone Automatic Climate Control",
      seats: "2×2 Volvo Executive Plush Recliners",
      entertainment: "Dual LED Screens & Wireless Mic",
      washroom: "Not Available",
      charging: "Individual USB & AC Sockets",
      recliner: "Ultra-Luxury Ergonomic Recliner",
    },
    amenities: [
      "Electronically Controlled Air Suspension",
      "2×2 Volvo Executive Plush Recliners",
      "Expansive Underfloor Luggage Hold",
      "Dual LED Screens & Wireless Mic",
      "Individual AC Vents & Reading Lamps",
      "Individual Charging Sockets",
    ],
    inclusions: COMMON_INCLUSIONS,
  },

  {
    id: "45-seater-volvo-with-washroom-2x2",
    slug: "45-seater-volvo-with-washroom-2x2",
    name: "45 Seater Luxury Volvo Bus/Coaches With Washroom (2×2)",
    shortName: "45S Volvo With Washroom (2×2)",
    categorySlug: "volvo-coach",
    categoryName: "Volvo Coach",
    capacity: "45 Seats",
    seats: 45,
    minSeats: 42,
    maxSeats: 45,
    layout: "2×2 Luxury Recliner Layout with Washroom",
    ratePerKm: 60,
    description:
      "A 45-seater Volvo luxury coach with an onboard washroom, multi-zone climate control, air suspension, and premium reclining seats.",
    ...VEHICLE_TEMPLATES["volvo-coach"],
    features: {
      luggage: "50+ Large Suitcases",
      climate: "Multi-Zone Automatic Climate Control",
      seats: "2×2 Ultra-Luxury Recliners with Calf Rest",
      entertainment: "Dual Full-HD Displays & Surround Audio",
      washroom: "Available (Onboard Chemical Restroom)",
      charging: "Individual USB & AC Sockets",
      recliner: "Calf-Rest Luxury Recliner",
    },
    amenities: [
      "Onboard Clean Chemical Washroom",
      "Electronically Controlled Air Suspension",
      "2×2 Ultra-Luxury Recliners",
      "Multi-Zone Automatic Climate Control",
      "Dual Full-HD Displays & Surround Audio",
      "Individual AC Vents & Charging Sockets",
    ],
    inclusions: COMMON_INCLUSIONS,
  },
];

// -------------------------------------------------------------
// PREMIUM MAHARAJA DISPLAY GROUP
// -------------------------------------------------------------

export const FLEET_DISPLAY_GROUPS = [
  {
    id: "premium-maharaja-luxury-coaches",
    slug: "premium-maharaja-luxury-coaches",
    name: "Premium Maharaja Luxury Coaches",
    description:
      "Premium Maharaja coach options from Tata and Bharat Benz.",
    vehicleTypes: FLEET_VEHICLE_VARIANTS.filter(
      (vehicle) =>
        vehicle.displayGroup === "premium-maharaja-luxury-coaches"
    ),
  },
];

// -------------------------------------------------------------
// 5 PRIMARY FLEET CATEGORIES
// -------------------------------------------------------------

export const FLEET_CATEGORIES = [
  {
    id: "tempo-traveller",
    slug: "tempo-traveller",
    legacySlugs: ["mini-coach", "tempo-traveler"],
    name: "Tempo Traveller",
    badge: "EXECUTIVE FLEET",
    isPopular: true,
    capacity: "12–26 Seats",
    minSeats: 1,
    maxSeats: 26,
    ratePerKm: 27,
    image: "/fleet/12_seater_maharaja_tempo_traveller_1.png",
    gallery: [
      "/fleet/12_seater_maharaja_tempo_traveller_1.png",
      "/fleet/12_seater_maharaja_tempo_traveller_2.png",
      "/fleet/maharaja_tempo_traveller.jpg",
    ],
    description:
      "Versatile, agile, and spacious passenger vans ideal for family getaways, corporate offsites, airport pickups, and intimate wedding groups.",
    amenities: [
      "AC & Climate Control",
      "Push-Back Reclining Seats",
      "Dedicated Luggage Space",
      "Music System & PA Mic",
      "USB Charging at Every Row",
      "First Aid Kit & Fire Safety",
    ],
    features: {
      luggage: "12–26 Standard Bags",
      entertainment: "Stereo Audio & Mic",
      climate: "Dual Powerful AC Vents",
      seats: "Maharaja & Executive (1×1, 2×1, 2×2)",
      washroom: "Not Available",
    },
    ctaText: "Explore Tempo Travellers",
    href: "/fleets/tempo-traveller",
    supportsVehicleTypeSelection: true,
    vehicleTypes: FLEET_VEHICLE_VARIANTS.filter(
      (v) => v.categorySlug === "tempo-traveller"
    ),
  },

  {
    id: "force-urbania",
    slug: "force-urbania",
    legacySlugs: ["urbania"],
    name: "Force Urbania",
    badge: "MONOCOQUE LUXURY",
    isPopular: true,
    capacity: "12–16 Seats",
    minSeats: 1,
    maxSeats: 16,
    ratePerKm: 35,
    image: "/fleet/bus_mantra_luxury_force_urbania.png",
    gallery: ["/fleet/bus_mantra_luxury_force_urbania.png"],
    description:
      "Modern monocoque engineering delivering a quiet cabin, independent suspension, and executive styling for comfortable VIP transit.",
    amenities: [
      "Silent Monocoque Cabin",
      "VIP Maharaja Recliners",
      "Independent Front Coil Suspension",
      "Dual Zone Air Conditioning",
      "Fast USB-A & USB-C Ports",
      "Sealed Panoramic Windows",
    ],
    features: {
      luggage: "12–18 Executive Bags",
      entertainment: "Full-HD Screens & Audio",
      climate: "Dual Zone Silent Climate",
      seats: "VIP Leatherette (1×1, 2×1)",
      washroom: "Not Available",
    },
    ctaText: "Explore Force Urbania",
    href: "/fleets/force-urbania",
    supportsVehicleTypeSelection: true,
    vehicleTypes: FLEET_VEHICLE_VARIANTS.filter(
      (v) => v.categorySlug === "force-urbania"
    ),
  },

  {
    id: "tata-luxury-coach",
    slug: "tata-luxury-coach",
    legacySlugs: ["premium-coach"],
    name: "Tata Luxury Coach",
    badge: "TOURIST HIGHWAY COACH",
    isPopular: false,
    capacity: "18–53 Seats",
    minSeats: 18,
    maxSeats: 53,
    ratePerKm: 38,
    image: "/fleet/45-49_seater_tata_luxury_coach_1.png",
    gallery: [
      "/fleet/45-49_seater_tata_luxury_coach_1.png",
      "/fleet/45-49_seater_tata_luxury_coach_2.png",
    ],
    description:
      "Reliable full-size tourist coaches offering comfortable reclining seats, powerful air conditioning, and spacious luggage storage.",
    amenities: [
      "Ergonomic Reclining Seats",
      "Roof-Mounted Climate AC",
      "Large Undercarriage Luggage Bays",
      "HD Display & PA Mic System",
      "Charging at Every Row",
      "Highway Safety Equipment",
    ],
    features: {
      luggage: "20–50+ Large Suitcases",
      entertainment: "Dual Full-HD Displays & Sound",
      climate: "High-Capacity Dual Blowers",
      seats: "Executive Recliners (2×1, 2×2)",
      washroom: "Not Available",
    },
    ctaText: "Explore Tata Coaches",
    href: "/fleets/tata-luxury-coach",
    supportsVehicleTypeSelection: true,
    vehicleTypes: FLEET_VEHICLE_VARIANTS.filter(
      (v) => v.categorySlug === "tata-luxury-coach"
    ),
  },

  {
    id: "bharat-benz-coach",
    slug: "bharat-benz-coach",
    legacySlugs: ["bharat-benz"],
    name: "Bharat Benz Coach",
    badge: "CLUB CLASS LUXURY",
    isPopular: false,
    capacity: "18–45 Seats",
    minSeats: 18,
    maxSeats: 45,
    ratePerKm: 42,
    image: "/fleet/bus_mantra_bharatbenz.png",
    gallery: ["/fleet/bus_mantra_bharatbenz.png"],
    description:
      "German automotive engineering providing exceptional stability, acoustic comfort, and plush seating for long-distance journeys.",
    amenities: [
      "Parabolic Leaf Air Suspension",
      "Club Class Recliners",
      "Acoustically Insulated Cabin",
      "LED Entertainment Screens",
      "Individual USB Charging Ports",
      "Electronic Braking & ABS",
    ],
    features: {
      luggage: "20–50 Large Suitcases",
      entertainment: "Surround Hi-Fi Audio & Screens",
      climate: "Multi-Zone Automatic AC",
      seats: "Luxury Seating (2×1, 2×2)",
      washroom: "Not Available",
    },
    ctaText: "Explore Bharat Benz",
    href: "/fleets/bharat-benz-coach",
    supportsVehicleTypeSelection: true,
    vehicleTypes: FLEET_VEHICLE_VARIANTS.filter(
      (v) => v.categorySlug === "bharat-benz-coach"
    ),
  },

  {
    id: "volvo-coach",
    slug: "volvo-coach",
    legacySlugs: ["luxury-coach", "volvo"],
    name: "Volvo Coach",
    badge: "ULTRA LUXURY FLAGSHIP",
    isPopular: true,
    capacity: "40–45 Seats",
    minSeats: 40,
    maxSeats: 45,
    ratePerKm: 56,
    image: "/fleet/40_seater_volvo_with_washroom_1.png",
    gallery: [
      "/fleet/40_seater_volvo_with_washroom_1.png",
      "/fleet/40_seater_volvo_with_washroom_2.png",
    ],
    description:
      "Flagship multi-axle luxury coaches featuring electronically controlled air suspension, premium reclining seats, and washroom options on selected models.",
    amenities: [
      "Electronically Controlled Air Suspension",
      "Onboard Washroom (Select Models)",
      "Ultra-Luxury Plush Calf-Rest Recliners",
      "Expansive Undercarriage Bays",
      "Dual Full-HD Displays & Audio",
      "Individual Sockets & USB",
    ],
    features: {
      luggage: "50+ Large Suitcases",
      entertainment: "Dual Full-HD Displays & Surround Sound",
      climate: "Multi-Zone Automatic Climate Control",
      seats: "Ultra-Luxury Ergonomic (2×2)",
      washroom: "Available on Selected Variants",
    },
    ctaText: "Explore Volvo Coaches",
    href: "/fleets/volvo-coach",
    supportsVehicleTypeSelection: true,
    vehicleTypes: FLEET_VEHICLE_VARIANTS.filter(
      (v) => v.categorySlug === "volvo-coach"
    ),
  },
];

// -------------------------------------------------------------
// HELPER FUNCTIONS
// -------------------------------------------------------------

export function getAllVehicleVariants() {
  return FLEET_VEHICLE_VARIANTS;
}

export function getVehicleVariantById(idOrSlug) {
  if (!idOrSlug) return null;

  const normalized = String(idOrSlug).toLowerCase().trim();

  return (
    FLEET_VEHICLE_VARIANTS.find(
      (v) => v.id === normalized || v.slug === normalized
    ) || null
  );
}

export function getCategoryBySlug(slug) {
  if (!slug) return null;

  const normalized = String(slug).toLowerCase().trim();

  return (
    FLEET_CATEGORIES.find(
      (cat) =>
        cat.slug === normalized ||
        cat.id === normalized ||
        (Array.isArray(cat.legacySlugs) &&
          cat.legacySlugs.includes(normalized))
    ) || null
  );
}

export function getCategoryForVariant(variantId) {
  const variant = getVehicleVariantById(variantId);

  if (!variant) return null;

  return getCategoryBySlug(variant.categorySlug);
}

export function getVehicleVariantsByDisplayGroup(groupSlug) {
  if (!groupSlug) return [];

  const normalized = String(groupSlug).toLowerCase().trim();

  return FLEET_VEHICLE_VARIANTS.filter(
    (vehicle) => vehicle.displayGroup === normalized
  );
}