import { ApolloServer } from 'apollo-server';
import console from 'console';
import { ArtistsAPI } from './artists/services/artists.service.js';
import { BandsAPI } from './bands/services/bands.service.js';
import { GenresAPI } from './genres/services/genres.service.js';
// import { PersonalizationAPI } from './users/modules/model.js';
import { TracksAPI } from './tracks/services/trackService.js';
import { UsersAPI } from './users/services/users.services.js';
import { resolvers, typeDefs } from './services.js';
// console.log(typeDefs);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      usersAPI: new UsersAPI() || 'usersAPI',
      tracksAPI: new TracksAPI() || 'traksApi',
      genresAPI: new GenresAPI() || 'genresAPI',
      bandsAPI: new BandsAPI() || 'bandsAPI',
      artistsAPI: new ArtistsAPI() || 'artistsAPI',
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
