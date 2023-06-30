const AlbumsHandler = require('./AlbumsHandler');
const routes = require('./routes');

module.exports = {
  name: 'album',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    server.route(routes(new AlbumsHandler(service, validator)));
  },
};
