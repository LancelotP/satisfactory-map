import React, { useContext, useMemo } from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { SelectionContext } from "../../InteractiveMap";
import { GeyserMarker } from "../GeyserMarker/GeyserMarker";
import { Geyser } from "../../data/markers";

type Props = {
  markers: Geyser[];
};

export const GeyserGroup = (props: Props) => {
  const { selection } = useContext(SelectionContext);

  const markers = useMemo(() => {
    return props.markers.filter(() => {
      // if (m.exploited && selection.n_exploited) return false;

      return true;
    });
  }, [selection.g_exploited]);

  // @ts-ignore
  if (!selection.g_geysers) {
    return null;
  }

  return (
    <MarkerClusterGroup
      removeOutsideVisibleBounds={true}
      animate={true}
      disableClusteringAtZoom={7}
      maxClusterRadius={0}
      // iconCreateFunction={createClusterIcon(markers[0].type)}
      chunkedLoading={true}
    >
      {markers.map(marker => (
        <GeyserMarker key={marker.originId} marker={marker} />
      ))}
    </MarkerClusterGroup>
  );
};
