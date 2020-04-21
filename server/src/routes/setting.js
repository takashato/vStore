import {getAllSettingGroups, getAllSettings} from "../handlers/setting";

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

    server.route({
        method: "GET",
        path: "/setting/{varname}",
        handler: getAllSettings,
        options: {
            auth: "jwt",
            app: {
                allowedGroups: [1, 2, 3]
            }
        }
    });
}

export default applyRoute;