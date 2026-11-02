import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const esGithubPages = process.env.GITHUB_PAGES === "true";
const rutaBase = esGithubPages
  ? process.env.NEXT_PUBLIC_BASE_PATH || "/top-notch"
  : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(esGithubPages
    ? {
        output: "export",
        trailingSlash: true,
        basePath: rutaBase,
        images: {
          unoptimized: true,
        },
      }
    : {
        async headers() {
          return [
            {
              source: "/(.*)",
              headers: [
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "X-Frame-Options", value: "DENY" },
                {
                  key: "Referrer-Policy",
                  value: "strict-origin-when-cross-origin",
                },
              ],
            },
          ];
        },
      }),
};

export default withNextIntl(nextConfig);
