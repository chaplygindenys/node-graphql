import { resolverUsers } from './users/resolvers/users.resolver.js';
import { resolverTracks } from './tracks/resolvers/tracks.resolver.js';
import { resolverGenres } from './genres/resolvers/ganres.resolver.js';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchema } from '@graphql-tools/load';
export const typeDefs = await loadSchema('./ts-file/**/*.graphql', {
    loaders: [new GraphQLFileLoader()],
});
let Q = {
    ...resolverTracks.Query,
    ...resolverUsers.Query,
    ...resolverGenres.Query,
};
let M = {
    ...resolverTracks.Mutation,
    ...resolverUsers.Mutation,
    ...resolverGenres.Mutation,
};
export const resolvers = { Query: Q, Mutation: M };
