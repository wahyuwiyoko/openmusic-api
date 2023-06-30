require('dotenv').config();

const Hapi = require('@hapi/hapi');
const album = require('./api/album');
const song = require('./api/song');
const AlbumsService = require('./services/AlbumsService');
const SongsService = require('./services/SongsService');
const { albumsValidator, songsValidator } = require('./validator');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: album,
      options: {
        service: new AlbumsService(),
        validator: albumsValidator,
      },
    },
    {
      plugin: song,
      options: {
        service: new SongsService(),
        validator: songsValidator,
      },
    },
  ]);

  await server.start();

  console.info(`Server is running on ${server.info.uri}`);
};

init();
