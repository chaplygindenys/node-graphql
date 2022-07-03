import { options } from '../../config.js';
export const resolverAlbum = {
    Query: {
        albums: async (_source, { offset, limit }, { dataSources }) => {
            console.log(dataSources.albumsAPI);
            console.log(offset, limit);
            try {
                const body = await dataSources.albumsAPI.getAllAlbum({
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
                            name: body.name,
                            released: body.released,
                            artists: dataSources.artistsAPI.getAllArtistsbyIds(body.artistsIds),
                            bands: dataSources.bandsAPI.getAllBandsbyIds(body.bandsIds),
                            tracks: dataSources.tracksAPI.getAllTracksbyIds(body.trackIds),
                            genres: dataSources.genresAPI.getAllGenresbyIds(body.genresIds),
                            image: body.image,
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
        album: async (_source, { id }, { dataSources }) => {
            console.log('in resolver albums ', id);
            console.log(dataSources);
            try {
                const body = await dataSources.albumsAPI.getAlbum(id);
                console.log('resolver: ', body);
                return {
                    id: body.id,
                    name: body.name,
                    released: body.released,
                    artists: dataSources.artistsAPI.getAllArtistsbyIds(body.artistsIds),
                    bands: dataSources.bandsAPI.getAllBandsbyIds(body.bandsIds),
                    tracks: dataSources.tracksAPI.getAllTracksbyIds(body.trackIds),
                    genres: dataSources.genresAPI.getAllGenresbyIds(body.genresIds),
                    image: body.image,
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
                    return {
                        id: body._id,
                        name: body.name,
                        released: body.released,
                        artists: dataSources.artistsAPI.getAllArtistsbyIds(body.artistsIds),
                        bands: dataSources.bandsAPI.getAllBandsbyIds(body.bandsIds),
                        tracks: dataSources.tracksAPI.getAllTracksbyIds(body.trackIds),
                        genres: dataSources.genresAPI.getAllGenresbyIds(body.genresIds),
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
                    return {
                        id: body._id,
                        name: body.name,
                        released: body.released,
                        artists: dataSources.artistsAPI.getAllArtistsbyIds(body.artistsIds),
                        bands: dataSources.bandsAPI.getAllBandsbyIds(body.bandsIds),
                        tracks: dataSources.tracksAPI.getAllTracksbyIds(body.trackIds),
                        genres: dataSources.genresAPI.getAllGenresbyIds(body.genresIds),
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
