import {getAllCustomers} from "../handlers/customer";

function applyRoute(server) {
    server.route({
        method: "GET",
        path: "/customer",
        handler: getAllCustomers,
        options: {
            auth: "jwt",
            app: {
                allowedGroups: [1, 2, 3]
            }
        }
    });

}

export default applyRoute;