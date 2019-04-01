import React, { useEffect, useState } from "react";

import * as L from "leaflet";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import * as S from "./InteractiveMap.style";
import { createMarker } from "../Marker/Marker";
import {
  useInteractiveMap,
  InteractiveMapMarkersConnection,
  ResourceNodeType,
  SlugType,
  ResourceNodeQuality
} from "../../__generated__";
import { InteractiveMapMenu } from "./components/InteractiveMapMenu/InteractiveMapMenu";
import { getDefaultMarkerSelection } from "../../utils/getDefaultMarkerSelection";
import IconMenu from "@material-ui/icons/Menu";
import IconClose from "@material-ui/icons/Close";

type Props = {
  embedded?: boolean;
};

const CONTAINER_ID = "map-root";

export const InteractiveMap = (props: Props) => {
  const { data, loading } = useInteractiveMap();
  const [menuOpen, setMenuOpen] = useState(false);

  const [markers, setMarkers] = useState<InteractiveMapMarkersConnection>({
    __typename: "MarkersConnection",
    totalCount: 0,
    edges: []
  });

  const [selection, setSelection] = useState(getDefaultMarkerSelection());

  const [map, setMap] = useState<ReturnType<typeof renderMap> | undefined>(
    undefined
  );

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  useEffect(() => {
    if (data && data.markersConnection) {
      setMarkers(data.markersConnection);
      if (!map) {
        const renderedMap = renderMap(CONTAINER_ID, data.markersConnection);

        setMap(renderedMap);
      }
    }
  }, [data]);

  useEffect(() => {
    if (!map) return;

    Object.keys(selection.nodes).map(key => {
      const type = key as ResourceNodeType;

      Object.keys(ResourceNodeQuality).map(qualKey => {
        // @ts-ignore
        const quality = ResourceNodeQuality[qualKey] as ResourceNodeQuality;

        if (selection.nodes[type]) {
          if (
            selection.quality[quality] &&
            !map.nodesGroup.hasLayer(map.nodes[`${type}_${quality}`])
          ) {
            map.nodesGroup.addLayer(map.nodes[`${type}_${quality}`]);
          } else if (
            !selection.quality[quality] &&
            map.nodesGroup.hasLayer(map.nodes[`${type}_${quality}`])
          )
            map.nodesGroup.removeLayer(map.nodes[`${type}_${quality}`]);
        } else {
          if (map.nodesGroup.hasLayer(map.nodes[`${type}_${quality}`])) {
            map.nodesGroup.removeLayer(map.nodes[`${type}_${quality}`]);
          }
        }
      });
    });

    Object.keys(selection.slugs).map(key => {
      const type = key as SlugType;

      if (selection.slugs[type] && !map.slugsGroup.hasLayer(map.slugs[type])) {
        map.slugsGroup.addLayer(map.slugs[type]);
      } else if (
        !selection.slugs[type] &&
        map.slugsGroup.hasLayer(map.slugs[type])
      ) {
        map.slugsGroup.removeLayer(map.slugs[type]);
      }
    });

    if (selection.pods && !map.dropPodsGroup.hasLayer(map.dropPods)) {
      map.dropPodsGroup.addLayer(map.dropPods);
    } else if (!selection.pods && map.dropPodsGroup.hasLayer(map.dropPods)) {
      map.dropPodsGroup.removeLayer(map.dropPods);
    }
  }, [selection, map]);

  return (
    <S.Root menuOpen={menuOpen}>
      <S.Menu>
        <InteractiveMapMenu
          onSelectionChange={setSelection}
          selection={selection}
        />
      </S.Menu>
      <S.Content id={CONTAINER_ID}>
        <S.MenuIcon onClick={toggleMenu}>
          {menuOpen ? <IconClose /> : <IconMenu />}
        </S.MenuIcon>
      </S.Content>
    </S.Root>
  );
};

function renderMap(
  containerId: string,
  markers: InteractiveMapMarkersConnection
) {
  console.log("render map");

  const bounds = L.latLngBounds([-3048, -3048], [3048, 4064]);

  // @ts-ignore
  const crs = L.extend({}, L.CRS.Simple, {
    transformation: new L.Transformation(1, 1, 1, 0)
  });

  const backgroundLayer = L.imageOverlay("/background_base.jpg", bounds);

  const [lng, lat, zoom] = location.hash
    .slice(1)
    .split("/")
    .map(s => parseFloat(s));

  const map = L.map(containerId, {
    // preferCanvas: true,
    crs: crs,
    minZoom: -3,
    maxBounds: bounds,
    center: [lat || 0, lng || 0],
    maxZoom: 1.5,
    zoom: zoom || -2,
    layers: [backgroundLayer],
    attributionControl: false
  });

  map.on({
    moveend: () => {
      const { lat, lng } = map.getCenter();
      const zoom = map.getZoom();

      location.hash = `${lng}/${lat}/${zoom}`;
    }
  });

  // @ts-ignore
  const nodes: { [k: string]: L.FeatureGroup } = {};
  // @ts-ignore
  const slugs: { [k in SlugType]: L.FeatureGroup } = {};

  const resourceNodesGroup = L.featureGroup();
  const slugsGroup = L.featureGroup();
  const dropPodsGroup = L.featureGroup();

  Object.keys(ResourceNodeType).map(key => {
    // @ts-ignore
    const RNType = ResourceNodeType[key] as ResourceNodeType;

    nodes[`${RNType}_${ResourceNodeQuality.Impure}`] = L.featureGroup().addTo(
      resourceNodesGroup
    );
    nodes[`${RNType}_${ResourceNodeQuality.Normal}`] = L.featureGroup().addTo(
      resourceNodesGroup
    );
    nodes[`${RNType}_${ResourceNodeQuality.Pure}`] = L.featureGroup().addTo(
      resourceNodesGroup
    );
    nodes[`${RNType}_${ResourceNodeQuality.Unknown}`] = L.featureGroup().addTo(
      resourceNodesGroup
    );
  });

  Object.keys(SlugType).map(key => {
    // @ts-ignore
    const slugType = SlugType[key] as SlugType;

    slugs[slugType] = L.featureGroup().addTo(slugsGroup);
  });

  const dropPods = L.featureGroup().addTo(dropPodsGroup);

  for (let i = 0; i < markers.edges.length; i++) {
    const marker = markers.edges[i].node;

    if (marker.target.__typename === "ResourceNode") {
      // @ts-ignore
      nodes[`${marker.target.nodeType}_${marker.target.nodeQuality}`].addLayer(
        createMarker({ marker })
      );
    } else if (marker.target.__typename === "Slug") {
      // @ts-ignore
      slugs[marker.target.slugType].addLayer(createMarker({ marker }));
    } else if (marker.target.__typename === "DropPod") {
      dropPods.addLayer(createMarker({ marker }));
    }
  }

  resourceNodesGroup.addTo(map);
  slugsGroup.addTo(map);
  dropPodsGroup.addTo(map);

  return {
    map,
    backgroundLayer,
    nodesGroup: resourceNodesGroup,
    nodes,
    slugsGroup: slugsGroup,
    slugs,
    dropPodsGroup: dropPodsGroup,
    dropPods
  };
}
