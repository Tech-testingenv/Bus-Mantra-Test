import { query } from "../shared/db.js";
import { adminError, requireAdmin, requireSameOrigin } from "./security.js";

const catalogConfig = {
  fleets: {
    table: "fleets",
    key: "id",
    columns: ["id", "slug", "name", "capacity", "min_seats", "max_seats", "rate_per_km", "default_round_trip_km", "default_estimated_fare", "is_popular", "image", "gallery", "description", "amenities", "features"],
    json: ["gallery", "amenities", "features"],
  },
  destinations: {
    table: "destinations",
    key: "slug",
    columns: ["slug", "name", "badge", "route", "description", "gallery", "popular_places", "content"],
    json: ["gallery", "popular_places", "content"],
  },
  services: {
    table: "services",
    key: "slug",
    columns: ["slug", "id", "title", "description", "image", "content"],
    json: ["content"],
  },
};

function parseCollection(request) {
  const collection = new URL(request.url).searchParams.get("collection");
  return catalogConfig[collection] ? { collection, config: catalogConfig[collection] } : null;
}

function permissionModule(collection) {
  return collection === "fleets" ? "fleet" : collection;
}

function normalizeData(input, config) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const entries = Object.entries(input).filter(([key]) => config.columns.includes(key));
  if (!entries.length) return null;
  return entries;
}

export function validateRecord(collection, body) {
  const slug = typeof body.slug === "string" ? body.slug.trim() : "";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return "Slug must use lowercase letters, numbers, and hyphens.";
  if (collection === "destinations") {
    if (typeof body.name !== "string" || !body.name.trim()) return "Destination name is required.";
    if (typeof body.description !== "string" || !body.description.trim()) return "Description is required.";
    if (!Array.isArray(body.gallery) || !Array.isArray(body.popular_places)) return "Gallery and popular places must be lists.";
    if (body.content !== undefined && (!body.content || typeof body.content !== "object" || Array.isArray(body.content))) return "Destination content must be an object.";
  }
  if (collection === "services") {
    if (typeof body.id !== "string" || !/^[a-z0-9][a-z0-9_-]{1,79}$/i.test(body.id.trim())) return "Enter a valid service ID.";
    if (typeof body.title !== "string" || !body.title.trim()) return "Service title is required.";
    if (typeof body.description !== "string" || !body.description.trim()) return "Description is required.";
    if (!body.content || typeof body.content !== "object" || Array.isArray(body.content)) return "Service content must be an object.";
  }
  const content = body.content || {};
  const isText = (value) => typeof value === "string";
  const isTextList = (value) => Array.isArray(value) && value.every(isText);
  const isCardList = (value, key) => Array.isArray(value) && value.every((item) =>
    (isText(item) && item.trim()) ||
    (item && typeof item === "object" && !Array.isArray(item) &&
      isText(item[key]) && item[key].trim() &&
      (item.description === undefined || isText(item.description)))
  );
  if (collection === "destinations") {
    if (!isTextList(body.gallery)) return "Gallery images must be text paths.";
    if (!isCardList(body.popular_places, "name") || body.popular_places.some((place) =>
      (place.image !== undefined && !isText(place.image)) ||
      (place.highlights !== undefined && !isTextList(place.highlights))
    )) return "Each popular place needs a name, image path, description, and list of pointers.";
  }
  if (collection === "services") {
    for (const key of ["highlights", "benefits"]) {
      if (content[key] !== undefined && !isCardList(content[key], "title")) return `Each ${key} item needs a title.`;
    }
    for (const key of ["oneLiner", "heroImage", "placesHeading", "placesDescription", "eyebrow", "highlightsHeading", "highlightsDescription", "suitableForHeading", "benefitsHeading"]) {
      if (content[key] !== undefined && !isText(content[key])) return `${key} must be text.`;
    }
    if (content.intro !== undefined && (!content.intro || typeof content.intro !== "object" || Array.isArray(content.intro) ||
      (content.intro.heading !== undefined && !isText(content.intro.heading)))) return "Intro heading must be text.";
    for (const key of ["gallery", "suitableFor"]) {
      if (content[key] !== undefined && !isTextList(content[key])) return `${key} must be a list of text values.`;
    }
  }
  if (content.faqs !== undefined && (!Array.isArray(content.faqs) || content.faqs.some((faq) =>
    !faq || typeof faq.question !== "string" || !faq.question.trim() || typeof faq.answer !== "string" || !faq.answer.trim()
  ))) return "Each FAQ needs a question and answer.";
  return null;
}

export async function GET(request) {
  const selected = parseCollection(request);
  if (!selected) return Response.json({ error: "Unknown catalog collection." }, { status: 400 });
  const access = await requireAdmin({ module: permissionModule(selected.collection), action: "view" });
  if (access.response) return access.response;
  try {
    const result = await query(
      `SELECT ${selected.config.columns.join(", ")} FROM ${selected.config.table} ORDER BY ${selected.config.key}`
    );
    return Response.json({ records: result.rows, key: selected.config.key });
  } catch (error) {
    return adminError(error, "Admin catalog list failed");
  }
}

export async function POST(request) {
  const originError = requireSameOrigin(request);
  if (originError) return originError;
  const selected = parseCollection(request);
  if (!selected) return Response.json({ error: "Unknown catalog collection." }, { status: 400 });
  const access = await requireAdmin({ module: permissionModule(selected.collection), action: "create" });
  if (access.response) return access.response;
  try {
    const body = await request.json();
    const validationError = validateRecord(selected.collection, body);
    if (validationError) return Response.json({ error: validationError }, { status: 400 });
    const entries = normalizeData(body, selected.config);
    if (!entries) return Response.json({ error: "Catalog record data is required." }, { status: 400 });
    const names = entries.map(([name]) => name);
    const values = entries.map(([, value]) => value);
    const placeholders = entries.map(([name], index) =>
      selected.config.json.includes(name) ? `$${index + 1}::jsonb` : `$${index + 1}`
    );
    const result = await query(
      `INSERT INTO ${selected.config.table} (${names.join(", ")})
       VALUES (${placeholders.join(", ")})
       RETURNING ${selected.config.columns.join(", ")}`,
      values.map((value, index) => selected.config.json.includes(names[index]) ? JSON.stringify(value) : value)
    );
    return Response.json({ record: result.rows[0] }, { status: 201 });
  } catch (error) {
    return adminError(error, "Admin catalog create failed");
  }
}

export async function PATCH(request) {
  const originError = requireSameOrigin(request);
  if (originError) return originError;
  const selected = parseCollection(request);
  if (!selected) return Response.json({ error: "Unknown catalog collection." }, { status: 400 });
  const access = await requireAdmin({ module: permissionModule(selected.collection), action: "edit" });
  if (access.response) return access.response;
  try {
    const body = await request.json();
    const validationError = validateRecord(selected.collection, body.data || {});
    if (validationError) return Response.json({ error: validationError }, { status: 400 });
    const keyValue = body.keyValue;
    const entries = normalizeData(body.data, selected.config)?.filter(([name]) => name !== selected.config.key);
    if (!keyValue || !entries?.length) {
      return Response.json({ error: "Record key and fields to update are required." }, { status: 400 });
    }
    const values = entries.map(([, value]) => value);
    const assignments = entries.map(([name], index) =>
      `${name} = $${index + 1}${selected.config.json.includes(name) ? "::jsonb" : ""}`
    );
    values.push(keyValue);
    const result = await query(
      `UPDATE ${selected.config.table} SET ${assignments.join(", ")}
       WHERE ${selected.config.key} = $${values.length}
       RETURNING ${selected.config.columns.join(", ")}`,
      entries.map(([, value], index) => selected.config.json.includes(entries[index][0]) ? JSON.stringify(value) : value).concat(keyValue)
    );
    if (!result.rowCount) return Response.json({ error: "Catalog record not found." }, { status: 404 });
    return Response.json({ record: result.rows[0] });
  } catch (error) {
    return adminError(error, "Admin catalog update failed");
  }
}

export async function DELETE(request) {
  const originError = requireSameOrigin(request);
  if (originError) return originError;
  const selected = parseCollection(request);
  if (!selected) return Response.json({ error: "Unknown catalog collection." }, { status: 400 });
  const access = await requireAdmin({ module: permissionModule(selected.collection), action: "delete" });
  if (access.response) return access.response;
  try {
    const keyValue = new URL(request.url).searchParams.get("key");
    if (!keyValue) return Response.json({ error: "Record key is required." }, { status: 400 });
    const result = await query(
      `DELETE FROM ${selected.config.table} WHERE ${selected.config.key} = $1 RETURNING ${selected.config.key}`,
      [keyValue]
    );
    if (!result.rowCount) return Response.json({ error: "Catalog record not found." }, { status: 404 });
    return Response.json({ success: true });
  } catch (error) {
    if (error.code === "23503") {
      return Response.json({ error: "This catalog item is used by existing records and cannot be deleted." }, { status: 409 });
    }
    return adminError(error, "Admin catalog delete failed");
  }
}
