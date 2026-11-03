import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { UPLOAD_DIRECTORY } from "../shared/uploadConfig.js";
import { adminError, requireAdmin, requireSameOrigin } from "./security.js";

const MAX_IMAGE_SIZE = 8 * 1024 * 1024;

function getImageExtension(buffer) {
  if (buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
    return "png";
  }
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "jpg";
  }
  if (
    buffer.length >= 12 &&
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    return "webp";
  }
  if (buffer.length >= 6 && ["GIF87a", "GIF89a"].includes(buffer.toString("ascii", 0, 6))) {
    return "gif";
  }
  return null;
}

export async function POST(request) {
  const originError = requireSameOrigin(request);
  if (originError) return originError;
  const access = await requireAdmin();
  if (access.response) return access.response;

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!file || typeof file.arrayBuffer !== "function" || file.size === 0) {
      return Response.json({ error: "Choose an image to upload." }, { status: 400 });
    }
    if (file.size > MAX_IMAGE_SIZE) {
      return Response.json({ error: "Images must be 8 MB or smaller." }, { status: 413 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const extension = getImageExtension(buffer);
    if (!extension) {
      return Response.json({ error: "Upload a valid JPG, PNG, WebP, or GIF image." }, { status: 415 });
    }

    const filename = `${randomUUID()}.${extension}`;
    await mkdir(UPLOAD_DIRECTORY, { recursive: true });
    await writeFile(path.join(UPLOAD_DIRECTORY, filename), buffer, { flag: "wx" });

    return Response.json({ image: `/api/uploads/${filename}` }, { status: 201 });
  } catch (error) {
    return adminError(error, "Admin image upload failed");
  }
}
