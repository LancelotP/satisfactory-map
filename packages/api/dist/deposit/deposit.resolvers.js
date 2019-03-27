"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_utilities_1 = require("apollo-utilities");
const depositCreate_mutation_1 = require("./mutations/depositCreate.mutation");
const addedBy_resolver_1 = require("./resolvers/addedBy.resolver");
exports.depositResolvers = apollo_utilities_1.mergeDeep(depositCreate_mutation_1.depositeCreateMutation, addedBy_resolver_1.addedByResolver);
