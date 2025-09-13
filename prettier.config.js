// prettier.config.js

/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "**/*.astro",
      singleQuote: true,
      experimentalTernaries: true,
      options: {
        parser: "astro",
      },
    },
  ],
  tailwindStylesheet: "./src/styles/global.css",
};
