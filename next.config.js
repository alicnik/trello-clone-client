/** @type {import('next').NextConfig} */

const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['images.unsplash.com'],
  },
};

module.exports = {
  ...withVanillaExtract(nextConfig),
  async redirects() {
    return [
      {
        source: '/:username',
        destination: '/:username/boards',
        permanent: true,
      },
    ];
  },
};
