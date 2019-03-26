import { mergeDeep } from "apollo-utilities";
import { depositeCreateMutation } from "./mutations/depositCreate.mutation";

export const depositResolvers = mergeDeep(depositeCreateMutation);
