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
        name: "Connection",
        possibleTypes: [
          {
            name: "MarkersConnection"
          }
        ]
      },
      {
        kind: "INTERFACE",
        name: "Edge",
        possibleTypes: [
          {
            name: "MarkersConnectionEdge"
          }
        ]
      },
      {
        kind: "UNION",
        name: "MarkerTarget",
        possibleTypes: [
          {
            name: "ResourceNode"
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
