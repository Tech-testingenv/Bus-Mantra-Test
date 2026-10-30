/**
 * Centralized Fleet and Vehicle Variant Data Architecture
 * Defines the 5 primary fleet categories and all 15 specific vehicle variants.
 */

export const FLEET_VEHICLE_VARIANTS = [
  // -------------------------------------------------------------
  // TEMPO TRAVELLER (Variants 1 - 5)
  // -------------------------------------------------------------
  {
    id: "12-seater-maharaja-tempo-traveller-1x1",
    slug: "12-seater-maharaja-tempo-traveller-1x1",
    name: "12 Seater Maharaja Tempo Traveller (1X1)",
    shortName: "12S Maharaja (1X1)",
    categorySlug: "tempo-traveller",
    categoryName: "Tempo Traveller",
    capacity: "12 Seats",
    seats: 12,
    minSeats: 1,
    maxSeats: 12,
    layout: "1X1 Maharaja Layout",
    vehicleType: "Luxury Monovolume Mini Coach",
    ratePerKm: 28,
    image: "/fleet/12_seater_maharaja_tempo_traveller_1.png",
    gallery: [
      "/fleet/12_seater_maharaja_tempo_traveller_1.png",
      "/fleet/12_seater_maharaja_tempo_traveller_2.png",
      "/fleet/maharaja_tempo_traveller.jpg",
    ],
    description:
      "Ultra-luxury Maharaja 1x1 single-aisle seating with premium plush calf-support recliners, custom ambient lighting, and dedicated executive transit comfort.",
    features: {
      luggage: "12–15 Standard Bags",
      climate: "Front & Rear Dual AC Vents",
      seats: "1X1 Maharaja Push-Back Recliner",
      entertainment: "LED TV & Stereo Audio with PA Mic",
      washroom: "Not Available",
      charging: "Individual USB Ports at Every Seat",
      recliner: "Plush Recliners with Calf Support",
    },
    amenities: [
      "AC & Dual Climate Control",
      "1x1 Maharaja Reclining Seats",
      "Dedicated Boot Luggage Space",
      "Music System & PA Mic",
      "USB Charging at Every Seat",
      "First Aid Kit & Fire Safety",
    ],
    inclusions: [
      "Dedicated Vehicle & Chauffeur",
      "Fuel, Toll & Interstate Permits",
      "Driver Night Allowances",
      "Standard 5% Transport GST",
      "24/7 Operations Support",
    ],
  },
  {
    id: "12-seater-tempo-traveller-2x1",
    slug: "12-seater-tempo-traveller-2x1",
    name: "12 Seater Tempo Traveller (2X1)",
    shortName: "12S Standard (2X1)",
    categorySlug: "tempo-traveller",
    categoryName: "Tempo Traveller",
    capacity: "12 Seats",
    seats: 12,
    minSeats: 1,
    maxSeats: 12,
    layout: "2X1 Recliner Layout",
    vehicleType: "Executive Tourist Van",
    ratePerKm: 26,
    image: "/fleet/12_seater_maharaja_tempo_traveller_1.png",
    gallery: [
      "/fleet/12_seater_maharaja_tempo_traveller_1.png",
      "/fleet/12_seater_maharaja_tempo_traveller_2.png",
    ],
    description:
      "Spacious 12-seater tourist coach with 2x1 pushback seats, individual AC vents, and generous legroom for family tours and outstation trips.",
    features: {
      luggage: "12–15 Bags",
      climate: "Individual AC Vents",
      seats: "2X1 Push-Back Seats",
      entertainment: "Audio System & Mic",
      washroom: "Not Available",
      charging: "USB Charging Slots",
      recliner: "Ergonomic Push-Back Recliners",
    },
    amenities: [
      "Dual AC Climate Vents",
      "Push-Back Recliners",
      "Luggage Boot",
      "Stereo Sound System",
      "USB Charging Points",
      "Safety First Aid Kit",
    ],
    inclusions: [
      "Dedicated Vehicle & Chauffeur",
      "Fuel, Toll & Interstate Permits",
      "Driver Night Allowances",
      "Standard 5% Transport GST",
      "24/7 Operations Support",
    ],
  },
  {
    id: "16-seater-tempo-traveller-2x1",
    slug: "16-seater-tempo-traveller-2x1",
    name: "16 Seater Tempo Traveller (2X1)",
    shortName: "16S Executive (2X1)",
    categorySlug: "tempo-traveller",
    categoryName: "Tempo Traveller",
    capacity: "16 Seats",
    seats: 16,
    minSeats: 13,
    maxSeats: 16,
    layout: "2X1 Recliner Layout",
    vehicleType: "Intercity Tourist Van",
    ratePerKm: 27,
    image: "/fleet/12_seater_maharaja_tempo_traveller_2.png",
    gallery: [
      "/fleet/12_seater_maharaja_tempo_traveller_2.png",
      "/fleet/12_seater_maharaja_tempo_traveller_1.png",
    ],
    description:
      "The classic 16-seater intercity tempo traveller equipped with comfortable push-back recliner seats, dual AC blowers, and rear boot luggage space.",
    features: {
      luggage: "15–18 Standard Bags",
      climate: "Dual Overhead AC Vents",
      seats: "2X1 Executive Push-Back",
      entertainment: "LCD Screen & Audio System",
      washroom: "Not Available",
      charging: "USB Charging at Every Row",
      recliner: "Comfortable Push-Back Recliners",
    },
    amenities: [
      "Individual AC Vents",
      "Push-back Reclining Seats",
      "Rear Boot Luggage Space",
      "Music System with Aux/Bluetooth",
      "USB Charging Points",
      "Emergency Exit & First Aid",
    ],
    inclusions: [
      "Dedicated Vehicle & Chauffeur",
      "Fuel, Toll & Interstate Permits",
      "Driver Night Allowances",
      "Standard 5% Transport GST",
      "24/7 Operations Support",
    ],
  },
  {
    id: "20-seater-tempo-traveller-2x1",
    slug: "20-seater-tempo-traveller-2x1",
    name: "20 Seater Tempo Traveller (2X1)",
    shortName: "20S Coach (2X1)",
    categorySlug: "tempo-traveller",
    categoryName: "Tempo Traveller",
    capacity: "20 Seats",
    seats: 20,
    minSeats: 17,
    maxSeats: 20,
    layout: "2X1 Recliner Layout",
    vehicleType: "Extended Long-Wheelbase Mini Coach",
    ratePerKm: 30,
    image: "/fleet/maharaja_tempo_traveller.jpg",
    gallery: [
      "/fleet/maharaja_tempo_traveller.jpg",
      "/fleet/12_seater_maharaja_tempo_traveller_1.png",
      "/fleet/12_seater_maharaja_tempo_traveller_2.png",
    ],
    description:
      "Extended wheelbase 20-seater coach built for medium tour groups, wedding guest shuttles, and corporate day outings.",
    features: {
      luggage: "18–22 Bags",
      climate: "High-Capacity Dual AC",
      seats: "2X1 Luxury Recliner",
      entertainment: "Audio System & Wireless Mic",
      washroom: "Not Available",
      charging: "Charging at Every Row",
      recliner: "Deep Reclining Seats",
    },
    amenities: [
      "High-Capacity Dual AC",
      "2x1 Luxury Reclining Seats",
      "Spacious Luggage Hold",
      "Surround Sound & PA Mic",
      "Row-Wise USB Charging",
      "First Aid Kit & Fire Safety",
    ],
    inclusions: [
      "Dedicated Vehicle & Chauffeur",
      "Fuel, Toll & Interstate Permits",
      "Driver Night Allowances",
      "Standard 5% Transport GST",
      "24/7 Operations Support",
    ],
  },
  {
    id: "26-seater-tempo-traveller-2x2",
    slug: "26-seater-tempo-traveller-2x2",
    name: "26 Seater Tempo Traveller (2X2)",
    shortName: "26S Large (2X2)",
    categorySlug: "tempo-traveller",
    categoryName: "Tempo Traveller",
    capacity: "26 Seats",
    seats: 26,
    minSeats: 21,
    maxSeats: 26,
    layout: "2X2 Pushback Layout",
    vehicleType: "Maxi Tourist Coach",
    ratePerKm: 34,
    image: "/fleet/12_seater_maharaja_tempo_traveller_2.png",
    gallery: [
      "/fleet/12_seater_maharaja_tempo_traveller_2.png",
      "/fleet/maharaja_tempo_traveller.jpg",
      "/fleet/12_seater_maharaja_tempo_traveller_1.png",
    ],
    description:
      "High-capacity 26-seater executive tempo traveller offering 2x2 seating, powerful air-conditioning, and smooth highway transit for large family groups.",
    features: {
      luggage: "22–26 Standard Bags",
      climate: "Multi-Zone Powerful AC",
      seats: "2X2 Pushback Reclining Seats",
      entertainment: "Stereo Audio & Mic",
      washroom: "Not Available",
      charging: "Charging Ports across Cabin",
      recliner: "Highback Pushback Seats",
    },
    amenities: [
      "Multi-Zone Air Conditioning",
      "2x2 Pushback Recliners",
      "Dedicated Rear Luggage Bay",
      "PA Mic & Audio System",
      "Mobile Charging Ports",
      "Safety Standard Certified",
    ],
    inclusions: [
      "Dedicated Vehicle & Chauffeur",
      "Fuel, Toll & Interstate Permits",
      "Driver Night Allowances",
      "Standard 5% Transport GST",
      "24/7 Operations Support",
    ],
  },

  // -------------------------------------------------------------
  // FORCE URBANIA (Variants 6 - 7)
  // -------------------------------------------------------------
  {
    id: "12-seater-maharaja-force-urbania-1x1",
    slug: "12-seater-maharaja-force-urbania-1x1",
    name: "12 Seater Maharaja Force Urbania (1X1)",
    shortName: "12S Urbania Maharaja (1X1)",
    categorySlug: "force-urbania",
    categoryName: "Force Urbania",
    capacity: "12 Seats",
    seats: 12,
    minSeats: 1,
    maxSeats: 12,
    layout: "1X1 VIP Maharaja Layout",
    vehicleType: "European Monocoque VIP Van",
    ratePerKm: 35,
    image: "/fleet/bus_mantra_luxury_force_urbania.png",
    gallery: [
      "/fleet/bus_mantra_luxury_force_urbania.png",
    ],
    description:
      "World-class monocoque design Force Urbania with bespoke 1x1 VIP Maharaja leather seats, whisper-quiet cabin, panoramic sealed windows, and European safety standards.",
    features: {
      luggage: "12–15 Bags",
      climate: "Monocoque Silent Dual AC",
      seats: "1X1 VIP Maharaja Captain Seats",
      entertainment: "Full HD TV & Surround Audio",
      washroom: "Not Available",
      charging: "Fast USB-C / USB-A at Every Seat",
      recliner: "Calf-Support Deep Recliner",
    },
    amenities: [
      "Silent Monocoque Cabin",
      "1x1 VIP Maharaja Captain Seats",
      "Independent Front Suspension",
      "Full HD Display & Sound",
      "USB-C & USB-A Fast Charging",
      "Panoramic Sealed Glass Windows",
    ],
    inclusions: [
      "Dedicated Vehicle & Chauffeur",
      "Fuel, Toll & Interstate Permits",
      "Driver Night Allowances",
      "Standard 5% Transport GST",
      "24/7 Operations Support",
    ],
  },
  {
    id: "16-seater-force-urbania-2x1",
    slug: "16-seater-force-urbania-2x1",
    name: "16 Seater Force Urbania (2X1)",
    shortName: "16S Urbania Exec (2X1)",
    categorySlug: "force-urbania",
    categoryName: "Force Urbania",
    capacity: "16 Seats",
    seats: 16,
    minSeats: 13,
    maxSeats: 16,
    layout: "2X1 Executive Layout",
    vehicleType: "Modern Monocoque Tourist Van",
    ratePerKm: 36,
    image: "/fleet/bus_mantra_luxury_force_urbania.png",
    gallery: [
      "/fleet/bus_mantra_luxury_force_urbania.png",
    ],
    description:
      "Next-gen Force Urbania combining aerodynamic monocoque styling, independent front suspension, dual-zone air conditioning, and plush 2x1 seating.",
    features: {
      luggage: "15–18 Bags",
      climate: "Individual Overhead AC Vents",
      seats: "2X1 Executive Leatherette Recliners",
      entertainment: "Multimedia Screen & PA Mic",
      washroom: "Not Available",
      charging: "USB Charging Slots",
      recliner: "Ergonomic Recliners",
    },
    amenities: [
      "Next-Gen Monocoque Comfort",
      "2x1 Executive Reclining Seats",
      "Independent Coil Spring Ride",
      "Individual Reading Lights & AC",
      "USB Charging at Every Row",
      "ABS, EBD & Dual Airbags",
    ],
    inclusions: [
      "Dedicated Vehicle & Chauffeur",
      "Fuel, Toll & Interstate Permits",
      "Driver Night Allowances",
      "Standard 5% Transport GST",
      "24/7 Operations Support",
    ],
  },

  // -------------------------------------------------------------
  // TATA LUXURY COACH (Variants 8, 10, 11, 12)
  // -------------------------------------------------------------
  {
    id: "18-21-seater-maharaja-tata-luxury-coach-2x1",
    slug: "18-21-seater-maharaja-tata-luxury-coach-2x1",
    name: "18/21 Seater Maharaja Tata Luxury Coach (2X1)",
    shortName: "18/21S Tata Maharaja (2X1)",
    categorySlug: "tata-luxury-coach",
    categoryName: "Tata Luxury Coach",
    capacity: "18/21 Seats",
    seats: 21,
    minSeats: 17,
    maxSeats: 21,
    layout: "2X1 Maharaja Recliner Layout",
    vehicleType: "Midi Luxury Tourist Coach",
    ratePerKm: 38,
    image: "/fleet/45-49_seater_tata_luxury_coach_1.png",
    gallery: [
      "/fleet/45-49_seater_tata_luxury_coach_1.png",
      "/fleet/45-49_seater_tata_luxury_coach_2.png",
    ],
    description:
      "Custom-crafted Tata luxury midi-coach with 2x1 wide Maharaja recliners, air-suspension comfort, reading lamps, and executive conference aesthetics.",
    features: {
      luggage: "20–25 Bags",
      climate: "Powerful Overhead AC",
      seats: "2X1 Maharaja Wide Recliners",
      entertainment: "LCD TV & Stereo Audio",
      washroom: "Not Available",
      charging: "Charging at Every Seat",
      recliner: "Maharaja Calf-Rest Recliners",
    },
    amenities: [
      "Air Suspension Ride",
      "2x1 Maharaja Wide Recliners",
      "Underfloor Luggage Hold",
      "LCD TV & PA Audio System",
      "Individual Reading Lights",
      "USB Charging Points",
    ],
    inclusions: [
      "Dedicated Vehicle & Chauffeur",
      "Fuel, Toll & Interstate Permits",
      "Driver Night Allowances",
      "Standard 5% Transport GST",
      "24/7 Operations Support",
    ],
  },
  {
    id: "27-seater-tata-luxury-coach-2x2",
    slug: "27-seater-tata-luxury-coach-2x2",
    name: "27 Seater Tata Luxury Coach (2X2)",
    shortName: "27S Tata Coach (2X2)",
    categorySlug: "tata-luxury-coach",
    categoryName: "Tata Luxury Coach",
    capacity: "27 Seats",
    seats: 27,
    minSeats: 22,
    maxSeats: 27,
    layout: "2X2 Executive Layout",
    vehicleType: "Mid-Size Highway Coach",
    ratePerKm: 42,
    image: "/fleet/45-49_seater_tata_luxury_coach_2.png",
    gallery: [
      "/fleet/45-49_seater_tata_luxury_coach_2.png",
      "/fleet/45-49_seater_tata_luxury_coach_1.png",
    ],
    description:
      "Ergonomic 27-seater Tata coach ideal for corporate employee transport, sports teams, and mid-sized wedding convoys with underfloor storage.",
    features: {
      luggage: "25–30 Bags",
      climate: "Individual AC Vents",
      seats: "2X2 Executive Recliner",
      entertainment: "HD Screen & Audio",
      washroom: "Not Available",
      charging: "USB Charging Points",
      recliner: "Pushback Seats",
    },
    amenities: [
      "Roof-Mounted Dual AC",
      "2x2 Executive Reclining Seats",
      "Underfloor Luggage Hold",
      "HD Screen & Mic",
      "USB Sockets across Rows",
      "Commercial Highway Safety Certified",
    ],
    inclusions: [
      "Dedicated Vehicle & Chauffeur",
      "Fuel, Toll & Interstate Permits",
      "Driver Night Allowances",
      "Standard 5% Transport GST",
      "24/7 Operations Support",
    ],
  },
  {
    id: "45-49-seater-tata-luxury-coach-2x2",
    slug: "45-49-seater-tata-luxury-coach-2x2",
    name: "45/49 Seater Tata Luxury Coach (2X2)",
    shortName: "45/49S Tata Coach (2X2)",
    categorySlug: "tata-luxury-coach",
    categoryName: "Tata Luxury Coach",
    capacity: "45/49 Seats",
    seats: 49,
    minSeats: 28,
    maxSeats: 49,
    layout: "2X2 Plush Recliner Layout",
    vehicleType: "Full-Size Intercity Tourist Bus",
    ratePerKm: 46,
    image: "/fleet/45-49_seater_tata_luxury_coach_1.png",
    gallery: [
      "/fleet/45-49_seater_tata_luxury_coach_1.png",
      "/fleet/45-49_seater_tata_luxury_coach_2.png",
    ],
    description:
      "Full-sized Tata tourist coach with 45–49 push-back seats, powerful roof-mounted AC, large luggage hold, and PA audio mic system.",
    features: {
      luggage: "45–50 Large Suitcases",
      climate: "Roof-Mounted Heavy AC",
      seats: "2X2 Plush Push-Back Recliners",
      entertainment: "Dual Full-HD Displays & Sound System",
      washroom: "Not Available",
      charging: "USB Charging Ports",
      recliner: "Plush Recliners",
    },
    amenities: [
      "Roof-Mounted Heavy Climate AC",
      "2x2 Plush Pushback Seats",
      "Large Undercarriage Luggage Bay",
      "Dual Full-HD Displays & PA Mic",
      "Row-Wise Charging Ports",
      "First Aid & Fire Extinguishers",
    ],
    inclusions: [
      "Dedicated Vehicle & Chauffeur",
      "Fuel, Toll & Interstate Permits",
      "Driver Night Allowances",
      "Standard 5% Transport GST",
      "24/7 Operations Support",
    ],
  },
  {
    id: "53-seater-tata-luxury-coach-2x2",
    slug: "53-seater-tata-luxury-coach-2x2",
    name: "53 Seater Tata Luxury Coach (2X2)",
    shortName: "53S Tata Coach (2X2)",
    categorySlug: "tata-luxury-coach",
    categoryName: "Tata Luxury Coach",
    capacity: "53 Seats",
    seats: 53,
    minSeats: 50,
    maxSeats: 53,
    layout: "2X2 High Capacity Layout",
    vehicleType: "High-Capacity Intercity Passenger Coach",
    ratePerKm: 52,
    image: "/fleet/45-49_seater_tata_luxury_coach_2.png",
    gallery: [
      "/fleet/45-49_seater_tata_luxury_coach_2.png",
      "/fleet/45-49_seater_tata_luxury_coach_1.png",
    ],
    description:
      "Maximum-capacity Tata passenger coach engineered for large convention groups, school excursions, and pan-India pilgrim charters.",
    features: {
      luggage: "50+ Large Suitcases",
      climate: "High-Capacity Dual AC Blowers",
      seats: "2X2 High-Comfort Seater",
      entertainment: "PA Mic & Audio System",
      washroom: "Not Available",
      charging: "Row-Wise Charging",
      recliner: "Ergonomic Highback",
    },
    amenities: [
      "High-Capacity Twin Blowers AC",
      "2x2 Highback Comfort Seats",
      "Massive Underfloor Storage",
      "PA Audio System for Guides",
      "USB Ports",
      "Complete Highway Safety Kit",
    ],
    inclusions: [
      "Dedicated Vehicle & Chauffeur",
      "Fuel, Toll & Interstate Permits",
      "Driver Night Allowances",
      "Standard 5% Transport GST",
      "24/7 Operations Support",
    ],
  },

  // -------------------------------------------------------------
  // BHARAT BENZ COACH (Variants 9, 13)
  // -------------------------------------------------------------
  {
    id: "18-21-seater-maharaja-bharat-benz-coach-2x1",
    slug: "18-21-seater-maharaja-bharat-benz-coach-2x1",
    name: "18/21 Seater Maharaja Bharat Benz Coach (2X1)",
    shortName: "18/21S BB Maharaja (2X1)",
    categorySlug: "bharat-benz-coach",
    categoryName: "Bharat Benz Coach",
    capacity: "18/21 Seats",
    seats: 21,
    minSeats: 17,
    maxSeats: 21,
    layout: "2X1 Maharaja Club Class Layout",
    vehicleType: "German-Engineered Club Coach",
    ratePerKm: 42,
    image: "/fleet/bus_mantra_bharatbenz.png",
    gallery: [
      "/fleet/bus_mantra_bharatbenz.png",
    ],
    description:
      "German-engineered BharatBenz luxury coach with anti-roll bars, plush 2x1 Maharaja seating, individual USB ports, and smooth vibration-free highway cruising.",
    features: {
      luggage: "20–25 Bags",
      climate: "Individual AC Vents",
      seats: "2X1 Maharaja Club Class Recliner",
      entertainment: "LED Screen & Hi-Fi Audio",
      washroom: "Not Available",
      charging: "USB Charging at Every Seat",
      recliner: "Ultra Plush Calf-Support Recliner",
    },
    amenities: [
      "Anti-Roll Safety Chassis",
      "2x1 Maharaja Club Class Seats",
      "Underfloor Large Luggage Space",
      "Hi-Fi Audio & LED Entertainment",
      "USB Port at Every Seat",
      "Emergency Exit Doors",
    ],
    inclusions: [
      "Dedicated Vehicle & Chauffeur",
      "Fuel, Toll & Interstate Permits",
      "Driver Night Allowances",
      "Standard 5% Transport GST",
      "24/7 Operations Support",
    ],
  },
  {
    id: "41-45-seater-bharat-benz-coach-2x2",
    slug: "41-45-seater-bharat-benz-coach-2x2",
    name: "41/45 Seater Bharat Benz Coach (2X2)",
    shortName: "41/45S BB Club (2X2)",
    categorySlug: "bharat-benz-coach",
    categoryName: "Bharat Benz Coach",
    capacity: "41/45 Seats",
    seats: 45,
    minSeats: 28,
    maxSeats: 45,
    layout: "2X2 Club Class Recliner Layout",
    vehicleType: "Premium Intercity Touring Coach",
    ratePerKm: 50,
    image: "/fleet/bus_mantra_bharatbenz.png",
    gallery: [
      "/fleet/bus_mantra_bharatbenz.png",
    ],
    description:
      "Premium BharatBenz touring coach with parabolic leaf air-suspension, ergonomic semi-sleeper reclining seats, and quiet acoustic-insulated cabin.",
    features: {
      luggage: "45–50 Large Suitcases",
      climate: "Multi-Zone Automatic AC",
      seats: "2X2 Ergonomic Semi-Sleeper Recliner",
      entertainment: "Dual Full-HD Displays & Audio System",
      washroom: "Not Available",
      charging: "USB Charging Ports",
      recliner: "Club Class Semi-Sleeper",
    },
    amenities: [
      "Air Suspension Highway Ride",
      "2x2 Club Class Semi-Sleeper Recliners",
      "Acoustically Insulated Quiet Cabin",
      "Dual Full-HD Screens & Audio",
      "Individual USB Sockets",
      "Electronic Braking & ABS",
    ],
    inclusions: [
      "Dedicated Vehicle & Chauffeur",
      "Fuel, Toll & Interstate Permits",
      "Driver Night Allowances",
      "Standard 5% Transport GST",
      "24/7 Operations Support",
    ],
  },

  // -------------------------------------------------------------
  // VOLVO COACH (Variants 14 - 15)
  // -------------------------------------------------------------
  {
    id: "41-45-seater-volvo-without-washroom-2x2",
    slug: "41-45-seater-volvo-without-washroom-2x2",
    name: "41/45 Seater Volvo Without Washroom (2X2)",
    shortName: "41/45S Volvo (2X2)",
    categorySlug: "volvo-coach",
    categoryName: "Volvo Coach",
    capacity: "41/45 Seats",
    seats: 45,
    minSeats: 40,
    maxSeats: 45,
    layout: "2X2 Ultra Luxury Layout",
    vehicleType: "Flagship Multi-Axle Intercity Coach",
    ratePerKm: 56,
    image: "/fleet/40_seater_volvo_with_washroom_2.png",
    gallery: [
      "/fleet/40_seater_volvo_with_washroom_2.png",
      "/fleet/40_seater_volvo_with_washroom_1.png",
    ],
    description:
      "Flagship Volvo multi-axle luxury coach with electronically controlled air suspension, dual AC climate control, and unmatched long-haul passenger comfort.",
    features: {
      luggage: "50+ Large Suitcases",
      climate: "Electronically Controlled Climate Vents",
      seats: "2X2 Volvo Executive Plush Recliner",
      entertainment: "Dual LED Screens & Wireless Mic",
      washroom: "Not Available",
      charging: "Individual USB & AC Sockets",
      recliner: "Ultra Luxury Ergonomic Recliner",
    },
    amenities: [
      "Electronically Controlled Air Suspension",
      "2x2 Volvo Executive Plush Recliners",
      "Expansive Underfloor Luggage Hold",
      "Dual LED Screens & Wireless Mic",
      "Individual AC Vents & Reading Lamps",
      "World-Class Active & Passive Safety",
    ],
    inclusions: [
      "Dedicated Vehicle & Chauffeur",
      "Fuel, Toll & Interstate Permits",
      "Driver Night Allowances",
      "Standard 5% Transport GST",
      "24/7 Operations Support",
    ],
  },
  {
    id: "40-seater-volvo-with-washroom-2x2",
    slug: "40-seater-volvo-with-washroom-2x2",
    name: "40 Seater Volvo With Washroom (2X2)",
    shortName: "40S Volvo Washroom (2X2)",
    categorySlug: "volvo-coach",
    categoryName: "Volvo Coach",
    capacity: "40 Seats",
    seats: 40,
    minSeats: 1,
    maxSeats: 40,
    layout: "2X2 Executive Sleeper/Recliner Layout with Restroom",
    vehicleType: "Super-Luxury Multi-Axle Touring Coach with Restroom",
    ratePerKm: 60,
    image: "/fleet/40_seater_volvo_with_washroom_1.png",
    gallery: [
      "/fleet/40_seater_volvo_with_washroom_1.png",
      "/fleet/40_seater_volvo_with_washroom_2.png",
    ],
    description:
      "Top-tier Volvo 9600 luxury coach featuring a sanitized onboard chemical washroom, multi-zone climate control, and executive calf-rest recliners for non-stop interstate transit.",
    features: {
      luggage: "50+ Large Suitcases",
      climate: "Multi-Zone Automatic Climate Control",
      seats: "2X2 Ultra Luxury Recliners with Calf Rest",
      entertainment: "Dual Full-HD Displays & Surround Audio",
      washroom: "Available (Clean Onboard Chemical Restroom)",
      charging: "Individual Sockets & USB",
      recliner: "Calf-Rest Luxury Recliner",
    },
    amenities: [
      "Onboard Clean Chemical Washroom",
      "Electronically Controlled Air Suspension",
      "2x2 Calf-Rest Ultra Luxury Recliners",
      "Multi-Zone Automatic Climate Control",
      "Dual Full-HD Displays & Surround Audio",
      "Individual AC Vents, Lights & Sockets",
    ],
    inclusions: [
      "Dedicated Vehicle & Chauffeur",
      "Fuel, Toll & Interstate Permits",
      "Driver Night Allowances",
      "Standard 5% Transport GST",
      "24/7 Operations Support",
    ],
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
    ratePerKm: 26,
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
      "Push-back Reclining Seats",
      "Dedicated Luggage Space",
      "Music System & PA Mic",
      "USB Charging at Every Row",
      "First Aid Kit & Fire Safety",
    ],
    features: {
      luggage: "12–26 Standard Bags",
      entertainment: "Stereo Audio & Mic",
      climate: "Dual Powerful AC Vents",
      seats: "Maharaja & Executive (1x1, 2x1, 2x2)",
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
    gallery: [
      "/fleet/bus_mantra_luxury_force_urbania.png",
    ],
    description:
      "European monocoque engineering delivering whisper-quiet cabin acoustics, independent suspension, and bespoke executive styling for VIP transit.",
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
      seats: "VIP Leatherette (1x1, 2x1)",
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
      "Reliable full-size tourist coaches offering ergonomic push-back seats, heavy-duty air conditioning, and massive undercarriage luggage holds.",
    amenities: [
      "Ergonomic Reclining Seats",
      "Roof-Mounted Climate AC",
      "Large Undercarriage Luggage Bays",
      "HD Display & PA Mic System",
      "Charging at Every Row",
      "Commercial Highway Safety Certified",
    ],
    features: {
      luggage: "20–50+ Large Suitcases",
      entertainment: "Dual Full-HD Displays & Sound",
      climate: "High-Capacity Dual Blowers",
      seats: "Executive Recliners (2x1, 2x2)",
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
    gallery: [
      "/fleet/bus_mantra_bharatbenz.png",
    ],
    description:
      "German automotive engineering providing exceptional roll stability, acoustic damping, and plush semi-sleeper seats for long-distance highways.",
    amenities: [
      "Parabolic Leaf Air Suspension",
      "Club Class Semi-Sleeper Recliners",
      "Acoustically Insulated Cabin",
      "Dual LED Entertainment Screens",
      "Individual USB Charging Ports",
      "Electronic Braking & ABS",
    ],
    features: {
      luggage: "20–50 Large Suitcases",
      entertainment: "Surround Hi-Fi Audio & Screens",
      climate: "Multi-Zone Automatic AC",
      seats: "Club Class Luxury (2x1, 2x2)",
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
    maxSeats: 60,
    ratePerKm: 56,
    image: "/fleet/40_seater_volvo_with_washroom_1.png",
    gallery: [
      "/fleet/40_seater_volvo_with_washroom_1.png",
      "/fleet/40_seater_volvo_with_washroom_2.png",
    ],
    description:
      "Flagship multi-axle luxury coach with electronically controlled air suspension, unmatched ride silence, and available onboard clean chemical washroom.",
    amenities: [
      "Electronically Controlled Air Suspension",
      "Onboard Clean Chemical Washroom (Select Model)",
      "Ultra-Luxury Plush Calf-Rest Recliners",
      "Expansive Undercarriage Bays",
      "Dual Full-HD Displays & Audio",
      "Individual Sockets & USB",
    ],
    features: {
      luggage: "50+ Large Suitcases",
      entertainment: "Dual Full-HD Displays & Surround Sound",
      climate: "Multi-Zone Automatic Climate Control",
      seats: "Ultra Luxury Ergonomic (2+2)",
      washroom: "Available in 40-Seater Variant",
    },
    ctaText: "Explore Volvo Coaches",
    href: "/fleets/volvo-coach",
    supportsVehicleTypeSelection: true,
    vehicleTypes: FLEET_VEHICLE_VARIANTS.filter(
      (v) => v.categorySlug === "volvo-coach"
    ),
  },
];

// Helper functions
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
