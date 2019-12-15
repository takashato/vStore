import {createReceipt, getAllReceipts} from "../handlers/receipt";

function applyRoute(server) {
    server.route({
        method: 'GET',
        path: '/receipt',
        handler: getAllReceipts,
        options: {
            auth: 'jwt',
            app: {
                allowedGroups: [1, 2],
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/receipt',
        handler: createReceipt,
        options: {
            auth: 'jwt',
            app: {
                allowedGroups: [1, 2],
            }
        }
    })
}

export default applyRoute;