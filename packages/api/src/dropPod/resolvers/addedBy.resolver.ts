import { IResolvers } from "../../types";
import { getConnection } from "typeorm";
import { DropPod } from "../dropPod.model";

export default {
  DropPod: {
    addedBy: _ => {
      return getConnection()
        .getRepository(DropPod)
        .createQueryBuilder("dropPod")
        .relation("creator")
        .of(_)
        .loadOne();
    }
  }
} as IResolvers;
