const Hapi = require('@hapi/hapi');
const serverConfig = require('./config/server');

const init = async () => {
    const server = Hapi.server(serverConfig);

    await server.start();
    console.log('>>> Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

module.exports = init;