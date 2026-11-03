import { query } from "@/lib/db";
import { adminError, requireAdmin, requireSameOrigin } from "./security";

const catalogConfig = {
  fleets: {
    table: "fleets",
    key: "id",
    columns: ["id", "slug", "name", "capacity", "min_seats", "max_seats", "rate_per_km", "default_round_trip_km", "default_estimated_fare", "is_popular", "image", "gallery", "description", "amenities", "features"],
    json: ["gallery", "amenities", "features"],
  },
  destinations: {
    table: "destinations",
    key: "slug",
    columns: ["slug", "name", "badge", "route", "description", "gallery", "popular_places"],
    json: ["gallery", "popular_places"],
  },
  services: {
    table: "services",
    key: "slug",
    columns: ["slug", "id", "title", "description", "image", "content"],
    json: ["content"],
  },
};

function parseCollection(request) {
  const collection = new URL(request.url).searchParams.get("collection");
  return catalogConfig[collection] ? { collection, config: catalogConfig[collection] } : null;
}

function normalizeData(input, config) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const entries = Object.entries(input).filter(([key]) => config.columns.includes(key));
  if (!entries.length) return null;
  return entries;
}

export async function GET(request) {
  const access = await requireAdmin();
  if (access.response) return access.response;
  const selected = parseCollection(request);
  if (!selected) return Response.json({ error: "Unknown catalog collection." }, { status: 400 });
  try {
    const result = await query(
      `SELECT ${selected.config.columns.join(", ")} FROM ${selected.config.table} ORDER BY ${selected.config.key}`
    );
    return Response.json({ records: result.rows, key: selected.config.key });
  } catch (error) {
    return adminError(error, "Admin catalog list failed");
  }
}

export async function POST(request) {
  const originError = requireSameOrigin(request);
  if (originError) return originError;
  const access = await requireAdmin();
  if (access.response) return access.response;
  const selected = parseCollection(request);
  if (!selected) return Response.json({ error: "Unknown catalog collection." }, { status: 400 });
  try {
    const entries = normalizeData(await request.json(), selected.config);
    if (!entries) return Response.json({ error: "Catalog record data is required." }, { status: 400 });
    const names = entries.map(([name]) => name);
    const values = entries.map(([, value]) => value);
    const placeholders = entries.map(([name], index) =>
      selected.config.json.includes(name) ? `$${index + 1}::jsonb` : `$${index + 1}`
    );
    const result = await query(
      `INSERT INTO ${selected.config.table} (${names.join(", ")})
       VALUES (${placeholders.join(", ")})
       RETURNING ${selected.config.columns.join(", ")}`,
      values.map((value, index) => selected.config.json.includes(names[index]) ? JSON.stringify(value) : value)
    );
    return Response.json({ record: result.rows[0] }, { status: 201 });
  } catch (error) {
    return adminError(error, "Admin catalog create failed");
  }
}

export async function PATCH(request) {
  const originError = requireSameOrigin(request);
  if (originError) return originError;
  const access = await requireAdmin();
  if (access.response) return access.response;
  const selected = parseCollection(request);
  if (!selected) return Response.json({ error: "Unknown catalog collection." }, { status: 400 });
  try {
    const body = await request.json();
    const keyValue = body.keyValue;
    const entries = normalizeData(body.data, selected.config)?.filter(([name]) => name !== selected.config.key);
    if (!keyValue || !entries?.length) {
      return Response.json({ error: "Record key and fields to update are required." }, { status: 400 });
    }
    const values = entries.map(([, value]) => value);
    const assignments = entries.map(([name], index) =>
      `${name} = $${index + 1}${selected.config.json.includes(name) ? "::jsonb" : ""}`
    );
    values.push(keyValue);
    const result = await query(
      `UPDATE ${selected.config.table} SET ${assignments.join(", ")}
       WHERE ${selected.config.key} = $${values.length}
       RETURNING ${selected.config.columns.join(", ")}`,
      entries.map(([, value], index) => selected.config.json.includes(entries[index][0]) ? JSON.stringify(value) : value).concat(keyValue)
    );
    if (!result.rowCount) return Response.json({ error: "Catalog record not found." }, { status: 404 });
    return Response.json({ record: result.rows[0] });
  } catch (error) {
    return adminError(error, "Admin catalog update failed");
  }
}

export async function DELETE(request) {
  const originError = requireSameOrigin(request);
  if (originError) return originError;
  const access = await requireAdmin();
  if (access.response) return access.response;
  const selected = parseCollection(request);
  if (!selected) return Response.json({ error: "Unknown catalog collection." }, { status: 400 });
  try {
    const keyValue = new URL(request.url).searchParams.get("key");
    if (!keyValue) return Response.json({ error: "Record key is required." }, { status: 400 });
    const result = await query(
      `DELETE FROM ${selected.config.table} WHERE ${selected.config.key} = $1 RETURNING ${selected.config.key}`,
      [keyValue]
    );
    if (!result.rowCount) return Response.json({ error: "Catalog record not found." }, { status: 404 });
    return Response.json({ success: true });
  } catch (error) {
    if (error.code === "23503") {
      return Response.json({ error: "This catalog item is used by existing records and cannot be deleted." }, { status: 409 });
    }
    return adminError(error, "Admin catalog delete failed");
  }
}
