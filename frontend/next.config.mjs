/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this block to disable source maps
  productionBrowserSourceMaps: false,

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