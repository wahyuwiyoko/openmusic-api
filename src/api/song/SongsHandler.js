const ClientError = require('../../exceptions/ClientError');

class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postSongHandler = this.postSongHandler.bind(this);
    this.getSongsHandler = this.getSongsHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
    this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
  }

  async postSongHandler(request, h) {
    try {
      this._validator.validateSongPayload(request.payload);

      const {
        title = 'untitled',
        year,
        genre,
        performer,
        duration = null,
        albumId = null,
      } = request.payload;

      const songId = await this._service.addSong({
        title,
        year,
        genre,
        performer,
        duration,
        albumId,
      });

      const successResponse = h.response({
        status: 'success',
        data: { songId },
      });

      successResponse.code(201);
      return successResponse;
    } catch (error) {
      if (error instanceof ClientError) {
        const errorResponse = h.response({
          status: 'fail',
          message: error.message,
        });

        errorResponse.code(error.statusCode);
        return errorResponse;
      }

      const serverError = h.response({
        status: 'error',
        message: 'Sorry, there was a server failure.',
      });

      serverError.code(500);
      return serverError;
    }
  }

  async getSongsHandler(request, h) {
    const { title, performer } = request.query;
    const songs = await this._service.getSongs();

    let songsData = songs;

    // Set title and performer to case insensitive
    // And then filter based on query parameter
    if (title) {
      songsData = songsData.filter((song) => {
        return song.title.toLowerCase().includes(title.toLowerCase());
      });

      if (songsData.title === title) {
        songsData = songsData.filter((song) => song.title === title);
      }
    }

    if (performer) {
      songsData = songsData.filter((song) => {
        return song.performer.toLowerCase().includes(performer.toLowerCase());
      });

      if (songsData.performer === performer) {
        songsData = songsData.filter((song) => song.performer === performer);
      }
    }

    const successResponse = h.response({
      status: 'success',
      data: {
        songs: songsData.map((song) => ({
          id: song.id,
          title: song.title,
          performer: song.performer,
        })),
      },
    });

    successResponse.code(200);
    return successResponse;
  }

  async getSongByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const song = await this._service.getSongById(id);

      const successResponse = h.response({
        status: 'success',
        data: { song },
      });

      successResponse.code(200);
      return successResponse;
    } catch (error) {
      if (error instanceof ClientError) {
        const errorResponse = h.response({
          status: 'fail',
          message: error.message,
        });

        errorResponse.code(error.statusCode);
        return errorResponse;
      }

      const serverError = h.response({
        status: 'error',
        message: 'Sorry, there was a server failure.',
      });

      serverError.code(500);
      return serverError;
    }
  }

  async putSongByIdHandler(request, h) {
    try {
      this._validator.validateSongPayload(request.payload);
      const { id } = request.params;

      await this._service.editSongById(id, request.payload);

      const successResponse = h.response({
        status: 'success',
        message: 'Successfully updated the song.',
      });

      successResponse.code(200);
      return successResponse;
    } catch (error) {
      if (error instanceof ClientError) {
        const errorResponse = h.response({
          status: 'fail',
          message: error.message,
        });

        errorResponse.code(error.statusCode);
        return errorResponse;
      }

      const serverError = h.response({
        status: 'error',
        message: 'Sorry, there was a server failure.',
      });

      serverError.code(500);
      return serverError;
    }
  }

  async deleteSongByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deleteSongById(id);

      const successResponse = h.response({
        status: 'success',
        message: 'Successfully deleted the song.',
      });

      successResponse.code(200);
      return successResponse;
    } catch (error) {
      if (error instanceof ClientError) {
        const errorResponse = h.response({
          status: 'fail',
          message: error.message,
        });

        errorResponse.code(error.statusCode);
        return errorResponse;
      }

      const serverError = h.response({
        status: 'error',
        message: 'Sorry, there was a server failure.',
      });

      serverError.code(500);
      return serverError;
    }
  }
}

module.exports = SongsHandler;
