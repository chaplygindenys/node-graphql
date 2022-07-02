// import { RESTDataSource } from 'apollo-datasource-rest';
// import { TracksService } from '../services/track.service.js';
// import { GenresService } from '../../genres/services/genres.services.js';
// import { ArtistsService } from '../../artists/services/artists.service.js';
// import { BandsService } from '../../bands/services/bands.service.js';
// import {} from 'module';

import { options } from '../../config.js';
import { Genre } from '../../interface.js';

export const resolverGenres = {
  Query: {
    genres: async (
      _source: any,
      { offset, limit }: any,
      { dataSources }: any,
      context: any
    ) => {
      console.log(dataSources);
      console.log(offset, limit);
      try {
        const body = await dataSources.genresAPI.getAllGenre({
          offset: offset || options.defaultOffset,
          limit: limit || options.defaultOffset,
        });
        console.log(`resolver`, body);
        const trueIdforBodyItems = (arr: Genre[]) => {
          let goodArr = [];
          for (let index = 0; index < arr.length; index++) {
            const body = arr[index];
            goodArr.push({
              id: body._id,
              name: body.name,
              description: body.description,
              country: body.country,
              year: body.year,
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
            code: 400,
            success: false,
            message: err.message,
          };
        }
      }
    },
    genre: async (
      _source: any,
      { id }: any,
      { dataSources }: any,
      context: any
    ) => {
      console.log(id);
      console.log(dataSources);

      try {
        const body: Genre = await dataSources.genresAPI.getGenre(id);
        console.log('resolver: ', body);
        return {
          id: body._id,
          name: body.name,
          description: body.description,
          country: body.country,
          year: body.year,
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
  },
  Mutation: {
    createGenre: async (
      _source: any,
      { name, description, country, year }: Genre,
      { dataSources }: any,
      context: any
    ) => {
      console.log(name, description, country, year);
      console.log(dataSources.genresAPI.context.token);
      // console.log(context);
      try {
        if (dataSources.genresAPI.context.token) {
          console.log(dataSources.genresAPI.context.token);
          const body = await dataSources.genresAPI.postGenre({
            name,
            description,
            country,
            year,
          });
          console.log(`resolver`, body.items);
          return {
            id: body._id,
            name: body.name,
            description: body.description,
            country: body.country,
            year: body.year,
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
    updateGenre: async (
      _source: any,
      { id, name, description, country, year }: any,
      { dataSources }: any,
      context: any
    ) => {
      console.log(id, { name, description, country, year });
      console.log(dataSources.genresAPI);
      // console.log(context);
      try {
        if (dataSources.genresAPI.context.token) {
          console.log(dataSources.genresAPI.context.token);
          const body = await dataSources.genresAPI.putGenre(id, {
            name,
            description,
            country,
            year,
          });
          console.log(`resolver`, body.items);
          return {
            id: body._id,
            name: body.name,
            description: body.description,
            country: body.country,
            year: body.year,
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
    deleteGenre: async (
      _source: any,
      { id }: any,
      { dataSources }: any,
      context: any
    ) => {
      console.log(id);
      console.log(dataSources.genresAPI.context.token);

      try {
        if (dataSources.genresAPI.context.token) {
          const body = await dataSources.genresAPI.remoweGenre(id);
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
