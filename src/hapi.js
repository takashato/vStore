import Hapi from '@hapi/hapi';
import serverConfig from './config/server';

const server = new Hapi.Server(serverConfig);

export default async function init() {
    try {
        await server.start();
        console.log('>>> Server running on %s', server.info.uri);
    } catch (e) {
        console.log('Can\'t start server.');
        process.exit();
    }
}