/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyjson.com',
        port: '', // Leave empty if not needed
        pathname: '/icon/**', // Adjust the path pattern as needed
      },
    ],
  },
};

export default nextConfig;
