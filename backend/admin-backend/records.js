import { query } from "../shared/db.js";
import { adminError, requireAdmin, requireSameOrigin } from "./security.js";

const recordConfig = {
  bookings: {
    table: "bookings",
    columns: "id, full_name, email, mobile, passengers, pickup_point, destinations, departure_at, return_at, fleet_id, status, estimated_fare, payment_status, assigned_to, sales_notes, created_at",
    statuses: ["new", "contacted", "confirmed", "cancelled", "completed"],
  },
  inquiries: {
    table: "inquiries",
    columns: "id, type, full_name, email, phone, subject, payload, status, assigned_to, expected_value, follow_up_at, sales_notes, created_at",
    statuses: ["new", "contacted", "resolved", "cancelled"],
  },
};

export async function GET(request, { params }) {
  const access = await requireAdmin({ module: "sales", action: "view" });
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
  const access = await requireAdmin({ module: "sales", action: "edit" });
  if (access.response) return access.response;
  const { kind } = await params;
  const config = recordConfig[kind];
  if (!config) return Response.json({ error: "Unknown record type." }, { status: 404 });
  try {
    const body = await request.json();
    if (!body.id) return Response.json({ error: "A record ID is required." }, { status: 400 });
    const fields = [];
    const values = [];
    if (body.status !== undefined) {
      if (!config.statuses.includes(body.status)) return Response.json({ error: "Select a valid status." }, { status: 400 });
      values.push(body.status);
      fields.push(`status = $${values.length}`);
    }
    if (Object.hasOwn(body, "assignedTo")) {
      const assignedTo = body.assignedTo === "" ? null : body.assignedTo;
      if (assignedTo !== null && (typeof assignedTo !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(assignedTo))) {
        return Response.json({ error: "Select a valid team member." }, { status: 400 });
      }
      values.push(assignedTo);
      fields.push(`assigned_to = $${values.length}`);
    }
    if (Object.hasOwn(body, "salesNotes")) {
      if (typeof body.salesNotes !== "string" || body.salesNotes.length > 5000) return Response.json({ error: "Sales notes must be 5,000 characters or fewer." }, { status: 400 });
      values.push(body.salesNotes.trim());
      fields.push(`sales_notes = $${values.length}`);
    }
    if (kind === "bookings" && Object.hasOwn(body, "paymentStatus")) {
      if (!["unpaid", "deposit_paid", "paid", "refunded"].includes(body.paymentStatus)) return Response.json({ error: "Select a valid payment status." }, { status: 400 });
      values.push(body.paymentStatus);
      fields.push(`payment_status = $${values.length}`);
    }
    if (kind === "bookings" && Object.hasOwn(body, "estimatedFare")) {
      if (body.estimatedFare !== null && (!Number.isFinite(Number(body.estimatedFare)) || Number(body.estimatedFare) < 0)) return Response.json({ error: "Estimated fare must be zero or greater." }, { status: 400 });
      values.push(body.estimatedFare === null || body.estimatedFare === "" ? null : Number(body.estimatedFare));
      fields.push(`estimated_fare = $${values.length}`);
    }
    if (kind === "inquiries" && Object.hasOwn(body, "expectedValue")) {
      if (body.expectedValue !== null && (!Number.isFinite(Number(body.expectedValue)) || Number(body.expectedValue) < 0)) return Response.json({ error: "Expected value must be zero or greater." }, { status: 400 });
      values.push(body.expectedValue === null || body.expectedValue === "" ? null : Number(body.expectedValue));
      fields.push(`expected_value = $${values.length}`);
    }
    if (kind === "inquiries" && Object.hasOwn(body, "followUpAt")) {
      const date = body.followUpAt === "" ? null : new Date(body.followUpAt);
      if (date && Number.isNaN(date.getTime())) return Response.json({ error: "Enter a valid follow-up date." }, { status: 400 });
      values.push(date);
      fields.push(`follow_up_at = $${values.length}`);
    }
    if (!fields.length) return Response.json({ error: "Provide at least one valid field to update." }, { status: 400 });
    values.push(body.id);
    const result = await query(
      `UPDATE ${config.table} SET ${fields.join(", ")} WHERE id = $${values.length} RETURNING ${config.columns}`,
      values
    );
    if (!result.rowCount) return Response.json({ error: "Record not found." }, { status: 404 });
    return Response.json({ record: result.rows[0] });
  } catch (error) {
    return adminError(error, `Admin ${kind} update failed`);
  }
}
