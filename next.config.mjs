// @ts-check

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  images: {
    domains: [
    "oaidalleapiprodscus.blob.core.windows.net", 
    "plus.unsplash.com",
    "dalle-icon-generator-app.s3.us-east-2.amazonaws.com",
    "dalle-icon-generator-app.s3.amazonaws.com",
    "icon-generator-course.s3.amazonaws.com",
  ],
  },

  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};
export default config;
