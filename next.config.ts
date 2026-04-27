import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/twitter",
        destination: "https://x.com/saltjsx",
        permanent: false,
      },
      {
        source: "/x",
        destination: "https://x.com/saltjsx",
        permanent: false,
      },
      {
        source: "/github",
        destination: "https://github.com/saltjsx",
        permanent: false,
      },
      {
        source: "/youtube",
        destination: "https://www.youtube.com/@saltjsx",
        permanent: false,
      },
      {
        source: "/discord",
        destination: "https://discord.gg/cZmkYwUMck",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
