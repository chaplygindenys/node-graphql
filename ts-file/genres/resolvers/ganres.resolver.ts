import { options } from '../../config.js';
import { Genre, GenreId } from '../../interface.js';

export const resolverGenres = {
  Query: {
    allGenres: async (
      _source: any,
      { offset, limit }: any,
      { dataSources }: any
    ) => {
      console.log(dataSources);
      console.log(offset, limit);
      try {
        const body = await dataSources.genresAPI.getAllGenre({
          offset: offset || options.defaultOffset,
          limit: limit || options.defaultOffset,
        });
        console.log(`resolver`, body);

        return body.items;
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
    genre: async (_source: any, { id }: any, { dataSources }: any) => {
      console.log(id);
      console.log(dataSources);

      try {
        const body: GenreId = await dataSources.genresAPI.getGenre(id);
        console.log('resolver: ', body);
        return body;
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
  Genre: {
    id(parent: Genre, _args: any, { dataSources }: any, i: any) {
      return parent._id;
    },
    name(parent: Genre, _args: any, { dataSources }: any, i: any) {
      return parent.name;
    },
    description(parent: Genre, _args: any, { dataSources }: any, i: any) {
      return parent.description;
    },
    country(parent: Genre, _args: any, { dataSources }: any, i: any) {
      return parent.country;
    },
    year(parent: Genre, _args: any, { dataSources }: any, i: any) {
      return parent.year;
    },
  },
  Mutation: {
    createGenre: async (
      _source: any,
      { name, description, country, year }: Genre,
      { dataSources }: any
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
};
