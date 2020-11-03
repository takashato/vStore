import Path from 'path';

import Hapi from '@hapi/hapi';
import HapiAuthJWT2 from 'hapi-auth-jwt2';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import {ApolloServer} from 'apollo-server-hapi';

import serverConfig from './config/server';
import secureConfig from './config/secure';
import graphqlConfig from './config/graphql.json';

import validate from "./helpers/token_validator";
import AdminApiPlugin from "./plugins/admin_api";
import ServerApiPlugin from "./plugins/server_api";

import graphqlSchema from './graphql/schema';

serverConfig.routes.files = {
    relativeTo: Path.join(__dirname, 'public')
};
export const server = new Hapi.Server(serverConfig);
export const apolloServer = new ApolloServer({
    schema: graphqlSchema,
});

export async function init() {
    try {
        // Register modules
        await server.register([
            Inert,
            Vision,
            HapiAuthJWT2,
            {
                plugin: require('hapi-cors'),
                options: {
                    origins: ['*']
                }
            }
        ]);
        // GraphQL
        await apolloServer.applyMiddleware({
            ...graphqlConfig,
            app: server,
        });
        // Setup Authentication
        server.auth.strategy('jwt', 'jwt',
            {
                key: secureConfig.jwtSecret,
                validate
            });
        // server.auth.default('jwt');
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
    // await server.register(ServerApiPlugin, {
    //     routes: {
    //         prefix: '/api'
    //     }
    // });
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
