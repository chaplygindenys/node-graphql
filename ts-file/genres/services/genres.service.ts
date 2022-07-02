import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { Context } from 'apollo-server-core';
import console from 'console';

import { Genre } from '../../interface';
import { addTrueId } from '../../services.js';

export class GenresAPI extends RESTDataSource {
  constructor() {
    // private readonly bandsService: BandsService // private readonly artistsService: ArtistsService, // private readonly genresService: GenresService, // private readonly tracksService: TracksService,
    super();
    this.baseURL = `http://localhost:3001/v1/genres`;
  }
  async willSendRequest(request: RequestOptions) {
    console.log(this.context.token);
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  getAllGenre(opt: {}) {
    const body = this.get('', opt);
    console.log('services: ', body);
    return body;
  }

  async getAllGenresbyIds(ids: string[]) {
    try {
      let genres = [];
      for (let index = 0; index < ids.length; index++) {
        const id = ids[index];
        const genre = await this.getGenre(id);
        console.log('genre: ---->', genre);
        genres.push(addTrueId(genre));
      }
      console.log('A', genres);
      return genres;
    } catch (error) {
      if (error) {
        console.log('EEEEEEEEEEEE', error);
        return null;
      }
    }
  }
  getGenre(id: string) {
    const body = this.get(`/${encodeURIComponent(id)}`);
    console.log('services: ', body);
    return body;
  }
  async postGenre({ name, description, country, year }: Genre) {
    console.log('ttttttttttttttttt', { name, description, country, year });
    const body = this.post('', {
      name,
      description,
      country,
      year,
    });
    console.log('services: ', body);
    return body;
  }
  putGenre(id: string, { name, description, country, year }: Genre) {
    const body = this.put(`/${id}`, {
      name,
      description,
      country,
      year,
    });
    console.log('services: ', body);
    return body;
  }
  remoweGenre(id: string) {
    const body = this.delete(`/${encodeURIComponent(id)}`);
    console.log('services: ', body);
    return body;
  }
}
