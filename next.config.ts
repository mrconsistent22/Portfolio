import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow local network IP for mobile testing
  // (Next.js dev server origin security)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...({ allowedDevOrigins: ["10.197.207.239", "localhost", "127.0.0.1"] } as any),
};

export default nextConfig;
