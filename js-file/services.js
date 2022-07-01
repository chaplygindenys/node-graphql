import { resolverUsers } from './users/resolvers/users.resolver.js';
import { resolverTracks } from './tracks/resolvers/tracks.resolver.js';
import { resolverGenres } from './genres/resolvers/ganres.resolver.js';
import { resolverBands } from './bands/resolvers/bands.resolver.js';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchema } from '@graphql-tools/load';
export const typeDefs = await loadSchema('./ts-file/**/*.graphql', {
    loaders: [new GraphQLFileLoader()],
});
export const addTrueId = (obj) => {
    const { _id } = obj;
    const newObj = { id: _id, ...obj };
    console.log(newObj);
    return newObj;
};
let Q = {
    ...resolverBands.Query,
    ...resolverGenres.Query,
    ...resolverTracks.Query,
    ...resolverUsers.Query,
};
let M = {
    ...resolverBands.Mutation,
    ...resolverGenres.Mutation,
    ...resolverTracks.Mutation,
    ...resolverUsers.Mutation,
};
export const resolvers = { Query: Q, Mutation: M };
