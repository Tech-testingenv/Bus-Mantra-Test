import { query } from "../shared/db.js";
import { adminError, requireAdmin } from "./security.js";

export async function GET() {
  const access = await requireAdmin({ module: "dashboard", action: "view" });
  if (access.response) return access.response;
  try {
    const canViewSales = access.admin.role === "superadmin" || access.admin.permissions?.sales?.view === true;
    const [counts, bookings, inquiries] = await Promise.all([
      query(`SELECT
        (SELECT COUNT(*) FROM bookings)::int AS bookings,
        (SELECT COUNT(*) FROM bookings WHERE status = 'new')::int AS new_bookings,
        (SELECT COUNT(*) FROM inquiries)::int AS inquiries,
        (SELECT COUNT(*) FROM inquiries WHERE status = 'new')::int AS new_inquiries,
        (SELECT COUNT(*) FROM users)::int AS customers,
        (SELECT COUNT(*) FROM fleets)::int AS fleets,
        (SELECT COUNT(*) FROM destinations)::int AS destinations,
        (SELECT COUNT(*) FROM services)::int AS services`),
      canViewSales
        ? query(`SELECT id, full_name, email, mobile, passengers, pickup_point, destinations,
            departure_at, status, created_at
            FROM bookings ORDER BY created_at DESC LIMIT 8`)
        : Promise.resolve({ rows: [] }),
      canViewSales
        ? query(`SELECT id, type, full_name, email, phone, subject, status, created_at
            FROM inquiries ORDER BY created_at DESC LIMIT 8`)
        : Promise.resolve({ rows: [] }),
    ]);
    return Response.json({
      stats: counts.rows[0],
      recentBookings: bookings.rows,
      recentInquiries: inquiries.rows,
      canViewSales,
      admin: access.admin,
    });
  } catch (error) {
    return adminError(error, "Admin dashboard failed");
  }
}
