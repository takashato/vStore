import {addProduct, getAllProducts, getProduct, updateProduct} from "../handlers/product";

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

    server.route({
        method: "POST",
        path: "/product",
        handler: addProduct,
        options: {
            auth: "jwt",
            app: {
                allowedGroups: [1, 2]
            }
        }
    });

    server.route({
        method: "GET",
        path: '/product/{id}',
        handler: getProduct,
        options: {
            auth: "jwt",
            app: {
                allowedGroups: [1, 2, 3],
            }
        }
    });

    server.route({
       method: "PUT",
       path: '/product/{id}',
       handler: updateProduct,
       options: {
           auth: "jwt",
           app: {
               allowedGroups: [1, 2],
           }
       }
    });
}

export default applyRoute;