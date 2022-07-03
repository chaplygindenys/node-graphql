import { options } from '../../config.js';
export const resolverArtist = {
    Query: {
        artists: async (_source, { offset, limit }, { dataSources }, context) => {
            console.log(dataSources.artistsAPI);
            console.log(offset, limit);
            try {
                const body = await dataSources.artistsAPI.getAllArtist({
                    offset: offset || options.defaultOffset,
                    limit: limit || options.defaultOffset,
                });
                console.log(`resolver`, body);
                const trueIdforBodyItems = (arr) => {
                    let goodArr = [];
                    for (let index = 0; index < arr.length; index++) {
                        const body = arr[index];
                        goodArr.push({
                            id: body._id,
                            firstName: body.firstName,
                            secondName: body.secondName,
                            middleName: body.middleName,
                            birthDate: body.birthDate,
                            birthPlace: body.birthPlace,
                            country: body.country,
                            bands: dataSources.bandsAPI.getAllBandsbyIds(body.bandsIds, dataSources),
                            instruments: body.instruments,
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
                }
            }
        },
        artist: async (_source, { id }, { dataSources }) => {
            console.log(id);
            console.log(dataSources.artistsAPI);
            try {
                const body = await dataSources.artistsAPI.getArtist(id, dataSources);
                console.log('resolver: ', body);
                return {
                    id: body.id,
                    firstName: body.firstName,
                    secondName: body.secondName,
                    middleName: body.middleName,
                    birthDate: body.birthDate,
                    birthPlace: body.birthPlace,
                    country: body.country,
                    bands: body.bands,
                    instruments: body.instruments,
                };
            }
            catch (err) {
                if (err) {
                    console.error(err);
                }
            }
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
                    console.log(`resolver`, body.items);
                    return {
                        id: body._id,
                        firstName: body.firstName,
                        secondName: body.secondName,
                        middleName: body.middleName,
                        birthDate: body.birthDate,
                        birthPlace: body.birthPlace,
                        country: body.country,
                        bands: dataSources.bandsAPI.getAllBandsbyIds(body.bandsIds, dataSources),
                        instruments: body.instruments,
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
        updateArtist: async (_source, { id, firstName, secondName, middleName, birthDate, birthPlace, country, bandsIds, instruments, }, { dataSources }, context) => {
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
                    console.log(`resolver`, body.items);
                    return {
                        id: body._id,
                        firstName: body.firstName,
                        secondName: body.secondName,
                        middleName: body.middleName,
                        birthDate: body.birthDate,
                        birthPlace: body.birthPlace,
                        country: body.country,
                        bands: dataSources.bandsAPI.getAllBandsbyIds(body.bandsIds, dataSources),
                        instruments: body.instruments,
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
