import { RESTDataSource } from 'apollo-datasource-rest';
import console from 'console';
export class TracksAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = `http://localhost:3006/v1/tracks`;
    }
    willSendRequest(request) {
        console.log(this.context.token);
        request.headers.set('Authorization', `Bearer ${this.context.token}`);
    }
    getAllTrack() {
        const tracks = this.get('');
        console.log(tracks);
        return tracks;
    }
    async getTrack(id) {
        const track = this.get(`/${encodeURIComponent(id)}`);
        console.log(track);
        return track;
    }
    postTrack({ title, albumId, bandsIds, duration, released, genresIds, }) {
        const newTrack = this.post('', {
            title,
            albumId,
            bandsIds,
            duration,
            released,
            genresIds,
        });
        console.log(newTrack);
        return newTrack;
    }
    putTrack(id, { title, albumId, bandsIds, duration, released, genresIds }) {
        const updateTrack = this.put(`/${id}`, {
            title,
            albumId,
            bandsIds,
            duration,
            released,
            genresIds,
        });
        console.log(updateTrack);
        return updateTrack;
    }
    async remoweTrack(id) {
        const body = this.delete(`/${encodeURIComponent(id)}`);
        console.log(body);
        return body;
    }
}
