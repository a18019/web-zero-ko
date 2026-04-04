import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    localPatterns: [
      {
        pathname: "/api/notion-file/**",
      },
      {
        pathname: "/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.zero-ko.com",
      },
      {
        protocol: "https",
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "prcdn.freetls.fastly.net",
      },
      {
        protocol: "https",
        hostname: "prtimes.jp",
      },
    ],
  },
};

export default nextConfig;
