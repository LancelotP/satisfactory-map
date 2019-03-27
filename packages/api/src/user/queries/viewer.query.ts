import { IResolvers } from "../../types";

export const viewerQuery: IResolvers = {
  Query: {
    viewer: (_, args, ctx) => {
      return ctx.viewer;
    }
  }
};
