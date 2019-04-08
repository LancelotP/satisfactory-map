const withTypescript = require("@zeit/next-typescript");
const withOptimizedImages = require("next-optimized-images");

module.exports = withTypescript(withOptimizedImages());
