"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const __resolveType_resolver_1 = require("./resolvers/__resolveType.resolver");
const Date_resolver_1 = require("./resolvers/Date.resolver");
const DateTime_resolver_1 = require("./resolvers/DateTime.resolver");
const Time_resolver_1 = require("./resolvers/Time.resolver");
exports.commonResolvers = lodash_1.merge(__resolveType_resolver_1.resolveTypeResolver, Date_resolver_1.DateResolver, DateTime_resolver_1.DateTimeResolver, Time_resolver_1.TimeResolver);
