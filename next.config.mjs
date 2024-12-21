/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rrttnbccdeweenyw.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
