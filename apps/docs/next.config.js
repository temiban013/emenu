/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@emenu/ui"], // Use the correct package name
  output: "standalone",
};

export default nextConfig;
