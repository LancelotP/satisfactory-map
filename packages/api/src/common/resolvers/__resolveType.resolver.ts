import { IResolvers } from "../../types";
import { User } from "../../user/user.model";

export default {
  Node: {
    __resolveType: _ => {
      if (_ instanceof User) {
        return "User";
      }

      throw new Error();
    }
  },
  Connection: {
    __resolveType: _ => {
      return "MapMarkerConnection";
    }
  },
  Edge: {
    __resolveType: _ => {
      return "MapMarkerEdge";
    }
  }
} as IResolvers;
