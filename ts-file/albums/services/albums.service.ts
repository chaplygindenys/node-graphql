import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import console from 'console';

import { Album } from '../../interface';

export class AlbumsAPI extends RESTDataSource {
  constructor() {
    // private readonly bandsService: BandsService // private readonly albumsService: AlbumsService, // private readonly genresService: GenresService, // private readonly tracksService: TracksService,
    super();
    this.baseURL = `http://localhost:3005/v1/albums`;
  }
  async willSendRequest(request: RequestOptions) {
    console.log(this.context.token);
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  getAllAlbum(opt: {}) {
    const body = this.get('', opt);
    console.log('services: ', body);
    return body;
  }

  async getAllAlbumsbyIds(ids: string[]) {
    try {
      let albums = [];
      for (let index = 0; index < ids.length; index++) {
        const id = ids[index];
        const album = await this.getAlbum(id);
        albums.push(album);
      }
      return albums;
    } catch (error) {
      if (error) {
        console.log('EEEalbum', error);
        return null;
      }
    }
  }
  async getAlbum(id: string) {
    console.log('getalbums', id);
    try {
      if (id === 'idsad') {
        throw new Error('idsad');
      }
      const body = this.get(`/${encodeURIComponent(id)}`);
      console.log('services: ', body);
      return body;
    } catch (error) {
      if (error) {
        console.log(error);
        return undefined;
      }
    }
  }
  async postAlbum(newAlbum: Album) {
    console.log('ttttttttttttttttt', newAlbum);
    const body = this.post('', newAlbum);
    console.log('services: ', body);
    return body;
  }
  putAlbum(id: string, upAlbum: Album) {
    const body = this.put(`/${encodeURIComponent(id)}`, upAlbum);
    console.log('services: ', body);
    return body;
  }
  remoweAlbum(id: string) {
    const body = this.delete(`/${encodeURIComponent(id)}`);
    console.log('services: ', body);
    return body;
  }
}
