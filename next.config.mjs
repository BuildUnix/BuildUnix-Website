/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/portal",
        destination: "https://portal.buildunix.com",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
