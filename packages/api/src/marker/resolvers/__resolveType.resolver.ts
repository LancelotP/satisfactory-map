import { IResolvers } from "../../types";
import { Deposit } from "../../deposit/deposit.model";

export const resolveTypeResolver: IResolvers = {
  Marker: {
    __resolveType: _ => {
      if (_ instanceof Deposit) {
        return "Deposit";
      }

      throw new Error("Unexpected server error");
    }
  }
};
