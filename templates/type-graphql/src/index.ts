import { createConnection } from "typeorm";
import { ArgumentValidationError, buildSchema } from "type-graphql";
import { ApolloError, ApolloServer } from "apollo-server-express";
import { GraphQLError } from "graphql";
import { v4 } from "uuid";
import { values } from "lodash";
import { RedisClient } from "./constants/variables";
import ConnectRedis from "connect-redis";
import express from "express";
import session from "express-session";
import "reflect-metadata";
//@ts-ignore
const PORT = parseInt(process.env.PORT);
async function main() {
  await createConnection();
  const RedisStore = ConnectRedis(session);
  const app = express();
  app.use(
    session({
      name: "SESSION_ID",
      secret: "sKCx49VgtHZ59bJOTLcU0Gr06ogUnDJi",
      store: new RedisStore({ client: RedisClient }),
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    })
  );
  const schema = await buildSchema({
    resolvers: [__dirname + "/resolvers/**/*.ts"],
    authChecker: ({ context: { req } }) => {
      return req.session.user_id ? true : false;
    },
  });
  const gserver = new ApolloServer({
    schema,
    playground: {
      settings: {
        "request.credentials": "include",
      },
    },
    context: ({ req, res }) => ({ req, res }),
    formatError: (error: GraphQLError) => {
      const { originalError } = error;
      if (originalError instanceof ApolloError) {
        return error;
      }
      if (originalError instanceof ArgumentValidationError) {
        let {
          extensions: {
            //@ts-ignore
            exception: { validationErrors },
          },
          message,
        } = error;
        validationErrors = validationErrors.map((element: any) => {
          return { [element.property]: values(element.constraints)[0] };
        });
        message = "Invalid Input";
        return {
          validationErrors,
          message,
        };
      }
      const error_id = v4();
      console.log(`Error ID: ${error_id}`);
      console.log(error);
      console.log(typeof originalError);
      return new GraphQLError(`Internal Server Error: ${error_id}`);
    },
  });
  gserver.applyMiddleware({ app });
  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}/graphql`);
  });
}
main();
