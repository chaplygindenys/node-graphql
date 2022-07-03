import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import console from 'console';

import { FavoriteItem } from '../../interface';

export class FavouritesAPI extends RESTDataSource {
  constructor() {
    // private readonly bandsService: BandsService // private readonly FavouritesService: FavouritesService, // private readonly genresService: GenresService, // private readonly tracksService: TracksService,
    super();
    this.baseURL = `http://localhost:3007/v1/favourites`;
  }
  async willSendRequest(request: RequestOptions) {
    console.log(this.context.token);
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  async getAllFavourite() {
    const body = await this.get('');
    console.log('services: ', body);
    return body;
  }

  async putAddFavourite(favouriteItem: FavoriteItem) {
    console.log('servisces in', favouriteItem);
    const body = this.put('/add', favouriteItem);
    console.log('services: ', body);
    return body;
  }

  async putRemoveFavourite(favouriteItem: FavoriteItem) {
    const body = this.put(`/remove`, favouriteItem);
    console.log('services: ', body);
    return body;
  }
}
