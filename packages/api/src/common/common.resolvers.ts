import { merge } from "lodash";
import { resolveTypeResolver } from "./resolvers/__resolveType.resolver";
import { DateResolver } from "./resolvers/Date.resolver";
import { DateTimeResolver } from "./resolvers/DateTime.resolver";
import { TimeResolver } from "./resolvers/Time.resolver";

export const commonResolvers = merge(
  resolveTypeResolver,
  DateResolver,
  DateTimeResolver,
  TimeResolver
);
