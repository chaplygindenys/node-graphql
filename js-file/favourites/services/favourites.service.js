import { RESTDataSource } from 'apollo-datasource-rest';
import console from 'console';
export class FavouritesAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = `http://localhost:3007/v1/favourites`;
    }
    async willSendRequest(request) {
        console.log(this.context.token);
        request.headers.set('Authorization', `Bearer ${this.context.token}`);
    }
    getAllFavourite(opt) {
        const body = this.get('', opt);
        console.log('services: ', body);
        return body;
    }
    async putAddFavourite(favouriteItem) {
        console.log('ttttttttttttttttt', favouriteItem);
        const body = this.put('/add', favouriteItem);
        console.log('services: ', body);
        return body;
    }
    putRemoveFavourite(favouriteItem) {
        const body = this.put(`/remove`, favouriteItem);
        console.log('services: ', body);
        return body;
    }
}
