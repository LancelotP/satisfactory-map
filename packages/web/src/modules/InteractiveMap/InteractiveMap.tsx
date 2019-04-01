import React, { useState, useEffect } from "react";

import * as L from "leaflet";
import "leaflet.markercluster";
import "leaflet-rastercoords";
import MarkerClusterGroup from "react-leaflet-markercluster";
import * as S from "./InteractiveMap.style";
import {
  useInteractiveMap,
  ResourceNodeType,
  SlugType,
  MarkerSlugInlineFragment,
  MarkerPosition,
  MarkerDropPodInlineFragment,
  RnMarkerFragment
} from "../../__generated__";
import { InteractiveMapMenu } from "./components/InteractiveMapMenu/InteractiveMapMenu";
import { getDefaultMarkerSelection } from "../../utils/getDefaultMarkerSelection";
import IconMenu from "@material-ui/icons/Menu";
import IconClose from "@material-ui/icons/Close";
import { Map, TileLayer, Marker, CircleMarker } from "react-leaflet";
import { getSlugColor } from "../../utils/getSlugColor";
import { RNMarkerIcon } from "./components/RNMarker/RNMarker";

type Props = {
  embedded?: boolean;
};

const CONTAINER_ID = "map-root";

// @ts-ignore
const crs = L.extend({}, L.CRS.Simple, {
  transformation: new L.Transformation(0.000315, 96, 0.000315, 96)
});

type MarkerPos = {
  lat: number;
  lng: number;
  alt: number;
};

export const InteractiveMap = (props: Props) => {
  const { data, loading } = useInteractiveMap();
  const [menuOpen, setMenuOpen] = useState(false);
  const [markerSize, setMarkerSize] = useState(30);
  const [selection, setSelection] = useState(getDefaultMarkerSelection());
  const [slugs, setSlugs] = useState<
    { [k in SlugType]: Array<MarkerSlugInlineFragment & { pos: MarkerPos }> }
  >({
    GREEN: [],
    YELLOW: [],
    PURPLE: []
  });
  const [resourceNodes, setResourceNodes] = useState<
    { [k in ResourceNodeType]: Array<RnMarkerFragment & { pos: MarkerPos }> }
  >({
    IRON: [],
    COPPER: [],
    LIMESTONE: [],
    COAL: [],
    OIL: [],
    CATERIUM: [],
    SAM: [],
    BAUXITE: [],
    QUARTZ: [],
    SULFUR: [],
    URANIUM: [],
    GEYSER: [],
    UNKNOWN: []
  });

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  useEffect(() => {
    const newSlugs = Object.assign({}, slugs);
    const newResourceNodes = Object.assign({}, resourceNodes);

    (
      (data && data.markersConnection && data.markersConnection.edges) ||
      []
    ).forEach(edge => {
      if (edge.node.target.__typename === "Slug") {
        const target = edge.node.target as MarkerSlugInlineFragment;

        newSlugs[target.slugType].push({
          ...target,
          pos: convertPos(edge.node.position)
        });
      } else if (edge.node.target.__typename === "ResourceNode") {
        const target = edge.node.target as RnMarkerFragment;

        newResourceNodes[target.type].push({
          ...target,
          pos: convertPos(edge.node.position)
        });
      }
    });

    setSlugs(newSlugs);
    setResourceNodes(newResourceNodes);
  }, [data && data.markersConnection && data.markersConnection.totalCount]);

  return (
    <S.Root menuOpen={menuOpen}>
      <S.Menu>
        <InteractiveMapMenu
          markerSize={markerSize}
          onMarkerSizeChange={setMarkerSize}
          onSelectionChange={setSelection}
          selection={selection}
        />
      </S.Menu>
      <S.Content id={CONTAINER_ID}>
        <Map
          id="s_map"
          update
          preferCanvas={true}
          zoomSnap={0.5}
          minZoom={2}
          center={[0, 0]}
          maxZoom={6}
          zoom={-2}
          attributionControl={false}
          crs={crs}
        >
          <TileLayer url="/tiles/{z}/{x}/{y}.png" noWrap={true} />
          {Object.keys(resourceNodes).map(key => {
            // @ts-ignore
            if (!selection.nodes[key]) {
              return null;
            }

            // @ts-ignore
            const markers = resourceNodes[key] as Array<
              RnMarkerFragment & { pos: MarkerPos }
            >;

            return (
              <MarkerClusterGroup
                removeOutsideVisibleBounds={true}
                maxClusterRadius={0}
                key={key}
              >
                {markers.map(marker => (
                  <Marker
                    position={marker.pos}
                    icon={RNMarkerIcon({ marker, iconSize: markerSize })}
                    key={marker.id}
                  />
                ))}
              </MarkerClusterGroup>
            );
          })}
          {Object.keys(slugs).map(key => {
            // @ts-ignore
            if (!selection.slugs[key]) {
              return null;
            }

            // @ts-ignore
            const markers = slugs[key] as Array<
              MarkerSlugInlineFragment & { pos: MarkerPos }
            >;

            return (
              <MarkerClusterGroup
                removeOutsideVisibleBounds={true}
                maxClusterRadius={0}
                key={key}
              >
                {markers.map(marker => (
                  <CircleMarker
                    radius={(markerSize - 10) / 2}
                    stroke={true}
                    color={"#fff"}
                    weight={2}
                    fill={true}
                    fillOpacity={1}
                    fillColor={getSlugColor(marker.slugType)}
                    center={marker.pos}
                    key={marker.id}
                  />
                ))}
              </MarkerClusterGroup>
            );
          })}
        </Map>
        <S.MenuIcon onClick={toggleMenu}>
          {menuOpen ? <IconClose /> : <IconMenu />}
        </S.MenuIcon>
      </S.Content>
    </S.Root>
  );
};

function convertPos(position: MarkerPosition) {
  return {
    lat: position.y,
    lng: position.x,
    alt: position.z
  };
}
