import React, { useState, useEffect } from "react";
import Head from "next/head";

import * as S from "./InteractiveMap.style";
import { Menu } from "./components/Menu/Menu";
import dynamic from "next/dynamic";
import { nodes } from "./data/nodes";
import { yellowSlugs } from "./data/s_yellow";
import { greenSlugs } from "./data/s_green";
import { purpleSlugs } from "./data/s_purple";
import {
  getDefaultSelection,
  MarkerSelection
} from "./utils/getDefaultSelection";
import { getMarkerSelectionHash } from "./utils/markerSelectionToHash";
import { PlayerLocation } from "./components/LocateMeBtn/getPlayerFromSave";

const NOSSRMap = dynamic(
  // @ts-ignore
  () => import("./components/Map/Map").then(c => c.Map),
  {
    ssr: false
  }
);

export const IconStyleContext = React.createContext<{
  mode: "default" | "colorblind";
  setMode: (m: "default" | "colorblind") => void;
}>({
  mode: "default",
  setMode: () => null
});

export const IconSizeContext = React.createContext<{
  iconSize: number;
  setIconSize: (s: number) => void;
}>({
  iconSize: 1,
  setIconSize: () => null
});

const defaultSelection = {
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

type Selection = typeof defaultSelection;

export const SelectionContext = React.createContext<{
  selection: Selection;
  setSelection: (s: Selection) => void;
}>({
  selection: defaultSelection,
  setSelection: () => null
});

export const InteractiveMap = () => {
  const [mode, setMode] = useState<"default" | "colorblind">("default");
  const [iconSize, setIconSize] = useState(1);
  const [selection, setSelection] = useState<Selection>(getDefaultSelection());
  const [players, setPlayers] = useState<PlayerLocation[]>([]);

  useEffect(() => {
    if (typeof location !== "undefined" && location.hash) {
      // @ts-ignore
      const [lat, lng, zoom, filter] = location.hash
        .slice(1)
        .split(";")
        .map(e => parseFloat(e))
        .filter(e => e && !isNaN(e));

      if (filter) {
        setSelection(getDefaultSelection(filter));
      }
    }
  }, []);

  function handleSelectionChange(s: MarkerSelection) {
    const [lat, lng, zoom] = location.hash
      .slice(1)
      .split(";")
      .map(e => parseFloat(e));

    location.hash = `${lat};${lng};${zoom};${getMarkerSelectionHash(s)}`;
    setSelection(s);
  }

  return (
    <S.Root>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
          integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/react-leaflet-markercluster/dist/styles.min.css"
        />
      </Head>
      <IconStyleContext.Provider value={{ mode, setMode }}>
        <IconSizeContext.Provider value={{ iconSize, setIconSize }}>
          <SelectionContext.Provider
            value={{ selection, setSelection: handleSelectionChange }}
          >
            <React.Fragment>
              <Menu onPlayersLoaded={setPlayers} />
              <NOSSRMap
                players={players}
                markers={nodes}
                greenSlugs={greenSlugs}
                yellowSlugs={yellowSlugs}
                purpleSlugs={purpleSlugs}
              />
            </React.Fragment>
          </SelectionContext.Provider>
        </IconSizeContext.Provider>
      </IconStyleContext.Provider>
    </S.Root>
  );
};
