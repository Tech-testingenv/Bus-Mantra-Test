import { query } from "../shared/db.js";
import { jsonError, requireFields } from "../shared/api.js";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();
    requireFields(body, ["fullName", "mobile", "passengers", "pickupPoint", "destination", "departureDateTime"]);
    const passengers = Number(body.passengers);
    if (!Number.isInteger(passengers) || passengers < 1) {
      return jsonError("Passenger count must be a positive whole number.");
    }

    if (body.fleetId !== undefined && (typeof body.fleetId !== "string" || !body.fleetId.trim())) {
      return jsonError("Select a valid coach.");
    }
    const fleet = body.fleetId
      ? await query(
        `SELECT id, name, slug, capacity, max_seats AS "maxSeats"
         FROM fleets WHERE id = $1 AND max_seats >= $2`,
        [body.fleetId, passengers]
      )
      : await query(
        `SELECT id, name, slug, capacity, max_seats AS "maxSeats"
         FROM fleets WHERE max_seats >= $1 ORDER BY max_seats LIMIT 1`,
        [passengers]
      );
    if (!fleet.rows[0]) {
      return jsonError("No vehicle is available for this group size. Please contact us for a custom arrangement.", 422);
    }

    const result = await query(
      `INSERT INTO bookings
       (full_name, email, mobile, passengers, pickup_point, destinations, departure_at, return_at, fleet_id)
       VALUES ($1,$2,$3,$4,$5,$6::jsonb,$7,$8,$9)
       RETURNING id, status, created_at AS "createdAt"`,
      [
        body.fullName.trim(),
        body.email?.trim() || null,
        body.mobile.trim(),
        passengers,
        body.pickupPoint.trim(),
        JSON.stringify(Array.isArray(body.destination) ? body.destination : [body.destination]),
        body.departureDateTime,
        body.returnDateTime || null,
        fleet.rows[0].id,
      ]
    );
    return Response.json({ booking: result.rows[0], fleet: fleet.rows[0] }, { status: 201 });
  } catch (error) {
    console.error("Booking API failed:", error);
    return jsonError(error.message || "Unable to save booking.", error.status || 500);
  }
}
