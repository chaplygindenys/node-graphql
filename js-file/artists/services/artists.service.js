import { RESTDataSource } from 'apollo-datasource-rest';
import console from 'console';
export class ArtistsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = `http://localhost:3002/v1/artists`;
    }
    async willSendRequest(request) {
        console.log(this.context.token);
        request.headers.set('Authorization', `${this.context.token}`);
    }
    async getAllArtist(opt) {
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
                if (artist) {
                    artists.push(artist);
                }
            }
            console.log('A', artists);
            return artists;
        }
        catch (error) {
            if (error) {
                console.log('EEEartist', error);
            }
        }
    }
    async getArtist(id) {
        try {
            console.log(id);
            const body = await this.get(`/${encodeURIComponent(id)}`);
            console.log('body', body);
            return body;
        }
        catch (error) {
            if (error) {
                console.log('EEEartist', error);
            }
        }
    }
    async postArtist(newArtist) {
        console.log('ttttttttttttttttt', newArtist);
        const body = this.post('', newArtist);
        console.log('services: ', body);
        return body;
    }
    async putArtist(id, upArtist) {
        const body = this.put(`/${encodeURIComponent(id)}`, upArtist);
        console.log('services: ', body);
        return body;
    }
    async remoweArtist(id) {
        const body = this.delete(`/${encodeURIComponent(id)}`);
        console.log('services: ', body);
        return body;
    }
}
