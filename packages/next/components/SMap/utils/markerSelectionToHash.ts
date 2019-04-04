import { MarkerSelection } from "./getDefaultSelection";

const SMV = {
  Q_IMPURE: 1,
  Q_NORMAL: 2,
  Q_PURE: 4,
  N_BAUXITE: 8,
  N_CATERIUM: 16,
  N_COAL: 32,
  N_COPPER: 64,
  N_IRON: 128,
  N_LIMESTONE: 256,
  N_OIL: 512,
  N_QUARTZ: 1024,
  N_SAM: 2048,
  N_SULFUR: 4096,
  N_URANIUM: 8192,
  S_GREEN: 16384,
  S_YELLOW: 32768,
  S_PURPLE: 65536,
  GEYSERS: 131072,
  DROPPODS: 262144,
  UNKNOWNS: 524288
};

export function getMarkerSelectionHash(selection: MarkerSelection) {
  let filterHash = 0;

  if (selection.quality.impure) filterHash += SMV.Q_IMPURE;
  if (selection.quality.normal) filterHash += SMV.Q_NORMAL;
  if (selection.quality.pure) filterHash += SMV.Q_PURE;
  if (selection.nodes.bauxite) filterHash += SMV.N_BAUXITE;
  if (selection.nodes.caterium) filterHash += SMV.N_CATERIUM;
  if (selection.nodes.coal) filterHash += SMV.N_COAL;
  if (selection.nodes.copper) filterHash += SMV.N_COPPER;
  if (selection.nodes.iron) filterHash += SMV.N_IRON;
  if (selection.nodes.limestone) filterHash += SMV.N_LIMESTONE;
  if (selection.nodes.oil) filterHash += SMV.N_OIL;
  if (selection.nodes.quartz) filterHash += SMV.N_QUARTZ;
  if (selection.nodes.sam) filterHash += SMV.N_SAM;
  if (selection.nodes.sulfur) filterHash += SMV.N_SULFUR;
  if (selection.nodes.uranium) filterHash += SMV.N_URANIUM;
  if (selection.slugs.green) filterHash += SMV.S_GREEN;
  if (selection.slugs.yellow) filterHash += SMV.S_YELLOW;
  if (selection.slugs.purple) filterHash += SMV.S_PURPLE;
  if (selection.geysers) filterHash += SMV.GEYSERS;
  if (selection.dropPods) filterHash += SMV.DROPPODS;
  if (selection.unknowns) filterHash += SMV.UNKNOWNS;

  return filterHash;
}
