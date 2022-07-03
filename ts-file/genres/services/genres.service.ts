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
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  async getAllGenre(opt: {}) {
    const body = this.get('', opt);
    return body;
  }

  async getAllGenresbyIds(ids: string[]) {
    try {
      let genres = [];
      for (let index = 0; index < ids.length; index++) {
        const id = ids[index];
        const genre = await this.getGenre(id);
        console.log('genre: ---->', genre);
        genres.push(genre);
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
  async getGenre(id: string) {
    const body: Genre = await this.get(`/${encodeURIComponent(id)}`);
    return {
      id: body._id,
      name: body.name,
      description: body.description,
      country: body.country,
      year: body.year,
    };
  }
  async postGenre({ name, description, country, year }: Genre) {
    const body = this.post('', {
      name,
      description,
      country,
      year,
    });
    return body;
  }
  async putGenre(id: string, { name, description, country, year }: Genre) {
    const body = this.put(`/${id}`, {
      name,
      description,
      country,
      year,
    });
    return body;
  }
  async remoweGenre(id: string) {
    const body = this.delete(`/${encodeURIComponent(id)}`);
    return body;
  }
}
