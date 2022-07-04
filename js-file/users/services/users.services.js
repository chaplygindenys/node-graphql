import { RESTDataSource } from 'apollo-datasource-rest';
export class UsersAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = `http://localhost:3004/v1/users`;
    }
    async postUser(firstName, lastName, password, email) {
        const newUser = this.post('/register', {
            firstName,
            lastName,
            password,
            email,
        });
        console.log(newUser);
        return newUser;
    }
    async loginUser(psw, ml) {
        console.log('sdssfsdfsdf', psw);
        console.log(ml);
        const JWT = this.post('/login', {
            email: ml,
            password: psw,
        });
        console.log(JWT);
        return JWT;
    }
    async getUser(id) {
        const user = this.get(`/${encodeURIComponent(id)}`);
        console.log(user);
        return user;
    }
}
