import { query } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  const { rows } = await query(
    "SELECT slug, name, badge, route, description, gallery, popular_places AS \"popularPlaces\" FROM destinations ORDER BY name"
  );
  return Response.json(rows);
}
