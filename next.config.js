/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/nextjs-smrp',
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
