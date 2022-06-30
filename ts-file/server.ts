import { ApolloServer, gql } from 'apollo-server';
// import { PersonalizationAPI } from './users/modules/model.js';
import { resolvers, typeDefs } from './services.js';
import { TracksAPI } from './tracks/services/trackService.js';
import { UsersAPI } from './users/services/users.services.js';
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      usersAPI: new UsersAPI() || '2112431423132',
      tracksAPI: new TracksAPI() || 'traksApi',
      // personalizationAPI: new PersonalizationAPI(),
    };
  },
  context: ({ req }) => {
    return { token: req.headers.authorization || '' };
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
