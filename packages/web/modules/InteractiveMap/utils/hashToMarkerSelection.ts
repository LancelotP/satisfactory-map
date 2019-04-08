import { MarkerSelection } from "./getDefaultSelection";

export function hashToMarkerSelection(hash: number): MarkerSelection {
  const binaryHash = hash
    .toString(2)
    .split("")
    .reverse()
    .join("");

  return {
    q_impure: binaryHash[1] === "1",
    q_normal: binaryHash[2] === "1",
    q_pure: binaryHash[3] === "1",
    n_iron: binaryHash[4] === "1",
    n_copper: binaryHash[5] === "1",
    n_limestone: binaryHash[6] === "1",
    n_coal: binaryHash[7] === "1",
    n_oil: binaryHash[8] === "1",
    n_caterium: binaryHash[9] === "1",
    n_sulfur: binaryHash[10] === "1",
    n_bauxite: binaryHash[11] === "1",
    n_quartz: binaryHash[12] === "1",
    n_uranium: binaryHash[13] === "1",
    n_sam: binaryHash[14] === "1",
    n_blocked: binaryHash[15] === "1",
    n_exploited: binaryHash[16] === "1",
    s_blocked: binaryHash[17] === "1",
    s_collected: binaryHash[18] === "1",
    s_green: binaryHash[19] === "1",
    s_yellow: binaryHash[20] === "1",
    s_purple: binaryHash[21] === "1",
    d_drops: binaryHash[22] === "1",
    d_collected: binaryHash[23] === "1",
    g_geysers: binaryHash[24] === "1",
    g_exploited: binaryHash[25] === "1",
    a_blocked: binaryHash[26] === "1",
    a_collected: binaryHash[27] === "1",
    a_mercer: binaryHash[28] === "1",
    a_somer: binaryHash[29] === "1"
  };
}
