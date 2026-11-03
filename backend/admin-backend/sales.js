import { query } from "../shared/db.js";
import { adminError, requireAdmin } from "./security.js";

function parseDate(value, label) {
  if (!value) return null;
  const parsed = new Date(`${value}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value) {
    throw new Error(`Invalid ${label} date.`);
  }
  return value;
}

function csvCell(value) {
  let text = value == null ? "" : Array.isArray(value) ? value.join(", ") : String(value);
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}

function toCsv(bookings, inquiries) {
  const rows = [["type", "id", "customer", "email", "phone", "route_or_subject", "status", "payment_status", "estimated_or_expected_value", "assigned_to", "created_at"]];
  for (const row of bookings) {
    rows.push(["booking", row.id, row.full_name, row.email, row.mobile, `${row.pickup_point} → ${(row.destinations || []).join(", ")}`, row.status, row.payment_status, row.estimated_fare, row.assignee, row.created_at]);
  }
  for (const row of inquiries) {
    rows.push(["lead", row.id, row.full_name, row.email, row.phone, row.subject, row.status, "", row.expected_value, row.assignee, row.created_at]);
  }
  return rows.map((row) => row.map(csvCell).join(",")).join("\r\n");
}

export async function GET(request) {
  const access = await requireAdmin({ module: "sales", action: "view" });
  if (access.response) return access.response;
  try {
    const url = new URL(request.url);
    const from = parseDate(url.searchParams.get("from"), "start");
    const to = parseDate(url.searchParams.get("to"), "end");
    if (from && to && from > to) return Response.json({ error: "Start date must be on or before end date." }, { status: 400 });
    const values = [];
    const filters = [];
    if (from) {
      values.push(from);
      filters.push(`created_at >= $${values.length}::date`);
    }
    if (to) {
      values.push(to);
      filters.push(`created_at < ($${values.length}::date + INTERVAL '1 day')`);
    }
    const where = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
    const [stats, bookingRows, leadRows, admins] = await Promise.all([
      query(
        `SELECT
          COUNT(*)::int AS booking_count,
          COUNT(*) FILTER (WHERE status = 'new')::int AS new_bookings,
          COUNT(*) FILTER (WHERE status = 'confirmed')::int AS confirmed_bookings,
          COUNT(*) FILTER (WHERE status = 'completed')::int AS completed_bookings,
          COALESCE(SUM(estimated_fare) FILTER (WHERE status IN ('confirmed', 'completed')), 0)::numeric(12,2) AS forecast_revenue,
          COALESCE(SUM(estimated_fare) FILTER (WHERE payment_status = 'paid'), 0)::numeric(12,2) AS paid_revenue,
          COUNT(*) FILTER (WHERE payment_status = 'unpaid')::int AS unpaid_bookings
         FROM bookings ${where}`,
        values
      ),
      query(
        `SELECT b.id, b.full_name, b.email, b.mobile, b.passengers, b.pickup_point,
          b.destinations, b.departure_at, b.status, b.estimated_fare, b.payment_status,
          b.assigned_to, a.username AS assignee, b.created_at
         FROM bookings b LEFT JOIN admin_users a ON a.id = b.assigned_to
         ${where ? where.replaceAll("created_at", "b.created_at") : ""}
         ORDER BY b.created_at DESC LIMIT 200`,
        values
      ),
      query(
        `SELECT i.id, i.type, i.full_name, i.email, i.phone, i.subject, i.status,
          i.assigned_to, a.username AS assignee, i.expected_value, i.follow_up_at,
          i.sales_notes, i.created_at
         FROM inquiries i LEFT JOIN admin_users a ON a.id = i.assigned_to
         ${where ? where.replaceAll("created_at", "i.created_at") : ""}
         ORDER BY i.created_at DESC LIMIT 200`,
        values
      ),
      query(
        `SELECT a.id, a.username, r.name AS role_name
         FROM admin_users a LEFT JOIN admin_roles r ON r.id = a.role_id
         WHERE a.is_active = TRUE ORDER BY a.username`
      ),
    ]);

    if (url.searchParams.get("format") === "csv") {
      return new Response(toCsv(bookingRows.rows, leadRows.rows), {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": 'attachment; filename="bus-mantra-sales.csv"',
          "Cache-Control": "no-store",
        },
      });
    }
    return Response.json({
      stats: stats.rows[0],
      bookings: bookingRows.rows,
      leads: leadRows.rows,
      admins: admins.rows,
    });
  } catch (error) {
    if (error.message.startsWith("Invalid ")) return Response.json({ error: error.message }, { status: 400 });
    return adminError(error, "Sales report failed");
  }
}
