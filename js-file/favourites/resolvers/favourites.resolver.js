export const resolverFavourite = {
    Query: {
        favourite: async (_source, __, { dataSources }) => {
            console.log(dataSources.favouritesAPI);
            try {
                if (dataSources.favouritesAPI.context.token) {
                    console.log(dataSources.favouritesAPI.context.token);
                    const body = await dataSources.favouritesAPI.getAllFavourite();
                    console.log(`resolver`, body);
                    const go = await {
                        id: body._id,
                        userId: body.userId,
                        bands: dataSources.bandsAPI.getAllBandsbyIds(body.bandsIds, dataSources),
                        tracks: dataSources.tracksAPI.getAllTracksbyIds(body.tracksIds, dataSources),
                        artists: dataSources.artistsAPI.getAllArtistsbyIds(body.artistsIds, dataSources),
                        genres: await dataSources.genresAPI.getAllGenresbyIds(body.genresIds, dataSources),
                    };
                    console.log('done', go);
                    return go;
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
                    return {
                        id: body._id,
                        userId: body.userId,
                        bands: dataSources.bandsAPI.getAllBandsbyIds(body.bandsIds, dataSources),
                        tracks: dataSources.tracksAPI.getAllTracksbyIds(body.tracksIds, dataSources),
                        artists: dataSources.artistsAPI.getAllArtistsbyIds(body.artistsIds, dataSources),
                        genres: await dataSources.genresAPI.getAllGenresbyIds(body.genresIds, dataSources),
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
