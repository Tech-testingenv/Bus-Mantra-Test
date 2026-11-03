import crypto from "node:crypto";
import { cookies } from "next/headers";
import { query } from "@/lib/db";
import { jsonError, requireFields } from "@/lib/api";

export const runtime = "nodejs";

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(":");
  const candidate = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(candidate, "hex"), Buffer.from(hash, "hex"));
}

function tokenHash(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

async function createSession(userId) {
  const token = crypto.randomBytes(32).toString("hex");
  await query(
    "INSERT INTO sessions (user_id, token_hash, expires_at) VALUES ($1,$2,NOW() + INTERVAL '30 days')",
    [userId, tokenHash(token)]
  );
  const cookieStore = await cookies();
  cookieStore.set("bus_mantra_session", token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 30 });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const mode = body.mode || "login";
    if (!["login", "register"].includes(mode)) return jsonError("Invalid authentication mode.");
    requireFields(body, ["email", "password"]);
    const email = body.email.trim().toLowerCase();
    if (mode === "register") {
      requireFields(body, ["name", "phone"]);
      if (body.password.length < 8) return jsonError("Password must be at least 8 characters.");
      const created = await query(
        "INSERT INTO users (name, email, phone, password_hash) VALUES ($1,$2,$3,$4) RETURNING id, name, email, phone",
        [body.name.trim(), email, body.phone.trim(), hashPassword(body.password)]
      );
      await createSession(created.rows[0].id);
      return Response.json({ user: created.rows[0] }, { status: 201 });
    }

    const result = await query("SELECT id, name, email, phone, password_hash FROM users WHERE email = $1", [email]);
    const user = result.rows[0];
    if (!user || !verifyPassword(body.password, user.password_hash)) return jsonError("Invalid email or password.", 401);
    delete user.password_hash;
    await createSession(user.id);
    return Response.json({ user });
  } catch (error) {
    if (error.code === "23505") return jsonError("An account with this email already exists.", 409);
    console.error("Auth API failed:", error);
    return jsonError(error.message || "Authentication failed.", error.status || 500);
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("bus_mantra_session")?.value;
  if (!token) return Response.json({ user: null });
  const result = await query(
    `SELECT u.id, u.name, u.email, u.phone
     FROM sessions s JOIN users u ON u.id = s.user_id
     WHERE s.token_hash = $1 AND s.expires_at > NOW()`,
    [tokenHash(token)]
  );
  return Response.json({ user: result.rows[0] || null });
}

export async function DELETE() {
  const cookieStore = await cookies();
  const token = cookieStore.get("bus_mantra_session")?.value;
  if (token) {
    await query("DELETE FROM sessions WHERE token_hash = $1", [tokenHash(token)]);
  }
  cookieStore.delete("bus_mantra_session");
  return Response.json({ success: true });
}
