import "reflect-metadata";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";

const typesArray = fileLoader(__dirname, {
  recursive: true,
  extensions: [".graphql"]
});

const resolversArray = [
  ...fileLoader(`${__dirname}/**/*.resolver.ts`, { recursive: true }),
  ...fileLoader(`${__dirname}/**/*.query.ts`, { recursive: true }),
  ...fileLoader(`${__dirname}/**/*.mutation.ts`, { recursive: true }),
  ...fileLoader(`${__dirname}/**/*.subscription.ts`, { recursive: true })
];

export default makeExecutableSchema({
  typeDefs: mergeTypes(typesArray, { all: true }),
  resolvers: mergeResolvers(resolversArray)
});
