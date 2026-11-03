const WEB_BACKEND_URL = process.env.WEB_BACKEND_URL || "http://127.0.0.1:4000";
const ADMIN_BACKEND_URL = process.env.ADMIN_BACKEND_URL || "http://127.0.0.1:4001";

/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  async rewrites() {
    return [
      { source: "/api/admin/:path*", destination: `${ADMIN_BACKEND_URL}/api/admin/:path*` },
      // Uploaded images are served by the web backend.
      { source: "/api/uploads/:path*", destination: `${WEB_BACKEND_URL}/api/uploads/:path*` },
    ];
  },
};

export default nextConfig;
