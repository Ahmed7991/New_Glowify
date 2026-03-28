import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'www.cosrx.com', pathname: '/**' },
      { protocol: 'https', hostname: 'sdcdn.io', pathname: '/**' },
      { protocol: 'https', hostname: 'media.ulta.com', pathname: '/**' },
      { protocol: 'https', hostname: 'soskin.fr', pathname: '/**' },
      { protocol: 'https', hostname: 'www.vichyusa.com', pathname: '/**' },
      { protocol: 'https', hostname: 'www.skin1004.com', pathname: '/**' },
      { protocol: 'https', hostname: 'maybelline.com', pathname: '/**' },
      {
        protocol: 'https',
        hostname: 'www.maybelline.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
