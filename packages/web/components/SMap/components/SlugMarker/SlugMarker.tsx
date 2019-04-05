import { Marker } from "react-leaflet";
import * as L from "leaflet";
import {
  MarkerFragment,
  MarkerSlugInlineFragment
} from "../../../../__generated__";
import { memo } from "react";
import { Popup } from "../Popup/Popup";

type Props = {
  marker: MarkerFragment & { target: MarkerSlugInlineFragment };
  iconSize: number;
};

export const SlugMarker = memo<Props>(props => {
  const { marker } = props;

  return (
    <Marker
      position={marker}
      icon={L.divIcon({
        iconSize: [40, 40],
        className: `slug_${marker.target.slugType}`,
        iconAnchor: [20, 20],
        popupAnchor: [0, -40]
      })}
    >
      <Popup>
        <p>Slug #{marker.target.id}</p>
        <ul>
          <li>
            <b>Color:</b> {marker.target.slugType.toLowerCase()}
          </li>
          <li>
            <b>X:</b> {marker.lng}
          </li>
          <li>
            <b>Y:</b> {marker.lat}
          </li>
          <li>
            <b>Z:</b> {marker.alt}
          </li>
        </ul>
      </Popup>
    </Marker>
  );
});
