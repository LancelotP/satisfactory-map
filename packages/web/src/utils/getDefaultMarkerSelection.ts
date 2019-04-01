import {
  ResourceNodeType,
  SlugType,
  ResourceNodeQuality
} from "../__generated__";

export type MarkerSelection = {
  quality: { [k in ResourceNodeQuality]: boolean };
  nodes: { [k in ResourceNodeType]: boolean };
  slugs: { [k in SlugType]: boolean };
  pods: boolean;
};

export function getDefaultMarkerSelection() {
  const markers: MarkerSelection = {
    quality: {
      IMPURE: true,
      NORMAL: true,
      PURE: true,
      UNKNOWN: false
    },
    nodes: {
      BAUXITE: false,
      CATERIUM: false,
      COAL: false,
      COPPER: true,
      GEYSER: false,
      IRON: true,
      LIMESTONE: true,
      OIL: false,
      QUARTZ: false,
      SAM: false,
      SULFUR: false,
      UNKNOWN: false,
      URANIUM: false
    },
    slugs: {
      GREEN: false,
      YELLOW: false,
      PURPLE: false,
      UNKNOWN: false
    },
    pods: false
  };

  return markers as MarkerSelection;
}
