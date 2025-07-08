/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing webpack config for polling
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
};

export default nextConfig;