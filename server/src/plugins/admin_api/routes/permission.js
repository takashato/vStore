import {getGroup, getGroups, getUserPermission} from "../handlers/permission";

export default function applyRoute(server) {
    server.route({
        method: "GET",
        path: "/permission/self",
        handler: getUserPermission,
        options: {
            auth: "jwt",
            app: {
                allowedGroups: [1, 2, 3]
            },
            tags: ['api'],
        }
    });

    server.route({
        method: "GET",
        path: "/staff-group",
        handler: getGroups,
        options: {
            auth: "jwt",
            app: {
                allowedGroups: [1, 2, 3]
            },
            tags: ['api'],
        }
    });

    server.route({
        method: "GET",
        path: "/staff-group/{id}",
        handler: getGroup,
        options: {
            auth: "jwt",
            app: {
                allowedGroups: [1, 2, 3]
            },
            tags: ['api'],
        }
    });

}
