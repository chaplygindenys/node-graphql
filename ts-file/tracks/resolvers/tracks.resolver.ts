// import { RESTDataSource } from 'apollo-datasource-rest';
// import { TracksService } from '../services/track.service.js';
// import { GenresService } from '../../genres/services/genres.services.js';
// import { ArtistsService } from '../../artists/services/artists.service.js';
// import { BandsService } from '../../bands/services/bands.service.js';
// import {} from 'module';

import { Track } from '../../interface';
import { addTrueId } from '../../services';

// export class TracksResolver extends RESTDataSource {
//   constructor() // private readonly tracksService: TracksService,
//   // private readonly genresService: GenresService,
//   // private readonly artistsService: ArtistsService,
//   // private readonly bandsService: BandsService
//   { super();
//     this.baseURL =}
// }
export const resolverTracks = {
  Query: {
    Track: async (_source: any, { id }: any, { dataSources }: any) => {
      console.log(id);
      console.log(dataSources);

      try {
        const body: Track = await dataSources.tracksAPI.getTrack(id);
        console.log(body);
        return {
          id: body._id,
          title: body.title,
          albums: addTrueId(dataSources.albumsAPI.getAlbum(body.albumId)),
          bands: dataSources.bandsAPI.getAllBandsbyIds(body.bandsIds),
          duration: body.duration,
          released: body.released,
          genres: dataSources.genresAPI.getAllGenresbyIds(body.genresIds),
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
    Tracks: async (
      _source: any,
      __: any,
      { dataSources }: any,
      context: any
    ) => {
      console.log(dataSources);
      try {
        const body = await dataSources.tracksAPI.getAllTrack();
        console.log(`resolver`, body);
        const trueIdforBodyItems = (arr: Track[]) => {
          let goodArr = [];
          for (let index = 0; index < arr.length; index++) {
            const body = arr[index];
            goodArr.push({
              id: body._id,
              title: body.title,
              albums: addTrueId(dataSources.albumsAPI.getAlbum(body.albumId)),
              bands: dataSources.bandsAPI.getAllBandsbyIds(body.bandsIds),
              duration: body.duration,
              released: body.released,
              genres: dataSources.genresAPI.getAllGenresbyIds(body.genresIds),
            });
          }
          console.log(goodArr);
          return goodArr;
        };
        return trueIdforBodyItems(body.items);
      } catch (err: Error | undefined | any) {
        if (err) {
          console.log(err);
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
            albums: addTrueId(dataSources.albumsAPI.getAlbum(body.albumId)),
            bands: dataSources.bandsAPI.getAllBandsbyIds(body.bandsIds),
            duration: body.duration,
            released: body.released,
            genres: dataSources.genresAPI.getAllGenresbyIds(body.genresIds),
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
            albums: addTrueId(dataSources.albumsAPI.getAlbum(body.albumId)),
            bands: dataSources.bandsAPI.getAllBandsbyIds(body.bandsIds),
            duration: body.duration,
            released: body.released,
            genres: dataSources.genresAPI.getAllGenresbyIds(body.genresIds),
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
