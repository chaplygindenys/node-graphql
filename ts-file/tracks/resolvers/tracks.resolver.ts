import { options } from '../../config.js';
import { Track } from '../../interface';

export const resolverTracks = {
  Query: {
    allTracks: async (
      _source: any,
      { limit, offset }: any,
      { dataSources }: any
    ) => {
      console.log(dataSources.tracksAPI, {
        limit: limit || options.defaultLimit,
        offset: offset || options.defaultOffset,
      });
      try {
        const body = await dataSources.tracksAPI.getAllTrack({
          limit: limit || options.defaultLimit,
          offset: offset || options.defaultOffset,
        });
        console.log(`resolver`, body);
        return body.items;
      } catch (err: Error | undefined | any) {
        if (err) {
          console.log(err);
        }
      }
    },

    track: async (_source: any, { id }: any, { dataSources }: any) => {
      console.log(id);
      console.log(dataSources.tracksAPI);

      try {
        const body: Track = await dataSources.tracksAPI.getTrack(id);
        console.log(body);
        return body;
      } catch (err: Error | undefined | any) {
        if (err) {
          console.error(err);
          return {
            message: err.message,
          };
        }
      }
    },
  },
  Track: {
    id(parent: Track, _args: any, { dataSources }: any, i: any) {
      return parent._id;
    },
    title(parent: Track, _args: any, { dataSources }: any, i: any) {
      return parent.title;
    },
    albums(parent: Track, _args: any, { dataSources }: any, i: any) {
      return dataSources.albumsAPI.getAlbum(parent.albumId);
    },
    bands(parent: Track, _args: any, { dataSources }: any, i: any) {
      return dataSources.bandsAPI.getAllBandsbyIds(parent.bandsIds);
    },
    duration(parent: Track, _args: any, { dataSources }: any, i: any) {
      return parent.duration;
    },
    released(parent: Track, _args: any, { dataSources }: any, i: any) {
      return parent.released;
    },
    genres(parent: Track, _args: any, { dataSources }: any, i: any) {
      return dataSources.genresAPI.getAllGenresbyIds(parent.genresIds);
    },
  },
  Mutation: {
    createTrack: async (
      _source: any,
      {
        title,
        albumId,
        bandsIds,
        artistsIds,
        duration,
        released,
        genresIds,
      }: any,
      { dataSources }: any,
      context: any
    ) => {
      console.log(
        title,
        albumId,
        bandsIds,
        artistsIds,
        duration,
        released,
        genresIds
      );
      console.log(dataSources.tracksAPI.context.token);
      try {
        if (dataSources.tracksAPI.context.token) {
          const body: Track = await dataSources.tracksAPI.postTrack({
            title,
            albumId,
            bandsIds,
            artistsIds,
            duration,
            released,
            genresIds,
          });
          console.log(`resolver`, body);
          return body;
        } else {
          throw new Error('AutorithationError');
        }
      } catch (err: Error | undefined | any) {
        if (err) {
          console.log('resolver', err);
          return {
            message: err.message,
          };
        }
      }
    },
    updateTrack: async (
      _source: any,
      {
        id,
        title,
        albumId,
        bandsIds,
        artistsIds,
        duration,
        released,
        genresIds,
      }: any,
      { dataSources }: any,
      context: any
    ) => {
      console.log(
        id,
        title,
        albumId,
        bandsIds,
        artistsIds,
        duration,
        released,
        genresIds
      );
      try {
        if (dataSources.tracksAPI.context.token) {
          console.log(dataSources.tracksAPI.context.token);
          const body: Track = await dataSources.tracksAPI.putTrack({
            id: id,
            title: title,
            albumId: albumId,
            bandsIds: bandsIds,
            artistsIds: artistsIds,
            duration: duration,
            released: released,
            genresIds: genresIds,
          });
          console.log(`resolver`, body);
          return body;
        } else {
          throw new Error('AutorithationError');
        }
      } catch (err: Error | undefined | any) {
        if (err) {
          return {
            code: 400,
            success: false,
            message: err.message,
          };
        }
      }
    },
    deleteTrack: async (
      _source: any,
      { id }: any,
      { dataSources }: any,
      context: any
    ) => {
      console.log(id);
      console.log(dataSources.tracksAPI.context.token);

      try {
        if (dataSources.tracksAPI.context.token) {
          const body = await dataSources.tracksAPI.remoweTrack(id);
          console.log(body);
          return {
            acknowledged: body.acknowledged,
            deletedCount: body.deletedCount,
          };
        } else {
          throw new Error('AutorithationError');
        }
      } catch (err: Error | undefined | any) {
        if (err) {
          return {
            acknowledged: false,
            deletedCount: 0,
          };
        }
      }
    },
  },
};
