/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.andhitech.in',
      },
    ],
  },
  turbopack: {
    root: 'C:/Users/DELL/Desktop/andhitech_railway',
  },
};

export default nextConfig;