"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_core_1 = require("apollo-server-core");
exports.commonTypeDef = apollo_server_core_1.gql `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  type Subscription {
    _empty: String
  }

  interface Node {
    id: ID!
  }

  interface Connection {
    pageInfo: PageInfo!
    totalCount: Int!
  }

  interface Edge {
    cursor: String!
  }

  enum OrderDirection {
    ASC
    DESC
  }

  type PageInfo {
    endCursor: String
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
  }

  scalar Date
  scalar DateTime
  scalar Time
`;
