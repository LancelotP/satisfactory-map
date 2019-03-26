import { mergeDeep } from "apollo-utilities";
import { defaultMapQuery } from "./queries/defaultMap.query";
import { markersResolver } from "./resolvers/markers.resolver";

export const mapResolvers = mergeDeep(defaultMapQuery, markersResolver);
