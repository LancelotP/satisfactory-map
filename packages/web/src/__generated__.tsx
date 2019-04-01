export type Maybe<T> = T | null;

export enum ResourceNodeQuality {
  Impure = "IMPURE",
  Normal = "NORMAL",
  Pure = "PURE",
  Unknown = "UNKNOWN"
}

export enum ResourceNodeType {
  Iron = "IRON",
  Copper = "COPPER",
  Limestone = "LIMESTONE",
  Bauxite = "BAUXITE",
  Uranium = "URANIUM",
  Coal = "COAL",
  Oil = "OIL",
  Sulfur = "SULFUR",
  Quartz = "QUARTZ",
  Sam = "SAM",
  Caterium = "CATERIUM",
  Geyser = "GEYSER",
  Unknown = "UNKNOWN"
}

export enum SlugType {
  Purple = "PURPLE",
  Yellow = "YELLOW",
  Green = "GREEN"
}

export enum OrderDirection {
  Asc = "ASC",
  Desc = "DESC"
}

/** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
export type DateTime = string;

/** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
export type Date = string;

/** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
export type Time = string;

// ====================================================
// Documents
// ====================================================

export type InteractiveMapVariables = {};

export type InteractiveMapQuery = {
  __typename?: "Query";

  markersConnection: InteractiveMapMarkersConnection;
};

export type InteractiveMapMarkersConnection = {
  __typename?: "MarkersConnection";

  totalCount: number;

  edges: InteractiveMapEdges[];
};

export type InteractiveMapEdges = {
  __typename?: "MarkersConnectionEdge";

  cursor: string;

  node: InteractiveMapNode;
};

export type InteractiveMapNode = {
  __typename?: "Marker";

  id: string;

  position: InteractiveMapPosition;

  target: InteractiveMapTarget;
} & MarkerFragment;

export type InteractiveMapPosition = {
  __typename?: "MarkerPoint";

  x: number;

  y: number;

  z: number;
};

export type InteractiveMapTarget =
  | (InteractiveMapResourceNodeInlineFragment & RnMarkerFragment)
  | InteractiveMapSlugInlineFragment
  | (InteractiveMapDropPodInlineFragment & DropPodMarkerFragment);

export type InteractiveMapResourceNodeInlineFragment = {
  __typename: "ResourceNode";

  nodeType: ResourceNodeType;
};

export type InteractiveMapSlugInlineFragment = {
  __typename: "Slug";

  slugType: SlugType;
};

export type InteractiveMapDropPodInlineFragment = {
  __typename: "DropPod";

  id: string;
};

export type AppVariables = {};

export type AppQuery = {
  __typename?: "Query";

  viewer: Maybe<AppViewer>;
};

export type AppViewer = {
  __typename?: "User";

  id: string;
};

export type DropPodMarkerFragment = {
  __typename?: "DropPod";

  id: string;
};

export type RnMarkerFragment = {
  __typename?: "ResourceNode";

  id: string;

  type: ResourceNodeType;

  quality: ResourceNodeQuality;
};

export type MarkerFragment = {
  __typename?: "Marker";

  id: string;

  position: MarkerPosition;

  obstructed: boolean;

  information: Maybe<string>;

  target: MarkerTarget;
};

export type MarkerPosition = {
  __typename?: "MarkerPoint";

  x: number;

  y: number;

  z: number;
};

export type MarkerTarget =
  | MarkerResourceNodeInlineFragment
  | MarkerSlugInlineFragment
  | MarkerDropPodInlineFragment;

export type MarkerResourceNodeInlineFragment = {
  __typename?: "ResourceNode";

  id: string;

  nodeType: ResourceNodeType;

  nodeQuality: ResourceNodeQuality;
};

export type MarkerSlugInlineFragment = {
  __typename?: "Slug";

  id: string;

  slugType: SlugType;
};

export type MarkerDropPodInlineFragment = {
  __typename?: "DropPod";

  id: string;
};

import gql from "graphql-tag";
import * as ReactApolloHooks from "react-apollo-hooks";

// ====================================================
// Fragments
// ====================================================

export const DropPodMarkerFragmentDoc = gql`
  fragment DropPodMarker on DropPod {
    id
  }
`;

export const RnMarkerFragmentDoc = gql`
  fragment RNMarker on ResourceNode {
    id
    type
    quality
  }
`;

export const MarkerFragmentDoc = gql`
  fragment Marker on Marker {
    id
    position {
      x
      y
      z
    }
    obstructed
    information
    target {
      ... on ResourceNode {
        id
        nodeType: type
        nodeQuality: quality
      }
      ... on Slug {
        id
        slugType: type
      }
      ... on DropPod {
        id
      }
    }
  }
`;

// ====================================================
// Components
// ====================================================

export const InteractiveMapDocument = gql`
  query InteractiveMap {
    markersConnection {
      totalCount
      edges {
        cursor
        node {
          id
          position {
            x
            y
            z
          }
          target {
            ...RNMarker
            ...DropPodMarker
            ... on ResourceNode {
              __typename
              nodeType: type
            }
            ... on Slug {
              __typename
              slugType: type
            }
            ... on DropPod {
              __typename
              id
            }
          }
          ...Marker
        }
      }
    }
  }

  ${RnMarkerFragmentDoc}
  ${DropPodMarkerFragmentDoc}
  ${MarkerFragmentDoc}
`;
export function useInteractiveMap(
  baseOptions?: ReactApolloHooks.QueryHookOptions<InteractiveMapVariables>
) {
  return ReactApolloHooks.useQuery<
    InteractiveMapQuery,
    InteractiveMapVariables
  >(InteractiveMapDocument, baseOptions);
}
export const AppDocument = gql`
  query App {
    viewer {
      id
    }
  }
`;
export function useApp(
  baseOptions?: ReactApolloHooks.QueryHookOptions<AppVariables>
) {
  return ReactApolloHooks.useQuery<AppQuery, AppVariables>(
    AppDocument,
    baseOptions
  );
}
