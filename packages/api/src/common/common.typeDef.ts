import { gql } from "apollo-server-core";

export const commonTypeDef = gql`
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
