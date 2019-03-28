import "reflect-metadata";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";

const typesArray = fileLoader(__dirname, {
  recursive: true,
  extensions: [".graphql"]
});

const resolversArray = [
  ...fileLoader(`${__dirname}/**/*.resolver.*s`, { recursive: true }),
  ...fileLoader(`${__dirname}/**/*.query.*s`, { recursive: true }),
  ...fileLoader(`${__dirname}/**/*.mutation.*s`, { recursive: true }),
  ...fileLoader(`${__dirname}/**/*.subscription.*s`, { recursive: true })
];

export default makeExecutableSchema({
  typeDefs: mergeTypes(typesArray, { all: true }),
  resolvers: mergeResolvers(resolversArray)
});
