import { RESTDataSource } from 'apollo-datasource-rest';
import console from 'console';
export class GenresAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = `http://localhost:3001/v1/genres`;
    }
    async willSendRequest(request) {
        request.headers.set('Authorization', `${this.context.token}`);
    }
    async getAllGenre(opt) {
        const body = this.get('', opt);
        return body;
    }
    async getAllGenresbyIds(ids) {
        try {
            let genres = [];
            for (let index = 0; index < ids.length; index++) {
                const id = ids[index];
                const genre = await this.getGenre(id);
                console.log('getAllGenresbyIds genre: ---->', genre);
                if (genre) {
                    genres.push(genre);
                }
            }
            console.log('getAllGenresbyIds done', genres);
            return genres;
        }
        catch (error) {
            if (error) {
                console.log('EEEEEEEEEEEE', error);
                return null;
            }
        }
    }
    async getGenre(id) {
        const body = this.get(`/${encodeURIComponent(id)}`);
        return body;
    }
    async postGenre({ name, description, country, year }) {
        const body = this.post('', {
            name,
            description,
            country,
            year,
        });
        return body;
    }
    async putGenre(id, { name, description, country, year }) {
        const body = this.put(`/${id}`, {
            name,
            description,
            country,
            year,
        });
        return body;
    }
    async remoweGenre(id) {
        const body = this.delete(`/${encodeURIComponent(id)}`);
        return body;
    }
}
