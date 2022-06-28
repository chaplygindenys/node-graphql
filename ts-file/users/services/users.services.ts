import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { Context } from 'apollo-server-core';
import console from 'console';
import { ArgumentNode } from 'graphql';

import { BodyUser, User } from '../../interface';

export class UsersAPI extends RESTDataSource {
  constructor() {
    // private readonly bandsService: BandsService // private readonly artistsService: ArtistsService, // private readonly genresService: GenresService, // private readonly tracksService: TracksService,
    super();
    this.baseURL = `http://localhost:3004/v1/users`;
  }
  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', this.context.token);
  }

  postUser(user: BodyUser) {
    const newUser = this.post('/register', user);
    console.log(newUser);
    return newUser;
  }
  loginUser(psw: string, ml: string) {
    console.log('sdssfsdfsdf', psw);
    console.log(ml);
    const JWT = this.post('/login', {
      email: ml,
      password: psw,
    });
    console.log(JWT);
    return JWT;
  }
  verifyUser(token: string) {
    console.log(token);
    const body = this.post('/verify');
    console.log(body);
    return body;
  }
  async getUser(id: string) {
    const user = this.get(`/${encodeURIComponent(id)}`);
    console.log(user);
    return user;
  }

  //   users: (parent:ParentNode, args:ArgumentNode, context:Context) => {
  //   // In this case, we'll pretend there is no data when
  //   // we're not logged in. Another option would be to
  //   // throw an error.
  //     if(!context.token) { return null; }else {
  //   return context.models.User.getAll();
  // };
}
