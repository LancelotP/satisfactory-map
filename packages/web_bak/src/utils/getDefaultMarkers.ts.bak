import {
  DepositType,
  DepositMarkerFragment,
  SlugType,
  SlugMarkerFragment
} from "../__generated__";
import { PartialDeep } from "lodash";

export type Markers = {
  deposits: { [k in DepositType]: DepositMarkerFragment[] };
  slugs: { [k in SlugType]: SlugMarkerFragment[] };
};

export function getDefaultMarkers() {
  const markers: PartialDeep<Markers> = {
    deposits: {},
    slugs: {}
  };

  Object.keys(DepositType).forEach(key => {
    markers.deposits![DepositType[key as keyof typeof DepositType]] = [];
  });

  Object.keys(SlugType).forEach(key => {
    markers.slugs![SlugType[key as keyof typeof SlugType]] = [];
  });

  return markers as Markers;
}
