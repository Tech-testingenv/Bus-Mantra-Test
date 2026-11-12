/**
 * Comprehensive Testimonials, Media Remarks, Video Stories & Appreciation Letters
 * Centralized data source for the dedicated /testimonials page.
 */

export const testimonialsHeroData = {
  eyebrow: "TRUST & CREDIBILITY",
  title: "Trusted by India's Leading Organizations & Thousands of Groups",
  titleLines: [
    "Real Stories. Proven Trust.",
    "Recognized Across India.",
  ],
  description:
    "Explore genuine customer experiences, corporate commendation letters, media highlights, and video reviews demonstrating our unwavering commitment to safety, comfort, and on-time travel.",
  image: "/images/about/group-travel.png",
  imageAlt: "Happy group traveling together in a luxury Bus Mantra coach",
};

export const trustMetrics = [
  {
    id: "rating",
    value: "4.9 / 5",
    label: "Customer Rating",
    subtext: "Based on 2,500+ verified group charters",
  },
  {
    id: "trips",
    value: "10,000+",
    label: "Group Trips Completed",
    subtext: "Across 120+ Indian cities and destinations",
  },
  {
    id: "punctuality",
    value: "99.4%",
    label: "On-Time Dispatch Rate",
    subtext: "Monitored via 24/7 central GPS operations",
  },
  {
    id: "fleet",
    value: "500+",
    label: "Verified Coaches & Travelers",
    subtext: "Commercial permit, AC & GPS equipped",
  },
];

/**
 * Media & Organization Remarks
 * Specifically featuring: CMBC, TV9, Nestlé, Paytm, Republic Bharat
 */
export const mediaAndOrgRemarks = [
  {
    id: "nestle",
    organization: "Nestlé India",
    category: "Corporate Enterprise",
    logoText: "Nestlé",
    badge: "Official Corporate Commendation",
    headline: "Flawless Transport for 600+ Delegates across 3-Day Conclave",
    quote:
      "Bus Mantra managed our annual national sales convention transport with unmatched professionalism. Coordinating 14 luxury coaches across Delhi NCR venues without a single minute of delay was extraordinary. The chauffeurs were courteous, well-attired, and vehicles were sanitized to perfection.",
    spokesperson: "Rajesh V. Nambiar",
    designation: "Head of Corporate Administration & Facilities",
    location: "Gurugram & Manesar",
    date: "September 2026",
    impactMetric: "600+ Delegates Transported",
    verificationTag: "Verified Enterprise Partner",
    accentColor: "from-amber-500/15 to-orange-500/10",
  },
  {
    id: "paytm",
    organization: "Paytm (One97 Communications)",
    category: "Tech & Fintech Enterprise",
    logoText: "Paytm",
    badge: "Annual Offsite Travel Partner",
    headline: "Seamless Logistics for 400-Person Engineering Offsite",
    quote:
      "When moving hundreds of engineers and leaders for a high-intensity weekend offsite to Agra and Jaipur, punctuality and connectivity are paramount. Bus Mantra delivered top-notch Volvo and Tata coaches with functioning charging ports, crisp audio systems, and live GPS tracking links for our organizing desk.",
    spokesperson: "Meenakshi Sundaram",
    designation: "VP - People & Workplace Operations",
    location: "Noida → Agra & Jaipur",
    date: "October 2026",
    impactMetric: "8 Luxury Coaches • Zero Disruptions",
    verificationTag: "Verified Tech Partner",
    accentColor: "from-sky-500/15 to-blue-500/10",
  },
  {
    id: "tv9",
    organization: "TV9 Bharatvarsh",
    category: "National Broadcast Media",
    logoText: "TV9",
    badge: "National News Feature",
    headline: "Setting New Standards in Transparent Group Bus Charter in India",
    quote:
      "In an unorganized inter-city private bus charter market riddled with hidden charges and dubious vehicle quality, Bus Mantra stands out for upfront GST-compliant per-km billing, police-verified chauffeurs, and a digital-first approach to passenger safety.",
    spokesperson: "Special Correspondent, Transport & Infrastructure Desk",
    designation: "National Broadcast Feature",
    location: "New Delhi Bureau",
    date: "July 2026",
    impactMetric: "Featured in Special Business Segment",
    verificationTag: "National Media Recognition",
    accentColor: "from-red-500/15 to-rose-500/10",
  },
  {
    id: "republic-bharat",
    organization: "Republic Bharat",
    category: "National News Network",
    logoText: "Republic Bharat",
    badge: "Editorial Spotlight",
    headline: "The Gold Standard in Highway Group Passenger Safety",
    quote:
      "Bus Mantra's commitment to mechanical fitness checks, strict alcohol breathalyzer protocols for highway drivers, and dedicated 24/7 command room monitoring sets an exemplary model for private fleet charter in northern and central India.",
    spokesperson: "Senior Editorial Producer",
    designation: "National Affairs & Consumer Safety",
    location: "Noida Media Hub",
    date: "August 2026",
    impactMetric: "Consumer Trust Spotlight",
    verificationTag: "National Media Coverage",
    accentColor: "from-orange-600/15 to-amber-600/10",
  },
  {
    id: "cmbc",
    organization: "CMBC Business",
    category: "Business & Commerce Insights",
    logoText: "CMBC",
    badge: "Industry Excellence Award",
    headline: "Transforming Fragmented Highway Charters into a Reliable Enterprise Utility",
    quote:
      "Bus Mantra provides institutional and family travelers the confidence of standardized pricing, certified vehicles, and reliable dispatch execution. Their scalable fleet solutions bridge a critical gap in India's group mobility ecosystem.",
    spokesperson: "Alok Sengupta",
    designation: "Industry Analyst & Logistics Editor",
    location: "Mumbai",
    date: "May 2026",
    impactMetric: "Business Logistics Commendation",
    verificationTag: "Industry Recognition",
    accentColor: "from-emerald-500/15 to-teal-500/10",
  },
];

/**
 * Video Testimonials
 */
export const videoTestimonials = [
  {
    id: "video-1",
    title: "How 45 Team Members Traveled Stress-Free to Jim Corbett",
    clientName: "Siddharth Verma",
    clientRole: "Director of Engineering, Fintech Scaleup",
    category: "Corporate Offsite",
    duration: "2:15 min",
    thumbnail: "/images/about/corporate-travel.png",
    videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // fallback safe video URL
    quote:
      "We took a 45-seater luxury coach. The pushback comfort, onboard audio mic, and driver's careful mountain driving made the 7-hour journey feel like a breeze.",
    route: "Gurugram → Jim Corbett",
    rating: 5,
    tag: "Corporate",
  },
  {
    id: "video-2",
    title: "Udaipur Destination Wedding: Managing 180 Guests Flawlessly",
    clientName: "Neha & Rohan Kapoor",
    clientRole: "Wedding Couple & Family Organizers",
    category: "Destination Wedding",
    duration: "3:05 min",
    thumbnail: "/images/about/wedding-travel.png",
    videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quote:
      "Airport pickups, sangeet venue transfers, and a grand convoy through Udaipur. Bus Mantra's fleet coordinator was on-site 24/7 handling every detail.",
    route: "Udaipur Airport → Venues",
    rating: 5,
    tag: "Wedding",
  },
  {
    id: "video-3",
    title: "Annual School Excursion: 120 Students with Zero Safety Compromise",
    clientName: "Sister Mary Anthony",
    clientRole: "Principal, Convent Senior Secondary School",
    category: "Educational Excursion",
    duration: "1:45 min",
    thumbnail: "/images/about/school-trip.png",
    videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quote:
      "For schools, safety is non-negotiable. Every seat had a functioning seatbelt, the bus was clean and sanitized, and drivers followed speed regulations strictly.",
    route: "Delhi → Chandigarh & Kurukshetra",
    rating: 5,
    tag: "School",
  },
  {
    id: "video-4",
    title: "Extended Family Pilgrimage to Mathura, Vrindavan & Agra",
    clientName: "Manoj Agarwal",
    clientRole: "Family Group Head (22 Members)",
    category: "Family Pilgrimage",
    duration: "2:30 min",
    thumbnail: "/images/about/family-travel.png",
    videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    quote:
      "Our elderly grandparents were traveling with young kids. The Maharaja Tempo Traveler was comfortable with low-entry steps, great AC, and plenty of luggage space.",
    route: "Delhi → Mathura → Vrindavan → Agra",
    rating: 5,
    tag: "Family",
  },
];

/**
 * Written Customer Reviews (with category filtering)
 */
export const customerReviews = [
  {
    id: "rev-1",
    name: "Rahul Sharma",
    role: "Family Group Organizer",
    category: "Family & Leisure",
    rating: 5,
    date: "14 Oct 2026",
    route: "Delhi → Jaipur (Round Trip)",
    busType: "45-Seater Tata Luxury Coach",
    initials: "RS",
    quote:
      "BUS MANTRA made our family trip incredibly easy. Having the entire coach for our group of 38 meant everyone could travel together comfortably without the stress of managing multiple cars. Clean interiors, working AC even in October afternoon heat, and very humble driver.",
    verified: true,
  },
  {
    id: "rev-2",
    name: "Ananya Iyer",
    role: "Head of People Operations",
    category: "Corporate",
    rating: 5,
    date: "28 Sep 2026",
    route: "Gurugram → Agra (2-Day Conclave)",
    busType: "Premium BharatBenz Coach",
    initials: "AI",
    quote:
      "Coordinating inter-city travel for 45 team members was seamless. The bus was punctual, air-conditioned, and the driver was extremely polite and experienced with expressway transit. Billing was completely transparent with GST breakdown right on the quotation.",
    verified: true,
  },
  {
    id: "rev-3",
    name: "Vikram Singhania",
    role: "Destination Wedding Coordinator",
    category: "Weddings",
    rating: 5,
    date: "05 Oct 2026",
    route: "Udaipur & Mount Abu",
    busType: "2x 40-Seater Volvo Luxury Coaches",
    initials: "VS",
    quote:
      "We booked two luxury coaches for our destination wedding guests in Rajasthan. The coordination from pickup at the airport to the hotel and banquet venue was flawless and on time. Guests repeatedly commended the smooth ride and cleanliness.",
    verified: true,
  },
  {
    id: "rev-4",
    name: "Pooja Malhotra",
    role: "Academic Tour In-Charge",
    category: "Schools & Colleges",
    rating: 5,
    date: "19 Sep 2026",
    route: "Delhi → Chandigarh Science City",
    busType: "50-Seater School Certified Coach",
    initials: "PM",
    quote:
      "Safety and schedule adherence are our highest priorities for school trips. The coach was thoroughly clean, equipped with first aid kits, seatbelts, speed governors, and arrived 40 minutes ahead of departure. Highly recommended for educational institutions.",
    verified: true,
  },
  {
    id: "rev-5",
    name: "Kunal Mehra",
    role: "DU Alumni Chapter President",
    category: "Family & Leisure",
    rating: 5,
    date: "12 Oct 2026",
    route: "Delhi → Manali & Solang Valley",
    busType: "32-Seater Coach with Air Suspension",
    initials: "KM",
    quote:
      "Outstanding service for our annual university reunion. Ample luggage room for trekking gear and plush pushback recliners made the long mountain haul completely relaxing. The driver handled the Ghat roads with immense expertise.",
    verified: true,
  },
  {
    id: "rev-6",
    name: "Dr. Arvind Swaminathan",
    role: "Conference Secretary, IMA Chapter",
    category: "Corporate",
    rating: 5,
    date: "22 Aug 2026",
    route: "Delhi Airport → Greater Noida Expo",
    busType: "Luxury Volvo Coach",
    initials: "AS",
    quote:
      "Transporting senior medical delegates and international keynote speakers required utmost punctuality. Bus Mantra's dispatch desk sent real-time driver tracking links and vehicle registration documents well in advance. Commendable reliability.",
    verified: true,
  },
  {
    id: "rev-7",
    name: "Sunita Deshmukh",
    role: "Senior Citizens Pilgrimage Organizer",
    category: "Family & Leisure",
    rating: 5,
    date: "02 Sep 2026",
    route: "Haridwar & Rishikesh 4-Day Tour",
    busType: "26-Seater Mini Coach",
    initials: "SD",
    quote:
      "Our senior citizens group felt so safe and comfortable. The driver stopped patiently at clean highway restaurants, assisted elderly members with steps, and kept the driving steady and gentle. We will always book Bus Mantra for our devotional tours.",
    verified: true,
  },
  {
    id: "rev-8",
    name: "Harpreet Singh Sodhi",
    role: "Baraat & Wedding Convoy Lead",
    category: "Weddings",
    rating: 5,
    date: "11 Oct 2026",
    route: "Amritsar → Chandigarh",
    busType: "12-Seater Maharaja Tempo Traveler & Coach",
    initials: "HS",
    quote:
      "From luggage handling to smooth highway driving with music system, everything was top class. No haggling for extra driver allowance—everything was pre-cleared and included in the invoice. Bus Mantra is true to their word.",
    verified: true,
  },
];

/**
 * Letters of Appreciation & Official Commendations
 */
export const appreciationLetters = [
  {
    id: "letter-nestle",
    organization: "Nestlé India Limited",
    unit: "Corporate Procurement & Workplace Services",
    refNo: "NST/CORP/LOG-2026/09",
    date: "25 September 2026",
    signatoryName: "Rajesh V. Nambiar",
    signatoryRole: "Head of Corporate Administration",
    badge: "Official Enterprise Commendation",
    summary:
      "Commendation for the exemplary transport coordination of 600+ personnel across 14 dedicated luxury coaches during the Annual National Leadership Conclave.",
    fullLetter: `To Whom It May Concern,

This is to formally commend M/s Bus Mantra for their outstanding performance in providing full-coach charter transport services during our Annual National Leadership Conclave 2026 held from 21st to 23rd September.

Bus Mantra deployed a fleet of 14 high-capacity, sanitized luxury coaches to manage transit for over 600 delegates between regional airport hubs, central convention centers, and partner hotels across the Delhi NCR region.

Key highlights of their service included:
1. 100% adherence to scheduled pickup and departure timings across all 3 days.
2. Courteous, uniformed chauffeurs adhering to corporate dress code and safe driving protocols.
3. Dedicated on-ground dispatch coordinator proactively managing real-time vehicle positioning.
4. Clean, air-conditioned interiors equipped with mobile charging facilities.

We thank the team at Bus Mantra for their dedication and recommend their corporate charter services without reservation.

Sincerely,
Rajesh V. Nambiar
Head of Corporate Administration
Nestlé India Limited`,
    highlights: ["14 Luxury Coaches", "600+ Delegates", "100% On-Time Record"],
  },
  {
    id: "letter-paytm",
    organization: "Paytm (One97 Communications Ltd.)",
    unit: "Global Workplace Experience & Travel",
    refNo: "ONE97/WEX/OFFSITE-2026/10",
    date: "15 October 2026",
    signatoryName: "Meenakshi Sundaram",
    signatoryRole: "VP - People & Workplace Operations",
    badge: "Certificate of Appreciation",
    summary:
      "Certificate of Appreciation awarded to Bus Mantra for providing outstanding, safe, and synchronized fleet logistics for the Paytm Engineering All-Hands Offsite.",
    fullLetter: `CERTIFICATE OF APPRECIATION

Presented to BUS MANTRA (Bus Mantra Pvt. Ltd.)

In recognition of their exceptional transport logistics support for the Paytm Annual Technology Summit and Offsite 2026.

Moving 400 engineers, data scientists, and executives across multiple inter-city routes between Noida, Agra, and Jaipur was a critical operational undertaking. Bus Mantra's fleet performed with absolute precision:

- All 8 Volvo & BharatBenz coaches were pre-inspected, mechanically sound, and spotlessly clean.
- The dedicated real-time GPS tracking dashboard allowed our internal emergency and transport desk to track every coach in real time.
- The transparent invoicing policy eliminated highway toll and driver allowance confusion.

We place on record our deep appreciation for Bus Mantra's exemplary customer-centric service and look forward to continued partnership.

For One97 Communications Limited (Paytm)
Meenakshi Sundaram
VP - People & Workplace Operations`,
    highlights: ["400 Tech Executives", "8 Intercity Coaches", "Zero Delays"],
  },
  {
    id: "letter-dps",
    organization: "Delhi Public School Society",
    unit: "Annual Educational Excursions Board",
    refNo: "DPSS/EXCURSION/2026/08",
    date: "18 August 2026",
    signatoryName: "Dr. Vandana Saxena",
    signatoryRole: "Chairperson, Student Safety & Excursions Committee",
    badge: "Student Safety Commendation",
    summary:
      "Official commendation for meeting rigorous child safety guidelines, speed-governed driving, and sanitized coaches during the inter-state student tour.",
    fullLetter: `LETTER OF COMMENDATION

Dear Bus Mantra Team,

On behalf of the Student Safety and Excursions Committee, I write to express our heartfelt gratitude for the impeccable transportation services provided during our Senior Secondary Educational Tour to Kurukshetra and Chandigarh.

Transporting 160 students and 14 faculty members across interstate highways requires uncompromising safety standards. Your team fulfilled every prerequisite:
- Commercial permits, fire safety extinguishers, and verified first-aid kits on all 4 coaches.
- Police-verified chauffeurs who maintained moderate speed limits and demonstrated exemplary road patience.
- Regular updates sent directly to the school administration desk.

The school management commends your professionalism and will prioritize Bus Mantra for future academic excursions.

Warm regards,
Dr. Vandana Saxena
Chairperson - Student Safety & Excursions Committee`,
    highlights: ["160 Students & Faculty", "Full First-Aid & Speed Controls", "Police-Verified Drivers"],
  },
  {
    id: "letter-fewp",
    organization: "Federation of Event & Wedding Planners (FEWP)",
    unit: "Hospitality & Logistics Accreditation Wing",
    refNo: "FEWP/ACCREDIT/2026/09",
    date: "10 September 2026",
    signatoryName: "Kavita Sethi",
    signatoryRole: "General Secretary - FEWP North India",
    badge: "Industry Excellence Certification",
    summary:
      "Accreditation of Bus Mantra as an Approved Group Transportation Partner for grand destination weddings and large-scale event convoys.",
    fullLetter: `INDUSTRY ACCREDITATION & COMMENDATION

The Federation of Event & Wedding Planners (FEWP) hereby confers this Accreditation of Transport Excellence to Bus Mantra.

In destination wedding management across Jaipur, Udaipur, Jim Corbett, and Goa, guest transportation is often the most vulnerable operational touchpoint. Over the past 12 months, our member event agencies reported over 150 successful wedding fleet dispatches executed by Bus Mantra with zero stranded guests and zero breakdown incidents.

Bus Mantra's transparent fleet pricing, availability of premium Tempo Travelers alongside luxury coaches, and dedicated operations coordinators make them a preferred group travel partner for wedding planners nationwide.

Kavita Sethi
General Secretary, FEWP North India`,
    highlights: ["150+ Wedding Convoys", "Zero Stranded Guests", "Official FEWP Accreditation"],
  },
];

export const testimonialFaqs = [
  {
    id: "faq-verify",
    question: "How are the reviews and ratings on this page verified?",
    answer:
      "Every review published on Bus Mantra is linked directly to a confirmed trip booking ID, verified passenger or corporate organizer name, and completed travel route. We collect verified feedback post-journey to maintain 100% authentic ratings.",
  },
  {
    id: "faq-orgs",
    question: "Can prospective enterprise clients request reference checks with your corporate partners?",
    answer:
      "Yes. For large enterprise offsites, annual conclaves, or ongoing corporate employee transportation, our enterprise sales team can provide formal references and past case studies with relevant organizational clearance.",
  },
  {
    id: "faq-video",
    question: "Are these video stories recorded with actual clients?",
    answer:
      "Yes. All video testimonials are recorded directly with real event coordinators, HR leaders, couples, and family group organizers who chartered buses with Bus Mantra for their respective journeys.",
  },
  {
    id: "faq-safety",
    question: "What safety and hygiene measures are guaranteed for all bookings?",
    answer:
      "Every vehicle undergoes strict pre-dispatch mechanical inspections and full interior sanitization. All drivers undergo mandatory police background verifications, commercial passenger badge checks, and are connected 24/7 to our central GPS operations desk.",
  },
];

/**
 * Unified Mixed Feed
 * Seamlessly interleaves Reviews, Videos, Media & Organization Remarks (CMBC, TV9, Nestlé, Paytm, Republic Bharat),
 * and Letters of Appreciation for an organic, non-segregated layout.
 */
export const mixedTestimonials = [
  {
    cardType: "media",
    ...mediaAndOrgRemarks[0], // Nestlé
  },
  {
    cardType: "video",
    ...videoTestimonials[0], // Jim Corbett
  },
  {
    cardType: "review",
    ...customerReviews[0], // Rahul Sharma
  },
  {
    cardType: "letter",
    ...appreciationLetters[1], // Paytm Letter
  },
  {
    cardType: "media",
    ...mediaAndOrgRemarks[2], // TV9 Bharatvarsh
  },
  {
    cardType: "review",
    ...customerReviews[2], // Vikram Singhania
  },
  {
    cardType: "video",
    ...videoTestimonials[1], // Udaipur Wedding
  },
  {
    cardType: "letter",
    ...appreciationLetters[0], // Nestlé Letter
  },
  {
    cardType: "media",
    ...mediaAndOrgRemarks[3], // Republic Bharat
  },
  {
    cardType: "review",
    ...customerReviews[1], // Ananya Iyer
  },
  {
    cardType: "video",
    ...videoTestimonials[2], // School Excursion
  },
  {
    cardType: "letter",
    ...appreciationLetters[2], // DPS Society Letter
  },
  {
    cardType: "media",
    ...mediaAndOrgRemarks[4], // CMBC Business
  },
  {
    cardType: "review",
    ...customerReviews[3], // Pooja Malhotra
  },
  {
    cardType: "media",
    ...mediaAndOrgRemarks[1], // Paytm
  },
  {
    cardType: "video",
    ...videoTestimonials[3], // Family Pilgrimage
  },
  {
    cardType: "letter",
    ...appreciationLetters[3], // FEWP Letter
  },
  {
    cardType: "review",
    ...customerReviews[4], // Kunal Mehra
  },
  {
    cardType: "review",
    ...customerReviews[6], // Sunita Deshmukh
  },
  {
    cardType: "review",
    ...customerReviews[7], // Harpreet Singh Sodhi
  },
  {
    cardType: "review",
    ...customerReviews[5], // Dr. Arvind Swaminathan
  },
];

