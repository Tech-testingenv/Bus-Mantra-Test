import { query } from "../shared/db.js";

export const runtime = "nodejs";

export async function GET(request, { params }) {
  const { slug } = await params;
  const result = await query(
    `SELECT id, slug, name, capacity, min_seats AS "minSeats",
      max_seats AS "maxSeats", rate_per_km AS "ratePerKm",
      default_round_trip_km AS "defaultRoundTripKm",
      default_estimated_fare AS "defaultEstimatedFare",
      is_popular AS "isPopular", image, gallery, description, amenities, features
     FROM fleets WHERE slug = $1 OR id = $1 LIMIT 1`,
    [slug]
  );
  if (!result.rowCount) return Response.json({ error: "Coach not found." }, { status: 404 });
  return Response.json(result.rows[0]);
}
