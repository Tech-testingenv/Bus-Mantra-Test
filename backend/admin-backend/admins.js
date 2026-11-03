import { query } from "../shared/db.js";
import { adminError, hashPassword, requireAdmin, requireSameOrigin } from "./security.js";

export async function GET() {
  const access = await requireAdmin({ superadmin: true });
  if (access.response) return access.response;
  try {
    const result = await query(
      `SELECT a.id, a.username, a.role, a.role_id, r.name AS role_name,
        a.is_active, a.created_at, a.last_login_at
       FROM admin_users a LEFT JOIN admin_roles r ON r.id = a.role_id
       ORDER BY a.created_at`
    );
    return Response.json({ admins: result.rows });
  } catch (error) {
    return adminError(error, "Admin account list failed");
  }
}

export async function POST(request) {
  const originError = requireSameOrigin(request);
  if (originError) return originError;
  const access = await requireAdmin({ superadmin: true });
  if (access.response) return access.response;
  try {
    const body = await request.json();
    const username = typeof body.username === "string" ? body.username.trim().toLowerCase() : "";
    if (!/^[a-z0-9][a-z0-9._@+-]{2,119}$/.test(username)) {
      return Response.json({ error: "Enter a valid username or email address." }, { status: 400 });
    }
    if (typeof body.password !== "string" || body.password.length < 12) {
      return Response.json({ error: "Admin passwords must be at least 12 characters." }, { status: 400 });
    }
    const role = body.roleId
      ? await query("SELECT id FROM admin_roles WHERE id = $1", [body.roleId])
      : await query("SELECT id FROM admin_roles WHERE name = 'Operations'");
    if (!role.rowCount) return Response.json({ error: "Select a valid role." }, { status: 400 });
    const result = await query(
      `INSERT INTO admin_users (username, password_hash, role, role_id, created_by)
       VALUES ($1, $2, 'admin', $3, $4)
       RETURNING id, username, role, role_id, is_active, created_at`,
      [username, hashPassword(body.password), role.rows[0].id, access.admin.id]
    );
    return Response.json({ admin: result.rows[0] }, { status: 201 });
  } catch (error) {
    return adminError(error, "Admin account creation failed");
  }
}

export async function PATCH(request) {
  const originError = requireSameOrigin(request);
  if (originError) return originError;
  const access = await requireAdmin({ superadmin: true });
  if (access.response) return access.response;
  try {
    const body = await request.json();
    if (!body.id) return Response.json({ error: "Admin ID is required." }, { status: 400 });
    const fields = [];
    const values = [];
    if (typeof body.isActive === "boolean") {
      values.push(body.isActive);
      fields.push(`is_active = $${values.length}`);
    }
    if (typeof body.password === "string" && body.password) {
      if (body.password.length < 12) {
        return Response.json({ error: "Admin passwords must be at least 12 characters." }, { status: 400 });
      }
      values.push(hashPassword(body.password));
      fields.push(`password_hash = $${values.length}`);
    }
    if (typeof body.roleId === "string") {
      const role = await query("SELECT id FROM admin_roles WHERE id = $1", [body.roleId]);
      if (!role.rowCount) return Response.json({ error: "Select a valid role." }, { status: 400 });
      values.push(body.roleId);
      fields.push(`role_id = $${values.length}`);
    }
    if (!fields.length) return Response.json({ error: "Provide a password, role, or active status to update." }, { status: 400 });
    values.push(body.id);
    const result = await query(
      `UPDATE admin_users SET ${fields.join(", ")}
       WHERE id = $${values.length} AND role = 'admin'
       RETURNING id, username, role, role_id, is_active, created_at, last_login_at`,
      values
    );
    if (!result.rowCount) return Response.json({ error: "Admin not found or cannot be changed." }, { status: 404 });
    if (body.isActive === false) {
      await query("DELETE FROM admin_sessions WHERE admin_id = $1", [body.id]);
    }
    return Response.json({ admin: result.rows[0] });
  } catch (error) {
    return adminError(error, "Admin account update failed");
  }
}

export async function DELETE(request) {
  const originError = requireSameOrigin(request);
  if (originError) return originError;
  const access = await requireAdmin({ superadmin: true });
  if (access.response) return access.response;
  try {
    const id = new URL(request.url).searchParams.get("id");
    if (!id) return Response.json({ error: "Admin ID is required." }, { status: 400 });
    const result = await query(
      "DELETE FROM admin_users WHERE id = $1 AND role = 'admin' RETURNING id",
      [id]
    );
    if (!result.rowCount) return Response.json({ error: "Admin not found or cannot be deleted." }, { status: 404 });
    return Response.json({ success: true });
  } catch (error) {
    return adminError(error, "Admin account deletion failed");
  }
}
