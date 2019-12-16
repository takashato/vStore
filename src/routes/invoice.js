import {getAllInvoices, getInvoice} from "../handlers/invoice";

function applyRoute(server) {
    server.route({
        method: 'GET',
        path: '/invoice',
        handler: getAllInvoices,
        options: {
            auth: 'jwt',
            app: {
                allowedGroups: [1, 2, 3],
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/invoice/{id}',
        handler: getInvoice,
        options: {
            auth: 'jwt',
            app: {
                allowedGroups: [1, 2, 3],
            }
        }
    });
}

export default applyRoute;