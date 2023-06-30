const ClientError = require('../../exceptions/ClientError');

class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postAlbumHandler = this.postAlbumHandler.bind(this);
    this.getAlbumsHandler = this.getAlbumsHandler.bind(this);
    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
    this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
    this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
  }

  async postAlbumHandler(request, h) {
    try {
      this._validator.validateAlbumPayload(request.payload);
      const { name = 'untitled', year } = request.payload;

      const albumId = await this._service.addAlbum({ name, year });

      const successResponse = h.response({
        status: 'success',
        data: { albumId },
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

  async getAlbumsHandler(request, h) {
    const { name, year } = request.query;
    const albums = await this._service.getAlbums();

    let albumsData = albums;

    // Set name case insensitive and filter based on query
    if (name) {
      albumsData = albumsData.filter((album) => {
        return album.name.toLowerCase().includes(name.toLowerCase());
      });

      if (albumsData.name === name) {
        albumsData = albumsData.filter((album) => album.name === name);
      }
    }

    if (year) {
      albumsData = albumsData.filter((album) => album.year === Number(year));
    }

    const successResponse = h.response({
      status: 'success',
      data: {
        albums: albumsData.map((album) => ({
          id: album.id,
          name: album.name,
          year: album.year,
        })),
      },
    });

    successResponse.code(200);
    return successResponse;
  }

  async getAlbumByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const album = await this._service.getAlbumById(id);
      const songs = await this._service.getSongsByAlbumId(id);

      const successResponse = h.response({
        status: 'success',
        data: {
          album: {
            id: album.id,
            name: album.name,
            year: album.year,
            songs,
          },
        },
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

  async putAlbumByIdHandler(request, h) {
    try {
      this._validator.validateAlbumPayload(request.payload);
      const { id } = request.params;

      await this._service.editAlbumById(id, request.payload);

      const successResponse = h.response({
        status: 'success',
        message: 'Successfully updated the album.',
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

  async deleteAlbumByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deleteAlbumById(id);

      const successResponse = h.response({
        status: 'success',
        message: 'Successfully deleted the album.',
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

module.exports = AlbumsHandler;
