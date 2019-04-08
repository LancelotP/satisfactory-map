import { hashToMarkerSelection } from "./hashToMarkerSelection";

export type MarkerSelection = {
  q_impure: boolean;
  q_normal: boolean;
  q_pure: boolean;
  n_iron: boolean;
  n_copper: boolean;
  n_limestone: boolean;
  n_coal: boolean;
  n_oil: boolean;
  n_caterium: boolean;
  n_sulfur: boolean;
  n_bauxite: boolean;
  n_quartz: boolean;
  n_uranium: boolean;
  n_sam: boolean;
  n_blocked: boolean;
  n_exploited: boolean;
  s_blocked: boolean;
  s_collected: boolean;
  s_green: boolean;
  s_yellow: boolean;
  s_purple: boolean;
  d_drops: boolean;
  d_collected: boolean;
  g_geysers: boolean;
  g_exploited: boolean;
  a_blocked: boolean;
  a_collected: boolean;
  a_mercer: boolean;
  a_somer: boolean;
};

export function getDefaultSelection(hash?: number): MarkerSelection {
  if (hash !== undefined) {
    return hashToMarkerSelection(hash);
  }

  return {
    q_impure: true,
    q_normal: true,
    q_pure: true,
    n_iron: true,
    n_copper: true,
    n_limestone: true,
    n_coal: false,
    n_oil: false,
    n_caterium: false,
    n_sulfur: false,
    n_bauxite: false,
    n_quartz: false,
    n_uranium: false,
    n_sam: false,
    n_blocked: false,
    n_exploited: false,
    s_blocked: false,
    s_collected: false,
    s_green: false,
    s_yellow: false,
    s_purple: false,
    d_drops: false,
    d_collected: false,
    g_geysers: false,
    g_exploited: false,
    a_blocked: false,
    a_collected: false,
    a_mercer: false,
    a_somer: false
  };
}
