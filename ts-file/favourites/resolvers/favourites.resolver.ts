import { options } from '../../config.js';
import { Favorite } from '../../interface.js';

export const resolverFavourite = {
  Query: {
    favourites: async (
      _source: any,
      { offset, limit }: any,
      { dataSources }: any
    ) => {
      console.log(dataSources.favouritesAPI);
      console.log(offset, limit);
      try {
        if (dataSources.favouritesAPI.context.token) {
          console.log(dataSources.favouritesAPI.context.token);
          const body = await dataSources.favouritesAPI.getAllFavourite({
            offset: offset || options.defaultOffset,
            limit: limit || options.defaultOffset,
          });
          console.log(`resolver`, body);
          const trueIdforBodyItems = (arr: Favorite[]) => {
            let goodArr = [];
            for (let index = 0; index < arr.length; index++) {
              const body = arr[index];
              goodArr.push({
                id: body._id,
                userId: body.userId,
                artists: dataSources.artistsAPI.getAllArtistsbyIds(
                  body.artistsIds
                ),
                bands: dataSources.bandsAPI.getAllBandsbyIds(body.bandsIds),
                tracks: dataSources.tracksAPI.getAllTracksbyIds(body.tracksIds),
                genres: dataSources.genresAPI.getAllGenresbyIds(body.genresIds),
              });
            }
            console.log(goodArr);
            return goodArr;
          };
          return trueIdforBodyItems(body.items);
        } else {
          throw new Error('AutorithationError');
        }
      } catch (err: Error | undefined | any) {
        if (err) {
          console.log(err);
        }
      }
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
            const body = await dataSources.favouritesAPI.putAddFavourite({
              type: type,
              id: typeId,
            });
            console.log(`resolver`, body.items);
            return {
              id: body._id,
              userId: body.userId,
              artists: dataSources.artistsAPI.getAllArtistsbyIds(
                body.artistsIds
              ),
              bands: dataSources.bandsAPI.getAllBandsbyIds(body.bandsIds),
              tracks: dataSources.tracksAPI.getAllTracksbyIds(body.tracksIds),
              genres: dataSources.genresAPI.getAllGenresbyIds(body.genresIds),
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
  },
};
