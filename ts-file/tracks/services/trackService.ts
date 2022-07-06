import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import console from 'console';
import { Track } from '../../interface';

export class TracksAPI extends RESTDataSource {
  constructor() {
    // private readonly bandsService: BandsService // private readonly artistsService: ArtistsService, // private readonly genresService: GenresService, // private readonly tracksService: TracksService,
    super();
    this.baseURL = `http://localhost:3006/v1/tracks`;
  }
  willSendRequest(request: RequestOptions) {
    console.log(this.context.token);
    request.headers.set('Authorization', `${this.context.token}`);
  }

  async getAllTrack(opt: any) {
    const body = this.get('', opt);
    return body;
  }

  async getTrack(id: string) {
    const body = this.get(`/${encodeURIComponent(id)}`);
    return body;
  }

  async getAllTracksbyIds(ids: string[]) {
    try {
      let tracks = [];
      for (let index = 0; index < ids.length; index++) {
        const id = ids[index];
        const track = await this.getTrack(id);
        console.log('track: ---->', track);
        tracks.push(track);
      }
      console.log('A', tracks);
      return tracks;
    } catch (error) {
      if (error) {
        console.log('EEEartist', error);
        return null;
      }
    }
  }
  async postTrack({
    title,
    albumId,
    bandsIds,
    artistsIds,
    duration,
    released,
    genresIds,
  }: any) {
    const body = this.post('', {
      title,
      albumId,
      bandsIds,
      artistsIds,
      duration,
      released,
      genresIds,
    });
    return body;
  }
  async putTrack({
    id,
    title,
    albumId,
    bandsIds,
    artistsIds,
    duration,
    released,
    genresIds,
  }: any) {
    const body = this.put(`/${id}`, {
      id,
      title,
      albumId,
      bandsIds,
      artistsIds,
      duration,
      released,
      genresIds,
    });
    return body;
  }
  async remoweTrack(id: string) {
    const body = this.delete(`/${encodeURIComponent(id)}`);
    console.log(body);
    return body;
  }
}
