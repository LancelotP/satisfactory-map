import { mergeDeep } from "apollo-utilities";
import { depositeCreateMutation } from "./mutations/depositCreate.mutation";
import { addedByResolver } from "./resolvers/addedBy.resolver";

export const depositResolvers = mergeDeep(
  depositeCreateMutation,
  addedByResolver
);
