// In the next.config.ts of your BACKEND application (the one on port 3001)
import type { NextConfig } from "next";
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";
import CopyPlugin from "copy-webpack-plugin";
import path from "path";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@duramation/db"],
  outputFileTracingIncludes: {
    "/api/**/*": ["../../packages/db/src/generated/client/**/*"],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
      
      const dbPackagePath = path.resolve(process.cwd(), "../../packages/db/src/generated/client");
      
      config.plugins.push(
        new CopyPlugin({
          patterns: [
            // Copy to locations where Prisma Client might look
            {
              from: dbPackagePath,
              to: path.resolve(process.cwd(), ".next/server/chunks/packages/db/src/generated/client"),
              noErrorOnMissing: true,
            },
            {
              from: dbPackagePath,
              to: path.resolve(process.cwd(), ".next/server/packages/db/src/generated/client"),
              noErrorOnMissing: true,
            },
            // Try to match the search path /var/task/apps/inngest-app/src/generated/client
            // In local build this goes to .next/... but on Vercel the file structure is flattened or preserved.
            // Copying to the build output root might help.
            {
               from: dbPackagePath,
               to: "src/generated/client", // Relative to webpack output path
               noErrorOnMissing: true,
            }
          ],
        })
      );
    }
    return config;
  },
  async headers() {
    return [
      {
        // This will match all of your API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          // Use a wildcard for development to allow all origins
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" },
        ]
      }
    ]
  },
};

export default nextConfig;