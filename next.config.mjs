/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
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
  async redirects() {
    return [
      // 301 Redirects from old duplicate categories to canonical clean routes
      {
        source: '/casetas-moviles2',
        destination: '/categorias/casetas',
        permanent: true,
      },
      {
        source: '/casetas-moviles',
        destination: '/categorias/casetas',
        permanent: true,
      },
      {
        source: '/casetas',
        destination: '/categorias/casetas',
        permanent: true,
      },
      {
        source: '/dormitorios-moviles',
        destination: '/categorias/dormitorios',
        permanent: true,
      },
      {
        source: '/dormitorios-4',
        destination: '/categorias/dormitorios',
        permanent: true,
      },
      {
        source: '/sanitarios-moviles',
        destination: '/categorias/sanitarios',
        permanent: true,
      },
      {
        source: '/sanitarios-moviles2',
        destination: '/categorias/sanitarios',
        permanent: true,
      },
      {
        source: '/comedores-moviles',
        destination: '/categorias/comedores',
        permanent: true,
      },
      {
        source: '/comedores',
        destination: '/categorias/comedores',
        permanent: true,
      },
      {
        source: '/oficinas-moviles',
        destination: '/categorias/oficinas',
        permanent: true,
      },
      {
        source: '/contenedores-moviles',
        destination: '/categorias/contenedores',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
