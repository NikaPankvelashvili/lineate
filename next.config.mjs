/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hy8gc67fiu9s3f9k.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;