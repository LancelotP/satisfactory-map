import { IResolvers } from "../../types";
import { getConnection } from "typeorm";
import { Deposit } from "../deposit.model";
import { Map } from "../../map/map.model";

export const depositeCreateMutation: IResolvers = {
  Mutation: {
    depositCreate: async (_, args) => {
      const repo = getConnection().getRepository(Deposit);

      const map = await getConnection()
        .getRepository(Map)
        .findOneOrFail(1);

      return await repo.save(repo.create({ ...args.input, map }));
    }
  }
};
