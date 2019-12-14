import {getAllProducts} from "../handlers/product";

function applyRoute(server) {
    server.route({
        method: "GET",
        path: "/product",
        handler: getAllProducts,
        options: {
            auth: "jwt",
            app: {
                allowedGroups: [1, 2, 3]
            }
        }
    });

}

export default applyRoute;