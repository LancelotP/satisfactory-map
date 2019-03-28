import { IResolvers } from "../../types";
import { getRepository } from "typeorm";
import { Deposit } from "../../deposit/deposit.model";
import { Slug } from "../../slug/slug.model";
import { DropPod } from "../../dropPod/dropPod.model";

export default {
  Map: {
    markers: async _ => {
      const [
        [deposits, depositCount],
        [slugs, slugCount],
        [dropPods, dropPodsCount]
      ] = await Promise.all(
        [Deposit, Slug, DropPod].map(model =>
          getRepository(model)
            .createQueryBuilder("marker")
            .innerJoin("marker.map", "map", "map.id = :mapId", { mapId: _.id })
            .getManyAndCount()
        )
      );

      const nodes = [...deposits, ...slugs, ...dropPods].sort((a, b) =>
        a.createdAt < b.createdAt ? 1 : -1
      );

      return {
        totalCount: depositCount + slugCount + dropPodsCount,
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: "TO_BE_IMPLEMENTED",
          endCursor: "TO_BE_IMPLEMENTED"
        },
        edges: nodes.map(node => {
          let cursor: string;

          if (node instanceof Deposit) cursor = `Deposit:${node.id}`;
          else if (node instanceof Slug) cursor = `Slug:${node.id}`;
          else if (node instanceof DropPod) cursor = `DropPod:${node.id}`;

          return {
            cursor,
            node: node
          };
        })
      };
    }
  }
} as IResolvers;
