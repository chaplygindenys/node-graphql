import { options } from '../../config.js';
import { Favorite } from '../../interface.js';

export const resolverFavourite = {
  Query: {
    favourite: async (_source: any, __: any, { dataSources }: any) => {
      console.log(dataSources.favouritesAPI);

      try {
        if (dataSources.favouritesAPI.context.token) {
          console.log(dataSources.favouritesAPI.context.token);
          const body = await dataSources.favouritesAPI.getAllFavourite();
          console.log(`resolver`, body);
          return body;
        } else {
          throw new Error('AutorithationError');
        }
      } catch (err: Error | undefined | any) {
        if (err) {
          console.log(err);
        }
      }
    },
  },
  Favourites: {
    id(parent: Favorite, _args: any, { dataSources }: any, i: any) {
      return parent._id;
    },
    userId(parent: Favorite, _args: any, { dataSources }: any, i: any) {
      return parent.userId;
    },
    bands(parent: Favorite, _args: any, { dataSources }: any, i: any) {
      return dataSources.bandsAPI.getAllBandsbyIds(parent.bandsIds);
    },
    genres(parent: Favorite, _args: any, { dataSources }: any, i: any) {
      return dataSources.genresAPI.getAllGenresbyIds(parent.genresIds);
    },
    artists(parent: Favorite, _args: any, { dataSources }: any, i: any) {
      return dataSources.artistsAPI.getAllArtistsbyIds(parent.artistsIds);
    },
    tracks(parent: Favorite, _args: any, { dataSources }: any, i: any) {
      return dataSources.tracksAPI.getAllTracksbyIds(parent.tracksIds);
    },
  },
  Mutation: {
    createFavourite: async (
      _source: any,
      { type, typeId }: any,
      { dataSources }: any
    ) => {
      console.log(type, typeId);
      console.log(dataSources.favouritesAPI.context.token);

      try {
        if (dataSources.favouritesAPI.context.token) {
          console.log(dataSources.favouritesAPI.context.token);
          const body: Favorite =
            await dataSources.favouritesAPI.putAddFavourite({
              type: type,
              id: typeId,
            });
          console.log(`resolver`, body);
          return body;
        } else {
          throw new Error('AutorithationError');
        }
      } catch (err: Error | undefined | any) {
        if (err) {
          console.log(err);
        }
      }
    },
    deleteFavourite: async (
      _source: any,
      { type, typeId }: any,
      { dataSources }: any
    ) => {
      console.log(type, typeId);
      console.log(dataSources.favouritesAPI.context.token);

      try {
        if (dataSources.favouritesAPI.context.token) {
          const body = await dataSources.favouritesAPI.putRemoveFavourite({
            type: type,
            id: typeId,
          });
          console.log('resolver: ', body);
          return {
            acknowledged: body.acknowledged,
            deletedCount: body.deletedCount,
          };
        } else {
          throw new Error('AutorithationError');
        }
      } catch (err: Error | undefined | any) {
        if (err) {
          console.log(err);
        }
      }
    },
  },
};
