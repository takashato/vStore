import {authenticate} from "../handlers/staff";

function applyRoute(server) {
    server.route({
        method: 'POST',
        path: '/staff/auth',
        handler: authenticate,
        options: {
            auth: false,
        }
    });
}

export default applyRoute;