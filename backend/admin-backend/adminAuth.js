import { cookies } from "next/headers";
import { query } from "../shared/db";
import {
  ADMIN_COOKIE,
  adminError,
  createAdminSession,
  destroyAdminSession,
  getAdminSession,
  requireSameOrigin,
  safeAdmin,
  verifyPassword,
} from "./security";

export async function GET() {
  try {
    return Response.json({ admin: safeAdmin(await getAdminSession()) });
  } catch (error) {
    return adminError(error, "Admin session lookup failed");
  }
}

export async function POST(request) {
  const originError = requireSameOrigin(request);
  if (originError) return originError;
  try {
    const body = await request.json();
    const username = typeof body.username === "string" ? body.username.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";
    if (!username || !password) {
      return Response.json({ error: "Username and password are required." }, { status: 400 });
    }
    const result = await query(
      "SELECT id, username, password_hash, role FROM admin_users WHERE username = $1 AND is_active = TRUE",
      [username]
    );
    const admin = result.rows[0];
    if (!admin || !verifyPassword(password, admin.password_hash)) {
      return Response.json({ error: "Invalid username or password." }, { status: 401 });
    }
    await query("UPDATE admin_users SET last_login_at = NOW() WHERE id = $1", [admin.id]);
    await createAdminSession(admin.id, request);
    return Response.json({ admin: safeAdmin(admin) });
  } catch (error) {
    return adminError(error, "Admin login failed");
  }
}

export async function DELETE(request) {
  const originError = requireSameOrigin(request);
  if (originError) return originError;
  try {
    const store = await cookies();
    if (!store.get(ADMIN_COOKIE)?.value) return Response.json({ success: true });
    await destroyAdminSession();
    return Response.json({ success: true });
  } catch (error) {
    return adminError(error, "Admin logout failed");
  }
}
