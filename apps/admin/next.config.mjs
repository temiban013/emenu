/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@emenu/ui", "@emenu/typescript-config"], // Use the correct package name
  output: "standalone",
};

export default nextConfig;
