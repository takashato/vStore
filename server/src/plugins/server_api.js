const ServerApiPlugin = {
    name: "server_api",
    register: async function (server, options) {
        server.route({
           method: 'POST',
           path: '/',
           handler: (server, h) => {
               return {
                   title: 'vStore API Entry point'
               };
           }
        });
    }
};

export default ServerApiPlugin;
