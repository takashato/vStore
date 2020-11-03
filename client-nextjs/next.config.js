const path = require('path');
const withSass = require("@zeit/next-sass");
const withLess = require("@zeit/next-less");
const withCSS = require("@zeit/next-css");
const withProgressBar = require('next-progressbar')

const isProd = process.env.NODE_ENV === "production";

// fix: prevents error when .less files are required by node
if (typeof require !== "undefined") {
    require.extensions[".less"] = (file) => {
    };
}

module.exports = withProgressBar(
    withCSS({
        cssModules: true,
        cssLoaderOptions: {
            importLoaders: 1,
            localIdentName: "[local]___[hash:base64:5]",
        },
        webpack: (config, options) => {
            config.resolve.modules.push(path.resolve('./'))
            return config;
        },
        ...withLess(
            withSass({
                lessLoaderOptions: {
                    javascriptEnabled: true,
                },
            })
        )
    })
);
