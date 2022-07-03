import { options } from '../../config.js';
import { Track, TrackId } from '../../interface';

export const resolverTracks = {
  Query: {
    tracks: async (
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
        const trueIdforBodyItems = (arr: Track[]) => {
          let goodArr = [];
          for (let index = 0; index < arr.length; index++) {
            const body = arr[index];
            goodArr.push({
              id: body._id,
              title: body.title,
              duration: body.duration,
              released: body.released,
              album: dataSources.albumsAPI.getAlbum(body.albumId, dataSources),
              bands: dataSources.bandsAPI.getAllBandsbyIds(
                body.bandsIds,
                dataSources
              ),
              genres: dataSources.genresAPI.getAllGenresbyIds(
                body.genresIds,
                dataSources
              ),
              artists: dataSources.artistsAPI.getAllArtistsbyIds(
                body.artistsIds,
                dataSources
              ),
            });
          }
          console.log(goodArr);
          return goodArr;
        };
        return trueIdforBodyItems(body.items);
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
        const body: any = await dataSources.tracksAPI.getTrack(id, dataSources);
        console.log(body);
        return {
          id: body.id,
          title: body.title,
          duration: body.duration,
          released: body.released,
          album: body.album,
          bands: body.bands,
          genres: body.genres,
          artists: body.artists,
        };
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
          return {
            id: body._id,
            title: body.title,
            duration: body.duration,
            released: body.released,
            album: dataSources.albumsAPI.getAlbum(body.albumId, dataSources),
            bands: dataSources.bandsAPI.getAllBandsbyIds(
              body.bandsIds,
              dataSources
            ),
            genres: dataSources.genresAPI.getAllGenresbyIds(
              body.genresIds,
              dataSources
            ),
            artists: dataSources.artistsAPI.getAllArtistsbyIds(
              body.artistsIds,
              dataSources
            ),
          };
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
          return {
            id: body._id,
            title: body.title,
            duration: body.duration,
            released: body.released,
            album: dataSources.albumsAPI.getAlbum(body.albumId, dataSources),
            bands: dataSources.bandsAPI.getAllBandsbyIds(
              body.bandsIds,
              dataSources
            ),
            genres: dataSources.genresAPI.getAllGenresbyIds(
              body.genresIds,
              dataSources
            ),
            artists: dataSources.artistsAPI.getAllArtistsbyIds(
              body.artistsIds,
              dataSources
            ),
          };
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
