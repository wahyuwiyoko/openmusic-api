const SongsHandler = require('./SongsHandler');
const routes = require('./routes');

module.exports = {
  name: 'song',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    server.route(routes(new SongsHandler(service, validator)));
  },
};
