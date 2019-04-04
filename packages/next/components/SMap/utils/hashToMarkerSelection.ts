import { MarkerSelection } from "./getDefaultSelection";

export function hashToMarkerSelection(hash: number): MarkerSelection {
  const binaryHash = hash
    .toString(2)
    .split("")
    .reverse()
    .join("");

  return {
    quality: {
      impure: binaryHash[0] === "1",
      normal: binaryHash[1] === "1",
      pure: binaryHash[2] === "1"
    },
    nodes: {
      bauxite: binaryHash[3] === "1",
      caterium: binaryHash[4] === "1",
      coal: binaryHash[5] === "1",
      copper: binaryHash[6] === "1",
      iron: binaryHash[7] === "1",
      limestone: binaryHash[8] === "1",
      oil: binaryHash[9] === "1",
      quartz: binaryHash[10] === "1",
      sam: binaryHash[11] === "1",
      sulfur: binaryHash[12] === "1",
      uranium: binaryHash[13] === "1"
    },
    slugs: {
      green: binaryHash[14] === "1",
      yellow: binaryHash[15] === "1",
      purple: binaryHash[16] === "1"
    },
    geysers: binaryHash[17] === "1",
    dropPods: binaryHash[18] === "1",
    unknowns: binaryHash[19] === "1"
  };
}
