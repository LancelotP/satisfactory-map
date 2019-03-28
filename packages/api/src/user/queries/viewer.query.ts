import { IResolvers } from "../../types";

export default {
  Query: {
    viewer: (_, args, ctx) => ctx.viewer
  }
} as IResolvers;
