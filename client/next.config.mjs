/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    webpack: (config) => {
      config.optimization.minimize = true;
      return config;
    },
};

export default nextConfig;
