// import { RESTDataSource } from 'apollo-datasource-rest';
// import { TracksService } from '../services/track.service.js';
// import { GenresService } from '../../genres/services/genres.services.js';
// import { ArtistsService } from '../../artists/services/artists.service.js';
// import { BandsService } from '../../bands/services/bands.service.js';
// import {} from 'module';

import { Genre } from '../../interface';

// export class TracksResolver extends RESTDataSource {
//   constructor() // private readonly tracksService: TracksService,
//   // private readonly genresService: GenresService,
//   // private readonly artistsService: ArtistsService,
//   // private readonly bandsService: BandsService
//   { super();
//     this.baseURL =}
// }
export const resolverGanres = {
  Query: {
    genres: async (
      _source: any,
      __: any,
      { dataSources }: any,
      context: any
    ) => {
      console.log(dataSources);
      // console.log(context);
      try {
        const body = await dataSources.genresAPI.getAllGenre();
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
      console.log(body);
      return {
        code: 200,
        success: true,
        message: ' get Ganre  !',
        genre: {
          id: body._id,
          name: body.name,
          description: body.description,
          country: body.country,
          year: body.year,
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

  Mutation: {
    createGenre: async (
      _source: any,
      { name, description, country, year }: Genre,
      { dataSources }: any,
      context: any
    ) => {
      console.log(name, description, country, year);
      console.log(dataSources);
      // console.log(context);
      try {
        if (dataSources.context.token) {
          console.log(dataSources.context.token);
          const body = await dataSources.genresAPI.postGenre(
            name,
            description,
            country,
            year
          );
          console.log(`resolver`, body.items);
          return body.items;
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
      { id, Genre: { name, description, country, year } }: any,
      { dataSources }: any,
      context: any
    ) => {
      console.log(id, { name, description, country, year });
      console.log(dataSources);
      // console.log(context);
      try {
        if (dataSources.context.token) {
          console.log(dataSources.context.token);
          const body = await dataSources.genresAPI.putGenre(id, {
            name,
            description,
            country,
            year,
          });
          console.log(`resolver`, body.items);
          return body.items;
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
          console.log(body);
          return body.items;
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
