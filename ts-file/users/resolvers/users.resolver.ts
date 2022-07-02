import console from 'console';
import { User } from '../../interface.js';
export const resolverUsers = {
  Query: {
    jwt: async (
      _source: any,
      { password, email }: any,
      { dataSources }: any
    ) => {
      console.log(password, email);
      console.log(dataSources);

      try {
        const body = await dataSources.usersAPI.loginUser(password, email);
        console.log(body.jwt);
        return {
          JWT: body.jwt,
        };
      } catch (err: Error | undefined | any) {
        if (err) {
          console.error(err);
        }
      }
    },
    user: async (_source: any, { id }: any, { dataSources }: any) => {
      console.log(id);
      console.log(dataSources);

      try {
        const body: User = await dataSources.usersAPI.getUser(id);
        console.log(`resolver`, body);
        return {
          id: body._id,
          firstName: body.firstName,
          lastName: body.lastName,
          password: body.password,
          email: body.email,
        };
      } catch (err: Error | undefined | any) {
        if (err) {
          console.log(err);
        }
      }
    },
  },

  Mutation: {
    register: async (
      _source: any,
      { firstName, lastName, password, email }: any,
      { dataSources }: any
    ) => {
      console.log(firstName, lastName, password, email);
      console.log(dataSources);
      try {
        const body: User = await dataSources.usersAPI.postUser(
          firstName,
          lastName,
          password,
          email
        );
        console.log(`resolver`, body);
        return {
          id: body._id,
          firstName: body.firstName,
          lastName: body.lastName,
          password: body.password,
          email: body.email,
        };
      } catch (err: Error | undefined | any) {
        if (err) {
          console.log(err);
        }
      }
    },
  },
};
