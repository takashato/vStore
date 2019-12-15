import Hapi from '@hapi/hapi';
import HapiAuthJWT2 from 'hapi-auth-jwt2';

import serverConfig from './config/server';
import secureConfig from './config/secure';

import applyStaffRoute from "./routes/staff";
import applyCategoryRoute from "./routes/category";
import applyProductRoute from "./routes/product";
import applyCustomerRoute from "./routes/customer";
import applyReceiptRoute from "./routes/receipt";
import validate from "./helpers/token_validator";

export const server = new Hapi.Server(serverConfig);

export async function init() {
    try {
        await server.start();
        await server.register(HapiAuthJWT2);
        server.auth.strategy('jwt', 'jwt',
            {
                key: secureConfig.jwtSecret,
                validate
            });
        server.auth.default('jwt');
        console.log('>>> Server running on %s', server.info.uri);
    } catch (e) {
        console.log('Can\'t start server.');
        process.exit();
        return;
    }

    server.route({
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            return {
                title: 'vStore WebAPI Server',
            };
        }
    });

    applyStaffRoute(server);
    applyCategoryRoute(server);
    applyProductRoute(server);
    applyCustomerRoute(server);
    applyReceiptRoute(server);
}