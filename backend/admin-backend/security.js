import crypto from "node:crypto";
import { cookies } from "next/headers";
import { query } from "../shared/db";

export const ADMIN_COOKIE = "bus_mantra_admin_session";
const SESSION_DAYS = 12;

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  return `${salt}:${crypto.scryptSync(password, salt, 64).toString("hex")}`;
}

export function verifyPassword(password, stored) {
  if (!stored || typeof stored !== "string") return false;
  const separator = stored.indexOf(":");
  if (separator < 1) return false;
  const salt = stored.slice(0, separator);
  const hash = stored.slice(separator + 1);
  const actual = crypto.scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
}

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function requireSameOrigin(request) {
  const origin = request.headers.get("origin");
  if (origin) {
    let originUrl;
    try {
      originUrl = new URL(origin);
    } catch {
      return Response.json({ error: "Cross-origin request rejected." }, { status: 403 });
    }
    const requestUrl = new URL(request.url);
    const requestHosts = [
      request.headers.get("host"),
      request.headers.get("x-forwarded-host")?.split(",")[0]?.trim(),
      requestUrl.host,
    ].filter(Boolean);
    const forwardedProtocol = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
    const requestProtocols = [
      forwardedProtocol ? `${forwardedProtocol}:` : null,
      requestUrl.protocol,
    ].filter(Boolean);
    if (!requestHosts.includes(originUrl.host) || !requestProtocols.includes(originUrl.protocol)) {
      return Response.json({ error: "Cross-origin request rejected." }, { status: 403 });
    }
  }
  return null;
}

export async function createAdminSession(adminId, request) {
  const token = crypto.randomBytes(32).toString("hex");
  await query(
    "INSERT INTO admin_sessions (admin_id, token_hash, expires_at) VALUES ($1,$2,NOW() + INTERVAL '12 days')",
    [adminId, hashToken(token)]
  );
  const store = await cookies();
  const forwardedProtocol = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const secureRequest =
    forwardedProtocol === "https" ||
    (forwardedProtocol !== "http" && new URL(request.url).protocol === "https:");
  store.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: secureRequest,
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function getAdminSession() {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  if (!token) return null;
  const result = await query(
    `SELECT a.id, a.username, a.role
     FROM admin_sessions s
     JOIN admin_users a ON a.id = s.admin_id
     WHERE s.token_hash = $1 AND s.expires_at > NOW() AND a.is_active = TRUE`,
    [hashToken(token)]
  );
  return result.rows[0] || null;
}

export async function requireAdmin({ superadmin = false } = {}) {
  const admin = await getAdminSession();
  if (!admin) return { admin: null, response: Response.json({ error: "Authentication required." }, { status: 401 }) };
  if (superadmin && admin.role !== "superadmin") {
    return { admin: null, response: Response.json({ error: "Superadmin access required." }, { status: 403 }) };
  }
  return { admin, response: null };
}

export async function destroyAdminSession() {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  if (token) await query("DELETE FROM admin_sessions WHERE token_hash = $1", [hashToken(token)]);
  store.delete(ADMIN_COOKIE);
}

export function adminError(error, label) {
  if (error?.code === "23505") {
    return Response.json({ error: "That username is already in use." }, { status: 409 });
  }
  console.error(`${label}:`, error);
  return Response.json({ error: "The admin request could not be completed." }, { status: 500 });
}

export function safeAdmin(admin) {
  if (!admin) return null;
  return { id: admin.id, username: admin.username, role: admin.role };
}
