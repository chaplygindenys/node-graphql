import { trueArrMembersFromBandRes } from '../utils/bands.util.js';
export const resolverBands = {
    Query: {
        band: async (_source, { id }, { dataSources }) => {
            console.log(id);
            console.log(dataSources);
            try {
                const body = await dataSources.bandsAPI.getBand(id);
                console.log(body);
                return {
                    id: body._id,
                    name: body.name,
                    origin: body.origin,
                    members: trueArrMembersFromBandRes(body),
                    website: body.website,
                    genres: await dataSources.genresAPI.getAllGenresbyIds(body.genresIds),
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
        bands: async (_source, __, { dataSources }, context) => {
            console.log(dataSources);
            try {
                const body = await dataSources.bandsAPI.getAllBand();
                console.log(`resolver`, body);
                const trueIdforBodyItems = (arr) => {
                    let goodArr = [];
                    for (let index = 0; index < arr.length; index++) {
                        const body = arr[index];
                        goodArr.push({
                            id: body._id,
                            name: body.name,
                            origin: body.origin,
                            members: trueArrMembersFromBandRes(body),
                            website: body.website,
                            genres: dataSources.genresAPI.getAllGenresbyIds(body.genresIds),
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
        createBand: async (_source, { name, origin, members, website, genresIds }, { dataSources }, context) => {
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
                    return {
                        id: body._id,
                        name: body.name,
                        origin: body.origin,
                        members: trueArrMembersFromBandRes(body),
                        website: body.website,
                        genres: await dataSources.genresAPI.getAllGenresbyIds(body.genresIds),
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
                    return {
                        id: body._id,
                        name: body.name,
                        origin: body.origin,
                        members: trueArrMembersFromBandRes(body),
                        website: body.website,
                        genres: await dataSources.genresAPI.getAllGenresbyIds(body.genresIds),
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
