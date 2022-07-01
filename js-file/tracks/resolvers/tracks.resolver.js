export const resolverTracks = {
    Query: {
        Track: async (_source, { id }, { dataSources }) => {
            console.log(id);
            console.log(dataSources);
            try {
                const body = await dataSources.tracksAPI.getTrack(id);
                console.log(body);
                return {
                    id: body._id,
                    title: body.title,
                    albums: body.albumId,
                    bands: body.bandsIds,
                    duration: body.duration,
                    released: body.released,
                    genres: body.genresIds,
                };
            }
            catch (err) {
                if (err) {
                    console.error(err);
                    return {
                        message: err.message,
                    };
                }
            }
        },
        Tracks: async (_source, __, { dataSources }, context) => {
            console.log(dataSources);
            try {
                const body = await dataSources.tracksAPI.getAllTrack();
                console.log(`resolver`, body);
                const trueIdforBodyItems = (arr) => {
                    let goodArr = [];
                    for (let index = 0; index < arr.length; index++) {
                        const body = arr[index];
                        goodArr.push({
                            id: body._id,
                            title: body.title,
                            albums: body.albumId,
                            bands: body.bandsIds,
                            duration: body.duration,
                            released: body.released,
                            genres: body.genresIds,
                        });
                    }
                    console.log(goodArr);
                    return goodArr;
                };
                return trueIdforBodyItems(body.items);
            }
            catch (err) {
                if (err) {
                    console.log(err);
                    return {
                        message: err.message,
                    };
                }
            }
        },
    },
    Mutation: {
        createTrack: async (_source, { title, albumId, bandsIds, artistsIds, duration, released, genresIds, }, { dataSources }, context) => {
            console.log(title, albumId, bandsIds, artistsIds, duration, released, genresIds);
            console.log(dataSources.tracksAPI.context.token);
            try {
                if (dataSources.tracksAPI.context.token) {
                    const body = await dataSources.tracksAPI.postTrack({
                        title,
                        albumId,
                        bandsIds,
                        artistsIds,
                        duration,
                        released,
                        genresIds,
                    });
                    console.log(`resolver`, body);
                    return {
                        id: body._id,
                        title: body.title,
                        albums: [body.albumId],
                        bands: body.bandsIds,
                        artists: body.artistsIds,
                        duration: body.duration,
                        released: body.released,
                        genres: body.genresIds,
                    };
                }
                else {
                    throw new Error('AutorithationError');
                }
            }
            catch (err) {
                if (err) {
                    console.log('resolver', err);
                    return {
                        message: err.message,
                    };
                }
            }
        },
        updateTrack: async (_source, { id, title, albumId, bandsIds, artistsIds, duration, released, genresIds, }, { dataSources }, context) => {
            console.log(id, title, albumId, bandsIds, artistsIds, duration, released, genresIds);
            try {
                if (dataSources.tracksAPI.context.token) {
                    console.log(dataSources.tracksAPI.context.token);
                    const body = await dataSources.tracksAPI.putTrack({
                        id: id,
                        title: title,
                        albumId: albumId,
                        bandsIds: bandsIds,
                        artistsIds: artistsIds,
                        duration: duration,
                        released: released,
                        genresIds: genresIds,
                    });
                    console.log(`resolver`, body);
                    return {
                        id: body._id,
                        title: body.title,
                        albums: [body.albumId],
                        bands: body.bandsIds,
                        artists: body.artistsIds,
                        duration: body.duration,
                        released: body.released,
                        genres: body.genresIds,
                    };
                }
                else {
                    throw new Error('AutorithationError');
                }
            }
            catch (err) {
                if (err) {
                    return {
                        code: 400,
                        success: false,
                        message: err.message,
                    };
                }
            }
        },
        deleteTrack: async (_source, { id }, { dataSources }, context) => {
            console.log(id);
            console.log(dataSources.tracksAPI.context.token);
            try {
                if (dataSources.tracksAPI.context.token) {
                    const body = await dataSources.tracksAPI.remoweTrack(id);
                    console.log(body);
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
                    return {
                        acknowledged: false,
                        deletedCount: 0,
                    };
                }
            }
        },
    },
};
