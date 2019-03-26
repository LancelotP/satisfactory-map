export type Maybe<T> = T | null;

export interface DepositCreateInput {
  lat?: Maybe<number>;

  lng?: Maybe<number>;

  type?: Maybe<DepositType>;

  quality?: Maybe<DepositQuality>;
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

export type DepositeCreateVariables = {
  input: DepositCreateInput;
};

export type DepositeCreateMutation = {
  __typename?: "Mutation";

  depositCreate: DepositeCreateDepositCreate;
};

export type DepositeCreateDepositCreate = {
  __typename?: "Deposit";

  id: string;
};

import gql from "graphql-tag";
import * as ReactApolloHooks from "react-apollo-hooks";

// ====================================================
// Components
// ====================================================

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
export const DepositeCreateDocument = gql`
  mutation DepositeCreate($input: DepositCreateInput!) {
    depositCreate(input: $input) {
      id
    }
  }
`;
export function useDepositeCreate(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    DepositeCreateMutation,
    DepositeCreateVariables
  >
) {
  return ReactApolloHooks.useMutation<
    DepositeCreateMutation,
    DepositeCreateVariables
  >(DepositeCreateDocument, baseOptions);
}
