import { createReadStream, readFileSync } from 'fs';
import * as merge from 'deepmerge';
import { readFile } from 'fs/promises';
import { createRequire } from 'module';
import { cwd } from 'process';
import { pipeline } from 'stream';
import { buffer } from 'stream/consumers';

import { resolverUsers } from './users/resolvers/users.resolver.js';
import { resolverTracks } from './tracks/resolvers/tracks.resolver.js';

import { UsersAPI } from './users/services/users.services.js';
import { gql } from 'apollo-server-core';

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
const shemasUser = await read('./ts-file/users/shemas/user.graphql');
const shemasTrack = await read('./ts-file/tracks/schemas/track.graphql');
const shemasGanre = await read('./ts-file/genres/schemas/genre.graphql');
const shemasFavorites = await read(
  './ts-file/favourites/schemas/favorites.graphql'
);
const shemasBand = await read('./ts-file/bands/schemas/bands.graphql');
const shemasArtists = await read('./ts-file/artists/schemas/artists.graphql');
const shemasAlbums = await read('./ts-file/albums/schemas/albums.graphql');

// console.log(
//   shemasUser,
//   shemasTrack,
//   shemasGanre,
//   shemasFavorites,
//   shemasBand,
//   shemasArtists,
//   shemasAlbums
// );

export const typeDefs = gql(
  shemasTrack &&
    shemasUser &&
    shemasGanre &&
    shemasFavorites &&
    shemasBand &&
    shemasArtists &&
    shemasAlbums
    ? `${shemasTrack} ${shemasUser} ${shemasGanre} ${shemasFavorites} ${shemasBand} ${shemasArtists} ${shemasAlbums}`
    : '1'
);

let Q = { ...resolverTracks.Query, ...resolverUsers.Query };
let M = { ...resolverTracks.Mutation, ...resolverUsers.Mutation };
export const resolvers = { Query: Q, Mutation: M };
