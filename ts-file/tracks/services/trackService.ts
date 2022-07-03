import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { DataSources } from 'apollo-server-core/dist/graphqlOptions';
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
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  async getAllTrack(opt: any) {
    const body = this.get('', opt);
    return body;
  }

  async getTrack(id: string, dataSources: any) {
    const body: Track = await this.get(`/${encodeURIComponent(id)}`);
    return {
      id: body._id,
      title: body.title,
      duration: body.duration,
      released: body.released,
      album: dataSources.albumsAPI.getAlbum(body.albumId),
      bands: dataSources.bandsAPI.getAllBandsbyIds(body.bandsIds),
      genres: dataSources.genresAPI.getAllGenresbyIds(body.genresIds),
      artists: dataSources.artistsAPI.getAllArtistsbyIds(body.artistsIds),
    };
  }

  async getAllTracksbyIds(ids: string[], dataSources: any) {
    try {
      let tracks = [];
      for (let index = 0; index < ids.length; index++) {
        const id = ids[index];
        const track = await this.getTrack(id, dataSources);
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
