import { mergeDeep } from "apollo-utilities";
import { resolveTypeResolver } from "./resolvers/__resolveType.resolver";

export const markerResolvers = mergeDeep(resolveTypeResolver);
