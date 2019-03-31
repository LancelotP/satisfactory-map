import { IResolvers } from "../../types";
import { getRepository } from "typeorm";
import { Marker } from "../marker.model";

export default {
  Query: {
    markersConnection: async () => {
      const [markers, count] = await getRepository(Marker).findAndCount();

      return {
        totalCount: count,
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false
        },
        edges: markers.map(marker => ({
          cursor: `Marker:${marker.id}`,
          node: marker
        }))
      };
    }
  }
} as IResolvers;
