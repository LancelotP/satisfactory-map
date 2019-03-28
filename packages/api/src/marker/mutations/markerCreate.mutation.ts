import { IResolvers, MarkerType } from "../../types";
import { AuthenticationError, UserInputError } from "apollo-server-core";
import { Deposit } from "../../deposit/deposit.model";
import { Slug } from "../../slug/slug.model";
import { getRepository } from "typeorm";
import { Map } from "../../map/map.model";

export default {
  Mutation: {
    markerCreate: async (_, { input }, { viewer }) => {
      if (!viewer) {
        throw new AuthenticationError("You must logged in to create a marker");
      }

      if (input.type === MarkerType.Deposit && !input.deposit) {
        throw new UserInputError("You must provide deposit input");
      } else if (input.type === MarkerType.Slug && !input.slug) {
        throw new UserInputError("You must provide slug input");
      }

      const map = await getRepository(Map).findOne();

      if (input.type === MarkerType.Deposit) {
        const repo = getRepository(Deposit);

        return await repo.save(
          repo.create({
            map,
            creator: viewer,
            lat: input.lat,
            lng: input.lng,
            type: input.deposit.type,
            quality: input.deposit.quality
          })
        );
      } else if (input.type === MarkerType.Slug) {
        const repo = getRepository(Slug);

        return await repo.save(
          repo.create({
            map,
            creator: viewer,
            lat: input.lat,
            lng: input.lng,
            type: input.slug.type
          })
        );
      } else {
        throw new Error("TO_BE_IMPLEMENTED");
      }
    }
  }
} as IResolvers;
