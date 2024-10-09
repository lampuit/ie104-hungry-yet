/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          // Basic redirect
          {
            source: '/',
            destination: '/dashboard',
            permanent: true,
          },
          // Wildcard path matching
        //   {
        //     source: '/blog/:slug',
        //     destination: '/news/:slug',
        //     permanent: true,
        //   },
        ]
      },
};



export default nextConfig;
