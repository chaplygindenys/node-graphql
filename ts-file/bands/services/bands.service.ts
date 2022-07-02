import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import console from 'console';
import { Track } from '../../interface';
import { addTrueId } from '../../services.js';

export class BandsAPI extends RESTDataSource {
  constructor() {
    // private readonly bandsService: BandsService // private readonly artistsService: ArtistsService, // private readonly genresService: GenresService, // private readonly tracksService: TracksService,
    super();
    this.baseURL = `http://localhost:3003/v1/bands`;
  }
  willSendRequest(request: RequestOptions) {
    console.log(this.context.token);
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  getAllBand() {
    const tracks = this.get('');
    console.log(tracks);
    return tracks;
  }
  async getBand(id: string) {
    const track = this.get(`/${encodeURIComponent(id)}`);
    console.log(track);
    return track;
  }
  async getAllBandsbyIds(ids: string[]) {
    try {
      let bands = [];
      for (let index = 0; index < ids.length; index++) {
        const id = ids[index];
        const band = await this.getBand(id);
        console.log('band: ---->', band);
        bands.push(addTrueId(band));
      }
      console.log('A', bands);
      return bands;
    } catch (error) {
      if (error) {
        console.log('EEEEEEEband', error);
        return null;
      }
    }
  }
  postBand({ name, origin, members, website, genresIds }: any) {
    const newTrack = this.post('', {
      name,
      origin,
      members,
      website,
      genresIds,
    });
    console.log(newTrack);
    return newTrack;
  }
  putBand({ id, name, origin, members, website, genresIds }: any) {
    const updateTrack = this.put(`/${id}`, {
      name,
      origin,
      members,
      website,
      genresIds,
    });
    console.log(updateTrack);
    return updateTrack;
  }
  async remoweBand(id: string) {
    const body = this.delete(`/${encodeURIComponent(id)}`);
    console.log(body);
    return body;
  }
}
