import { RESTDataSource } from 'apollo-datasource-rest';
import console from 'console';
export class FavouritesAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = `http://localhost:3007/v1/favourites`;
    }
    async willSendRequest(request) {
        console.log(this.context.token);
        request.headers.set('Authorization', `${this.context.token}`);
    }
    async getAllFavourite() {
        const body = this.get('');
        return body;
    }
    async putAddFavourite(favouriteItem) {
        console.log('servisces in', favouriteItem);
        const body = this.put('/add', favouriteItem);
        return body;
    }
    async putRemoveFavourite(favouriteItem) {
        const body = this.put(`/remove`, favouriteItem);
        return body;
    }
}
