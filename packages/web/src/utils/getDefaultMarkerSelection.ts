import { DepositType, SlugType } from "../__generated__";
import { PartialDeep } from "lodash";

export type MarkerSelection = {
  deposits: { [k in DepositType]: boolean };
  slugs: { [k in SlugType]: boolean };
};

export function getDefaultMarkerSelection() {
  const markers: PartialDeep<MarkerSelection> = {
    deposits: {},
    slugs: {}
  };

  Object.keys(DepositType).forEach(key => {
    markers.deposits![DepositType[key as keyof typeof DepositType]] = true;
  });

  Object.keys(SlugType).forEach(key => {
    markers.slugs![SlugType[key as keyof typeof SlugType]] = true;
  });

  return markers as MarkerSelection;
}
