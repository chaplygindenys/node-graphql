import { options } from '../../config.js';
import { Artist, Band, BandId, Genre, Member } from '../../interface';

export const resolverBands = {
  Query: {
    band: async (_source: any, { id }: any, { dataSources }: any) => {
      console.log(id);
      console.log(dataSources);

      try {
        const body: BandId = await dataSources.bandsAPI.getBand(id);
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

    allBands: async (
      _source: any,
      { limit, offset }: any,
      { dataSources }: any
    ) => {
      console.log(dataSources.bandsAPI);
      try {
        const body = await dataSources.bandsAPI.getAllBand({
          limit: limit || options.defaultLimit,
          offset: offset || options.defaultOffset,
        });
        console.log(`resolver`, body);
        return body.items;
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
  Member: {
    id(parent: Member, _args: any, { dataSources }: any, i: any) {
      return parent.id;
    },
    firstName(parent: Member, _args: any, { dataSources }: any, i: any) {
      return parent.firstName;
    },
    secondName(parent: Member, _args: any, { dataSources }: any, i: any) {
      return parent.secondName;
    },
    middleName(parent: Member, _args: any, { dataSources }: any, i: any) {
      return parent.middleName;
    },
    instrument(parent: Member, _args: any, { dataSources }: any, i: any) {
      return parent.instrument;
    },
    years(parent: Member, _args: any, { dataSources }: any, i: any) {
      return parent.years;
    },
  },
  Band: {
    id(parent: Band, _args: any, { dataSources }: any, i: any) {
      return parent._id;
    },
    name(parent: Band, _args: any, { dataSources }: any, i: any) {
      return parent.name;
    },
    origin(parent: Band, _args: any, { dataSources }: any, i: any) {
      return parent.origin;
    },
    async members(parent: Band, _args: any, { dataSources }: any, i: any) {
      const getMembers = async (parent: Band, dataSources: any) => {
        let membersWithArtistsFilds = [];
        for (let i = 0; i < parent.members.length; i++) {
          const member: Member = parent.members[i];
          console.log(parent.members[i]);
          if (member.artist) {
            const getMember = async (member: Member, id: string) => {
              const artist: Artist = await dataSources.artistsAPI.getArtist(id);
              console.log('get Member', artist, member.artist);

              return {
                id: id,
                years: member.years,
                instrument: member.instrument,
                middleName: artist.middleName,
                firstName: artist.firstName,
                secondName: artist.secondName,
              };
            };

            membersWithArtistsFilds.push(
              await getMember(member, member.artist)
            );
            return membersWithArtistsFilds;
          } else {
            return null;
          }
        }
      };
      const members = await getMembers(parent, dataSources);
      return members;
    },
    website(parent: Band, _args: any, { dataSources }: any, i: any) {
      return parent.website;
    },
    genres(parent: Band, _args: any, { dataSources }: any, i: any) {
      console.log(parent);
      const res = dataSources.genresAPI.getAllGenresbyIds(parent.genresIds);
      return res;
    },
  },
  Mutation: {
    createBand: async (
      _source: any,
      { name, origin, members, website, genresIds }: any,
      { dataSources }: any
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
