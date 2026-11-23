import { query } from "../shared/db.js";
import { adminError, requireAdmin, requireSameOrigin } from "./security.js";

export function validateCategory(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return "Category details are required.";
  if (typeof body.id !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(body.id)) return "Category ID must use lowercase letters, numbers, and hyphens.";
  for (const key of ["name", "capacity", "description"]) {
    if (typeof body[key] !== "string" || !body[key].trim()) return `Category ${key} is required.`;
  }
  return null;
}

export async function GET() {
  const access = await requireAdmin({ module: "fleet", action: "view" });
  if (access.response) return access.response;
  try {
    const result = await query(`SELECT c.id, c.name, c.capacity, c.description, COUNT(f.id)::int AS count
      FROM fleet_categories c LEFT JOIN fleets f ON f.coach_type = c.id
      GROUP BY c.id ORDER BY c.name`);
    return Response.json({ categories: result.rows });
  } catch (error) {
    return adminError(error, "Fleet category list failed");
  }
}

async function save(request, update) {
  const originError = requireSameOrigin(request);
  if (originError) return originError;
  const access = await requireAdmin({ module: "fleet", action: update ? "edit" : "create" });
  if (access.response) return access.response;
  try {
    const body = await request.json();
    const error = validateCategory(body);
    if (error) return Response.json({ error }, { status: 400 });
    if (!update && ["minicoach-edit", "premiumcoach-edit", "luxurycoach-edit"].includes(body.id)) {
      return Response.json({ error: "This category ID is reserved for an existing URL." }, { status: 400 });
    }
    const values = [body.id, body.name.trim(), body.capacity.trim(), body.description.trim()];
    const result = await query(update
      ? "UPDATE fleet_categories SET name=$2, capacity=$3, description=$4 WHERE id=$1 RETURNING *"
      : "INSERT INTO fleet_categories (id,name,capacity,description) VALUES ($1,$2,$3,$4) RETURNING *", values);
    if (!result.rowCount) return Response.json({ error: "Category not found." }, { status: 404 });
    return Response.json({ category: result.rows[0] }, { status: update ? 200 : 201 });
  } catch (error) {
    if (error.code === "23505") return Response.json({ error: "A category with this ID already exists." }, { status: 409 });
    return adminError(error, "Fleet category save failed");
  }
}

export function POST(request) { return save(request, false); }
export function PATCH(request) { return save(request, true); }

export async function DELETE(request) {
  const originError = requireSameOrigin(request);
  if (originError) return originError;
  const access = await requireAdmin({ module: "fleet", action: "delete" });
  if (access.response) return access.response;
  try {
    const id = new URL(request.url).searchParams.get("id");
    const result = await query("DELETE FROM fleet_categories WHERE id=$1 AND NOT EXISTS (SELECT 1 FROM fleets WHERE coach_type=$1) RETURNING id", [id]);
    if (!result.rowCount) return Response.json({ error: "Category does not exist or still contains coaches." }, { status: 409 });
    return Response.json({ success: true });
  } catch (error) {
    if (error.code === "23503") return Response.json({ error: "Category still contains coaches." }, { status: 409 });
    return adminError(error, "Fleet category delete failed");
  }
}
