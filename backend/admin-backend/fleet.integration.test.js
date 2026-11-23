import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs/promises";

const databaseUrl = process.env.TEST_DATABASE_URL;
const enabled = Boolean(databaseUrl);
let pool, adminServer, webServer, adminUrl, webUrl, cookie, schema;

async function request(url, path, { method = "GET", body, authenticated = true } = {}) {
  const response = await fetch(`${url}${path}`, {
    method,
    headers: { ...(authenticated ? { cookie } : {}), ...(body ? { "content-type": "application/json" } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: response.status, data: await response.json() };
}

before(async () => {
  if (!enabled) return;
  const parsed = new URL(databaseUrl);
  if (!parsed.pathname.slice(1).startsWith("bus_mantra_test_")) throw new Error("TEST_DATABASE_URL must point to a dedicated bus_mantra_test_* database.");
  process.env.DATABASE_URL = databaseUrl;
  const db = await import("../shared/db.js");
  pool = db.pool;
  const existing = await pool.query("SELECT to_regnamespace('bus_mantra') AS schema");
  if (existing.rows[0].schema) throw new Error("Integration test database must be empty.");
  schema = await fs.readFile(new URL("../database/schema.sql", import.meta.url), "utf8");
  await pool.query(schema);
  const token = crypto.randomBytes(32).toString("hex");
  const admin = await pool.query("INSERT INTO admin_users (username, password_hash, role) VALUES ('integration-test', 'unused', 'superadmin') RETURNING id");
  await pool.query("INSERT INTO admin_sessions (admin_id, token_hash, expires_at) VALUES ($1, $2, NOW() + INTERVAL '1 hour')", [admin.rows[0].id, crypto.createHash("sha256").update(token).digest("hex")]);
  cookie = `bus_mantra_admin_session=${token}`;
  const { startServer } = await import("../shared/server.js");
  const categories = await import("./fleetCategories.js");
  const fleet = await import("./fleetApi.js");
  const catalog = await import("./catalog.js");
  const publicFleets = await import("../web-backend/fleets.js");
  const publicDetail = await import("../web-backend/fleetDetail.js");
  const destinations = await import("../web-backend/destinations.js");
  const bookings = await import("../web-backend/bookings.js");
  adminServer = startServer({ name: "test-admin", port: 0, routes: [
    ["/api/admin/fleet-categories", categories], ["/api/admin/fleets", fleet], ["/api/admin/fleets/:id", fleet], ["/api/admin/catalog", catalog],
  ] });
  webServer = startServer({ name: "test-web", port: 0, routes: [
    ["/api/fleets", publicFleets], ["/api/fleets/:slug", publicDetail], ["/api/destinations", destinations], ["/api/bookings", bookings],
  ] });
  await Promise.all([new Promise((resolve) => adminServer.once("listening", resolve)), new Promise((resolve) => webServer.once("listening", resolve))]);
  adminUrl = `http://127.0.0.1:${adminServer.address().port}`;
  webUrl = `http://127.0.0.1:${webServer.address().port}`;
});

after(async () => {
  if (adminServer) await new Promise((resolve) => adminServer.close(resolve));
  if (webServer) await new Promise((resolve) => webServer.close(resolve));
  if (pool) await pool.end();
});

test("category CRUD requires permission and persists across migration", { skip: !enabled }, async () => {
  const category = { id: "test-coach", name: "Test Coach", capacity: "20 seats", description: "For groups" };
  assert.equal((await request(adminUrl, "/api/admin/fleet-categories", { authenticated: false })).status, 401);
  assert.equal((await request(adminUrl, "/api/admin/fleet-categories", { method: "POST", body: category })).status, 201);
  assert.equal((await request(adminUrl, "/api/admin/fleet-categories", { method: "PATCH", body: { ...category, name: "Updated Coach" } })).status, 200);
  assert.equal((await request(adminUrl, "/api/admin/fleet-categories?id=luxury-coach", { method: "DELETE" })).status, 200);
  await pool.query(schema);
  const list = await request(adminUrl, "/api/admin/fleet-categories");
  assert.equal(list.data.categories.find((item) => item.id === category.id).name, "Updated Coach");
  assert.equal(list.data.categories.some((item) => item.id === "luxury-coach"), false);
});

test("coach structured content survives admin updates and is served publicly", { skip: !enabled }, async () => {
  const content = { tag: "Special", specifications: [{ label: "Engine", value: "Electric", description: "Quiet" }], features: ["Feature"], inclusions: ["Included"], cabinAmenities: ["Cabin"], bookingInclusions: ["Booking"] };
  const coach = { id: "test-vehicle", slug: "test-vehicle", coach_type: "test-coach", name: "Test vehicle", capacity: "20 seats", min_seats: 1, max_seats: 20, rate_per_km: 25, image: "/fleet/test.png", gallery: ["/fleet/second.png"], description: "A coach", amenities: [], features: {}, content };
  assert.equal((await request(adminUrl, "/api/admin/fleets", { method: "POST", body: coach })).status, 201);
  assert.equal((await request(adminUrl, "/api/admin/fleet-categories?id=test-coach", { method: "DELETE" })).status, 409);
  const updated = { ...coach, content: { ...content, tag: "Updated" } };
  assert.equal((await request(adminUrl, "/api/admin/fleets/test-vehicle", { method: "PATCH", body: updated })).status, 200);
  const detail = await request(webUrl, "/api/fleets/test-vehicle", { authenticated: false });
  assert.deepEqual(detail.data.content, updated.content);
  assert.deepEqual(detail.data.gallery, coach.gallery);
  const list = await request(webUrl, "/api/fleets", { authenticated: false });
  assert.equal(list.data.find((item) => item.id === coach.id).content.tag, "Updated");
  await assert.rejects(pool.query("DELETE FROM fleet_categories WHERE id='test-coach'"), (error) => error.code === "23503");
  const booking = { fullName: "Test", mobile: "1234567890", passengers: 10, pickupPoint: "Delhi", destination: ["Jaipur"], departureDateTime: "2030-01-01", fleetId: coach.id };
  const booked = await request(webUrl, "/api/bookings", { method: "POST", body: booking, authenticated: false });
  assert.equal(booked.status, 201);
  assert.equal(booked.data.fleet.id, coach.id);
  assert.equal((await request(webUrl, "/api/bookings", { method: "POST", body: { ...booking, passengers: 21 }, authenticated: false })).status, 422);
});

test("destination migration gives actionable error and restores both catalog endpoints", { skip: !enabled }, async () => {
  await pool.query("INSERT INTO destinations (slug, name, description) VALUES ('test-destination', 'Test destination', 'Details')");
  await pool.query("ALTER TABLE destinations DROP COLUMN content");
  const missing = await request(adminUrl, "/api/admin/catalog?collection=destinations");
  assert.equal(missing.status, 500);
  assert.match(missing.data.error, /npm run db:init/);
  await pool.query(schema);
  const admin = await request(adminUrl, "/api/admin/catalog?collection=destinations");
  const publicList = await request(webUrl, "/api/destinations", { authenticated: false });
  assert.equal(admin.status, 200);
  assert.equal(publicList.status, 200);
  assert.equal(admin.data.records[0].name, "Test destination");
  assert.equal(publicList.data[0].slug, "test-destination");
});
