import {getAllProducts} from "../handlers/product";
import {createCategory, getAllCategories, getCategory, updateCategory} from "../handlers/category";

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