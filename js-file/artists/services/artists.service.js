import { RESTDataSource } from 'apollo-datasource-rest';
import console from 'console';
import { addTrueId } from '../../services.js';
export class ArtistsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = `http://localhost:3002/v1/artists`;
    }
    async willSendRequest(request) {
        console.log(this.context.token);
        request.headers.set('Authorization', `Bearer ${this.context.token}`);
    }
    getAllArtist(opt) {
        const body = this.get('', opt);
        console.log('services: ', body);
        return body;
    }
    async getAllArtistsbyIds(ids) {
        try {
            let artists = [];
            for (let index = 0; index < ids.length; index++) {
                const id = ids[index];
                const artist = await this.getArtist(id);
                console.log('artist: ---->', artist);
                artists.push(addTrueId(artist));
            }
            console.log('A', artists);
            return artists;
        }
        catch (error) {
            if (error) {
                console.log('EEEartist', error);
                return null;
            }
        }
    }
    getArtist(id) {
        const body = this.get(`/${encodeURIComponent(id)}`);
        console.log('services: ', body);
        return body;
    }
    async postArtist(newArtist) {
        console.log('ttttttttttttttttt', newArtist);
        const body = this.post('', newArtist);
        console.log('services: ', body);
        return body;
    }
    putArtist(id, upArtist) {
        const body = this.put(`/${encodeURIComponent(id)}`, upArtist);
        console.log('services: ', body);
        return body;
    }
    remoweArtist(id) {
        const body = this.delete(`/${encodeURIComponent(id)}`);
        console.log('services: ', body);
        return body;
    }
}
