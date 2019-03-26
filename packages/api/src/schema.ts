import "reflect-metadata";

import { merge } from "lodash";
import { makeExecutableSchema } from "graphql-tools";

import { commonTypeDef } from "./common/common.typeDef";
import { itemTypeDef } from "./item/item.typeDef";
import { mapTypeDef } from "./map/map.typeDef";
import { markerTypeDef } from "./marker/marker.typeDef";
import { userTypeDef } from "./user/user.typeDef";

import { commonResolvers } from "./common/common.resolvers";
import { userResolvers } from "./user/user.resolvers";
import { mapResolvers } from "./map/map.resolvers";
import { markerResolvers } from "./marker/marker.resolvers";
import { depositTypeDef } from "./deposit/deposit.typeDef";
import { depositResolvers } from "./deposit/deposit.resolvers";

export default makeExecutableSchema({
  typeDefs: [
    commonTypeDef,
    depositTypeDef,
    itemTypeDef,
    mapTypeDef,
    markerTypeDef,
    userTypeDef
  ],
  // @ts-ignore
  resolvers: merge(
    commonResolvers,
    depositResolvers,
    mapResolvers,
    markerResolvers,
    userResolvers
  )
});
