export const resolverTracks = {
    Query: {
        track: async (_source, { id }, { dataSources }, context) => {
            console.log(id);
            console.log(dataSources);
            try {
                const body = await dataSources.tracksAPI.getTrack(id);
                console.log(body);
                return {
                    code: 200,
                    success: true,
                    message: ' get Track!',
                    track: {
                        id: body._id,
                        title: body.title,
                        albums: body.albumId,
                        bands: body.bandsIds,
                        duration: body.duration,
                        released: body.released,
                        genres: body.genresIds,
                    },
                };
            }
            catch (err) {
                if (err) {
                    console.error(err);
                    return {
                        code: 400,
                        success: false,
                        message: err.message,
                    };
                }
            }
        },
        tracks: async (_source, __, { dataSources }, context) => {
            console.log(dataSources);
            try {
                const body = await dataSources.tracksAPI.getAllTrack();
                console.log(`resolver`, body);
                return {
                    code: 200,
                    success: true,
                    message: 'get allTracks!',
                    user: {
                        tracks: body.tracks,
                    },
                };
            }
            catch (err) {
                if (err) {
                    console.log(err);
                    return {
                        code: 400,
                        success: false,
                        message: err.message,
                    };
                }
            }
        },
    },
    Mutation: {
        updateTrack: async (_source, { id, Track: { title, albums, bands, duration, released, genres } }, { dataSources }, context) => {
            console.log(id, {
                title,
                albums,
                bands,
                duration,
                released,
                genres,
            });
            console.log(dataSources);
            try {
                if (dataSources.context.token) {
                    console.log(dataSources.context.token);
                    const body = await dataSources.tracksAPI.putTrack(id, {
                        title,
                        albums,
                        bands,
                        duration,
                        released,
                        genres,
                    });
                    console.log(`resolver`, body);
                    return {
                        code: 200,
                        success: true,
                        message: 'User successfully updated!',
                        track: {
                            id: body._id,
                            title: body.title,
                            albums: body.albumId,
                            bands: body.bandsIds,
                            duration: body.duration,
                            released: body.released,
                            genres: body.genresIds,
                        },
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
                    const code = await dataSources.tracksAPI.remoweTrack(id);
                    console.log(code);
                    return {
                        code: 204,
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
        createTrack: async (_source, track, { dataSources }, context) => {
            console.log(track);
            console.log(dataSources.tracksAPI.context.token);
            try {
                if (dataSources.tracksAPI.context.token) {
                    const body = await dataSources.tracksAPI.postTrack(track);
                    console.log(`resolver`, body);
                    return {
                        code: 201,
                        success: true,
                        message: 'User successfully created!',
                        track: {
                            id: body._id,
                            title: body.title,
                            albums: body.albumId,
                            bands: body.bandsIds,
                            duration: body.duration,
                            released: body.released,
                            genres: body.genresIds,
                        },
                    };
                }
                else {
                    throw new Error('AutorithationError');
                }
            }
            catch (err) {
                if (err) {
                    console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEE', err);
                    return {
                        code: 400,
                        success: false,
                        message: err.message,
                    };
                }
            }
        },
    },
};
