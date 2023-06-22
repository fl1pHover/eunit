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
      "https://eunit.s3.eu-north-1.amazonaws.com",
      "https://lh3.googleusercontent.com",
      "eunit.s3.eu-north-1.amazonaws.com",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
