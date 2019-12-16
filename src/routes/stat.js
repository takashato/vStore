import {getRevenue, getStatInfo} from "../handlers/stat";

function applyRoute(server) {
    server.route({
        method: 'GET',
        path: '/stat/info',
        handler: getStatInfo,
        options: {
            auth: "jwt",
            app: {
                allowedGroups: [1, 2, 3],
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/stat/revenue',
        handler: getRevenue,
        options: {
            auth: "jwt",
            app: {
                allowedGroups: [1, 2, 3]
            }
        }
    })
}

export default applyRoute;