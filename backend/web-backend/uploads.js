import { readFile } from "node:fs/promises";
import path from "node:path";
import { IMAGE_TYPES, UPLOAD_DIRECTORY } from "../shared/uploadConfig.js";

export async function GET(_request, { params }) {
  const { filename } = await params;
  const match = /^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\.(jpg|png|webp|gif)$/.exec(filename);
  if (!match) return Response.json({ error: "Image not found." }, { status: 404 });

  try {
    const image = await readFile(path.join(UPLOAD_DIRECTORY, filename));
    return new Response(image, {
      headers: {
        "Content-Type": IMAGE_TYPES[match[2]],
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    if (error.code === "ENOENT") return Response.json({ error: "Image not found." }, { status: 404 });
    console.error("Public image retrieval failed:", error);
    return Response.json({ error: "The image could not be retrieved." }, { status: 500 });
  }
}
