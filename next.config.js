const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // webp: {
  //   preset: 'default',
  //   quality: 100,
  // },
  images: {
    domains: [
      'https://bom-file.s3.us-east-1.amazonaws.com',
      'bom-file.s3.us-east-1.amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
