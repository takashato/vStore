import Path from 'path';

import Hapi from '@hapi/hapi';
import HapiAuthJWT2 from 'hapi-auth-jwt2';
import Inert from '@hapi/inert';

import serverConfig from './config/server';
import secureConfig from './config/secure';

import validate from "./helpers/token_validator";
import AdminApiPlugin from "./plugins/admin_api";

serverConfig.routes.files = {
    relativeTo: Path.join(__dirname, 'public')
};
export const server = new Hapi.Server(serverConfig);

export async function init() {
    try {
        await server.start();
        await server.register(HapiAuthJWT2);
        await server.register(Inert);
        server.auth.strategy('jwt', 'jwt',
            {
                key: secureConfig.jwtSecret,
                validate
            });
        server.auth.default('jwt');
        console.log('>>> Server running on %s', server.info.uri);
    } catch (e) {
        console.log('Can\'t start server.', e);
        process.exit();
        return;
    }

    // Register plugins for modularization
    // Admin API
    await server.register(AdminApiPlugin, {
        routes: {
            prefix: '/admin/api'
        }
    });
    // Admin Static
    server.route({
        method: '*',
        path: '/admin/{path*}',
        handler: {
            directory: {
                path: './admin',
                listing: false,
                index: true,
            }
        },
        options: {
            auth: false,
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            return {
                title: 'vStore WebAPI Server',
            };
        }
    });
}
