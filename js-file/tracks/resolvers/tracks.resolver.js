import { options } from '../../config.js';
export const resolverTracks = {
    Query: {
        allTracks: async (_source, { limit, offset }, { dataSources }) => {
            console.log(dataSources.tracksAPI, {
                limit: limit || options.defaultLimit,
                offset: offset || options.defaultOffset,
            });
            try {
                const body = await dataSources.tracksAPI.getAllTrack({
                    limit: limit || options.defaultLimit,
                    offset: offset || options.defaultOffset,
                });
                console.log(`resolver`, body);
                return body.items;
            }
            catch (err) {
                if (err) {
                    console.log(err);
                }
            }
        },
        track: async (_source, { id }, { dataSources }) => {
            console.log(id);
            console.log(dataSources.tracksAPI);
            try {
                const body = await dataSources.tracksAPI.getTrack(id);
                console.log(body);
                return body;
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
    },
    Track: {
        id(parent, _args, { dataSources }, i) {
            return parent._id;
        },
        title(parent, _args, { dataSources }, i) {
            return parent.title;
        },
        albums(parent, _args, { dataSources }, i) {
            return dataSources.albumsAPI.getAlbum(parent.albumId);
        },
        bands(parent, _args, { dataSources }, i) {
            return dataSources.bandsAPI.getAllBandsbyIds(parent.bandsIds);
        },
        duration(parent, _args, { dataSources }, i) {
            return parent.duration;
        },
        released(parent, _args, { dataSources }, i) {
            return parent.released;
        },
        genres(parent, _args, { dataSources }, i) {
            return dataSources.genresAPI.getAllGenresbyIds(parent.genresIds);
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
                    return body;
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
                    return body;
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
