import { gql } from "apollo-server-core";

export const userTypeDef = gql`
  type User implements Node {
    id: ID!
    userName: String

    createdAt: DateTime
  }

  extend type Query {
    viewer: User
  }
`;
