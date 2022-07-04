import { readFile } from 'fs/promises';
import { gql } from 'apollo-server-core';
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
  // load files and merge them into a single schema object
  loaders: [new GraphQLFileLoader()],
});

export const addTrueId = (obj: { _id: string }) => {
  if (obj._id === undefined || obj._id === 'idsad') {
    const { _id }: any = obj;
    const newObj = { id: _id, ...obj };
    console.log(newObj);
    return newObj;
  } else {
    return obj;
  }
};
// export const read = async (path: string) => {
//   try {
//     const controller = new AbortController();
//     const signal = await controller.signal;
//     const promise = readFile(path, { signal });
//     const str = await promise;
//     controller.abort();
//     return str.toString('utf8');
//   } catch (err) {
//     if (err) {
//       console.error(err);
//     }
//   }
// };
// const shemasUser = await read('./ts-file/users/shemas/user.graphql');
// const shemasTrack = await read('./ts-file/tracks/schemas/track.graphql');
// const shemasGanre = await read('./ts-file/genres/schemas/genre.graphql');
// const shemasFavorites = await read(
//   './ts-file/favourites/schemas/favorites.graphql'
// );
// const shemasBand = await read('./ts-file/bands/schemas/bands.graphql');
// const shemasArtists = await read('./ts-file/artists/schemas/artists.graphql');
// const shemasAlbums = await read('./ts-file/albums/schemas/albums.graphql');

// // console.log(
// //   shemasUser,
// //   shemasTrack,
// //   shemasGanre,
// //   shemasFavorites,
// //   shemasBand,
// //   shemasArtists,
// //   shemasAlbums
// // );

// export const typeDefs = gql(
//   shemasTrack &&
//     shemasUser &&
//     shemasGanre &&
//     shemasFavorites &&
//     shemasBand &&
//     shemasArtists &&
//     shemasAlbums
//     ? `${shemasTrack} ${shemasUser} ${shemasGanre} ${shemasFavorites} ${shemasBand} ${shemasArtists} ${shemasAlbums}`
//     : '1'
// );

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
