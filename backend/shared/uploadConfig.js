import path from "node:path";

export const UPLOAD_DIRECTORY = process.env.UPLOAD_DIR || path.join(process.cwd(), "uploads");
export const IMAGE_TYPES = { jpg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif" };
