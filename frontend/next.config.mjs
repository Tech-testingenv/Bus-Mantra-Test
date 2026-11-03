import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const frontendRoot = path.join(repoRoot, "frontend");

/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  // admin/ and backend/ are siblings of frontend/, so Turbopack must see the repo root.
  turbopack: {
    root: repoRoot,
    resolveAlias: {
      "@": path.join(frontendRoot),
    },
  },
};

export default nextConfig;
