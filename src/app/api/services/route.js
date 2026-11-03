import { query } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  const { rows } = await query(
    "SELECT slug, id, title, description, image, content FROM services ORDER BY title"
  );
  return Response.json(rows);
}
