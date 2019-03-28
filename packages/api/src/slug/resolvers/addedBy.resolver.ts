import { IResolvers } from "../../types";
import { getConnection } from "typeorm";
import { Slug } from "../slug.model";

export default {
  Slug: {
    addedBy: _ => {
      return getConnection()
        .getRepository(Slug)
        .createQueryBuilder("slug")
        .relation("creator")
        .of(_)
        .loadOne();
    }
  }
} as IResolvers;
