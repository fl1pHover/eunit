const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'https://bom-file.s3.us-east-1.amazonaws.com',
      'bom-file.s3.us-east-1.amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
