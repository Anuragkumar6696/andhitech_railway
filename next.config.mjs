/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Enable Next.js built-in image optimization (was disabled with unoptimized:true)
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400, // 24 hours
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.andhitech.in',
      },
    ],
  },
  // Enable compression
  compress: true,
  // Enable React strict mode for better performance
  reactStrictMode: true,
  // Production source maps off (reduces bundle size)
  productionBrowserSourceMaps: false,
  // Experimental optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'lucide-react', 'gsap'],
  },
  // Aggressive caching headers
  async headers() {
    return [
      {
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/js/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/webfonts/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
};

export default nextConfig;
