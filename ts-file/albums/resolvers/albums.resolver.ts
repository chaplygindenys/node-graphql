import { options } from '../../config.js';
import { Album, AlbumId } from '../../interface.js';

export const resolverAlbum = {
  Query: {
    allAlbums: async (
      _source: any,
      { offset, limit }: any,
      { dataSources }: any
    ) => {
      console.log(dataSources.albumsAPI);
      console.log(offset, limit);
      try {
        const body = await dataSources.albumsAPI.getAllAlbum({
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
    album: async (_source: any, { id }: any, { dataSources }: any) => {
      console.log('in resolver albums ', id);
      console.log(dataSources);

      try {
        const body: AlbumId = await dataSources.albumsAPI.getAlbum(id);
        console.log('resolver: ', body);
        return body;
      } catch (err: Error | undefined | any) {
        if (err) {
          console.error(err);
        }
      }
    },
  },
  Album: {
    id(parent: Album, _args: any, { dataSources }: any, i: any) {
      return parent._id;
    },
    name(parent: Album, _args: any, { dataSources }: any, i: any) {
      return parent.name;
    },
    released(parent: Album, _args: any, { dataSources }: any, i: any) {
      return parent.released;
    },
    artists(parent: Album, _args: any, { dataSources }: any, i: any) {
      return dataSources.artistsAPI.getAllArtistsbyIds(parent.artistsIds);
    },
    bands(parent: Album, _args: any, { dataSources }: any, i: any) {
      return dataSources.bandsAPI.getAllBandsbyIds(parent.bandsIds);
    },
    tracks(parent: Album, _args: any, { dataSources }: any, i: any) {
      return dataSources.tracksAPI.getAllTracksbyIds(parent.trackIds);
    },
    genres(parent: Album, _args: any, { dataSources }: any, i: any) {
      return dataSources.genresAPI.getAllGenresbyIds(parent.genresIds);
    },
  },

  Mutation: {
    createAlbum: async (
      _source: any,
      { name, released, artistsIds, bandsIds, trackIds, genresIds }: Album,
      { dataSources }: any,
      context: any
    ) => {
      console.log(name, released, artistsIds, bandsIds, trackIds, genresIds);
      console.log(dataSources.albumsAPI.context.token);
      // console.log(context);
      try {
        if (dataSources.albumsAPI.context.token) {
          console.log(dataSources.albumsAPI.context.token);
          const body = await dataSources.albumsAPI.postAlbum({
            name,
            released,
            artistsIds,
            bandsIds,
            trackIds,
            genresIds,
          });
          console.log(`resolver`, body.items);
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
    updateAlbum: async (
      _source: any,
      { id, name, released, artistsIds, bandsIds, trackIds, genresIds }: any,
      { dataSources }: any,
      context: any
    ) => {
      console.log(id, {
        name,
        released,
        artistsIds,
        bandsIds,
        trackIds,
        genresIds,
      });
      console.log(dataSources.albumsAPI);
      // console.log(context);
      try {
        if (dataSources.albumsAPI.context.token) {
          console.log(dataSources.albumsAPI.context.token);
          const body = await dataSources.albumsAPI.putAlbum(id, {
            name,
            released,
            artistsIds,
            bandsIds,
            trackIds,
            genresIds,
          });
          console.log(`resolver`, body.items);
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
    deleteAlbum: async (_source: any, { id }: any, { dataSources }: any) => {
      console.log(id);
      console.log(dataSources.albumsAPI.context.token);

      try {
        if (dataSources.albumsAPI.context.token) {
          const body = await dataSources.albumsAPI.remoweAlbum(id);
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
