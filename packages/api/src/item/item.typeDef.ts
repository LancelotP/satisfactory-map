import { gql } from "apollo-server-core";

export const itemTypeDef = gql`
  type Item implements Node {
    id: ID!

    name: String!
  }

  extend type Query {
    item(itemId: ID!): Item!
  }
`;
