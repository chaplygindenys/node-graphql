import { options } from '../../config.js';
export const resolverBands = {
    Query: {
        band: async (_source, { id }, { dataSources }) => {
            console.log(id);
            console.log(dataSources);
            try {
                const body = await dataSources.bandsAPI.getBand(id);
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
        allBands: async (_source, { limit, offset }, { dataSources }) => {
            console.log(dataSources.bandsAPI);
            try {
                const body = await dataSources.bandsAPI.getAllBand({
                    limit: limit || options.defaultLimit,
                    offset: offset || options.defaultOffset,
                });
                console.log(`resolver`, body);
                return body.items;
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
    Member: {
        artist(parent, _args, { dataSources }, i) {
            return dataSources.artistsAPI.getAllArtistsbyIds(parent.artist);
        },
        instrument(parent, _args, { dataSources }, i) {
            return parent.instrument;
        },
        years(parent, _args, { dataSources }, i) {
            return parent.year;
        },
    },
    Band: {
        id(parent, _args, { dataSources }, i) {
            return parent._id;
        },
        name(parent, _args, { dataSources }, i) {
            return parent.name;
        },
        origin(parent, _args, { dataSources }, i) {
            return parent.origin;
        },
        members(parent, _args, { dataSources }, i) {
            return parent.members;
        },
        website(parent, _args, { dataSources }, i) {
            return parent.website;
        },
        genres(parent, _args, { dataSources }, i) {
            console.log(parent);
            const res = dataSources.genresAPI.getAllGenresbyIds(parent.genresIds);
            return res;
        },
    },
    Mutation: {
        createBand: async (_source, { name, origin, members, website, genresIds }, { dataSources }) => {
            console.log(name, origin, members, website, genresIds);
            console.log(dataSources.bandsAPI.context.token);
            try {
                if (dataSources.bandsAPI.context.token) {
                    const body = await dataSources.bandsAPI.postBand({
                        name,
                        origin,
                        members,
                        website,
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
        updateBand: async (_source, { id, name, origin, members, website, genresIds }, { dataSources }, context) => {
            console.log(id, name, origin, members, website, genresIds);
            try {
                if (dataSources.bandsAPI.context.token) {
                    console.log(dataSources.bandsAPI.context.token);
                    const body = await dataSources.bandsAPI.putBand({
                        id,
                        name,
                        origin,
                        members,
                        website,
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
                    return {
                        code: 400,
                        success: false,
                        message: err.message,
                    };
                }
            }
        },
        deleteBand: async (_source, { id }, { dataSources }, context) => {
            console.log(id);
            console.log(dataSources.bandsAPI.context.token);
            try {
                if (dataSources.bandsAPI.context.token) {
                    const body = await dataSources.bandsAPI.remoweBand(id);
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
