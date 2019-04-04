const withCSS = require("@zeit/next-css");
const withTypescript = require("@zeit/next-typescript");

module.exports = withCSS(
  withTypescript({
    env: {
      API_ENDPOINT: process.env.API_ENDPOINT || "http://localhost:4000/graphql"
    }
  })
);
