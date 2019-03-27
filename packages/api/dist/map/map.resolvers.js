"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_utilities_1 = require("apollo-utilities");
const defaultMap_query_1 = require("./queries/defaultMap.query");
const markers_resolver_1 = require("./resolvers/markers.resolver");
exports.mapResolvers = apollo_utilities_1.mergeDeep(defaultMap_query_1.defaultMapQuery, markers_resolver_1.markersResolver);
