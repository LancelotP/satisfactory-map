import { ResourceNodeType, SlugType } from "../__generated__";
import { PartialDeep } from "lodash";

export type MarkerSelection = {
  nodes: { [k in ResourceNodeType]: boolean };
  slugs: { [k in SlugType]: boolean };
  pods: boolean;
};

export function getDefaultMarkerSelection() {
  const markers: PartialDeep<MarkerSelection> = {
    nodes: {},
    slugs: {},
    pods: false
  };

  Object.keys(ResourceNodeType).forEach(key => {
    markers.nodes![
      ResourceNodeType[key as keyof typeof ResourceNodeType]
    ] = true;
  });

  Object.keys(SlugType).forEach(key => {
    markers.slugs![SlugType[key as keyof typeof SlugType]] = false;
  });

  return markers as MarkerSelection;
}
