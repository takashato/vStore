import {authenticate, createStaff, getAllStaff, getSelf, getStaff, updateStaff} from "../handlers/staff";

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

    server.route({
        method: 'POST',
        path: '/staff',
        handler: createStaff,
        options: {
            auth: 'jwt',
            app: {
                allowedGroups: [1] // Admin
            },
        }
    });

    server.route({
        method: 'GET',
        path: '/staff/self',
        handler: getSelf,
        options: {
            auth: "jwt",
            app: {
                allowedGroups: [1, 2, 3]
            }
        },
    });

    server.route({
        method: 'GET',
        path: '/staff/{id}',
        handler: getStaff,
        options: {
            auth: 'jwt',
            app: {
                allowedGroups: [1, 2] // Admin and staffs
            }
        }
    });
    server.route({
        method: 'PUT',
        path: '/staff/{id}',
        handler: updateStaff,
        options: {
            auth: 'jwt',
            app: {
                allowedGroups: [1] // Admin and staffs
            }
        }
    });
}

export default applyRoute;