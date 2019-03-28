import { IResolvers } from "../../types";
import { Deposit } from "../../deposit/deposit.model";
import { DropPod } from "../../dropPod/dropPod.model";
import { Slug } from "../../slug/slug.model";

export default {
  Marker: {
    __resolveType: _ => {
      if (_ instanceof Deposit) return "Deposit";
      else if (_ instanceof Slug) return "Slug";
      else if (_ instanceof DropPod) return "DropPod";

      throw new Error("Unexpected server error");
    }
  },
  IMarker: {
    __resolveType: _ => {
      if (_ instanceof Deposit) return "Deposit";
      else if (_ instanceof Slug) return "Slug";
      else if (_ instanceof DropPod) return "DropPod";

      throw new Error("Unexpected server error");
    }
  }
} as IResolvers;
