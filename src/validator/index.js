const { albumPayloadSchema, songPayloadSchema } = require('./schema');
const InvariantError = require('../exceptions/InvariantError');

const albumsValidator = {
  validateAlbumPayload: (payload) => {
    const validationResult = albumPayloadSchema.validate(payload);

    if (validationResult.error) throw new InvariantError(validationResult.error.message);
  },
};

const songsValidator = {
  validateSongPayload: (payload) => {
    const validationResult = songPayloadSchema.validate(payload);

    if (validationResult.error) throw new InvariantError(validationResult.error.message);
  },
};

module.exports = { albumsValidator, songsValidator };
