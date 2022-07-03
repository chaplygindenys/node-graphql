import { RESTDataSource } from 'apollo-datasource-rest';
import console from 'console';
export class AlbumsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = `http://localhost:3005/v1/albums`;
    }
    async willSendRequest(request) {
        console.log(this.context.token);
        request.headers.set('Authorization', `Bearer ${this.context.token}`);
    }
    getAllAlbum(opt) {
        const body = this.get('', opt);
        console.log('services: ', body);
        return body;
    }
    async getAllAlbumsbyIds(ids, dataSources) {
        try {
            let albums = [];
            for (let index = 0; index < ids.length; index++) {
                const id = ids[index];
                const album = await this.getAlbum(id, dataSources);
                console.log('album: ---->', album);
                albums.push(album);
            }
            console.log('A', albums);
            return albums;
        }
        catch (error) {
            if (error) {
                console.log('EEEalbum', error);
                return null;
            }
        }
    }
    async getAlbum(id, dataSources) {
        console.log('getalbums', id);
        try {
            if (id === 'idsad') {
                throw new Error('idsad');
            }
            const body = await this.get(`/${encodeURIComponent(id)}`);
            console.log('services: ', body);
            return {
                id: body._id,
                name: body.name,
                released: body.released,
                artists: dataSources.artistsAPI.getAllArtistsbyIds(body.artistsIds),
                bands: dataSources.bandsAPI.getAllBandsbyIds(body.bandsIds, dataSources),
                tracks: dataSources.tracksAPI.getAllTracksbyIds(body.trackIds, dataSources),
                genres: dataSources.genresAPI.getAllGenresbyIds(body.genresIds, dataSources),
                image: body.image,
            };
        }
        catch (error) {
            if (error) {
                console.log(error);
                return undefined;
            }
        }
    }
    async postAlbum(newAlbum) {
        console.log('ttttttttttttttttt', newAlbum);
        const body = this.post('', newAlbum);
        console.log('services: ', body);
        return body;
    }
    putAlbum(id, upAlbum) {
        const body = this.put(`/${encodeURIComponent(id)}`, upAlbum);
        console.log('services: ', body);
        return body;
    }
    remoweAlbum(id) {
        const body = this.delete(`/${encodeURIComponent(id)}`);
        console.log('services: ', body);
        return body;
    }
}
