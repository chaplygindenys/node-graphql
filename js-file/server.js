import { ApolloServer } from 'apollo-server';
import 'dotenv/config';
import { resolvers, typeDefs } from './services.js';
import { ArtistsAPI } from './artists/services/artists.service.js';
import { BandsAPI } from './bands/services/bands.service.js';
import { GenresAPI } from './genres/services/genres.service.js';
import { FavouritesAPI } from './favourites/services/favourites.service.js';
import { TracksAPI } from './tracks/services/trackService.js';
import { UsersAPI } from './users/services/users.services.js';
import { AlbumsAPI } from './albums/services/albums.service.js';
import moment from 'moment';
const PORT = process.env.PORT || 4000;
const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    dataSources: () => {
        return {
            usersAPI: new UsersAPI() || 'usersAPI',
            tracksAPI: new TracksAPI() || 'traksApi',
            genresAPI: new GenresAPI() || 'genresAPI',
            bandsAPI: new BandsAPI() || 'bandsAPI',
            artistsAPI: new ArtistsAPI() || 'artistsAPI',
            albumsAPI: new AlbumsAPI() || 'albumsAPI',
            favouritesAPI: new FavouritesAPI() || 'favouritesAPI',
        };
    },
    context: ({ req }) => {
        return { token: req.headers.authorization || '' };
    },
});
server
    .listen({ port: PORT })
    .then(({ url }) => {
    console.log(`🚀 ${console.log(moment(Date.now()))} Server ready at ${url}`);
})
    .catch((err) => {
    console.error(err);
});
