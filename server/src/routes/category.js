import {createCategory, getAllCategories, getCategory, updateCategory} from "../handlers/category";

function applyRoute(server) {
    server.route({
        method: "GET",
        path: "/category",
        handler: getAllCategories,
        options: {
            auth: "jwt",
            app: {
                allowedGroups: [1, 2, 3]
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/category/{id}',
        handler: getCategory,
        options: {
            auth: "jwt",
            app: {
                allowedGroups: [1, 2, 3]
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/category',
        handler: createCategory,
        options: {
            auth: "jwt",
            app: {
                allowedGroups: [1, 2]
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/category/{id}',
        handler: updateCategory,
        options: {
            auth: "jwt",
            app: {
                allowedGroups: [1, 2]
            }
        }
    });
}

export default applyRoute;