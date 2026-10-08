/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.STATIC_EXPORT === "true" ? "export" : "standalone",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'capelton.mx',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.capelton.mx',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'capeltonmexico.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.capeltonmexico.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
