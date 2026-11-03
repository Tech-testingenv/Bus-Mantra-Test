import fs from "node:fs/promises";
import path from "node:path";
import pg from "pg";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const { Pool } = pg;
const backendRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const envPath = path.join(backendRoot, ".env");
try {
  const envText = await fs.readFile(envPath, "utf8");
  for (const line of envText.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].replace(/^(['"])(.*)\1$/, "$2");
    }
  }
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required.");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
  options: "-c search_path=bus_mantra,public",
});

try {
  const schema = await fs.readFile(path.join(backendRoot, "database", "schema.sql"), "utf8");
  await pool.query(schema);
  const defaultRole = await pool.query(
    `INSERT INTO admin_roles (name, description, is_system)
     VALUES ('Operations', 'Default access for existing admin accounts.', TRUE)
     ON CONFLICT (name) DO UPDATE SET description = EXCLUDED.description, is_system = TRUE
     RETURNING id`
  );
  const defaultRoleId = defaultRole.rows[0].id;
  for (const module of ["dashboard", "fleet", "services", "destinations", "sales"]) {
    await pool.query(
      `INSERT INTO admin_role_permissions (role_id, module_key, can_view, can_create, can_edit, can_delete)
       VALUES ($1, $2, TRUE, TRUE, TRUE, TRUE)
       ON CONFLICT (role_id, module_key) DO NOTHING`,
      [defaultRoleId, module]
    );
  }
  await pool.query("UPDATE admin_users SET role_id = $1 WHERE role = 'admin' AND role_id IS NULL", [defaultRoleId]);
  const username = process.env.ADMIN_SUPER_USERNAME;
  const password = process.env.ADMIN_SUPER_PASSWORD;
  if (!username || !password) {
    throw new Error("ADMIN_SUPER_USERNAME and ADMIN_SUPER_PASSWORD must be set in backend/.env.");
  }
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  await pool.query(
    `INSERT INTO admin_users (username, password_hash, role)
     VALUES ($1, $2, 'superadmin')
     ON CONFLICT (username) DO NOTHING`,
    [username.toLowerCase(), `${salt}:${hash}`]
  );
  console.log("Bus Mantra database schema initialized.");
} finally {
  await pool.end();
}
