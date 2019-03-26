import { IResolvers } from "../../types";
import { GraphQLDate } from "graphql-iso-date";

export const DateResolver: IResolvers = {
  Date: GraphQLDate
};
