import { ApolloServer } from 'apollo-server';
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
