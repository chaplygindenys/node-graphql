import console from 'console';
import e from 'express';
import { BodyUser, User } from '../../interface.js';
import { UsersAPI } from '../services/users.services.js';
// import { TracksService } from '../services/track.service.js';
// import { GenresService } from '../../genres/services/genres.services.js';
// import { ArtistsService } from '../../artists/services/artists.service.js';
// import { BandsService } from '../../bands/services/bands.service.js';
export const resolvers = {
  Query: {
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
    // returns an array of Tracks that will be used to populate the homepage grid of our web client
    verify: async (_: any, __: any, ___: any, { UsersSource, token }: any) => {
      console.log(UsersSource);
      console.log(token);
      try {
        const user = await UsersSource.verifyUser(token);
        console.log(user);
        return {
          code: 200,
          success: true,
          message: 'User successfully created!',
          User: user,
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
    login: async (
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
    createUser: async (
      _: any,
      __: any,
      { bodyUser }: any,
      { UsersSource, token }: any
    ) => {
      console.log(_);
      console.log(__);
      console.log(bodyUser);
      console.log(UsersSource);
      console.log(token);
      try {
        const newUser = await UsersSource.postUser(bodyUser);
        console.log(newUser);
        return {
          code: 201,
          success: true,
          message: 'User successfully created!',
          User: newUser,
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
