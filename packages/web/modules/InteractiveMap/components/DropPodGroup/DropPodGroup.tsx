import React, { useContext, useMemo } from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { DropPod } from "../../data/markers";
import { SelectionContext } from "../../InteractiveMap";
import { DropPodMarker } from "../DropPodMarker/DropPodMarker";

type Props = {
  markers: DropPod[];
};

export const DropPodGroup = (props: Props) => {
    const { selection } = useContext(SelectionContext);

    if (!selection.d_drops) {
      return null;
    }

    const markers = useMemo(() => {
      return props.markers.filter(m => {
        if (m.collected && selection.d_collected) return false;
  
        return true;
      });
    }, [
      selection.d_collected,
    ]);

    return (
      <MarkerClusterGroup
        removeOutsideVisibleBounds={true}
        animate={true}
        disableClusteringAtZoom={7}
        maxClusterRadius={0}
        chunkedLoading={true}
      >
        {markers.map(marker => (
          <DropPodMarker key={marker.originId} marker={marker} />
        ))}
      </MarkerClusterGroup>
    );
  };
