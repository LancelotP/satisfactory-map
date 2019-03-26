import { IResolvers } from "../../types";

export const viewerQuery: IResolvers = {
  Query: {
    viewer: async () => {
      await new Promise(r => setTimeout(r, 2000));

      return {
        id: 42,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }
  }
};
