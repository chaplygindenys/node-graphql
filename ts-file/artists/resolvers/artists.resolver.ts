import { options } from '../../config.js';
import { Artist, ArtistId } from '../../interface.js';

export const resolverArtist = {
  Query: {
    allArtists: async (
      _source: any,
      { offset, limit }: any,
      { dataSources }: any
    ) => {
      console.log(dataSources.artistsAPI);
      console.log(offset, limit);
      try {
        const body = await dataSources.artistsAPI.getAllArtist({
          offset: offset || options.defaultOffset,
          limit: limit || options.defaultOffset,
        });
        console.log(`resolver`, body);
        return body.items;
      } catch (err: Error | undefined | any) {
        if (err) {
          console.log(err);
        }
      }
    },
    artist: async (_source: any, { id }: any, { dataSources }: any) => {
      console.log(id);
      console.log(dataSources.artistsAPI);

      try {
        const body: ArtistId = await dataSources.artistsAPI.getArtist(id);
        console.log('resolver: ', body);
        return body;
      } catch (err: Error | undefined | any) {
        if (err) {
          console.error(err);
        }
      }
    },
  },
  Artist: {
    id(parent: Artist, _args: any, { dataSources }: any, i: any) {
      return parent._id;
    },
    firstName(parent: Artist, _args: any, { dataSources }: any, i: any) {
      return parent.firstName;
    },
    secondName(parent: Artist, _args: any, { dataSources }: any, i: any) {
      return parent.secondName;
    },
    middleName(parent: Artist, _args: any, { dataSources }: any, i: any) {
      return parent.middleName;
    },
    birthDate(parent: Artist, _args: any, { dataSources }: any, i: any) {
      return parent.birthDate;
    },
    birthPlace(parent: Artist, _args: any, { dataSources }: any, i: any) {
      return parent.birthDate;
    },
    country(parent: Artist, _args: any, { dataSources }: any, i: any) {
      return parent.birthDate;
    },
    bands(parent: Artist, _args: any, { dataSources }: any, i: any) {
      return dataSources.bandsAPI.getAllBandsbyIds(parent.bandsIds);
    },
    instruments(parent: Artist, _args: any, { dataSources }: any, i: any) {
      return parent.instruments;
    },
  },
  Mutation: {
    createArtist: async (
      _source: any,
      {
        firstName,
        secondName,
        middleName,
        birthDate,
        birthPlace,
        country,
        bandsIds,
        instruments,
      }: Artist,
      { dataSources }: any,
      context: any
    ) => {
      console.log(
        firstName,
        secondName,
        middleName,
        new Date(Date.parse(birthDate)),
        birthPlace,
        country,
        bandsIds,
        instruments
      );
      console.log(dataSources.artistsAPI.context.token);
      // console.log(context);
      try {
        if (dataSources.artistsAPI.context.token) {
          console.log(dataSources.artistsAPI.context.token);
          const body = await dataSources.artistsAPI.postArtist({
            firstName,
            secondName,
            middleName,
            birthDate,
            birthPlace,
            country,
            bandsIds,
            instruments,
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
    updateArtist: async (
      _source: any,
      {
        id,
        firstName,
        secondName,
        middleName,
        birthDate,
        birthPlace,
        country,
        bandsIds,
        instruments,
      }: any,
      { dataSources }: any
    ) => {
      console.log(id, {
        firstName,
        secondName,
        middleName,
        birthDate,
        birthPlace,
        country,
        bandsIds,
        instruments,
      });
      console.log(dataSources.artistsAPI);
      // console.log(context);
      try {
        if (dataSources.artistsAPI.context.token) {
          console.log(dataSources.artistsAPI.context.token);
          const body = await dataSources.artistsAPI.putArtist(id, {
            firstName,
            secondName,
            middleName,
            birthDate,
            birthPlace,
            country,
            bandsIds,
            instruments,
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
    deleteArtist: async (
      _source: any,
      { id }: any,
      { dataSources }: any,
      context: any
    ) => {
      console.log(id);
      console.log(dataSources.artistsAPI.context.token);

      try {
        if (dataSources.artistsAPI.context.token) {
          const body = await dataSources.artistsAPI.remoweArtist(id);
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
