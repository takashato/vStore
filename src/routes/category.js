import {getAllCategories} from "../handlers/category";

function applyRoute(server) {
    server.route({
        method: "GET",
        path: "/category",
        handler: getAllCategories,
        options: {
            auth: "jwt",
            app: {
                allowedGroups: [1, 2]
            }
        }
    });
}

export default applyRoute;