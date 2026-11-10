/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  // Static site for GitHub Pages; local `npm run dev` stays without basePath.
  ...(isGithubPages
    ? {
        output: "export",
        basePath: "/budjetto",
        assetPrefix: "/budjetto/",
        trailingSlash: true,
      }
    : {}),
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
