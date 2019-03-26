import { gql } from "apollo-server-core";

export const markerTypeDef = gql`
  interface IMarker {
    id: ID!
    map: Map!

    lat: Int!
    lng: Int!

    createdAt: DateTime!
    updatedAt: DateTime!
  }

  union Marker = Deposit
`;
