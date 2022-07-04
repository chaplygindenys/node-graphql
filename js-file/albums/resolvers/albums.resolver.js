import { options } from '../../config.js';
export const resolverAlbum = {
    Query: {
        allAlbums: async (_source, { offset, limit }, { dataSources }) => {
            console.log(dataSources.albumsAPI);
            console.log(offset, limit);
            try {
                const body = await dataSources.albumsAPI.getAllAlbum({
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
        album: async (_source, { id }, { dataSources }) => {
            console.log('in resolver albums ', id);
            console.log(dataSources);
            try {
                const body = await dataSources.albumsAPI.getAlbum(id);
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
    Album: {
        id(parent, _args, { dataSources }, i) {
            return parent._id;
        },
        name(parent, _args, { dataSources }, i) {
            return parent.name;
        },
        released(parent, _args, { dataSources }, i) {
            return parent.released;
        },
        artists(parent, _args, { dataSources }, i) {
            return dataSources.artistsAPI.getAllArtistsbyIds(parent.artistsIds);
        },
        bands(parent, _args, { dataSources }, i) {
            return dataSources.bandsAPI.getAllBandsbyIds(parent.bandsIds);
        },
        tracks(parent, _args, { dataSources }, i) {
            return dataSources.tracksAPI.getAllTracksbyIds(parent.trackIds);
        },
        genres(parent, _args, { dataSources }, i) {
            return dataSources.genresAPI.getAllGenresbyIds(parent.genresIds);
        },
    },
    Mutation: {
        createAlbum: async (_source, { name, released, artistsIds, bandsIds, trackIds, genresIds }, { dataSources }, context) => {
            console.log(name, released, artistsIds, bandsIds, trackIds, genresIds);
            console.log(dataSources.albumsAPI.context.token);
            try {
                if (dataSources.albumsAPI.context.token) {
                    console.log(dataSources.albumsAPI.context.token);
                    const body = await dataSources.albumsAPI.postAlbum({
                        name,
                        released,
                        artistsIds,
                        bandsIds,
                        trackIds,
                        genresIds,
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
                    console.log(err);
                }
            }
        },
        updateAlbum: async (_source, { id, name, released, artistsIds, bandsIds, trackIds, genresIds }, { dataSources }, context) => {
            console.log(id, {
                name,
                released,
                artistsIds,
                bandsIds,
                trackIds,
                genresIds,
            });
            console.log(dataSources.albumsAPI);
            try {
                if (dataSources.albumsAPI.context.token) {
                    console.log(dataSources.albumsAPI.context.token);
                    const body = await dataSources.albumsAPI.putAlbum(id, {
                        name,
                        released,
                        artistsIds,
                        bandsIds,
                        trackIds,
                        genresIds,
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
                    console.log(err);
                }
            }
        },
        deleteAlbum: async (_source, { id }, { dataSources }) => {
            console.log(id);
            console.log(dataSources.albumsAPI.context.token);
            try {
                if (dataSources.albumsAPI.context.token) {
                    const body = await dataSources.albumsAPI.remoweAlbum(id);
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
