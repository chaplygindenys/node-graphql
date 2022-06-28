import { RESTDataSource } from 'apollo-datasource-rest';
export class PersonalizationAPI extends RESTDataSource {
    baseURL = 'http://localhost:3004/v1/users';
    willSendRequest(request) {
        request.headers.set('Authorization', this.context.token);
    }
}
