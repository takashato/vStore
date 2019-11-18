import Hapi from '@hapi/hapi';
import serverConfig from './config/server';
import sequelize from "./db";

import momentHelper from './helpers/moment_helper';

export const server = new Hapi.Server(serverConfig);

export async function init() {
    try {
        await server.start();
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
            const Staff = sequelize.import(__dirname + "/models/staff");
            var user = Staff.build({
                username: 'admin',
                password: 'admin',
                full_name: 'Administrator',
                email: 'admin@vstore.net',
                group_id: 1,
            });
            try {
                await user.save();
            } catch (e) {
                console.log(e);
            }
            return 'Hello World!';
        }
    });
}