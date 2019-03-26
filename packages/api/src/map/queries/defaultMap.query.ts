import { IResolvers } from "../../types";
import { getConnection } from "typeorm";
import { Map } from "../map.model";

export const defaultMapQuery: IResolvers = {
  Query: {
    defaultMap: () => {
      return getConnection()
        .getRepository(Map)
        .findOneOrFail(1);
    }
  }
};
