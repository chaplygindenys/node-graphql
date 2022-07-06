import { RESTDataSource } from 'apollo-datasource-rest';
import console from 'console';
export class TracksAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = `http://localhost:3006/v1/tracks`;
    }
    willSendRequest(request) {
        console.log(this.context.token);
        request.headers.set('Authorization', `${this.context.token}`);
    }
    async getAllTrack(opt) {
        const body = this.get('', opt);
        return body;
    }
    async getTrack(id) {
        const body = this.get(`/${encodeURIComponent(id)}`);
        return body;
    }
    async getAllTracksbyIds(ids) {
        try {
            let tracks = [];
            for (let index = 0; index < ids.length; index++) {
                const id = ids[index];
                const track = await this.getTrack(id);
                console.log('track: ---->', track);
                tracks.push(track);
            }
            console.log('A', tracks);
            return tracks;
        }
        catch (error) {
            if (error) {
                console.log('EEEartist', error);
                return null;
            }
        }
    }
    async postTrack({ title, albumId, bandsIds, artistsIds, duration, released, genresIds, }) {
        const body = this.post('', {
            title,
            albumId,
            bandsIds,
            artistsIds,
            duration,
            released,
            genresIds,
        });
        return body;
    }
    async putTrack({ id, title, albumId, bandsIds, artistsIds, duration, released, genresIds, }) {
        const body = this.put(`/${id}`, {
            id,
            title,
            albumId,
            bandsIds,
            artistsIds,
            duration,
            released,
            genresIds,
        });
        return body;
    }
    async remoweTrack(id) {
        const body = this.delete(`/${encodeURIComponent(id)}`);
        console.log(body);
        return body;
    }
}
