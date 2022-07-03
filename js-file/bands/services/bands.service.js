import { RESTDataSource } from 'apollo-datasource-rest';
import console from 'console';
import { trueArrMembersFromBandRes } from '../utils/bands.util.js';
export class BandsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = `http://localhost:3003/v1/bands`;
    }
    willSendRequest(request) {
        console.log(this.context.token);
        request.headers.set('Authorization', `Bearer ${this.context.token}`);
    }
    async getAllBand(opt) {
        const bands = this.get('', opt);
        console.log(bands);
        return bands;
    }
    async getBand(id) {
        const body = await this.get(`/${encodeURIComponent(id)}`);
        return {
            id: body._id,
            name: body.name,
            origin: body.origin,
            members: trueArrMembersFromBandRes(body),
            website: body.website,
            genresIds: body.genresIds,
        };
    }
    async getAllBandsbyIds(ids) {
        try {
            let bands = [];
            for (let index = 0; index < ids.length; index++) {
                const id = ids[index];
                const band = await this.getBand(id);
                console.log('band: ---->', band);
                bands.push(band);
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
    async postBand({ name, origin, members, website, genresIds }) {
        const body = this.post('', {
            name,
            origin,
            members,
            website,
            genresIds,
        });
        return body;
    }
    async putBand({ id, name, origin, members, website, genresIds }) {
        const updateband = this.put(`/${id}`, {
            name,
            origin,
            members,
            website,
            genresIds,
        });
        return updateband;
    }
    async remoweBand(id) {
        const body = this.delete(`/${encodeURIComponent(id)}`);
        return body;
    }
}
