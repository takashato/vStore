import {sale} from "../handlers/sale";

function applyRoute(server) {
    server.route({
        method: 'POST',
        path: '/sale',
        handler: sale,
        options: {
            auth: "jwt",
            app: {
                allowedGroups: [1, 2, 3]
            },
        }
    })
}

export default applyRoute;