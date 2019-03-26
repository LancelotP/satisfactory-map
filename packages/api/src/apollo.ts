import { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "./schema";

export function applyApolloMiddleware(app: Application) {
  const apolloServer = new ApolloServer({
    schema: schema
  });

  apolloServer.applyMiddleware({ app });
}
