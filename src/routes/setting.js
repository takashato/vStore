import {getAllSettingGroups} from "../handlers/setting";

function applyRoute(server) {
    server.route({
        method: "GET",
        path: "/setting",
        handler: getAllSettingGroups,
        options: {
            auth: "jwt",
            app: {
                allowedGroups: [1, 2, 3]
            }
        }
    });
}

export default applyRoute;