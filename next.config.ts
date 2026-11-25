import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Adicionado para permitir acesso do IP da rede local no ambiente de desenvolvimento
  allowedDevOrigins: ["172.29.224.1", "localhost", "127.0.0.1"],
};

export default nextConfig;