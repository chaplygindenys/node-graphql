import console from 'console';
import { BodyUser, User } from '../../interface.js';
// import { TracksService } from '../services/track.service.js';
// import { GenresService } from '../../genres/services/genres.services.js';
// import { ArtistsService } from '../../artists/services/artists.service.js';
// import { BandsService } from '../../bands/services/bands.service.js';
export const resolverUsers = {
  Query: {
    jwt: async (
      _source: any,
      { password, email }: any,
      { dataSources }: any,
      context: any
    ) => {
      console.log(password, email);
      console.log(dataSources);

      try {
        const body = await dataSources.usersAPI.loginUser(password, email);
        console.log(body.jwt);
        return {
          code: 200,
          success: true,
          message: 'User successfully created!',
          JWT: body.jwt,
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
    user: async (
      _source: any,
      { id }: any,
      { dataSources }: any,
      context: any
    ) => {
      console.log(id);
      console.log(dataSources);
      // console.log(context);
      try {
        const body: User = await dataSources.usersAPI.getUser(id);
        console.log(`resolver`, body);
        return {
          code: 200,
          success: true,
          message: 'User successfully created!',
          user: {
            id: body._id,
            firstName: body.firstName,
            lastName: body.lastName,
            password: body.password,
            email: body.email,
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
    register: async (
      _source: any,
      { firstName, lastName, password, email }: any,
      { dataSources }: any,
      context: any
    ) => {
      console.log(firstName, lastName, password, email);
      console.log(dataSources);
      // console.log(context);
      try {
        const body: User = await dataSources.usersAPI.postUser(
          firstName,
          lastName,
          password,
          email
        );
        console.log(`resolver`, body);
        return {
          code: 201,
          success: true,
          message: 'User successfully created!',
          user: {
            id: body._id,
            firstName: body.firstName,
            lastName: body.lastName,
            password: body.password,
            email: body.email,
          },
        };
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
