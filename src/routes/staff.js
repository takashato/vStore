import {authenticate, getAllStaff} from "../handlers/staff";

function applyRoute(server) {
    server.route({
        method: 'POST',
        path: '/staff/auth',
        handler: authenticate,
        options: {
            auth: false,
        }
    });

    server.route({
        method: 'GET',
        path: '/staff',
        handler: getAllStaff,
        options: {
            auth: 'jwt',
            app: {
                allowedGroups: [1] // Admin
            },
        }
    });
}

export default applyRoute;