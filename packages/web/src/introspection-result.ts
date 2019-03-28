export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string;
      name: string;
      possibleTypes: {
        name: string;
      }[];
    }[];
  };
}

const result: IntrospectionResultData = {
  __schema: {
    types: [
      {
        kind: "INTERFACE",
        name: "Node",
        possibleTypes: [
          {
            name: "Item"
          },
          {
            name: "Map"
          },
          {
            name: "User"
          }
        ]
      },
      {
        kind: "INTERFACE",
        name: "Connection",
        possibleTypes: [
          {
            name: "MapMarkerConnection"
          }
        ]
      },
      {
        kind: "INTERFACE",
        name: "Edge",
        possibleTypes: [
          {
            name: "MapMarkerEdge"
          }
        ]
      },
      {
        kind: "UNION",
        name: "Marker",
        possibleTypes: [
          {
            name: "Deposit"
          },
          {
            name: "Slug"
          },
          {
            name: "DropPod"
          }
        ]
      },
      {
        kind: "INTERFACE",
        name: "IMarker",
        possibleTypes: [
          {
            name: "Deposit"
          },
          {
            name: "Slug"
          },
          {
            name: "DropPod"
          }
        ]
      }
    ]
  }
};

export default result;
