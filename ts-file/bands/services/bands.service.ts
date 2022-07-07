import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import console from 'console';

export class BandsAPI extends RESTDataSource {
  constructor() {
    // private readonly bandsService: BandsService // private readonly artistsService: ArtistsService, // private readonly genresService: GenresService, // private readonly bandsService: bandsService,
    super();
    this.baseURL = `http://localhost:3003/v1/bands`;
  }
  willSendRequest(request: RequestOptions) {
    console.log(this.context.token);
    request.headers.set('Authorization', `${this.context.token}`);
  }

  async getAllBand(opt: any) {
    const bands = this.get('', opt);
    console.log(bands);
    return bands;
  }

  async getBand(id: string) {
    return this.get(`/${encodeURIComponent(id)}`);
  }

  async getAllBandsbyIds(ids: string[]) {
    try {
      let bands = [];
      for (let index = 0; index < ids.length; index++) {
        const id = ids[index];
        const band = await this.getBand(id);
        bands.push(band);
      }
      return bands;
    } catch (error) {
      if (error) {
        console.log('EEEEEEEband', error);
        return null;
      }
    }
  }
  async postBand({ name, origin, members, website, genresIds }: any) {
    const body = this.post('', {
      name,
      origin,
      members,
      website,
      genresIds,
    });
    return body;
  }
  async putBand({ id, name, origin, members, website, genresIds }: any) {
    const updateband = this.put(`/${id}`, {
      name,
      origin,
      members,
      website,
      genresIds,
    });
    return updateband;
  }
  async remoweBand(id: string) {
    const body = this.delete(`/${encodeURIComponent(id)}`);
    return body;
  }
}
