import { ApolloServer } from 'apollo-server';
import console from 'console';
import { resolvers, typeDefs } from './services.js';
import { ArtistsAPI } from './artists/services/artists.service.js';
import { BandsAPI } from './bands/services/bands.service.js';
import { GenresAPI } from './genres/services/genres.service.js';
import { FavouritesAPI } from './favourites/services/favourites.service.js';
import { TracksAPI } from './tracks/services/trackService.js';
import { UsersAPI } from './users/services/users.services.js';
import { AlbumsAPI } from './albums/services/albums.service.js';
import moment from 'moment';
// import { PersonalizationAPI } from './users/modules/model.js';
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
      albumsAPI: new AlbumsAPI() || 'albumsAPI',
      favouritesAPI: new FavouritesAPI() || 'favouritesAPI',
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
    console.log(`🚀 ${console.log(moment(Date.now()))} Server ready at ${url}`);
  })
  .catch((err) => {
    console.error(err);
  });
