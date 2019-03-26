import { IResolvers } from "../../types";
import { getConnection } from "typeorm";
import { Deposit } from "../../deposit/deposit.model";

export const markersResolver: IResolvers = {
  Map: {
    markers: async _ => {
      const [markers, totalCount] = await getConnection()
        .getRepository(Deposit)
        .createQueryBuilder("marker")
        .innerJoin("marker.map", "map", "map.id = :mapId", { mapId: _.id })
        .getManyAndCount();

      return {
        totalCount,
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: "TO_BE_IMPLEMENTED",
          endCursor: "TO_BE_IMPLEMENTED"
        },
        edges: markers.map(marker => ({
          cursor: `Marker:${marker.id}`,
          node: marker
        }))
      };
    }
  }
};
