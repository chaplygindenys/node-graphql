import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

export class UsersAPI extends RESTDataSource {
  constructor() {
    // private readonly bandsService: BandsService // private readonly artistsService: ArtistsService, // private readonly genresService: GenresService, // private readonly tracksService: TracksService,
    super();
    this.baseURL = `http://localhost:3004/v1/users`;
  }
  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', `${this.context.token}`);
  }

  async postUser(
    firstName: string,
    lastName: string,
    password: string,
    email: string
  ) {
    const newUser = this.post('/register', {
      firstName,
      lastName,
      password,
      email,
    });
    console.log(newUser);
    return newUser;
  }
  async loginUser(psw: string, ml: string) {
    console.log('sdssfsdfsdf', psw);
    console.log(ml);
    const JWT = this.post('/login', {
      email: ml,
      password: psw,
    });
    console.log(JWT);
    return JWT;
  }

  async getUser(id: string) {
    const user = this.get(`/${encodeURIComponent(id)}`);
    console.log(user);
    return user;
  }
}
