import { RESTDataSource } from 'apollo-datasource-rest';
import console from 'console';
export class AlbumsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = `http://localhost:3005/v1/albums`;
    }
    async willSendRequest(request) {
        console.log(this.context.token);
        request.headers.set('Authorization', `${this.context.token}`);
    }
    getAllAlbum(opt) {
        const body = this.get('', opt);
        console.log('services: ', body);
        return body;
    }
    async getAllAlbumsbyIds(ids) {
        try {
            let albums = [];
            for (let index = 0; index < ids.length; index++) {
                const id = ids[index];
                const album = await this.getAlbum(id);
                albums.push(album);
            }
            return albums;
        }
        catch (error) {
            if (error) {
                console.log('EEEalbum', error);
                return null;
            }
        }
    }
    async getAlbum(id) {
        console.log('getalbums', id);
        try {
            if (id === 'idsad') {
                throw new Error('idsad');
            }
            const body = this.get(`/${encodeURIComponent(id)}`);
            console.log('services: ', body);
            return body;
        }
        catch (error) {
            if (error) {
                console.log(error);
                return undefined;
            }
        }
    }
    async postAlbum(newAlbum) {
        console.log('postAlbum', newAlbum);
        const body = this.post('', newAlbum);
        console.log('servicespostAlbum body: ', body);
        return body;
    }
    putAlbum(id, upAlbum) {
        const body = this.put(`/${encodeURIComponent(id)}`, upAlbum);
        console.log('services: ', body);
        return body;
    }
    putImage(albumid, file) {
        console.log(file);
        const body = this.put(`/${encodeURIComponent(albumid)}/image`, { file: file });
        console.log('services: ', body);
        return body;
    }
    remoweAlbum(id) {
        const body = this.delete(`/${encodeURIComponent(id)}`);
        console.log('services: ', body);
        return body;
    }
}
