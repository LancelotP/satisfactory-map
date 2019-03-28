import { IResolvers } from "../../types";
import { getConnection } from "typeorm";
import { Map } from "../map.model";

export default {
  Query: {
    defaultMap: () => {
      return getConnection()
        .getRepository(Map)
        .findOneOrFail(1);
    }
  }
} as IResolvers;
