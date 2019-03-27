"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_core_1 = require("apollo-server-core");
exports.userTypeDef = apollo_server_core_1.gql `
  type User implements Node {
    id: ID!
    userName: String

    createdAt: DateTime
  }

  extend type Query {
    viewer: User
  }
`;
