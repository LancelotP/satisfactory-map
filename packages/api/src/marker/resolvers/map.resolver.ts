import { IResolvers } from "../../types";
import { getConnection } from "typeorm";
import { Map } from "../../map/map.model";

export const mapResolver: IResolvers = {
  Marker: {
    map: async _ => {
      const map = await getConnection()
        .getRepository(Map)
        .createQueryBuilder("map")
        .innerJoin("map.markers", "markers", "markers.id = :markerId", {
          markerId: _.id
        })
        .getOne();

      return map;
    }
  }
};
