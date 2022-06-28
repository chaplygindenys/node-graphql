import { ApolloServer, gql } from 'apollo-server';
import { createReadStream, readFileSync } from 'fs';
import { readFile } from 'fs/promises';
import { createRequire } from 'module';
import { cwd } from 'process';
import { pipeline } from 'stream';
import { buffer } from 'stream/consumers';
import { PersonalizationAPI } from './users/modules/model.js';
import { resolvers } from './users/resolvers/resolver.js';
import { UsersAPI } from './users/services/users.services.js';

export const read = async (path: string) => {
  try {
    const controller = new AbortController();
    const signal = await controller.signal;
    const promise = readFile(path, { signal });
    const str = await promise;
    controller.abort();
    return str.toString('utf8');
  } catch (err) {
    if (err) {
      console.error(err);
    }
  }
};
const data = await read('./ts-file/users/shemas/user.graphql');
const typeDefs = gql(data ? data : '1');
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      usersAPI: new UsersAPI() || '2112431423132',
      personalizationAPI: new PersonalizationAPI(),
    };
  },
  context: ({ req }) => {
    return { token: req.headers.authorization || 'auth_token' };
  },
});

server
  .listen()
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  })
  .catch((err) => {
    console.error(err);
  });
