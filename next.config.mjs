/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "4dexrf4t9f6tdt6j.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
