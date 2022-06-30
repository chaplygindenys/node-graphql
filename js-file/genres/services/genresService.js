import { RESTDataSource } from 'apollo-datasource-rest';
import console from 'console';
export class GenresAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = `http://localhost:3001/v1/genres`;
    }
    async willSendRequest(request) {
        console.log(this.context.token);
        request.headers.set('Authorization', `Bearer ${this.context.token}`);
    }
    getAllGenre(opt) {
        const body = this.get('', opt);
        console.log('services: ', body);
        return body;
    }
    getGenre(id) {
        const body = this.get(`/${encodeURIComponent(id)}`);
        console.log('services: ', body);
        return body;
    }
    async postGenre({ name, description, country, year }) {
        console.log('ttttttttttttttttt', { name, description, country, year });
        const body = this.post('', {
            name,
            description,
            country,
            year,
        });
        console.log('services: ', body);
        return body;
    }
    putGenre(id, { name, description, country, year }) {
        const body = this.put(`/${id}`, {
            name,
            description,
            country,
            year,
        });
        console.log('services: ', body);
        return body;
    }
    remoweGenre(id) {
        const body = this.delete(`/${encodeURIComponent(id)}`);
        console.log('services: ', body);
        return body;
    }
}
