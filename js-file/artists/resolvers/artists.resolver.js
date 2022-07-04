import { options } from '../../config.js';
export const resolverArtist = {
    Query: {
        allArtists: async (_source, { offset, limit }, { dataSources }) => {
            console.log(dataSources.artistsAPI);
            console.log(offset, limit);
            try {
                const body = await dataSources.artistsAPI.getAllArtist({
                    offset: offset || options.defaultOffset,
                    limit: limit || options.defaultOffset,
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
        artist: async (_source, { id }, { dataSources }) => {
            console.log(id);
            console.log(dataSources.artistsAPI);
            try {
                const body = await dataSources.artistsAPI.getArtist(id);
                console.log('resolver: ', body);
                return body;
            }
            catch (err) {
                if (err) {
                    console.error(err);
                }
            }
        },
    },
    Artist: {
        id(parent, _args, { dataSources }, i) {
            return parent._id;
        },
        firstName(parent, _args, { dataSources }, i) {
            return parent.firstName;
        },
        secondName(parent, _args, { dataSources }, i) {
            return parent.secondName;
        },
        middleName(parent, _args, { dataSources }, i) {
            return parent.middleName;
        },
        birthDate(parent, _args, { dataSources }, i) {
            return parent.birthDate;
        },
        birthPlace(parent, _args, { dataSources }, i) {
            return parent.birthDate;
        },
        country(parent, _args, { dataSources }, i) {
            return parent.birthDate;
        },
        bands(parent, _args, { dataSources }, i) {
            return dataSources.bandsAPI.getAllBandsbyIds(parent.bandsIds);
        },
        instruments(parent, _args, { dataSources }, i) {
            return parent.instruments;
        },
    },
    Mutation: {
        createArtist: async (_source, { firstName, secondName, middleName, birthDate, birthPlace, country, bandsIds, instruments, }, { dataSources }, context) => {
            console.log(firstName, secondName, middleName, new Date(Date.parse(birthDate)), birthPlace, country, bandsIds, instruments);
            console.log(dataSources.artistsAPI.context.token);
            try {
                if (dataSources.artistsAPI.context.token) {
                    console.log(dataSources.artistsAPI.context.token);
                    const body = await dataSources.artistsAPI.postArtist({
                        firstName,
                        secondName,
                        middleName,
                        birthDate,
                        birthPlace,
                        country,
                        bandsIds,
                        instruments,
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
        updateArtist: async (_source, { id, firstName, secondName, middleName, birthDate, birthPlace, country, bandsIds, instruments, }, { dataSources }) => {
            console.log(id, {
                firstName,
                secondName,
                middleName,
                birthDate,
                birthPlace,
                country,
                bandsIds,
                instruments,
            });
            console.log(dataSources.artistsAPI);
            try {
                if (dataSources.artistsAPI.context.token) {
                    console.log(dataSources.artistsAPI.context.token);
                    const body = await dataSources.artistsAPI.putArtist(id, {
                        firstName,
                        secondName,
                        middleName,
                        birthDate,
                        birthPlace,
                        country,
                        bandsIds,
                        instruments,
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
        deleteArtist: async (_source, { id }, { dataSources }, context) => {
            console.log(id);
            console.log(dataSources.artistsAPI.context.token);
            try {
                if (dataSources.artistsAPI.context.token) {
                    const body = await dataSources.artistsAPI.remoweArtist(id);
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
