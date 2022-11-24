const resolve = require("path").resolve;
const defaultConfig = require("@wordpress/scripts/config/webpack.config");

module.exports = {
    ...defaultConfig,
    entry: {
        ...defaultConfig.entry(), // uses a function to get all files based on block.json
        frontend: resolve(process.cwd(), "src", "frontend.js"),
        swiper: resolve(process.cwd(), "src", "swiper", "index.js"),
        "swiper-full": resolve(process.cwd(), "src", "swiper", "full.js"),
    },
};
