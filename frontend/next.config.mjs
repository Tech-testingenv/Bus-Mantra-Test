const WEB_BACKEND_URL = process.env.WEB_BACKEND_URL || "http://127.0.0.1:4000";

/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  images: { qualities: [75, 100] },
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${WEB_BACKEND_URL}/api/:path*` }];
  },
};

export default nextConfig;
