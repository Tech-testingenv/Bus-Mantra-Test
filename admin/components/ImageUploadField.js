"use client";

import { useState } from "react";
import Image from "next/image";
import { LoaderCircle, Upload } from "lucide-react";

export default function ImageUploadField({
  label,
  value,
  onUploaded,
  onUploadingChange,
  multiple = false,
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function uploadFiles(event) {
    const files = Array.from(event.target.files || []);
    event.target.value = "";
    if (!files.length) return;

    setUploading(true);
    setError("");
    onUploadingChange(1);
    try {
      for (const file of files) {
        const body = new FormData();
        body.append("file", file);
        const response = await fetch("/api/admin/uploads", { method: "POST", body });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.error || "Image upload failed.");
        onUploaded(result.image);
      }
    } catch (uploadError) {
      setError(uploadError.message);
    } finally {
      setUploading(false);
      onUploadingChange(-1);
    }
  }

  return (
    <div className="mt-2 space-y-3">
      {value && !multiple && (
        <div className="relative h-36 w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          <Image src={value} alt={`${label} preview`} fill unoptimized sizes="600px" className="object-contain" />
        </div>
      )}
      {multiple && value && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {value.split(/\r?\n/).map((imagePath, index) => imagePath.trim() && (
            <div key={`${imagePath}-${index}`} className="relative h-24 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
              <Image src={imagePath.trim()} alt={`Gallery image ${index + 1}`} fill unoptimized sizes="200px" className="object-cover" />
            </div>
          ))}
        </div>
      )}
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple={multiple}
        onChange={uploadFiles}
        disabled={uploading}
        aria-label={`Upload ${label.toLowerCase()}`}
        className="block w-full cursor-pointer rounded-xl border border-slate-200 bg-white text-sm text-slate-600 file:mr-4 file:cursor-pointer file:border-0 file:bg-orange-50 file:px-4 file:py-2.5 file:text-sm file:font-bold file:text-orange-700 hover:file:bg-orange-100 disabled:opacity-60"
      />
      <p className="flex items-center gap-2 text-xs text-slate-500">
        {uploading ? <LoaderCircle size={14} className="animate-spin" /> : <Upload size={14} />}
        {uploading ? "Uploading image…" : "JPG, PNG, WebP or GIF · max 8 MB each"}
      </p>
      {error && <p role="alert" className="text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}
