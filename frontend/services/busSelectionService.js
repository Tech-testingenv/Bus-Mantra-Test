import { fleetTypesData } from "@/data/data";

/**
 * Service to select the appropriate bus based on passenger count.
 * Logic: SELECT THE SMALLEST AVAILABLE BUS CAPACITY THAT CAN ACCOMMODATE THE PASSENGER COUNT.
 *
 * Rules:
 *  1 - 19 passengers  -> mini-coach (19-seat capacity)
 * 20 - 45 passengers  -> premium-coach (45-seat capacity)
 * 46 - 60 passengers  -> luxury-coach (60-seat capacity)
 * > 60 passengers     -> Requires custom arrangement notification
 */
export function getBusForPassengers(count) {
  const passengers = parseInt(count, 10);

  if (isNaN(passengers) || passengers <= 0) {
    return {
      bus: null,
      error: "Please enter a valid passenger count.",
      exceedsCapacity: false,
    };
  }

  // Sorted by ascending capacity
  const availableBuses = [...fleetTypesData].sort(
    (a, b) => a.maxSeats - b.maxSeats
  );

  // Find the smallest bus that can accommodate the passengers
  const suitableBus = availableBuses.find(
    (bus) => passengers <= bus.maxSeats
  );

  if (suitableBus) {
    return {
      bus: suitableBus,
      error: null,
      exceedsCapacity: false,
    };
  }

  // Passenger count exceeds largest bus in the fleet (60 seats)
  return {
    bus: null,
    error:
      "Your group size requires a larger vehicle. Please contact us for a custom arrangement.",
    exceedsCapacity: true,
  };
}

/**
 * Retrieve bus by slug or ID
 */
export function getBusBySlug(slug) {
  if (!slug) return null;
  const normalized = String(slug).toLowerCase().trim();
  return (
    fleetTypesData.find(
      (b) => b.slug === normalized || b.id === normalized
    ) || null
  );
}

/**
 * Get all available buses
 */
export function getAllBuses() {
  return fleetTypesData;
}
