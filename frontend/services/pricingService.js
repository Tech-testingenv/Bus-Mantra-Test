/**
 * Service to calculate bus charter pricing based on route distance, selected bus, and rates.
 * Extensible design: supports minimum charter distance, per-km rates, and transparent breakdowns.
 */

// Default fleet rates per KM if not specified in bus object
export const DEFAULT_BUS_RATES = {
  "mini-coach": 28,
  "tempo-traveler": 24, // Configurable default rate per KM for Tempo Traveler
  "premium-coach": 42,
  "luxury-coach": 58,
};

/**
 * Format numeric amount into Indian Rupee currency format (e.g. ₹15,680)
 */
export function formatCurrency(amount) {
  if (isNaN(amount)) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate total estimated charter price
 *
 * @param {Object} params
 * @param {number} params.totalDistanceKm - Total round-trip distance in KM
 * @param {Object} params.bus - Selected bus fleet object
 * @param {Object} [params.options] - Optional custom pricing flags (minDistance, driverCharges, etc.)
 * @returns {Object} Pricing computation breakdown
 */
export function calculateCharterPrice({
  totalDistanceKm = 0,
  bus,
  options = {},
}) {
  const km = Math.max(0, Number(totalDistanceKm) || 0);

  // Rate per KM resolution
  const ratePerKm =
    Number(bus?.ratePerKm) ||
    DEFAULT_BUS_RATES[bus?.vehicleTypeId] ||
    DEFAULT_BUS_RATES[bus?.id] ||
    DEFAULT_BUS_RATES[bus?.slug] ||
    35;

  // Minimum billing distance rule (default 250 KM min for outstation charter)
  const minBillingKm = options.minBillingKm || 200;
  const billableKm = Math.max(km, minBillingKm);

  // Core base fare calculation: Distance × Rate per KM
  const basePrice = Math.round(billableKm * ratePerKm);

  // GST / Taxes (Included / upfront transparency)
  const gstRate = options.gstRate !== undefined ? options.gstRate : 0.05; // 5% standard tourist transport GST
  const estimatedTax = Math.round(basePrice * gstRate);
  const totalEstimatedPrice = basePrice + estimatedTax;

  return {
    rawDistanceKm: km,
    billableKm,
    ratePerKm,
    basePrice,
    estimatedTax,
    totalPrice: totalEstimatedPrice,
    gstRate,
    gstPercent: `${Math.round(gstRate * 100)}%`,
    formattedTotalPrice: formatCurrency(totalEstimatedPrice),
    formattedBasePrice: formatCurrency(basePrice),
    formattedEstimatedTax: formatCurrency(estimatedTax),
    formattedGst: formatCurrency(estimatedTax),
    formattedRatePerKm: `₹${ratePerKm}/KM`,
    isMinDistanceApplied: km < minBillingKm && km > 0,
    minBillingKm,
    includedBenefits: [
      "Dedicated Full Coach Charter",
      "Fuel, Commercial Insurance & Chauffeur",
      "Zero Hidden Dispatch Fees",
      "24/7 Roadside & Operation Support",
    ],
  };
}

/**
 * Break down any fare amount into pre-GST base fare, GST amount, and total fare.
 * Preserves the project's standard 5% transport GST rate.
 *
 * @param {number} amount - Fare amount
 * @param {boolean} [isTotal=true] - Whether the input amount already includes GST
 * @param {number} [gstRate=0.05] - GST rate (default 5%)
 * @returns {Object}
 */
export function calculateFareBreakdown(amount = 0, isTotal = true, gstRate = 0.05) {
  const numericAmount = Math.max(0, Number(amount) || 0);

  let basePrice = 0;
  let estimatedTax = 0;
  let totalPrice = 0;

  if (isTotal) {
    // If the provided amount already includes GST (e.g. ₹16,464), extract the taxable base:
    // 16,464 / 1.05 = 15,680; GST = 784
    basePrice = Math.round(numericAmount / (1 + gstRate));
    estimatedTax = numericAmount - basePrice;
    totalPrice = numericAmount;
  } else {
    // If the provided amount is pre-tax base, calculate GST on top
    basePrice = Math.round(numericAmount);
    estimatedTax = Math.round(basePrice * gstRate);
    totalPrice = basePrice + estimatedTax;
  }

  return {
    basePrice,
    estimatedTax,
    totalPrice,
    gstRate,
    gstPercent: `${Math.round(gstRate * 100)}%`,
    formattedBasePrice: formatCurrency(basePrice),
    formattedEstimatedTax: formatCurrency(estimatedTax),
    formattedGst: formatCurrency(estimatedTax),
    formattedTotalPrice: formatCurrency(totalPrice),
  };
}
