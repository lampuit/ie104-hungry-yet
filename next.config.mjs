/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aw6zddwvvm1te20u.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
