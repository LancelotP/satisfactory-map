"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_core_1 = require("apollo-server-core");
exports.markerTypeDef = apollo_server_core_1.gql `
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
