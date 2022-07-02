import { RESTDataSource } from 'apollo-datasource-rest';
import console from 'console';
import { addTrueId } from '../../services';
export class BandsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = `http://localhost:3003/v1/bands`;
    }
    willSendRequest(request) {
        console.log(this.context.token);
        request.headers.set('Authorization', `Bearer ${this.context.token}`);
    }
    getAllBand() {
        const tracks = this.get('');
        console.log(tracks);
        return tracks;
    }
    async getBand(id) {
        const track = this.get(`/${encodeURIComponent(id)}`);
        console.log(track);
        return track;
    }
    async getAllBandsbyIds(ids) {
        try {
            let bands = [];
            for (let index = 0; index < ids.length; index++) {
                const id = ids[index];
                const band = await this.getBand(id);
                console.log('band: ---->', band);
                bands.push(addTrueId(band));
            }
            console.log('A', bands);
            return bands;
        }
        catch (error) {
            if (error) {
                console.log('EEEEEEEband', error);
                return null;
            }
        }
    }
    postBand({ name, origin, members, website, genresIds }) {
        const newTrack = this.post('', {
            name,
            origin,
            members,
            website,
            genresIds,
        });
        console.log(newTrack);
        return newTrack;
    }
    putBand({ id, name, origin, members, website, genresIds }) {
        const updateTrack = this.put(`/${id}`, {
            name,
            origin,
            members,
            website,
            genresIds,
        });
        console.log(updateTrack);
        return updateTrack;
    }
    async remoweBand(id) {
        const body = this.delete(`/${encodeURIComponent(id)}`);
        console.log(body);
        return body;
    }
}