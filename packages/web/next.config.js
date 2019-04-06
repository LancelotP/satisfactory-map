const withCSS = require("@zeit/next-css");
const withTypescript = require("@zeit/next-typescript");
const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");

module.exports = withPlugins(
  [
    withCSS,
    withTypescript,
    [
      optimizedImages,
      {
        optimizeImagesInDev: true
      }
    ]
  ],
  {
    env: {
      API_ENDPOINT: process.env.API_ENDPOINT || "http://localhost:4000/graphql"
    }
  }
);
