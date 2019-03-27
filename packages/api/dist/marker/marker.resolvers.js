"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_utilities_1 = require("apollo-utilities");
const __resolveType_resolver_1 = require("./resolvers/__resolveType.resolver");
exports.markerResolvers = apollo_utilities_1.mergeDeep(__resolveType_resolver_1.resolveTypeResolver);
