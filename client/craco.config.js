module.exports = function ({env}) {
    return {
        plugins: [
            {
                plugin: require('craco-antd'),
                options: {
                    lessLoaderOptions: {
                        lessOptions: {
                            noIeCompat: true,
                            javascriptEnabled: true,
                        },
                    },
                }
            },
        ]
    };
}
