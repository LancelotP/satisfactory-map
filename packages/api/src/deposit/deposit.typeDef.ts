import { gql } from "apollo-server-core";

export const depositTypeDef = gql`
  type Deposit implements IMarker {
    id: ID!
    map: Map!

    lat: Int!
    lng: Int!

    createdAt: DateTime!
    updatedAt: DateTime!

    quality: DepositQuality!
    type: DepositType!
  }

  enum DepositQuality {
    IMPURE
    NORMAL
    PURE
  }

  enum DepositType {
    IRON
    COPPER
    LIMESTONE
    COAL
    OIL
    SULPHUR
    CATERIUM
    SAM
    QUARTZ
    BEAUXITE
    URANIUM
  }

  extend type Mutation {
    depositCreate(input: DepositCreateInput!): Deposit!
  }

  input DepositCreateInput {
    lat: Int
    lng: Int
    type: DepositType
    quality: DepositQuality
  }
`;
