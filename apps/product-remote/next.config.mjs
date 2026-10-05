import { NextFederationPlugin } from "@module-federation/nextjs-mf";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "product_remote",
        filename: "static/chunks/remoteEntry.js",

        exposes: {
          "./ProductCard": "./src/components/ProductCard.tsx",
        },

        shared: {
          react: {
            singleton: true,
            requiredVersion: false,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: false,
          },
        },
      })
    );

    return config;
  },
};

export default nextConfig;