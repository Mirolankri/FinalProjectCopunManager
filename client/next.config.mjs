/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    optimizeFonts: false,
    webpack: (config) => {
      config.optimization.minimize = true;
      return config;
    },
};

export default nextConfig;
