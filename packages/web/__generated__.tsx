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

export type AllMarkersVariables = {};

export type AllMarkersQuery = {
  __typename?: "Query";

  markers: AllMarkersMarkers;
};

export type AllMarkersMarkers = {
  __typename?: "MarkersConnection";

  totalCount: number;

  edges: AllMarkersEdges[];
};

export type AllMarkersEdges = {
  __typename?: "MarkersConnectionEdge";

  node: AllMarkersNode;
};

export type AllMarkersNode = {
  __typename?: "Marker";

  id: string;
} & MarkerFragment;

export type MarkerFragment = {
  __typename?: "Marker";

  id: string;

  lat: number;

  lng: number;

  alt: Maybe<number>;

  obstructed: boolean;

  target: MarkerTarget;
};

export type MarkerTarget =
  | MarkerResourceNodeInlineFragment
  | MarkerSlugInlineFragment
  | MarkerDropPodInlineFragment;

export type MarkerResourceNodeInlineFragment = {
  __typename?: "ResourceNode";

  id: string;

  rnType: ResourceNodeType;

  rnQuality: ResourceNodeQuality;
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
import * as React from "react";
import * as ReactApollo from "react-apollo";

// ====================================================
// Fragments
// ====================================================

export const MarkerFragmentDoc = gql`
  fragment Marker on Marker {
    id
    lat
    lng
    alt
    obstructed
    target {
      ... on ResourceNode {
        id
        rnType: type
        rnQuality: quality
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

export const AllMarkersDocument = gql`
  query AllMarkers {
    markers: markersConnection {
      totalCount
      edges {
        node {
          id
          ...Marker
        }
      }
    }
  }

  ${MarkerFragmentDoc}
`;
export class AllMarkersComponent extends React.Component<
  Partial<ReactApollo.QueryProps<AllMarkersQuery, AllMarkersVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<AllMarkersQuery, AllMarkersVariables>
        query={AllMarkersDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type AllMarkersProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<AllMarkersQuery, AllMarkersVariables>
> &
  TChildProps;
export function AllMarkersHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        AllMarkersQuery,
        AllMarkersVariables,
        AllMarkersProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    AllMarkersQuery,
    AllMarkersVariables,
    AllMarkersProps<TChildProps>
  >(AllMarkersDocument, operationOptions);
}
