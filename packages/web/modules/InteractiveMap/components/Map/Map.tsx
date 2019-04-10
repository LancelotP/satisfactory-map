import * as React from "react";
import * as L from "leaflet";
import "leaflet.markercluster";
import {
  Map as LMap,
  TileLayer,
  FeatureGroup,
  Marker,
  Popup
} from "react-leaflet";

import * as S from "./Map.style";
import { Node, NodeType, Slug } from "../../data/markers";
import { NodeGroup } from "../NodeGroup/NodeGroup";
import { SlugGroup } from "../SlugGroup/SlugGroup";
import { ArtifactGroup } from "../ArtifactGroup/ArtifactGroup";
import { somers } from "../../data/a_somer";
import { mercers } from "../../data/a_mercer";
import { GeyserGroup } from "../GeyserGroup/GeyserGroup";
import { geysers } from "../../data/g_geysers";
import { DropPodGroup } from "../DropPodGroup/DropPodGroup";
import { dropPods } from "../../data/d_droppods";
import { PlayerLocation } from "../LocateMeBtn/getPlayerFromSave";

// @ts-ignore
const crs = L.extend({}, L.CRS.Simple, {
  transformation: new L.Transformation(0.00015625, 63.5, 0.00015625, 63.5)
});

type Props = {
  markers: Node[];
  greenSlugs: Slug[];
  yellowSlugs: Slug[];
  purpleSlugs: Slug[];
  players: PlayerLocation[];
  toggleMenu: () => void;
  isMenuOpen: boolean;
};

export const Map: React.FunctionComponent<Props> = props => {
  const markers = sortMarkers(props.markers);
  const ref = React.useRef<LMap | null>();
  const { greenSlugs, yellowSlugs, purpleSlugs, players } = props;
  const [lat, setLat] = React.useState(0);
  const [lng, setLng] = React.useState(0);
  const [zoom, setZoom] = React.useState(3);

  React.useEffect(() => {
    if (typeof location !== "undefined" && location.hash) {
      const [lat, lng, zoom] = location.hash
        .slice(1)
        .split(";")
        .map(e => parseFloat(e))
        .filter(e => e && !isNaN(e));

      if (lat) setLat(lat);
      if (lng) setLng(lng);
      if (zoom) setZoom(zoom);
    }
  }, []);

  React.useEffect(() => {
    ref.current!.leafletElement.off("moveend", handleMoveEnd);
    ref.current!.leafletElement.on("moveend", handleMoveEnd);
  }, [ref, ref.current]);

  function handleMoveEnd() {
    // @ts-ignore
    const [_, __, ___, hash] = location.hash
      .slice(1)
      .split(";")
      .map(e => parseFloat(e));

    const leafletMap = ref.current!.leafletElement;
    const { lat, lng } = leafletMap.getCenter();
    const zoom = leafletMap.getZoom();

    location.hash = `${lat};${lng};${zoom};${hash}`;
  }

  React.useEffect(() => {
    if (players.length > 1) {
      ref.current!.leafletElement.flyTo([players[0].y, players[0].x], 6);
    }
  }, [players]);

  return (
    <S.Root>
      <LMap
        // @ts-ignore
        ref={ref}
        zoomSnap={0.5}
        maxZoom={7}
        minZoom={3}
        maxBounds={[[-406400, -406400], [508000, 508000]]}
        zoom={zoom}
        center={[lat, lng]}
        crs={crs}
        preferCanvas={true}
      >
        <TileLayer
          url="/static/tiles/{z}/{x}/{y}.png"
          noWrap={true}
          bounds={[[-406400, -406400], [508000, 508000]]}
        />
        <FeatureGroup>
          <ArtifactGroup markers={somers} />
          <ArtifactGroup markers={mercers} />
          <SlugGroup markers={greenSlugs} />
          <SlugGroup markers={yellowSlugs} />
          <SlugGroup markers={purpleSlugs} />
          <NodeGroup markers={markers.nodes.iron} />
          <NodeGroup markers={markers.nodes.copper} />
          <NodeGroup markers={markers.nodes.limestone} />
          <NodeGroup markers={markers.nodes.coal} />
          <NodeGroup markers={markers.nodes.oil} />
          <NodeGroup markers={markers.nodes.caterium} />
          <NodeGroup markers={markers.nodes.sulfur} />
          <NodeGroup markers={markers.nodes.bauxite} />
          <NodeGroup markers={markers.nodes.quartz} />
          <NodeGroup markers={markers.nodes.uranium} />
          <NodeGroup markers={markers.nodes.sam} />
          <GeyserGroup markers={geysers} />
          <DropPodGroup markers={dropPods} />
          <FeatureGroup>
            {players.map(player => (
              <Marker key={player.id} position={[player.y, player.x]}>
                <Popup>
                  <p style={{ textAlign: "center" }}>
                    <b>Player {player.id}</b>
                  </p>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                    <li>X: {player.x}</li>
                    <li>Y: {player.y}</li>
                    <li>Z: {player.z}</li>
                  </ul>
                </Popup>
              </Marker>
            ))}
          </FeatureGroup>
        </FeatureGroup>
      </LMap>
      <S.ToggleMenu onClick={props.toggleMenu}>
        <img
          style={{ transform: `rotate(${props.isMenuOpen ? -45 : -225}deg)` }}
          src={require("./arrow.png")}
          alt="menu handle"
        />
      </S.ToggleMenu>
    </S.Root>
  );
};

function sortMarkers(markers: Props["markers"]) {
  const tree: {
    nodes: { [k in NodeType]: Node[] };
  } = {
    nodes: {
      iron: [],
      copper: [],
      limestone: [],
      coal: [],
      oil: [],
      caterium: [],
      sulfur: [],
      bauxite: [],
      quartz: [],
      uranium: [],
      sam: [],
      geyser: []
    }
  };

  markers.forEach(marker => {
    if (marker.purity) {
      tree.nodes[marker.type].push(marker);
    }
  });

  return tree;
}
