import { IResolvers } from "../../types";

export default {
  DropPod: {
    requirement: _ => {
      if (_.itemName || _.itemQuantity || _.powerNeeded) {
        return {
          itemName: _.itemName,
          itemQuantity: _.itemQuantity,
          powerNeeded: _.powerNeeded
        };
      } else {
        return null;
      }
    }
  }
} as IResolvers;
