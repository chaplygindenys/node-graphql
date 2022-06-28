import console from 'console';
export const resolvers = {
    Query: {
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
        verify: async (_, __, ___, { UsersSource, token }) => {
            console.log(UsersSource);
            console.log(token);
            try {
                const user = await UsersSource.verifyUser(token);
                console.log(user);
                return {
                    code: 200,
                    success: true,
                    message: 'User successfully created!',
                    User: user,
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
        login: async (_source, { password, email }, { dataSources }, context) => {
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
        createUser: async (_, __, { bodyUser }, { UsersSource, token }) => {
            console.log(_);
            console.log(__);
            console.log(bodyUser);
            console.log(UsersSource);
            console.log(token);
            try {
                const newUser = await UsersSource.postUser(bodyUser);
                console.log(newUser);
                return {
                    code: 201,
                    success: true,
                    message: 'User successfully created!',
                    User: newUser,
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
