import { Pool } from "pg";

const globalForDb = globalThis;

export const pool =
  globalForDb.busMantraPool ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
    options: "-c search_path=bus_mantra,public",
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.busMantraPool = pool;
}

export async function query(text, values) {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured.");
  }
  return pool.query(text, values);
}
