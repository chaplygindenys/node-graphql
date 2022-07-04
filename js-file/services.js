import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchema } from '@graphql-tools/load';
import { resolverUsers } from './users/resolvers/users.resolver.js';
import { resolverTracks } from './tracks/resolvers/tracks.resolver.js';
import { resolverGenres } from './genres/resolvers/ganres.resolver.js';
import { resolverFavourite } from './favourites/resolvers/favourites.resolver.js';
import { resolverBands } from './bands/resolvers/bands.resolver.js';
import { resolverArtist } from './artists/resolvers/artists.resolver.js';
import { resolverAlbum } from './albums/resolvers/albums.resolver.js';
export const typeDefs = await loadSchema('./ts-file/**/*.graphql', {
    loaders: [new GraphQLFileLoader()],
});
export const addTrueId = (obj) => {
    if (obj._id === undefined || obj._id === 'idsad') {
        const { _id } = obj;
        const newObj = { id: _id, ...obj };
        console.log(newObj);
        return newObj;
    }
    else {
        return obj;
    }
};
let Q = {
    ...resolverAlbum.Query,
    ...resolverArtist.Query,
    ...resolverBands.Query,
    ...resolverFavourite.Query,
    ...resolverGenres.Query,
    ...resolverTracks.Query,
    ...resolverUsers.Query,
};
let Band = { ...resolverBands.Band };
let User = { ...resolverUsers.User };
let Track = { ...resolverTracks.Track };
let Genre = { ...resolverGenres.Genre };
let Favourites = { ...resolverFavourite.Favourites };
let Artist = { ...resolverArtist.Artist };
let Album = { ...resolverAlbum.Album };
let M = {
    ...resolverAlbum.Mutation,
    ...resolverArtist.Mutation,
    ...resolverBands.Mutation,
    ...resolverFavourite.Mutation,
    ...resolverGenres.Mutation,
    ...resolverTracks.Mutation,
    ...resolverUsers.Mutation,
};
export const resolvers = {
    Query: Q,
    Band,
    User,
    Track,
    Genre,
    Favourites,
    Artist,
    Album,
    Mutation: M,
};
