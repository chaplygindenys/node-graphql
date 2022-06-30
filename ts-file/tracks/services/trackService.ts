import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { Context } from 'apollo-server-core';
import console from 'console';
import { ArgumentNode } from 'graphql';
import { request } from 'http';

import { BodyUser, Track, updateTrack, User } from '../../interface';

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

  getAllTrack() {
    const tracks = this.get('');
    console.log(tracks);
    return tracks;
  }
  async getTrack(id: string) {
    const track = this.get(`/${encodeURIComponent(id)}`);
    console.log(track);
    return track;
  }
  postTrack({
    title,
    albumId,
    bandsIds,
    duration,
    released,
    genresIds,
  }: Track) {
    const newTrack = this.post('', {
      title,
      albumId,
      bandsIds,
      duration,
      released,
      genresIds,
    });
    console.log(newTrack);
    return newTrack;
  }
  putTrack(
    id: string,
    { title, albumId, bandsIds, duration, released, genresIds }: updateTrack
  ) {
    const updateTrack = this.put(`/${id}`, {
      title,
      albumId,
      bandsIds,
      duration,
      released,
      genresIds,
    });
    console.log(updateTrack);
    return updateTrack;
  }
  async remoweTrack(id: string) {
    const body = this.delete(`/${encodeURIComponent(id)}`);
    console.log(body);
    return body;
  }
}
