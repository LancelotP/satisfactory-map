import { IResolvers } from "../../types";
import { GraphQLTime } from "graphql-iso-date";

export const TimeResolver: IResolvers = {
  Time: GraphQLTime
};
