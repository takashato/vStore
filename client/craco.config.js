const path = require("path");
module.exports = function ({env}) {
    return {
        webpack: {
            configure: {
                resolve: {
                    modules: [path.resolve(__dirname, './src'), 'node_modules'],
                }
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
                    cssLoaderOptions: {
                        modules: { localIdentName: "[local]_[hash:base64:5]" }
                    },
                }
            },
        ],
    };
}
