/** @type {import('next').NextConfig} */
const nextConfig = {
  staticPageGenerationTimeout: 180,
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;
