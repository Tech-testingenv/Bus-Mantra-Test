import {
  fleetTypesData,
  FLEET_CATEGORIES,
  FLEET_VEHICLE_VARIANTS,
  getCategoryBySlug,
  getVehicleVariantById,
} from "@/data/data";

/**
 * Service to select the appropriate bus and vehicle variant based on passenger count.
 * Logic: SELECT THE SMALLEST AVAILABLE VEHICLE VARIANT CAPACITY THAT CAN ACCOMMODATE THE PASSENGER COUNT.
 *
 * Rules:
 *  1 - 12 passengers  -> 12-seater Tempo Traveller / Urbania
 * 13 - 16 passengers  -> 16-seater Tempo Traveller / Urbania
 * 17 - 20 passengers  -> 20-seater Tempo Traveller
 * 21 - 21 passengers  -> 18/21-seater Tata / BharatBenz Luxury Coach
 * 22 - 26 passengers  -> 26-seater Tempo Traveller
 * 27 - 27 passengers  -> 27-seater Tata Luxury Coach
 * 28 - 40 passengers  -> 40-seater Volvo With Washroom
 * 41 - 45 passengers  -> 41/45-seater BharatBenz / Volvo Coach
 * 46 - 49 passengers  -> 45/49-seater Tata Luxury Coach
 * 50 - 53 passengers  -> 53-seater Tata Luxury Coach
 * 54 - 60 passengers  -> Volvo Luxury Flagship Coach
 * > 60 passengers     -> Requires custom arrangement notification
 */
export function getBusForPassengers(count) {
  const passengers = parseInt(count, 10);

  if (isNaN(passengers) || passengers <= 0) {
    return {
      bus: null,
      variant: null,
      error: "Please enter a valid passenger count.",
      exceedsCapacity: false,
    };
  }

  // Sorted by ascending capacity
  const sortedVariants = [...FLEET_VEHICLE_VARIANTS].sort(
    (a, b) => a.maxSeats - b.maxSeats
  );

  // Find the smallest variant that can accommodate the passengers
  const suitableVariant = sortedVariants.find(
    (v) => passengers <= v.maxSeats
  );

  if (suitableVariant) {
    const parentCategory = getCategoryBySlug(suitableVariant.categorySlug);
    return {
      bus: parentCategory || fleetTypesData[0],
      variant: suitableVariant,
      error: null,
      exceedsCapacity: false,
    };
  }

  // Fallback check against category maxSeats
  const sortedCategories = [...FLEET_CATEGORIES].sort(
    (a, b) => a.maxSeats - b.maxSeats
  );
  const suitableCategory = sortedCategories.find(
    (cat) => passengers <= cat.maxSeats
  );

  if (suitableCategory) {
    const defaultVariant =
      suitableCategory.vehicleTypes?.[0] || null;
    return {
      bus: suitableCategory,
      variant: defaultVariant,
      error: null,
      exceedsCapacity: false,
    };
  }

  // Passenger count exceeds largest bus in the fleet (60 seats)
  return {
    bus: null,
    variant: null,
    error:
      "Your group size requires a larger vehicle. Please contact us for a custom arrangement.",
    exceedsCapacity: true,
  };
}

/**
 * Retrieve bus category by slug or ID with full alias support
 */
export function getBusBySlug(slug) {
  if (!slug) return null;
  const normalized = String(slug).toLowerCase().trim();

  // 1. Direct category match or legacy alias match
  const cat = getCategoryBySlug(normalized);
  if (cat) return cat;

  // 2. Direct match on fleetTypesData array
  const byId = fleetTypesData.find(
    (b) =>
      b.slug === normalized ||
      b.id === normalized ||
      (Array.isArray(b.legacySlugs) && b.legacySlugs.includes(normalized))
  );
  if (byId) return byId;

  // 3. Variant slug match -> return parent category
  const variant = getVehicleVariantById(normalized);
  if (variant) {
    return getCategoryBySlug(variant.categorySlug);
  }

  return null;
}

/**
 * Get all available bus categories
 */
export function getAllBuses() {
  return fleetTypesData;
}

