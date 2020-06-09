import Path from 'path';

import Hapi from '@hapi/hapi';
import HapiAuthJWT2 from 'hapi-auth-jwt2';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';

import serverConfig from './config/server';
import secureConfig from './config/secure';
import swaggerOptions from './config/swagger_options.json';

import validate from "./helpers/token_validator";
import AdminApiPlugin from "./plugins/admin_api";
import ServerApiPlugin from "./plugins/server_api";

serverConfig.routes.files = {
    relativeTo: Path.join(__dirname, 'public')
};
export const server = new Hapi.Server(serverConfig);

export async function init() {
    try {
        // Register modules
        await server.register(HapiAuthJWT2);
        await server.register([
            Inert,
            Vision,
            {
                plugin: HapiSwagger,
                options: swaggerOptions,
            }
        ]);
        // Setup Authentication
        server.auth.strategy('jwt', 'jwt',
            {
                key: secureConfig.jwtSecret,
                validate
            });
        server.auth.default('jwt');
        // Start server
        await server.start();
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
    // ServerAPI
    await server.register(ServerApiPlugin, {
        routes: {
            prefix: '/api'
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
