/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
    config.resolve.alias.canvas = false;
        
    return config;
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'assets.example.com',
            port: '',
            pathname: '/account123/**',
          },
        ],
      },
}

module.exports = nextConfig
