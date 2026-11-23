import { query } from "../shared/db.js";
import { adminError, requireAdmin, requireSameOrigin } from "./security.js";

const FLEET_COLUMNS = `
  id, slug, coach_type, name, capacity, min_seats, max_seats,
  rate_per_km, default_round_trip_km, default_estimated_fare,
  is_popular, image, gallery, description, amenities, features, content
`;

function safeSlug(value) {
  return typeof value === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

export function validateFleet(body, { creating = false } = {}) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return "Fleet details are required.";
  }
  if (creating && !safeSlug(body.coach_type)) {
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
  if (body.content != null) {
    if (typeof body.content !== "object" || Array.isArray(body.content)) return "Coach content must be an object.";
    if (body.content.tag !== undefined && typeof body.content.tag !== "string") return "Tag must be text.";
    if (!Array.isArray(body.content.specifications) || body.content.specifications.some((item) =>
      !item || typeof item.label !== "string" || !item.label.trim() ||
      typeof item.value !== "string" || !item.value.trim() || typeof item.description !== "string"
    )) return "Each specification needs a label, value, and description.";
    for (const key of ["features", "inclusions", "cabinAmenities", "bookingInclusions"]) {
      if (!Array.isArray(body.content[key]) || body.content[key].some((item) => typeof item !== "string" || !item.trim())) return `${key} must be a list of text values.`;
    }
  }
  return null;
}

export async function GET(request, context = {}) {
  const access = await requireAdmin({ module: "fleet", action: "view" });
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
    if (!safeSlug(type)) {
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
  const access = await requireAdmin({ module: "fleet", action: "create" });
  if (access.response) return access.response;
  try {
    const body = await request.json();
    const validationError = validateFleet(body, { creating: true });
    if (validationError) return Response.json({ error: validationError }, { status: 400 });
    const category = await query("SELECT 1 FROM fleet_categories WHERE id = $1", [body.coach_type]);
    if (!category.rowCount) return Response.json({ error: "Coach category does not exist." }, { status: 400 });
    const result = await query(
      `INSERT INTO fleets (
        id, slug, coach_type, name, capacity, min_seats, max_seats, rate_per_km,
        default_round_trip_km, default_estimated_fare,
        is_popular, image, gallery, description, amenities, features, content
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13::jsonb,$14,$15::jsonb,$16::jsonb,$17::jsonb)
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
        body.content == null ? null : JSON.stringify(body.content),
      ]
    );
    return Response.json({ coach: result.rows[0] }, { status: 201 });
  } catch (error) {
    if (error.code === "23503") return Response.json({ error: "Coach category no longer exists." }, { status: 409 });
    if (error.code === "23505") {
      return Response.json({ error: "A coach with this ID or URL slug already exists." }, { status: 409 });
    }
    return adminError(error, "Fleet management create failed");
  }
}

export async function PATCH(request, { params }) {
  const originError = requireSameOrigin(request);
  if (originError) return originError;
  const access = await requireAdmin({ module: "fleet", action: "edit" });
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
        description = $12, amenities = $13::jsonb, features = $14::jsonb,
        content = $15::jsonb
       WHERE id = $16
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
        body.content == null ? null : JSON.stringify(body.content),
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
