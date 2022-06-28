import { RESTDataSource } from 'apollo-datasource-rest';
import console from 'console';
export class UsersAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = `http://localhost:3004/v1/users`;
    }
    willSendRequest(request) {
        request.headers.set('Authorization', this.context.token);
    }
    postUser(user) {
        const newUser = this.post('/register', user);
        console.log(newUser);
        return newUser;
    }
    loginUser(psw, ml) {
        console.log('sdssfsdfsdf', psw);
        console.log(ml);
        const JWT = this.post('/login', {
            email: ml,
            password: psw,
        });
        console.log(JWT);
        return JWT;
    }
    verifyUser(token) {
        console.log(token);
        const body = this.post('/verify');
        console.log(body);
        return body;
    }
    async getUser(id) {
        const user = this.get(`/${encodeURIComponent(id)}`);
        console.log(user);
        return user;
    }
}
