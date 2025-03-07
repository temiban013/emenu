/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@emenu/ui", "@emenu/typescript-config"],
  output: "standalone",
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
