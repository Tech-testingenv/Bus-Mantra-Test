import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const UPLOAD_DIRECTORY = process.env.UPLOAD_DIR || path.join(HERE, "..", "uploads");
export const IMAGE_TYPES = { jpg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif" };
