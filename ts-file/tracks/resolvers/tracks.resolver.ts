// import { RESTDataSource } from 'apollo-datasource-rest';
// import { TracksService } from '../services/track.service.js';
// import { GenresService } from '../../genres/services/genres.services.js';
// import { ArtistsService } from '../../artists/services/artists.service.js';
// import { BandsService } from '../../bands/services/bands.service.js';
// import {} from 'module';

import { Track } from '../../interface';

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
    track: async (
      _source: any,
      { id }: any,
      { dataSources }: any,
      context: any
    ) => {
      console.log(id);
      console.log(dataSources);

      try {
        const body: Track = await dataSources.tracksAPI.getTrack(id);
        console.log(body);
        return {
          code: 200,
          success: true,
          message: ' get Track!',
          track: {
            id: body._id,
            title: body.title,
            albums: body.albumId,
            bands: body.bandsIds,
            duration: body.duration,
            released: body.released,
            genres: body.genresIds,
          },
        };
      } catch (err: Error | undefined | any) {
        if (err) {
          console.error(err);
          return {
            code: 400,
            success: false,
            message: err.message,
          };
        }
      }
    },
    tracks: async (
      _source: any,
      __: any,
      { dataSources }: any,
      context: any
    ) => {
      console.log(dataSources);
      // console.log(context);
      try {
        const body = await dataSources.tracksAPI.getAllTrack();
        console.log(`resolver`, body);
        return {
          code: 200,
          success: true,
          message: 'get allTracks!',
          user: {
            tracks: body.tracks,
          },
        };
      } catch (err: Error | undefined | any) {
        if (err) {
          console.log(err);
          return {
            code: 400,
            success: false,
            message: err.message,
          };
        }
      }
    },
  },

  Mutation: {
    updateTrack: async (
      _source: any,
      { id, Track: { title, albums, bands, duration, released, genres } }: any,
      { dataSources }: any,
      context: any
    ) => {
      console.log(id, {
        title,
        albums,
        bands,
        duration,
        released,
        genres,
      });
      console.log(dataSources);
      // console.log(context);
      try {
        if (dataSources.context.token) {
          console.log(dataSources.context.token);
          const body: Track = await dataSources.tracksAPI.putTrack(id, {
            title,
            albums,
            bands,
            duration,
            released,
            genres,
          });
          console.log(`resolver`, body);
          return {
            code: 200,
            success: true,
            message: 'User successfully updated!',
            track: {
              id: body._id,
              title: body.title,
              albums: body.albumId,
              bands: body.bandsIds,
              duration: body.duration,
              released: body.released,
              genres: body.genresIds,
            },
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
          const code: number = await dataSources.tracksAPI.remoweTrack(id);
          console.log(code);
          return {
            code: 204,
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
    createTrack: async (
      _source: any,
      // { title, albumId, bandsIds, duration, released, genresIds }: Track,
      track: Track,
      { dataSources }: any,
      context: any
    ) => {
      console.log(
        // title, albumId, bandsIds, duration, released, genresIds
        track
      );
      console.log(dataSources.tracksAPI.context.token);
      try {
        if (dataSources.tracksAPI.context.token) {
          const body: Track = await dataSources.tracksAPI.postTrack(
            // title,
            // albumId,
            // bandsIds,
            // duration,
            // released,
            // genresIds
            track
          );
          console.log(`resolver`, body);
          return {
            code: 201,
            success: true,
            message: 'User successfully created!',
            track: {
              id: body._id,
              title: body.title,
              albums: body.albumId,
              bands: body.bandsIds,
              duration: body.duration,
              released: body.released,
              genres: body.genresIds,
            },
          };
        } else {
          throw new Error('AutorithationError');
        }
      } catch (err: Error | undefined | any) {
        if (err) {
          console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEE', err);
          return {
            code: 400,
            success: false,
            message: err.message,
          };
        }
      }
    },
  },
};
