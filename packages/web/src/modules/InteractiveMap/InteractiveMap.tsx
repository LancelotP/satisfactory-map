import React, { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";

import * as L from "leaflet";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import * as S from "./InteractiveMap.style";
import { Marker, createMarker, createMarkerIcon } from "../Marker/Marker";
import {
  useInteractiveMap,
  InteractiveMapMarkers,
  MarkerType
} from "../../__generated__";

type Props = {
  embedded?: boolean;
};

const CONTAINER_ID = "map-root";

export const InteractiveMap = (props: Props) => {
  const { data, loading } = useInteractiveMap();

  const [markers, setMarkers] = useState<InteractiveMapMarkers>({
    __typename: "MapMarkerConnection",
    totalCount: 0,
    edges: []
  });
  const [map, setMap] = useState<ReturnType<typeof renderMap> | undefined>(
    undefined
  );

  useEffect(() => {
    if (data && data.defaultMap) {
      setMarkers(data.defaultMap.markers);
      if (!map) {
        setMap(renderMap(CONTAINER_ID, data.defaultMap.markers));
      }
    }
  }, [data]);

  return (
    <S.Root style={{ height: "100vh", width: "100vw" }} id={CONTAINER_ID} />
  );
};

function renderMap(containerId: string, markers: InteractiveMapMarkers) {
  console.log("render map");

  const bounds = L.latLngBounds(
    [-3561.838893, -3561.838893],
    [4574.857608, 4574.857608]
  );

  // @ts-ignore
  const crs = L.extend({}, L.CRS.Simple, {
    transformation: new L.Transformation(1, 1, 1, 0)
  });

  const backgroundLayer = L.imageOverlay("/background.png", bounds);

  const map = L.map(containerId, {
    crs: crs,
    minZoom: -3,
    maxBounds: bounds,
    center: [-1410, -470],
    maxZoom: 1.5,
    zoom: 1.5,
    layers: [backgroundLayer]
  });

  const nodesGroup = L.featureGroup();

  const ironNodes = L.markerClusterGroup({
    iconCreateFunction: cluster =>
      createMarkerIcon({
        text: cluster.getChildCount(),
        type: MarkerType.Deposit
      })
  })
    .addLayers(markers.edges.map(edge => createMarker({ marker: edge.node })))
    .addTo(nodesGroup);

  nodesGroup.addTo(map);

  return { map, backgroundLayer, nodesGroup };
}
