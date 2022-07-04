import { options } from '../../config.js';
export const resolverGenres = {
    Query: {
        allGenres: async (_source, { offset, limit }, { dataSources }) => {
            console.log(dataSources);
            console.log(offset, limit);
            try {
                const body = await dataSources.genresAPI.getAllGenre({
                    offset: offset || options.defaultOffset,
                    limit: limit || options.defaultOffset,
                });
                console.log(`resolver`, body);
                return body.items;
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
        genre: async (_source, { id }, { dataSources }) => {
            console.log(id);
            console.log(dataSources);
            try {
                const body = await dataSources.genresAPI.getGenre(id);
                console.log('resolver: ', body);
                return body;
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
    },
    Genre: {
        id(parent, _args, { dataSources }, i) {
            return parent._id;
        },
        name(parent, _args, { dataSources }, i) {
            return parent.name;
        },
        description(parent, _args, { dataSources }, i) {
            return parent.description;
        },
        country(parent, _args, { dataSources }, i) {
            return parent.country;
        },
        year(parent, _args, { dataSources }, i) {
            return parent.year;
        },
    },
    Mutation: {
        createGenre: async (_source, { name, description, country, year }, { dataSources }) => {
            console.log(name, description, country, year);
            console.log(dataSources.genresAPI.context.token);
            try {
                if (dataSources.genresAPI.context.token) {
                    console.log(dataSources.genresAPI.context.token);
                    const body = await dataSources.genresAPI.postGenre({
                        name,
                        description,
                        country,
                        year,
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
        updateGenre: async (_source, { id, name, description, country, year }, { dataSources }, context) => {
            console.log(id, { name, description, country, year });
            console.log(dataSources.genresAPI);
            try {
                if (dataSources.genresAPI.context.token) {
                    console.log(dataSources.genresAPI.context.token);
                    const body = await dataSources.genresAPI.putGenre(id, {
                        name,
                        description,
                        country,
                        year,
                    });
                    console.log(`resolver`, body.items);
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
        deleteGenre: async (_source, { id }, { dataSources }, context) => {
            console.log(id);
            console.log(dataSources.genresAPI.context.token);
            try {
                if (dataSources.genresAPI.context.token) {
                    const body = await dataSources.genresAPI.remoweGenre(id);
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
