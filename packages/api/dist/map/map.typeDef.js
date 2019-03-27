"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_core_1 = require("apollo-server-core");
exports.mapTypeDef = apollo_server_core_1.gql `
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
