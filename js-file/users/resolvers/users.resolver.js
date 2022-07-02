import console from 'console';
export const resolverUsers = {
    Query: {
        jwt: async (_source, { password, email }, { dataSources }) => {
            console.log(password, email);
            console.log(dataSources);
            try {
                const body = await dataSources.usersAPI.loginUser(password, email);
                console.log(body.jwt);
                return {
                    JWT: body.jwt,
                };
            }
            catch (err) {
                if (err) {
                    console.error(err);
                }
            }
        },
        user: async (_source, { id }, { dataSources }) => {
            console.log(id);
            console.log(dataSources);
            try {
                const body = await dataSources.usersAPI.getUser(id);
                console.log(`resolver`, body);
                return {
                    id: body._id,
                    firstName: body.firstName,
                    lastName: body.lastName,
                    password: body.password,
                    email: body.email,
                };
            }
            catch (err) {
                if (err) {
                    console.log(err);
                }
            }
        },
    },
    Mutation: {
        register: async (_source, { firstName, lastName, password, email }, { dataSources }) => {
            console.log(firstName, lastName, password, email);
            console.log(dataSources);
            try {
                const body = await dataSources.usersAPI.postUser(firstName, lastName, password, email);
                console.log(`resolver`, body);
                return {
                    id: body._id,
                    firstName: body.firstName,
                    lastName: body.lastName,
                    password: body.password,
                    email: body.email,
                };
            }
            catch (err) {
                if (err) {
                    console.log(err);
                }
            }
        },
    },
};
