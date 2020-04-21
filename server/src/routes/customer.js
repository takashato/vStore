import {createCustomer, getAllCustomers, getCustomer, updateCustomer} from "../handlers/customer";

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

    server.route({
        method: 'GET',
        path: '/customer/{id}',
        handler: getCustomer,
        options: {
            auth: 'jwt',
            app: {
                allowedGroups: [1, 2, 3]
            }
        }
    });

    server.route({
       method: "POST",
       path: "/customer",
       handler: createCustomer,
       options: {
           auth: "jwt",
           app: {
               allowedGroups: [1, 2, 3]
           }
       }
    });

    server.route({
        method: 'PUT',
        path: '/customer/{id}',
        handler: updateCustomer,
        options: {
            auth: 'jwt',
            app: {
                allowedGroups: [1, 2, 3]
            }
        }
    });

}

export default applyRoute;