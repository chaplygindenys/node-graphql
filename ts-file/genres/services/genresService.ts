import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { Context } from 'apollo-server-core';
import console from 'console';
import { ArgumentNode } from 'graphql';
import { request } from 'http';

import { Genre } from '../../interface';

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

  getAllGenre() {
    const body = this.get('');
    console.log(body);
    return body;
  }
  getGenre(id: string) {
    const body = this.get(`/${encodeURIComponent(id)}`);
    console.log(body);
    return body;
  }
  postGenre({ name, description, country, year }: Genre) {
    const body = this.post('', {
      name,
      description,
      country,
      year,
    });
    console.log(body);
    return body;
  }
  putGenre(id: string, { name, description, country, year }: Genre) {
    const body = this.put(`/${id}`, {
      name,
      description,
      country,
      year,
    });
    console.log(body);
    return body;
  }
  remoweGenre(id: string) {
    const body = this.delete(`/${encodeURIComponent(id)}`);
    console.log(body);
    return body;
  }
}