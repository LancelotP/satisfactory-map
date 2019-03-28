import React from "react";
import { SlugMarkerFragment } from "../../../../__generated__";
import * as L from "leaflet";
import { getSlugColor } from "../../../../utils/getSlugColor";
import { Marker, Popup } from "react-leaflet";
import { T } from "../../../T/T";

type Props = {
  marker: SlugMarkerFragment;
};

export const SlugMarker = (props: Props) => {
  const { marker } = props;

  return (
    <Marker
      position={L.latLng(marker.lat, marker.lng)}
      key={marker.id}
      icon={
        new L.DivIcon({
          html: `
          <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <g fill-rule="nonzero" fill="none">
              <circle fill=${getSlugColor(
                marker.slugType
              )} cx="20" cy="20" r="19"/>
              <path d="M20 2a18 18 0 1 1 0 36 18 18 0 0 1 0-36zm0-2a20 20 0 1 0 0 40 20 20 0 0 0 0-40z" fill="#FFF"/>
            </g>
          </svg>
          `,
          iconSize: [30, 30]
        })
      }
    >
      <Popup>
        <T align="center" transform="lowercase">
          {marker.slugType} slug
        </T>
        {marker.addedBy && (
          <T align="center">Added by {marker.addedBy.userName}</T>
        )}
      </Popup>
    </Marker>
  );
};
