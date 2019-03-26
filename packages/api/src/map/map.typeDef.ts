import { gql } from "apollo-server-core";

export const mapTypeDef = gql`
  type Map implements Node {
    id: ID!

    markers: MapMarkerConnection!
  }

  type MapMarkerConnection implements Connection {
    pageInfo: PageInfo!
    totalCount: Int!
    edges: [MapMarkerEdge!]!
  }

  type MapMarkerEdge implements Edge {
    cursor: String!
    node: Marker!
  }

  extend type Query {
    defaultMap: Map!
  }
`;
