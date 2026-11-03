import { query } from "@shared/db";
import { adminError, requireAdmin, requireSameOrigin } from "./security";

const recordConfig = {
  bookings: {
    table: "bookings",
    columns: "id, full_name, email, mobile, passengers, pickup_point, destinations, departure_at, return_at, fleet_id, status, created_at",
    statuses: ["new", "contacted", "confirmed", "cancelled", "completed"],
  },
  inquiries: {
    table: "inquiries",
    columns: "id, type, full_name, email, phone, subject, payload, status, created_at",
    statuses: ["new", "contacted", "resolved", "cancelled"],
  },
};

export async function GET(request, { params }) {
  const access = await requireAdmin();
  if (access.response) return access.response;
  const { kind } = await params;
  const config = recordConfig[kind];
  if (!config) return Response.json({ error: "Unknown record type." }, { status: 404 });
  try {
    const url = new URL(request.url);
    const search = url.searchParams.get("search")?.trim();
    const status = url.searchParams.get("status");
    const values = [];
    const filters = [];
    if (status && config.statuses.includes(status)) {
      values.push(status);
      filters.push(`status = $${values.length}`);
    }
    if (search) {
      values.push(`%${search}%`);
      filters.push(`(full_name ILIKE $${values.length} OR COALESCE(email, '') ILIKE $${values.length} OR id::text ILIKE $${values.length})`);
    }
    values.push(Math.min(Math.max(Number(url.searchParams.get("limit")) || 100, 1), 250));
    const where = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
    const result = await query(
      `SELECT ${config.columns} FROM ${config.table} ${where} ORDER BY created_at DESC LIMIT $${values.length}`,
      values
    );
    return Response.json({ records: result.rows });
  } catch (error) {
    return adminError(error, `Admin ${kind} list failed`);
  }
}

export async function PATCH(request, { params }) {
  const originError = requireSameOrigin(request);
  if (originError) return originError;
  const access = await requireAdmin();
  if (access.response) return access.response;
  const { kind } = await params;
  const config = recordConfig[kind];
  if (!config) return Response.json({ error: "Unknown record type." }, { status: 404 });
  try {
    const body = await request.json();
    if (!body.id || !config.statuses.includes(body.status)) {
      return Response.json({ error: "A record ID and valid status are required." }, { status: 400 });
    }
    const result = await query(
      `UPDATE ${config.table} SET status = $1 WHERE id = $2 RETURNING ${config.columns}`,
      [body.status, body.id]
    );
    if (!result.rowCount) return Response.json({ error: "Record not found." }, { status: 404 });
    return Response.json({ record: result.rows[0] });
  } catch (error) {
    return adminError(error, `Admin ${kind} update failed`);
  }
}
