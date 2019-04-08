import React, { useContext } from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { DropPod } from "../../data/markers";
import { SelectionContext } from "../../InteractiveMap";
import { DropPodMarker } from "../DropPodMarker/DropPodMarker";

type Props = {
  markers: DropPod[];
};

export const DropPodGroup = React.memo(
  (props: Props) => {
    const { markers } = props;
    const { selection } = useContext(SelectionContext);

    if (!selection.d_drops) {
      return null;
    }

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
  },
  (prev, next) => {
    return prev.markers.length === next.markers.length;
  }
);
