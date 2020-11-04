const path = require("path");
const WebpackBar = require('webpackbar');

module.exports = function ({env}) {
    return {
        webpack: {
            plugins: [
                new WebpackBar(),
            ],
            configure: (webpackConfig, {env, paths}) => {
                webpackConfig.resolve = {
                    modules: [path.resolve(__dirname, './src'), 'node_modules'],
                };
                return webpackConfig;
            },
        },
        babel: {
            loaderOptions: {
                plugins: [
                    ["import", {
                        libraryName: "antd",
                        libraryDirectory: "lib",
                        style: true,
                    }]
                ]
            }
        },
        plugins: [
            {
                plugin: require('craco-less'),
                options: {
                    lessLoaderOptions: {
                        lessOptions: {
                            javascriptEnabled: true,
                        },
                    },
                }
            },
        ],
    };
}
