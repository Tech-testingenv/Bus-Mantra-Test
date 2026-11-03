import fs from "node:fs/promises";
import path from "node:path";
import pg from "pg";
import crypto from "node:crypto";

const { Pool } = pg;
const envPath = path.join(process.cwd(), "frontend", ".env.local");
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
  const schema = await fs.readFile(path.join(process.cwd(), "backend", "database", "schema.sql"), "utf8");
  await pool.query(schema);
  const username = process.env.ADMIN_SUPER_USERNAME;
  const password = process.env.ADMIN_SUPER_PASSWORD;
  if (!username || !password) {
    throw new Error("ADMIN_SUPER_USERNAME and ADMIN_SUPER_PASSWORD must be set in .env.local.");
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
