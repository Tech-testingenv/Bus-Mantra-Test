import { query } from "../shared/db.js";
import { jsonError, requireFields } from "../shared/api.js";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();
    const type = body.type || "contact";
    if (!["contact", "vendor", "service"].includes(type)) return jsonError("Invalid enquiry type.");
    requireFields(body, ["fullName"]);
    const result = await query(
      `INSERT INTO inquiries (type, full_name, email, phone, subject, payload)
       VALUES ($1,$2,$3,$4,$5,$6::jsonb)
       RETURNING id, status, created_at AS "createdAt"`,
      [type, body.fullName.trim(), body.email?.trim() || null, body.phone?.trim() || null, body.subject?.trim() || null, JSON.stringify(body)]
    );
    return Response.json({ inquiry: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error("Inquiry API failed:", error);
    return jsonError(error.message || "Unable to save enquiry.", error.status || 500);
  }
}
