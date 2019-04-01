import React, { useState, useEffect, useRef } from "react";

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
  RnMarkerFragment,
  DropPodMarkerFragment
} from "../../__generated__";
import { InteractiveMapMenu } from "./components/InteractiveMapMenu/InteractiveMapMenu";
import {
  getDefaultMarkerSelection,
  getMarkerSelectionHash,
  MarkerSelection
} from "../../utils/getDefaultMarkerSelection";
import IconMenu from "@material-ui/icons/Menu";
import IconClose from "@material-ui/icons/Close";
import { Map, TileLayer, Marker, CircleMarker, Popup } from "react-leaflet";
import { getSlugColor } from "../../utils/getSlugColor";
import { RNMarkerIcon } from "./components/RNMarker/RNMarker";
import { DropPodIcon } from "./components/DropPodMarker/DropPodMarker";

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
  const { center, hashedFilter, zoom } = parseHash();

  const { data, loading } = useInteractiveMap();
  const [menuOpen, setMenuOpen] = useState(false);
  const [markerSize, setMarkerSize] = useState(30);
  const [selection, setSelection] = useState(
    getDefaultMarkerSelection(hashedFilter)
  );
  const map = useRef<Map | undefined>();
  const [defaultZoom, setDefaultZoom] = useState(zoom);
  const [defaultCenter, setDefaultCenter] = useState<[number, number]>(
    center as [number, number]
  );
  const [slugs, setSlugs] = useState<
    {
      [k in SlugType]: Array<
        MarkerSlugInlineFragment & { pos: MarkerPos; obstructed: boolean }
      >
    }
  >({
    GREEN: [],
    YELLOW: [],
    PURPLE: []
  });

  const [resourceNodes, setResourceNodes] = useState<
    {
      [k in ResourceNodeType]: Array<
        RnMarkerFragment & { pos: MarkerPos; obstructed: boolean }
      >
    }
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

  const [dropPods, setDropPods] = useState<
    Array<DropPodMarkerFragment & { pos: MarkerPos; obstructed: boolean }>
  >([]);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  const saveUrl = (newSelection?: MarkerSelection) => {
    if (map && map.current) {
      const hashFilter = getMarkerSelectionHash(
        newSelection || selection
      ).toString();
      const latlng = map.current!.leafletElement.getCenter();
      const zoom = map.current!.leafletElement.getZoom();

      location.hash = `${latlng.lng};${latlng.lat};${zoom};${hashFilter || ""}`;
    }
  };

  const handleSelectionChange = (newSelection: MarkerSelection) => {
    saveUrl(newSelection);
    setSelection(newSelection);
  };

  useEffect(() => {
    if (map && map.current) {
      console.log(1);
      map.current.leafletElement.on("moveend", () => saveUrl);
    }
  }, [map]);

  useEffect(() => {
    const newSlugs = Object.assign({}, slugs);
    const newResourceNodes = Object.assign({}, resourceNodes);
    const newDropPods: Array<
      DropPodMarkerFragment & { pos: MarkerPos; obstructed: boolean }
    > = [];

    (
      (data && data.markersConnection && data.markersConnection.edges) ||
      []
    ).forEach(edge => {
      if (edge.node.target.__typename === "Slug") {
        const target = edge.node.target as MarkerSlugInlineFragment;

        newSlugs[target.slugType].push({
          ...target,
          pos: convertPos(edge.node.position),
          obstructed: edge.node.obstructed
        });
      } else if (edge.node.target.__typename === "ResourceNode") {
        const target = edge.node.target as RnMarkerFragment;

        newResourceNodes[target.type].push({
          ...target,
          pos: convertPos(edge.node.position),
          obstructed: edge.node.obstructed
        });
      } else if (edge.node.target.__typename === "DropPod") {
        const target = edge.node.target as DropPodMarkerFragment;

        newDropPods.push({
          ...target,
          pos: convertPos(edge.node.position),
          obstructed: edge.node.obstructed
        });
      }
    });

    setDropPods(newDropPods);
    setSlugs(newSlugs);
    setResourceNodes(newResourceNodes);
  }, [data && data.markersConnection && data.markersConnection.totalCount]);

  return (
    <S.Root menuOpen={menuOpen}>
      <S.Menu>
        <InteractiveMapMenu
          markerSize={markerSize}
          onMarkerSizeChange={setMarkerSize}
          onSelectionChange={handleSelectionChange}
          selection={selection}
        />
      </S.Menu>
      <S.Content id={CONTAINER_ID}>
        <Map
          // @ts-ignore
          ref={map}
          id="s_map"
          preferCanvas={true}
          zoomSnap={0.5}
          minZoom={2}
          center={defaultCenter}
          maxZoom={7}
          maxBounds={[
            [221428.57142857142 * 2, 563492.0634920634 * 2],
            [-221428.57142857142 * 2, -563492.0634920634 * 2]
          ]}
          zoom={defaultZoom}
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
              RnMarkerFragment & { pos: MarkerPos; obstructed: boolean }
            >;

            return (
              <MarkerClusterGroup
                removeOutsideVisibleBounds={true}
                maxClusterRadius={0}
                key={key}
              >
                {markers.map(
                  marker =>
                    selection.quality[marker.quality] && (
                      <Marker
                        position={marker.pos}
                        icon={RNMarkerIcon({ marker, iconSize: markerSize })}
                        key={marker.id}
                      >
                        <Popup>
                          <ul
                            style={{ listStyle: "none", margin: 0, padding: 0 }}
                          >
                            {marker.obstructed && (
                              <li>
                                <strong>Obstructed by boulder</strong>
                              </li>
                            )}
                            <li>
                              <b>Type</b>: {marker.type}
                            </li>
                            <li>
                              <b>Quality</b>: {marker.quality}
                            </li>
                            <li>
                              <b>X</b>: {marker.pos.lat}
                            </li>
                            <li>
                              <b>Y</b>: {marker.pos.lng}
                            </li>
                            <li>
                              <b>Z</b>: {marker.pos.alt}
                            </li>
                            <li>
                              <b>ID</b>: {marker.id}
                            </li>
                          </ul>
                        </Popup>
                      </Marker>
                    )
                )}
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
              MarkerSlugInlineFragment & { pos: MarkerPos; obstructed: boolean }
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
                  >
                    <Popup>
                      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                        {marker.obstructed && (
                          <li>
                            <strong>Obstructed by boulder</strong>
                          </li>
                        )}
                        <li>
                          <b>Type</b>: Slug
                        </li>
                        <li>
                          <b>Quality</b>: {marker.slugType}
                        </li>
                        <li>
                          <b>X</b>: {marker.pos.lat}
                        </li>
                        <li>
                          <b>Y</b>: {marker.pos.lng}
                        </li>
                        <li>
                          <b>Z</b>: {marker.pos.alt}
                        </li>
                        <li>
                          <b>ID</b>: {marker.id}
                        </li>
                      </ul>
                    </Popup>
                  </CircleMarker>
                ))}
              </MarkerClusterGroup>
            );
          })}
          {selection.pods && (
            <MarkerClusterGroup
              removeOutsideVisibleBounds={true}
              maxClusterRadius={0}
            >
              {dropPods.map(marker => (
                <Marker
                  position={marker.pos}
                  icon={DropPodIcon({ marker, iconSize: markerSize })}
                  key={marker.id}
                >
                  <Popup>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                      {marker.obstructed && (
                        <li>
                          <strong>Obstructed by boulder</strong>
                        </li>
                      )}
                      <li>
                        <b>X</b>: {marker.pos.lat}
                      </li>
                      <li>
                        <b>Y</b>: {marker.pos.lng}
                      </li>
                      <li>
                        <b>Z</b>: {marker.pos.alt}
                      </li>
                      <li>
                        <b>ID</b>: {marker.id}
                      </li>
                    </ul>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          )}
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

function parseHash() {
  const hashedValues = location.hash
    .slice(1)
    .split(";")
    .filter(Boolean)
    .map(v => {
      const parsedV = parseFloat(v);

      if (isNaN(parsedV)) {
        return 0;
      } else {
        return parsedV;
      }
    });

  return {
    center: [hashedValues[1] || 0, hashedValues[0] || 0],
    zoom: hashedValues[2] || 2,
    hashedFilter: hashedValues[3] || 0
  };
}
