## Installation

1. Clone/download repo :`https://github.com/rolling-scopes-school/node-graphql-service`
2. `npm install`

3. Clone/download repo :`https://github.com/chaplygindenys/node-graphql/tree/devlop`
4. `npm install`

## Usage

**run microservice**
` npm run run:all` in node-graphql-service/

**Development**

`npm run start:dev`

- App served @ `http://localhost:4000` with nodemon

**Production**

`npm run start`

- App served @ `http://localhost:4000` without nodemon

---

**All commands**

| Command             | Description                                          |
| ------------------- | ---------------------------------------------------- |
| `npm run start:dev` | App served @ `http://localhost:4000` with nodemon    |
| `npm run start`     | App served @ `http://localhost:4000` without nodemon |

**Note**: replace `npm` with `yarn` in `package.json` if you use yarn.

Please use an own account on https://studio.apollographql.com/

------------------------------------------------------------------------|
With Query u can try PostmanCollection:
or Postman with(./My-Graph-4-rzex@current.graphql) https://www.postman.com/graphql/
./Postman Collection (from GraphQL).postman_collection.json
------------------------------------------------------------------------|
http://localhost:PORT we take from : .env
------------------------------------------------------------------------|
default Offset and Limit we take from :
confing.ts :
defaultOffset = 0,
defaultLimit = 5,

------------------------------------------------------------------------|
mutation and favoutites shoulld use with a freash owen token in headers: `Authorization` `Bearer JWTfromQueryJWT.....`
for it are next steps:

1. in mutation register: User!
   make new user example json: {
   "firstName": "first name",
   "lastName": "last name",
   "password": "118649qwe",
   "email": "met9129@gmail.com",
   }

2. in query jwt: JWT
   make new JWT example json: {

   "password": "currentPasswordFromResponceRegister",
   "email": "currentEmailFromResponceRegister",
   }

-----------------------------------------------------------------------------------------|
