export type Maybe<T> = T | null;

export interface MarkerCreateInput {
  type: MarkerType;

  lat: number;

  lng: number;

  deposit?: Maybe<MarkerCreateDepositInput>;

  slug?: Maybe<MarkerCreateSlugInput>;
}

export interface MarkerCreateDepositInput {
  type: DepositType;

  quality: DepositQuality;
}

export interface MarkerCreateSlugInput {
  type: SlugType;
}

export enum DepositQuality {
  Impure = "IMPURE",
  Normal = "NORMAL",
  Pure = "PURE"
}

export enum DepositType {
  Iron = "IRON",
  Copper = "COPPER",
  Limestone = "LIMESTONE",
  Coal = "COAL",
  Oil = "OIL",
  Sulphur = "SULPHUR",
  Caterium = "CATERIUM",
  Sam = "SAM",
  Quartz = "QUARTZ",
  Beauxite = "BEAUXITE",
  Uranium = "URANIUM"
}

export enum SlugType {
  Green = "GREEN",
  Yellow = "YELLOW",
  Purple = "PURPLE"
}

export enum MarkerType {
  Deposit = "DEPOSIT",
  Slug = "SLUG",
  DropPod = "DROP_POD"
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

export type MarkerCreateVariables = {
  input: MarkerCreateInput;
};

export type MarkerCreateMutation = {
  __typename?: "Mutation";

  markerCreate: MarkerCreateMarkerCreate;
};

export type MarkerCreateMarkerCreate =
  | DepositMarkerFragment
  | DropPodMarkerFragment
  | SlugMarkerFragment;

export type MapViewVariables = {};

export type MapViewQuery = {
  __typename?: "Query";

  defaultMap: MapViewDefaultMap;
};

export type MapViewDefaultMap = {
  __typename?: "Map";

  id: string;

  markers: MapViewMarkers;
};

export type MapViewMarkers = {
  __typename?: "MapMarkerConnection";

  edges: MapViewEdges[];
};

export type MapViewEdges = {
  __typename?: "MapMarkerEdge";

  node: MapViewNode;
};

export type MapViewNode =
  | DepositMarkerFragment
  | SlugMarkerFragment
  | DropPodMarkerFragment;

export type AppVariables = {};

export type AppQuery = {
  __typename?: "Query";

  viewer: Maybe<AppViewer>;
};

export type AppViewer = {
  __typename?: "User";

  id: string;
};

export type HomeVariables = {};

export type HomeQuery = {
  __typename?: "Query";

  defaultMap: HomeDefaultMap;
};

export type HomeDefaultMap = {
  __typename?: "Map";

  id: string;

  markers: HomeMarkers;
};

export type HomeMarkers = {
  __typename?: "MapMarkerConnection";

  totalCount: number;

  edges: HomeEdges[];
};

export type HomeEdges = {
  __typename?: "MapMarkerEdge";

  node: HomeNode;
};

export type HomeNode = HomeDepositInlineFragment;

export type HomeDepositInlineFragment = {
  __typename?: "Deposit";

  id: string;

  lat: number;

  lng: number;

  quality: DepositQuality;

  type: DepositType;
};

export type DepositMarkerFragment = {
  __typename?: "Deposit";

  id: string;

  lat: number;

  lng: number;

  quality: DepositQuality;

  type: DepositType;

  addedBy: Maybe<DepositMarkerAddedBy>;
};

export type DepositMarkerAddedBy = {
  __typename?: "User";

  id: string;

  userName: Maybe<string>;
};

export type SlugMarkerFragment = {
  __typename?: "Slug";

  id: string;

  lat: number;

  lng: number;

  slugType: SlugType;

  addedBy: Maybe<SlugMarkerAddedBy>;
};

export type SlugMarkerAddedBy = {
  __typename?: "User";

  id: string;

  userName: Maybe<string>;
};

export type DropPodMarkerFragment = {
  __typename?: "DropPod";

  id: string;

  lat: number;

  lng: number;

  addedBy: Maybe<DropPodMarkerAddedBy>;
};

export type DropPodMarkerAddedBy = {
  __typename?: "User";

  id: string;

  userName: Maybe<string>;
};

import gql from "graphql-tag";
import * as ReactApolloHooks from "react-apollo-hooks";

// ====================================================
// Fragments
// ====================================================

export const DepositMarkerFragmentDoc = gql`
  fragment DepositMarker on Deposit {
    id
    lat
    lng
    quality
    type
    addedBy {
      id
      userName
    }
  }
`;

export const SlugMarkerFragmentDoc = gql`
  fragment SlugMarker on Slug {
    id
    lat
    lng
    slugType: type
    addedBy {
      id
      userName
    }
  }
`;

export const DropPodMarkerFragmentDoc = gql`
  fragment DropPodMarker on DropPod {
    id
    lat
    lng
    addedBy {
      id
      userName
    }
  }
`;

// ====================================================
// Components
// ====================================================

export const MarkerCreateDocument = gql`
  mutation MarkerCreate($input: MarkerCreateInput!) {
    markerCreate(input: $input) {
      ...DepositMarker
      ...DropPodMarker
      ...SlugMarker
    }
  }

  ${DepositMarkerFragmentDoc}
  ${DropPodMarkerFragmentDoc}
  ${SlugMarkerFragmentDoc}
`;
export function useMarkerCreate(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    MarkerCreateMutation,
    MarkerCreateVariables
  >
) {
  return ReactApolloHooks.useMutation<
    MarkerCreateMutation,
    MarkerCreateVariables
  >(MarkerCreateDocument, baseOptions);
}
export const MapViewDocument = gql`
  query MapView {
    defaultMap {
      id
      markers {
        edges {
          node {
            ...DepositMarker
            ...SlugMarker
            ...DropPodMarker
          }
        }
      }
    }
  }

  ${DepositMarkerFragmentDoc}
  ${SlugMarkerFragmentDoc}
  ${DropPodMarkerFragmentDoc}
`;
export function useMapView(
  baseOptions?: ReactApolloHooks.QueryHookOptions<MapViewVariables>
) {
  return ReactApolloHooks.useQuery<MapViewQuery, MapViewVariables>(
    MapViewDocument,
    baseOptions
  );
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
export const HomeDocument = gql`
  query Home {
    defaultMap {
      id
      markers {
        totalCount
        edges {
          node {
            ... on Deposit {
              id
              lat
              lng
              quality
              type
            }
          }
        }
      }
    }
  }
`;
export function useHome(
  baseOptions?: ReactApolloHooks.QueryHookOptions<HomeVariables>
) {
  return ReactApolloHooks.useQuery<HomeQuery, HomeVariables>(
    HomeDocument,
    baseOptions
  );
}
