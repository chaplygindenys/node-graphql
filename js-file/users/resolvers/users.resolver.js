import console from 'console';
export const resolverUsers = {
    Query: {
        jwt: async (_source, { password, email }, { dataSources }, context) => {
            console.log(password, email);
            console.log(dataSources);
            try {
                const body = await dataSources.usersAPI.loginUser(password, email);
                console.log(body.jwt);
                return {
                    code: 200,
                    success: true,
                    message: 'User successfully created!',
                    JWT: body.jwt,
                };
            }
            catch (err) {
                if (err) {
                    console.error(err);
                    return {
                        code: 400,
                        success: false,
                        message: err.message,
                    };
                }
            }
        },
        user: async (_source, { id }, { dataSources }, context) => {
            console.log(id);
            console.log(dataSources);
            try {
                const body = await dataSources.usersAPI.getUser(id);
                console.log(`resolver`, body);
                return {
                    code: 200,
                    success: true,
                    message: 'User successfully created!',
                    user: {
                        id: body._id,
                        firstName: body.firstName,
                        lastName: body.lastName,
                        password: body.password,
                        email: body.email,
                    },
                };
            }
            catch (err) {
                if (err) {
                    console.log(err);
                    return {
                        code: 400,
                        success: false,
                        message: err.message,
                    };
                }
            }
        },
    },
    Mutation: {
        register: async (_source, { firstName, lastName, password, email }, { dataSources }, context) => {
            console.log(firstName, lastName, password, email);
            console.log(dataSources);
            try {
                const body = await dataSources.usersAPI.postUser(firstName, lastName, password, email);
                console.log(`resolver`, body);
                return {
                    code: 201,
                    success: true,
                    message: 'User successfully created!',
                    user: {
                        id: body._id,
                        firstName: body.firstName,
                        lastName: body.lastName,
                        password: body.password,
                        email: body.email,
                    },
                };
            }
            catch (err) {
                if (err) {
                    return {
                        code: 400,
                        success: false,
                        message: err.message,
                    };
                }
            }
        },
    },
};
