import { IResolvers } from "../../types";
import { GraphQLDateTime } from "graphql-iso-date";

export const DateTimeResolver: IResolvers = {
  DateTime: GraphQLDateTime
};
