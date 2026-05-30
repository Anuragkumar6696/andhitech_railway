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
  // NOTE: turbopack.root removed — it was hardcoded to a Windows dev-machine
  // path ("C:/Users/DELL/Desktop/...") which caused Vercel (Linux) builds to
  // fail intermittently and contributed to RSC header leakage on all pages.
};

export default nextConfig;
