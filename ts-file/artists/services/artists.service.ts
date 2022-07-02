import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import console from 'console';

import { Artist } from '../../interface';
import { addTrueId } from '../../services.js';

export class ArtistsAPI extends RESTDataSource {
  constructor() {
    // private readonly bandsService: BandsService // private readonly artistsService: ArtistsService, // private readonly genresService: GenresService, // private readonly tracksService: TracksService,
    super();
    this.baseURL = `http://localhost:3002/v1/artists`;
  }
  async willSendRequest(request: RequestOptions) {
    console.log(this.context.token);
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  getAllArtist(opt: {}) {
    const body = this.get('', opt);
    console.log('services: ', body);
    return body;
  }

  async getAllArtistsbyIds(ids: string[]) {
    try {
      let artists = [];
      for (let index = 0; index < ids.length; index++) {
        const id = ids[index];
        const artist = await this.getArtist(id);
        console.log('artist: ---->', artist);
        artists.push(addTrueId(artist));
      }
      console.log('A', artists);
      return artists;
    } catch (error) {
      if (error) {
        console.log('EEEartist', error);
        return null;
      }
    }
  }
  getArtist(id: string) {
    const body = this.get(`/${encodeURIComponent(id)}`);
    console.log('services: ', body);
    return body;
  }
  async postArtist(newArtist: Artist) {
    console.log('ttttttttttttttttt', newArtist);
    const body = this.post('', newArtist);
    console.log('services: ', body);
    return body;
  }
  putArtist(id: string, upArtist: Artist) {
    const body = this.put(`/${encodeURIComponent(id)}`, upArtist);
    console.log('services: ', body);
    return body;
  }
  remoweArtist(id: string) {
    const body = this.delete(`/${encodeURIComponent(id)}`);
    console.log('services: ', body);
    return body;
  }
}
