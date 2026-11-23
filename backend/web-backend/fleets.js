import { query } from "../shared/db.js";

export const runtime = "nodejs";

export async function GET() {
  const { rows } = await query(
    "SELECT id, slug, coach_type AS \"coachType\", name, capacity, min_seats AS \"minSeats\", max_seats AS \"maxSeats\", rate_per_km AS \"ratePerKm\", default_round_trip_km AS \"defaultRoundTripKm\", default_estimated_fare AS \"defaultEstimatedFare\", is_popular AS \"isPopular\", image, gallery, description, amenities, features, content FROM fleets ORDER BY min_seats"
  );
  return Response.json(rows);
}
