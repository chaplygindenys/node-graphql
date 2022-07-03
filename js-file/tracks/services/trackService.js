import { RESTDataSource } from 'apollo-datasource-rest';
import console from 'console';
import { addTrueId } from '../../services.js';
export class TracksAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = `http://localhost:3006/v1/tracks`;
    }
    willSendRequest(request) {
        console.log(this.context.token);
        request.headers.set('Authorization', `Bearer ${this.context.token}`);
    }
    getAllTrack({ limit, offset }) {
        const tracks = this.get('', { limit, offset });
        console.log(tracks);
        return tracks;
    }
    async getTrack(id) {
        const track = this.get(`/${encodeURIComponent(id)}`);
        console.log(track);
        return track;
    }
    async getAllTracksbyIds(ids) {
        try {
            let tracks = [];
            for (let index = 0; index < ids.length; index++) {
                const id = ids[index];
                const track = await this.getTrack(id);
                console.log('track: ---->', track);
                tracks.push(addTrueId(track));
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
    postTrack({ title, albumId, bandsIds, artistsIds, duration, released, genresIds, }) {
        const newTrack = this.post('', {
            title,
            albumId,
            bandsIds,
            artistsIds,
            duration,
            released,
            genresIds,
        });
        console.log(newTrack);
        return newTrack;
    }
    putTrack({ id, title, albumId, bandsIds, artistsIds, duration, released, genresIds, }) {
        const updateTrack = this.put(`/${id}`, {
            id,
            title,
            albumId,
            bandsIds,
            artistsIds,
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
