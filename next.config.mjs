/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  experimental: {
    appDir: true,
  },
  webpack: true,
};

export default nextConfig;
