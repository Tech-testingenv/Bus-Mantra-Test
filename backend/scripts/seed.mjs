import pg from "pg";
import fs from "node:fs/promises";
import path from "node:path";

const { Pool } = pg;
try {
  const envText = await fs.readFile(path.join(process.cwd(), ".env.local"), "utf8");
  for (const line of envText.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].replace(/^(['"])(.*)\1$/, "$2");
    }
  }
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is required.");

const pool = new Pool({
  connectionString,
  ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
  options: "-c search_path=bus_mantra,public",
});

const fleets = [
  ["mini-coach", "mini-coach", "Mini Coach", "15–19 Seats", 1, 19, 28, false, "/fleet/1.jpg", ["/fleet/2.jpg", "/fleet/3.jpg", "/fleet/4.jpg"], "Agile maneuverability, ideal for medium corporate teams, wedding parties, family trips, and airport pickups.", ["AC & Climate Control", "Push-back Reclining Seats", "Dedicated Luggage Space"], { luggage: "15–20 Standard Bags", entertainment: "Stereo Audio & Mic" }],
  ["premium-coach", "premium-coach", "Premium Coach", "20–45 Seats", 20, 45, 42, true, "/fleet/9.jpg", ["/fleet/10.jpg", "/fleet/11.jpg", "/fleet/12.jpg"], "Ergonomic reclining seats, spacious luggage bays, and Wi-Fi connectivity for smooth multi-hour intercity transit.", ["Ergonomic Reclining Seats", "Fast Onboard Wi-Fi", "USB Charging at Every Seat"], { luggage: "40–45 Large Suitcases", entertainment: "HD Screen & Sound System" }],
  ["luxury-coach", "luxury-coach", "Luxury Coach", "46–60 Seats", 46, 60, 58, false, "/fleet/5.jpg", ["/fleet/6.jpg", "/fleet/7.jpg", "/fleet/8.jpg"], "Maximum capacity touring with onboard restroom, entertainment systems, and expansive undercarriage bays for long tours.", ["Executive Luxury Plush Seats", "Expansive Undercarriage Bays", "Dual LED Entertainment Screens"], { luggage: "60+ Large Suitcases", entertainment: "Dual Full-HD Displays" }],
];

const services = [
  ["corporate-travel", "corporate", "Corporate Travel", "Professional group transportation for meetings, conferences, employee movement, team travel and business events.", "/images/services/corporate-india.jpg"],
  ["group-tours", "group-tours", "Group Tours", "Comfortable coaches for sightseeing, multi-city journeys, weekend trips and organised group travel.", "/images/services/group-tours-india.jpg"],
  ["events-weddings", "events", "Events & Weddings", "Seamless transportation for weddings, celebrations, conferences, exhibitions and large gatherings.", "/images/services/events-india.jpg"],
  ["school-trips", "school-trips", "School Trips", "Safe and organised group transportation for school excursions, educational trips and student travel.", "/images/services/school-trips-india.jpg"],
  ["airport-transfers", "airport-transfer", "Airport Pick Up & Transfer", "Convenient group airport transfers with comfortable vehicles and coordinated pickup and drop-off.", "/images/services/airport-transfer-india.jpg"],
  ["hotel-transfers", "hotel-transfer", "Hotel Pick Up & Transfer", "Reliable hotel transfers for groups travelling together, with convenient pickup and destination coordination.", "/images/services/hotel-transfer-india.jpg"],
];

const destinations = [
  ["jaipur", "Jaipur", "POPULAR DESTINATION", "Delhi → Jaipur", "Explore Jaipur with comfortable group transportation for heritage tours, weekend getaways, sightseeing and memorable journeys.", ["/images/destinations/amber-fort.jpg", "/images/destinations/city-palace-jaipur.jpg", "/images/destinations/hawa-mahal.jpg"]],
  ["manali", "Manali", "POPULAR DESTINATION", "Delhi → Manali", "Travel comfortably to Manali for mountain escapes, group tours, weekend trips and memorable journeys through the Himalayas.", ["/images/destinations/solang-valley.jpg", "/images/destinations/hadimba-temple.jpg", "/images/destinations/mall-road.jpg"]],
  ["agra", "Agra", "POPULAR DESTINATION", "Delhi → Agra", "Explore Agra with reliable group transportation for heritage tours and comfortable sightseeing journeys.", ["/images/destinations/agra-fort.jpg", "/images/destinations/taj-mahal.jpg", "/images/destinations/mehtab-bagh.jpg"]],
  ["haridwar", "Haridwar", "POPULAR DESTINATION", "Delhi → Haridwar", "Travel together to Haridwar for pilgrimage, group journeys and peaceful escapes.", ["/images/destinations/har-ki-pauri.jpg", "/images/destinations/mansa-devi.jpg", "/images/destinations/haridwar-2.jpg"]],
  ["udaipur", "Udaipur", "POPULAR DESTINATION", "Delhi → Udaipur", "Discover Udaipur with comfortable group transportation for scenic tours and memorable journeys.", ["/images/destinations/udaipur.png", "/images/destinations/city-palace-jaipur.jpg"]],
  ["goa", "Goa", "POPULAR DESTINATION", "Delhi → Goa", "Enjoy comfortable group travel to Goa for beach holidays, sightseeing and coastal getaways.", ["/images/destinations/goa2.png"]],
];

try {
  for (const fleet of fleets) {
    await pool.query(`INSERT INTO fleets (id, slug, coach_type, name, capacity, min_seats, max_seats, rate_per_km, is_popular, image, gallery, description, amenities, features)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11::jsonb,$12,$13::jsonb,$14::jsonb)
      ON CONFLICT (id) DO UPDATE SET coach_type=EXCLUDED.coach_type, name=EXCLUDED.name, capacity=EXCLUDED.capacity, min_seats=EXCLUDED.min_seats, max_seats=EXCLUDED.max_seats, rate_per_km=EXCLUDED.rate_per_km, is_popular=EXCLUDED.is_popular, image=EXCLUDED.image, gallery=EXCLUDED.gallery, description=EXCLUDED.description, amenities=EXCLUDED.amenities, features=EXCLUDED.features`, [...fleet.slice(0, 2), fleet[0], ...fleet.slice(2, 9), JSON.stringify(fleet[9]), fleet[10], JSON.stringify(fleet[11]), JSON.stringify(fleet[12])]);
  }
  for (const service of services) {
    await pool.query(`INSERT INTO services (slug, id, title, description, image) VALUES ($1,$2,$3,$4,$5)
      ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, description=EXCLUDED.description, image=EXCLUDED.image`, service);
  }
  for (const destination of destinations) {
    await pool.query(`INSERT INTO destinations (slug, name, badge, route, description, gallery) VALUES ($1,$2,$3,$4,$5,$6::jsonb)
      ON CONFLICT (slug) DO UPDATE SET name=EXCLUDED.name, description=EXCLUDED.description, gallery=EXCLUDED.gallery`, [...destination.slice(0, 5), JSON.stringify(destination[5])]);
  }
  console.log("Bus Mantra catalog seeded.");
} finally {
  await pool.end();
}
