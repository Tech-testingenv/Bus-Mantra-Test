/**
 * Service to calculate route distances across hubs and multi-destination routes.
 * Isolated service layer: Can be seamlessly replaced with Google Maps Distance Matrix API
 * or Mapbox Directions API in production without modifying UI components.
 */

// Realistic verified road distances between major hubs (in KM)
const DISTANCE_MATRIX = {
  // Delhi NCR Hub connections
  "delhi ncr|jaipur": 280,
  "delhi ncr|agra": 230,
  "delhi ncr|haridwar": 220,
  "delhi ncr|rishikesh": 245,
  "delhi ncr|chandigarh": 250,
  "delhi ncr|shimla": 350,
  "delhi ncr|manali": 540,
  "delhi ncr|amritsar": 450,
  "delhi ncr|udaipur": 660,
  "delhi ncr|goa": 1850,

  // Direct city to city legs (popular Golden Triangle & North Circuit)
  "jaipur|agra": 240,
  "jaipur|udaipur": 395,
  "agra|haridwar": 380,
  "haridwar|rishikesh": 25,
  "chandigarh|shimla": 115,
  "shimla|manali": 240,
  "chandigarh|manali": 300,
  "chandigarh|amritsar": 230,
  "jaipur|haridwar": 490,
  "jaipur|chandigarh": 505,
  "agra|udaipur": 630,
  "delhi|jaipur": 280,
  "delhi|agra": 230,
};

function normalizeCity(name) {
  if (!name) return "";
  const clean = name.toLowerCase().trim();
  if (clean.includes("delhi") || clean.includes("noida") || clean.includes("gurgaon") || clean.includes("gurugram")) {
    return "delhi ncr";
  }
  return clean;
}

/**
 * Get one-way road distance between two locations in KM
 */
export function getLegDistance(fromCity, toCity) {
  const normFrom = normalizeCity(fromCity);
  const normTo = normalizeCity(toCity);

  if (!normFrom || !normTo) return 0;
  if (normFrom === normTo) return 0;

  const key1 = `${normFrom}|${normTo}`;
  const key2 = `${normTo}|${normFrom}`;

  if (DISTANCE_MATRIX[key1] !== undefined) return DISTANCE_MATRIX[key1];
  if (DISTANCE_MATRIX[key2] !== undefined) return DISTANCE_MATRIX[key2];

  // Fallback distance for unmapped regional locations (approximated based on North Indian inter-city average)
  return 220;
}

/**
 * Calculate multi-leg round-trip route distance
 * Route: Pickup -> Dest 1 -> Dest 2 -> ... -> Return (Pickup)
 *
 * @param {Object} params
 * @param {string} params.pickup - Starting location
 * @param {string[]|string} params.destinations - One or more destination names
 * @returns {Promise<{ totalKm: number, legDistances: Array, routeSummaryText: string, waypoints: string[] }>}
 */
export async function calculateRouteDistance({ pickup, destinations }) {
  const cleanPickup = (pickup || "Delhi NCR").trim();

  // Normalize destinations into an array
  let destList = [];
  if (Array.isArray(destinations)) {
    destList = destinations.map((d) => String(d).trim()).filter(Boolean);
  } else if (typeof destinations === "string") {
    destList = destinations
      .split(",")
      .map((d) => d.trim())
      .filter(Boolean);
  }

  // Fallback default destination if none provided
  if (destList.length === 0) {
    destList = ["Jaipur"];
  }

  // Construct full ordered path: [Pickup, Dest1, Dest2, ..., Return (Pickup)]
  const fullPath = [cleanPickup, ...destList, cleanPickup];
  const legDistances = [];
  let totalKm = 0;

  for (let i = 0; i < fullPath.length - 1; i++) {
    const from = fullPath[i];
    const to = fullPath[i + 1];
    const km = getLegDistance(from, to);
    totalKm += km;
    legDistances.push({
      from,
      to,
      km,
      label: `${from} → ${to}`,
    });
  }

  // Route summary text
  const routeSummaryText = `${fullPath.slice(0, -1).join(" → ")} → ${cleanPickup} (Return)`;

  return {
    totalKm: Math.max(totalKm, 100), // Min 100 KM for charter
    legDistances,
    routeSummaryText,
    waypoints: fullPath,
    destinations: destList,
    pickup: cleanPickup,
  };
}
