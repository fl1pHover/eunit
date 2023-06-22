const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    // outputFileTracingRoot: path.join(__dirname, "../../"),
    outputFileTracingExcludes: {
      "*": ["node_modules/canvas"],
    },
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
