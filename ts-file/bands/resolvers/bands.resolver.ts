// import { RESTDataSource } from 'apollo-datasource-rest';
// import { TracksService } from '../services/track.service.js';
import { GenresAPI } from '../../genres/services/genres.service.js';
// import { ArtistsService } from '../../artists/services/artists.service.js';
// import { BandsService } from '../../bands/services/bands.service.js';
// import {} from 'module';

import { Band } from '../../interface';
import { trueArrMembersFromBandRes } from '../utils/bands.util.js';

// export class TracksResolver extends RESTDataSource {
//   constructor() // private readonly tracksService: TracksService,
//   // private readonly genresService: GenresService,
//   // private readonly artistsService: ArtistsService,
//   // private readonly bandsService: BandsService
//   { super();
//     this.baseURL =}
// }
export const resolverBands = {
  Query: {
    band: async (_source: any, { id }: any, { dataSources }: any) => {
      console.log(id);
      console.log(dataSources);

      try {
        const body: Band = await dataSources.bandsAPI.getBand(id);
        console.log(body);
        return {
          id: body._id,
          name: body.name,
          origin: body.origin,
          members: trueArrMembersFromBandRes(body),
          website: body.website,
          genres: await dataSources.genresAPI.getAllgenresbyIds(body.genresIds),
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
    bands: async (
      _source: any,
      __: any,
      { dataSources }: any,
      context: any
    ) => {
      console.log(dataSources);
      try {
        const body = await dataSources.bandsAPI.getAllBand();
        console.log(`resolver`, body);
        const trueIdforBodyItems = (arr: Band[]) => {
          let goodArr = [];
          for (let index = 0; index < arr.length; index++) {
            const body = arr[index];
            goodArr.push({
              id: body._id,
              name: body.name,
              origin: body.origin,
              members: trueArrMembersFromBandRes(body),
              website: body.website,
              genres: dataSources.genresAPI.getAllgenresbyIds(body.genresIds),
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
    createBand: async (
      _source: any,
      { name, origin, members, website, genresIds }: any,
      { dataSources }: any,
      context: any
    ) => {
      console.log(name, origin, members, website, genresIds);
      console.log(dataSources.bandsAPI.context.token);
      try {
        if (dataSources.bandsAPI.context.token) {
          const body: Band = await dataSources.bandsAPI.postBand({
            name,
            origin,
            members,
            website,
            genresIds,
          });
          console.log(`resolver`, body);
          return {
            id: body._id,
            name: body.name,
            origin: body.origin,
            members: trueArrMembersFromBandRes(body),
            website: body.website,
            genres: await dataSources.genresAPI.getAllgenresbyIds(
              body.genresIds
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
    updateBand: async (
      _source: any,
      { id, name, origin, members, website, genresIds }: any,
      { dataSources }: any,
      context: any
    ) => {
      console.log(id, name, origin, members, website, genresIds);
      try {
        if (dataSources.bandsAPI.context.token) {
          console.log(dataSources.bandsAPI.context.token);
          const body: Band = await dataSources.bandsAPI.putBand({
            id,
            name,
            origin,
            members,
            website,
            genresIds,
          });
          console.log(`resolver`, body);

          return {
            id: body._id,
            name: body.name,
            origin: body.origin,
            members: trueArrMembersFromBandRes(body),
            website: body.website,
            genres: await dataSources.genresAPI.getAllgenresbyIds(
              body.genresIds
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
    deleteBand: async (
      _source: any,
      { id }: any,
      { dataSources }: any,
      context: any
    ) => {
      console.log(id);
      console.log(dataSources.bandsAPI.context.token);

      try {
        if (dataSources.bandsAPI.context.token) {
          const body = await dataSources.bandsAPI.remoweBand(id);
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
