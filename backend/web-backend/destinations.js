import { query } from "../shared/db.js";

export const runtime = "nodejs";

export async function GET() {
  const { rows } = await query(
    "SELECT slug, name, badge, route, description, gallery, popular_places AS \"popularPlaces\", content FROM destinations ORDER BY name"
  );
  return Response.json(rows.map((destination) => ({
    ...destination.content,
    ...destination,
  })));
}
