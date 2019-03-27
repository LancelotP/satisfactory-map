"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_core_1 = require("apollo-server-core");
exports.itemTypeDef = apollo_server_core_1.gql `
  type Item implements Node {
    id: ID!

    name: String!
  }

  extend type Query {
    item(itemId: ID!): Item!
  }
`;
