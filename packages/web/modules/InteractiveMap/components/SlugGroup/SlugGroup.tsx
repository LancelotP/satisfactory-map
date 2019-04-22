import React, { useContext, useMemo } from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Slug } from "../../data/markers";
import { SelectionContext } from "../../InteractiveMap";
import { SlugMarker } from "../SlugMarker/SlugMarker";

type Props = {
  markers: Slug[];
};

export const SlugGroup = 
  (props: Props) => {
    const { selection } = useContext(SelectionContext);

    const markers = useMemo(() => {
      return props.markers.filter(m => {
        if (m.obstructed && selection.s_blocked) return false;
        if (m.collected && selection.s_collected) return false;

        return true;
      });
    }, [selection.s_collected, selection.s_blocked]);

    // @ts-ignore
    if (!selection[`s_${props.markers[0].type}`]) {
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
          <SlugMarker key={marker.originId} marker={marker} />
        ))}
      </MarkerClusterGroup>
    );
  }
