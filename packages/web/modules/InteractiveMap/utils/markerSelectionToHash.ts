import { MarkerSelection } from "./getDefaultSelection";

const SMV = {
  Q_IMPURE: 2,
  Q_NORMAL: 4,
  Q_PURE: 8,
  N_IRON: 16,
  N_COPPER: 32,
  N_LIMESTONE: 64,
  N_COAL: 128,
  N_OIL: 256,
  N_CATERIUM: 512,
  N_SULFUR: 1024,
  N_BAUXITE: 2048,
  N_QUARTZ: 4096,
  N_URANIUM: 8192,
  N_SAM: 16384,
  N_BLOCKED: 32768,
  N_EXPLOITED: 65536,
  S_BLOCKED: 131072,
  S_COLLECTED: 262144,
  S_GREEN: 524288,
  S_YELLOW: 1048576,
  S_PURPLE: 2097152,
  D_DROPS: 4194304,
  D_COLLECTED: 8388608,
  G_GEYSERS: 16777216,
  G_EXPLOITED: 33554432,
  A_BLOCKED: 67108864,
  A_COLLECTED: 134217728,
  A_MERCER: 268435456,
  A_SOMER: 536870912
};

export function getMarkerSelectionHash(selection: MarkerSelection) {
  let filterHash = 0;

  if (selection.q_impure) filterHash += SMV.Q_IMPURE;
  if (selection.q_normal) filterHash += SMV.Q_NORMAL;
  if (selection.q_pure) filterHash += SMV.Q_PURE;
  if (selection.n_iron) filterHash += SMV.N_IRON;
  if (selection.n_copper) filterHash += SMV.N_COPPER;
  if (selection.n_limestone) filterHash += SMV.N_LIMESTONE;
  if (selection.n_coal) filterHash += SMV.N_COAL;
  if (selection.n_oil) filterHash += SMV.N_OIL;
  if (selection.n_caterium) filterHash += SMV.N_CATERIUM;
  if (selection.n_sulfur) filterHash += SMV.N_SULFUR;
  if (selection.n_bauxite) filterHash += SMV.N_BAUXITE;
  if (selection.n_quartz) filterHash += SMV.N_QUARTZ;
  if (selection.n_uranium) filterHash += SMV.N_URANIUM;
  if (selection.n_sam) filterHash += SMV.N_SAM;
  if (selection.n_blocked) filterHash += SMV.N_BLOCKED;
  if (selection.n_exploited) filterHash += SMV.N_EXPLOITED;
  if (selection.s_blocked) filterHash += SMV.S_BLOCKED;
  if (selection.s_collected) filterHash += SMV.S_COLLECTED;
  if (selection.s_green) filterHash += SMV.S_GREEN;
  if (selection.s_yellow) filterHash += SMV.S_YELLOW;
  if (selection.s_purple) filterHash += SMV.S_PURPLE;
  if (selection.d_drops) filterHash += SMV.D_DROPS;
  if (selection.d_collected) filterHash += SMV.D_COLLECTED;
  if (selection.g_geysers) filterHash += SMV.G_GEYSERS;
  if (selection.g_exploited) filterHash += SMV.G_EXPLOITED;
  if (selection.a_blocked) filterHash += SMV.A_BLOCKED;
  if (selection.a_collected) filterHash += SMV.A_COLLECTED;
  if (selection.a_mercer) filterHash += SMV.A_MERCER;
  if (selection.a_somer) filterHash += SMV.A_SOMER;

  return filterHash;
}
