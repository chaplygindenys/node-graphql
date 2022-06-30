import { ApolloServer, gql } from 'apollo-server';
import console from 'console';
import { GenresAPI } from './genres/services/genresService.js';
// import { PersonalizationAPI } from './users/modules/model.js';
import { resolvers, typeDefs } from './services.js';
import { TracksAPI } from './tracks/services/trackService.js';
import { UsersAPI } from './users/services/users.services.js';

console.log(typeDefs);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      usersAPI: new UsersAPI() || 'usersAPI',
      tracksAPI: new TracksAPI() || 'traksApi',
      genresAPI: new GenresAPI() || 'genresAPI',
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
