"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const lodash_1 = require("lodash");
const graphql_tools_1 = require("graphql-tools");
const common_typeDef_1 = require("./common/common.typeDef");
const item_typeDef_1 = require("./item/item.typeDef");
const map_typeDef_1 = require("./map/map.typeDef");
const marker_typeDef_1 = require("./marker/marker.typeDef");
const user_typeDef_1 = require("./user/user.typeDef");
const common_resolvers_1 = require("./common/common.resolvers");
const user_resolvers_1 = require("./user/user.resolvers");
const map_resolvers_1 = require("./map/map.resolvers");
const marker_resolvers_1 = require("./marker/marker.resolvers");
const deposit_typeDef_1 = require("./deposit/deposit.typeDef");
const deposit_resolvers_1 = require("./deposit/deposit.resolvers");
exports.default = graphql_tools_1.makeExecutableSchema({
    typeDefs: [
        common_typeDef_1.commonTypeDef,
        deposit_typeDef_1.depositTypeDef,
        item_typeDef_1.itemTypeDef,
        map_typeDef_1.mapTypeDef,
        marker_typeDef_1.markerTypeDef,
        user_typeDef_1.userTypeDef
    ],
    // @ts-ignore
    resolvers: lodash_1.merge(common_resolvers_1.commonResolvers, deposit_resolvers_1.depositResolvers, map_resolvers_1.mapResolvers, marker_resolvers_1.markerResolvers, user_resolvers_1.userResolvers)
});
