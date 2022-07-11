export const resolverFavourite = {
    Query: {
        favourite: async (_source, __, { dataSources }) => {
            console.log(dataSources.favouritesAPI);
            try {
                if (dataSources.favouritesAPI.context.token) {
                    console.log(dataSources.favouritesAPI.context.token);
                    const body = await dataSources.favouritesAPI.getAllFavourite();
                    console.log(`resolver`, body);
                    return body;
                }
                else {
                    throw new Error('AutorithationError');
                }
            }
            catch (err) {
                if (err) {
                    console.log(err);
                }
            }
        },
    },
    Favourites: {
        id(parent, _args, { dataSources }, i) {
            return parent._id;
        },
        userId(parent, _args, { dataSources }, i) {
            return parent.userId;
        },
        bands(parent, _args, { dataSources }, i) {
            return dataSources.bandsAPI.getAllBandsbyIds(parent.bandsIds);
        },
        genres(parent, _args, { dataSources }, i) {
            return dataSources.genresAPI.getAllGenresbyIds(parent.genresIds);
        },
        artists(parent, _args, { dataSources }, i) {
            return dataSources.artistsAPI.getAllArtistsbyIds(parent.artistsIds);
        },
        tracks(parent, _args, { dataSources }, i) {
            return dataSources.tracksAPI.getAllTracksbyIds(parent.tracksIds);
        },
    },
    Mutation: {
        createFavourite: async (_source, { type, typeId }, { dataSources }) => {
            console.log(type, typeId);
            console.log(dataSources.favouritesAPI.context.token);
            try {
                if (dataSources.favouritesAPI.context.token) {
                    console.log(dataSources.favouritesAPI.context.token);
                    const body = await dataSources.favouritesAPI.putAddFavourite({
                        type: type,
                        id: typeId,
                    });
                    console.log(`resolver`, body);
                    return body;
                }
                else {
                    throw new Error('AutorithationError');
                }
            }
            catch (err) {
                if (err) {
                    console.log(err);
                }
            }
        },
        deleteFavourite: async (_source, { type, typeId }, { dataSources }) => {
            console.log(type, typeId);
            console.log(dataSources.favouritesAPI.context.token);
            try {
                if (dataSources.favouritesAPI.context.token) {
                    const body = await dataSources.favouritesAPI.putRemoveFavourite({
                        type: type,
                        id: typeId,
                    });
                    console.log('resolver: ', body);
                    return {
                        acknowledged: body.acknowledged,
                        deletedCount: body.deletedCount,
                    };
                }
                else {
                    throw new Error('AutorithationError');
                }
            }
            catch (err) {
                if (err) {
                    console.log(err);
                }
            }
        },
    },
};
