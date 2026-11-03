import { query } from "../shared/db.js";
import { adminError, requireAdmin, requireSameOrigin } from "./security.js";

const COACH_TYPES = ["mini-coach", "premium-coach", "luxury-coach"];

const FLEET_COLUMNS = `
  id, slug, coach_type, name, capacity, min_seats, max_seats,
  rate_per_km, default_round_trip_km, default_estimated_fare,
  is_popular, image, gallery, description, amenities, features
`;

function safeSlug(value) {
  return typeof value === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function validateFleet(body, { creating = false } = {}) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return "Fleet details are required.";
  }
  if (creating && !COACH_TYPES.includes(body.coach_type)) {
    return "Select a valid coach type.";
  }
  if (creating && (!safeSlug(body.id) || !safeSlug(body.slug))) {
    return "Coach ID and URL slug must use lowercase letters, numbers, and hyphens.";
  }
  if (typeof body.name !== "string" || !body.name.trim()) return "Coach name is required.";
  if (typeof body.capacity !== "string" || !body.capacity.trim()) return "Seat capacity is required.";
  if (!Number.isInteger(Number(body.min_seats)) || Number(body.min_seats) < 1) return "Minimum seats must be a positive whole number.";
  if (!Number.isInteger(Number(body.max_seats)) || Number(body.max_seats) < Number(body.min_seats)) return "Maximum seats must be at least the minimum seats.";
  if (!Number.isFinite(Number(body.rate_per_km)) || Number(body.rate_per_km) < 0) return "Rate per kilometre must be zero or greater.";
  if (body.default_round_trip_km != null && body.default_round_trip_km !== "" && (!Number.isInteger(Number(body.default_round_trip_km)) || Number(body.default_round_trip_km) < 1)) return "Default round-trip distance must be a positive whole number.";
  if (body.default_estimated_fare != null && body.default_estimated_fare !== "" && (!Number.isFinite(Number(body.default_estimated_fare)) || Number(body.default_estimated_fare) < 0)) return "Default estimated fare must be zero or greater.";
  if (typeof body.image !== "string" || !body.image.trim()) return "An image path is required.";
  if (typeof body.description !== "string" || !body.description.trim()) return "Description is required.";
  if (!Array.isArray(body.gallery) || !Array.isArray(body.amenities)) return "Gallery and amenities must be lists.";
  if (!body.features || typeof body.features !== "object" || Array.isArray(body.features)) return "Feature details must be a key-value object.";
  return null;
}

export async function GET(request, context = {}) {
  const access = await requireAdmin();
  if (access.response) return access.response;
  try {
    const routeParams = await context.params;
    const id = routeParams?.id;
    if (id) {
      const result = await query(`SELECT ${FLEET_COLUMNS} FROM fleets WHERE id = $1 OR slug = $1`, [id]);
      if (!result.rowCount) return Response.json({ error: "Coach not found." }, { status: 404 });
      return Response.json({ coach: result.rows[0] });
    }
    const type = new URL(request.url).searchParams.get("type");
    if (!COACH_TYPES.includes(type)) {
      return Response.json({ error: "Select a valid coach type." }, { status: 400 });
    }
    const result = await query(
      `SELECT ${FLEET_COLUMNS} FROM fleets WHERE coach_type = $1 ORDER BY min_seats, name`,
      [type]
    );
    return Response.json({ coaches: result.rows });
  } catch (error) {
    return adminError(error, "Fleet management list failed");
  }
}

export async function POST(request) {
  const originError = requireSameOrigin(request);
  if (originError) return originError;
  const access = await requireAdmin();
  if (access.response) return access.response;
  try {
    const body = await request.json();
    const validationError = validateFleet(body, { creating: true });
    if (validationError) return Response.json({ error: validationError }, { status: 400 });
    const result = await query(
      `INSERT INTO fleets (
        id, slug, coach_type, name, capacity, min_seats, max_seats, rate_per_km,
        default_round_trip_km, default_estimated_fare,
        is_popular, image, gallery, description, amenities, features
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13::jsonb,$14,$15::jsonb,$16::jsonb)
      RETURNING ${FLEET_COLUMNS}`,
      [
        body.id,
        body.slug,
        body.coach_type,
        body.name.trim(),
        body.capacity.trim(),
        Number(body.min_seats),
        Number(body.max_seats),
        Number(body.rate_per_km),
        body.default_round_trip_km == null || body.default_round_trip_km === "" ? null : Number(body.default_round_trip_km),
        body.default_estimated_fare == null || body.default_estimated_fare === "" ? null : Number(body.default_estimated_fare),
        Boolean(body.is_popular),
        body.image.trim(),
        JSON.stringify(body.gallery),
        body.description.trim(),
        JSON.stringify(body.amenities),
        JSON.stringify(body.features),
      ]
    );
    return Response.json({ coach: result.rows[0] }, { status: 201 });
  } catch (error) {
    if (error.code === "23505") {
      return Response.json({ error: "A coach with this ID or URL slug already exists." }, { status: 409 });
    }
    return adminError(error, "Fleet management create failed");
  }
}

export async function PATCH(request, { params }) {
  const originError = requireSameOrigin(request);
  if (originError) return originError;
  const access = await requireAdmin();
  if (access.response) return access.response;
  try {
    const { id } = await params;
    const body = await request.json();
    const validationError = validateFleet(body);
    if (validationError) return Response.json({ error: validationError }, { status: 400 });
    if (!safeSlug(body.slug)) {
      return Response.json({ error: "URL slug must use lowercase letters, numbers, and hyphens." }, { status: 400 });
    }
    const result = await query(
      `UPDATE fleets SET
        slug = $1, name = $2, capacity = $3, min_seats = $4, max_seats = $5,
        rate_per_km = $6, default_round_trip_km = $7, default_estimated_fare = $8,
        is_popular = $9, image = $10, gallery = $11::jsonb,
        description = $12, amenities = $13::jsonb, features = $14::jsonb
       WHERE id = $15
       RETURNING ${FLEET_COLUMNS}`,
      [
        body.slug,
        body.name.trim(),
        body.capacity.trim(),
        Number(body.min_seats),
        Number(body.max_seats),
        Number(body.rate_per_km),
        body.default_round_trip_km == null || body.default_round_trip_km === "" ? null : Number(body.default_round_trip_km),
        body.default_estimated_fare == null || body.default_estimated_fare === "" ? null : Number(body.default_estimated_fare),
        Boolean(body.is_popular),
        body.image.trim(),
        JSON.stringify(body.gallery),
        body.description.trim(),
        JSON.stringify(body.amenities),
        JSON.stringify(body.features),
        id,
      ]
    );
    if (!result.rowCount) return Response.json({ error: "Coach not found." }, { status: 404 });
    return Response.json({ coach: result.rows[0] });
  } catch (error) {
    if (error.code === "23505") {
      return Response.json({ error: "Another coach already uses this URL slug." }, { status: 409 });
    }
    return adminError(error, "Fleet management update failed");
  }
}
