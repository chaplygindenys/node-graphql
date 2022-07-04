import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import console from 'console';
import { BandsAPI } from '../../bands/services/bands.service.js';

import { Artist } from '../../interface';

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

  async getAllArtist(opt: {}) {
    const body = this.get('', opt);
    console.log('services: ', body);
    return body;
  }

  async getAllArtistsbyIds(ids: string[], dataSources: any) {
    try {
      let artists = [];
      for (let index = 0; index < ids.length; index++) {
        const id = ids[index];
        const artist = await this.getArtist(id, dataSources);
        console.log('artist: ---->', artist);
        artists.push(artist);
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
  async getArtist(id: string, dataSources: any) {
    const body: Artist = await this.get(`/${encodeURIComponent(id)}`);
    console.log('services: ', body);
    return {
      id: body._id,
      firstName: body.firstName,
      secondName: body.secondName,
      middleName: body.middleName,
      birthDate: body.birthDate,
      birthPlace: body.birthPlace,
      country: body.country,
      bands: BandsAPI.getAllBandsbyIds(body.bandsIds, dataSources),
      instruments: body.instruments,
    };
  }

  async postArtist(newArtist: Artist) {
    console.log('ttttttttttttttttt', newArtist);
    const body = this.post('', newArtist);
    console.log('services: ', body);
    return body;
  }
  async putArtist(id: string, upArtist: Artist) {
    const body = this.put(`/${encodeURIComponent(id)}`, upArtist);
    console.log('services: ', body);
    return body;
  }
  async remoweArtist(id: string) {
    const body = this.delete(`/${encodeURIComponent(id)}`);
    console.log('services: ', body);
    return body;
  }
}
