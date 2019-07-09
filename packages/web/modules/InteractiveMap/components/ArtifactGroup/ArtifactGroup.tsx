import React, { useContext, useMemo } from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Artifact } from "../../data/markers";
import { SelectionContext } from "../../InteractiveMap";
import { ArtifactMarker } from "../ArtifactMarker/ArtifactMarker";

type Props = {
  markers: Artifact[];
};

export const ArtifactGroup = React.memo(
  (props: Props) => {
    const { selection } = useContext(SelectionContext);

    const markers = useMemo(() => {
      return props.markers.filter(m => {
        // if (m.obstructed && selection.a_blocked) return false;
        // if (m.exploited && selection.n_exploited) return false;

        return true;
      });
    }, [selection.a_collected, selection.a_blocked]);

    // @ts-ignore
    if (!selection[`a_${props.markers[0].type}`]) {
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
          <ArtifactMarker key={marker.originId} marker={marker} />
        ))}
      </MarkerClusterGroup>
    );
  },
  (prev, next) => {
    return prev.markers.length === next.markers.length;
  }
);
