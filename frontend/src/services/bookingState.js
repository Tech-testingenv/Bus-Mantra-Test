/**
 * Centralized Booking State Management
 * Handles persistence across navigation (Home -> Bus Detail), page reloads, and direct URL sharing.
 */

const STORAGE_KEY = "bus_mantra_booking_session";

/**
 * Save booking session to client storage
 */
export function saveBookingSession(data) {
  if (typeof window === "undefined") return;
  try {
    const payload = JSON.stringify({
      ...data,
      savedAt: Date.now(),
    });
    sessionStorage.setItem(STORAGE_KEY, payload);
    localStorage.setItem(STORAGE_KEY, payload);
  } catch (err) {
    console.warn("Could not save booking session", err);
  }
}

/**
 * Retrieve booking session from client storage
 */
export function getBookingSession() {
  if (typeof window === "undefined") return null;
  try {
    const sessionRaw = sessionStorage.getItem(STORAGE_KEY);
    if (sessionRaw) return JSON.parse(sessionRaw);

    const localRaw = localStorage.getItem(STORAGE_KEY);
    if (localRaw) return JSON.parse(localRaw);
  } catch (err) {
    console.warn("Could not retrieve booking session", err);
  }
  return null;
}

/**
 * Clear booking session
 */
export function clearBookingSession() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn("Could not clear booking session", err);
  }
}

/**
 * Convert booking fields to URL query params
 */
export function encodeBookingToQuery(data) {
  if (!data) return "";
  const params = new URLSearchParams();

  if (data.pickupPoint) params.set("pickup", data.pickupPoint);
  if (data.destination) {
    const destStr = Array.isArray(data.destination)
      ? data.destination.join(",")
      : String(data.destination);
    params.set("dest", destStr);
  }
  if (data.passengers) params.set("passengers", String(data.passengers));
  if (data.departureDateTime) params.set("dep", data.departureDateTime);
  if (data.returnDateTime) params.set("ret", data.returnDateTime);
  if (data.fullName) params.set("name", data.fullName);
  if (data.mobile) params.set("phone", data.mobile);
  if (data.email) params.set("email", data.email);
  if (data.category) params.set("category", data.category);
  if (data.vehicleType) params.set("vehicleType", data.vehicleType);

  return params.toString();
}

/**
 * Parse booking data from URL search parameters
 */
export function parseBookingFromQuery(searchParams) {
  if (!searchParams) return null;
  const get = (key) =>
    typeof searchParams.get === "function"
      ? searchParams.get(key)
      : searchParams[key] || null;

  const pickup = get("pickup") || get("pickupPoint");
  const destRaw = get("dest") || get("destination");
  const passengers = get("passengers");
  const dep = get("dep") || get("departureDateTime");
  const ret = get("ret") || get("returnDateTime");
  const name = get("name") || get("fullName");
  const phone = get("phone") || get("mobile");
  const email = get("email");
  const category = get("category") || get("busCategory");
  const vehicleType = get("vehicleType") || get("vehicle");

  if (!pickup && !destRaw && !passengers && !dep && !category && !vehicleType) {
    return null;
  }

  const destination = destRaw
    ? destRaw.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return {
    pickupPoint: pickup || "Delhi NCR",
    destination: destination.length > 0 ? destination : ["Jaipur"],
    passengers: passengers ? String(passengers) : "",
    departureDateTime: dep || "30-09-2026 | 07:00 AM",
    returnDateTime: ret || "02-10-2026 | 09:00 PM",
    fullName: name || "",
    mobile: phone || "",
    email: email || "",
    category: category || "tata",
    vehicleType: vehicleType || null,
    vehicleTypeName:
      vehicleType === "tempo-traveler"
        ? "Tempo Traveler"
        : vehicleType === "mini-coach"
          ? "Mini Coach"
          : null,
    hasDeterminedPassengers: Boolean(passengers && parseInt(passengers, 10) > 0),
  };
}

/**
 * Merge query params with stored session data
 */
export function resolveInitialBookingState(searchParams) {
  const fromQuery = parseBookingFromQuery(searchParams);
  const fromSession = getBookingSession();

  const vehicleType =
    fromQuery?.vehicleType || fromSession?.vehicleType || "mini-coach";

  const merged = {
    pickupPoint: fromQuery?.pickupPoint || fromSession?.pickupPoint || "Delhi NCR",
    destination:
      fromQuery?.destination ||
      (Array.isArray(fromSession?.destination)
        ? fromSession.destination
        : fromSession?.destination
          ? [fromSession.destination]
          : ["Jaipur"]),
    passengers:
      fromQuery?.passengers ||
      (fromSession?.passengers ? String(fromSession.passengers) : ""),
    departureDateTime:
      fromQuery?.departureDateTime ||
      fromSession?.departureDateTime ||
      "30-09-2026 | 07:00 AM",
    returnDateTime:
      fromQuery?.returnDateTime ||
      fromSession?.returnDateTime ||
      "02-10-2026 | 09:00 PM",
    fullName: fromQuery?.fullName || fromSession?.fullName || "",
    mobile: fromQuery?.mobile || fromSession?.mobile || "",
    email: fromQuery?.email || fromSession?.email || "",
    category: fromQuery?.category || fromSession?.category || "tata",
    vehicleType,
    vehicleTypeName:
      fromQuery?.vehicleTypeName ||
      fromSession?.vehicleTypeName ||
      (vehicleType === "tempo-traveler" ? "Tempo Traveler" : "Mini Coach"),
    hasDeterminedPassengers: Boolean(
      (fromQuery?.passengers && parseInt(fromQuery.passengers, 10) > 0) ||
      (fromSession?.passengers && parseInt(fromSession.passengers, 10) > 0)
    ),
  };

  return merged;
}
